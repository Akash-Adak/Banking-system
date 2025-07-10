package com.banking.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private KafkaProducer kafkaProducer;

    public TransactionResponse processTransaction(TransactionRequest request) {
        String type = request.getType().toUpperCase();
        String from = request.getFromAccount();
        String to = request.getToAccount();
        Double amount = request.getAmount();

        Transaction transaction = Transaction.builder()
                .fromAccount(from)
                .toAccount(to)
                .amount(amount)
                .type(type)
                .timestamp(LocalDateTime.now())
                .status("FAILED")
                .build();

        try {
            switch (type) {
                case "TRANSFER":
                    // Debit from sender
                    restTemplate.postForEntity("http://account-service/api/accounts/debit",
                            new BalanceUpdateRequest(from, amount), String.class);
                    // Credit to receiver
                    restTemplate.postForEntity("http://account-service/api/accounts/credit",
                            new BalanceUpdateRequest(to, amount), String.class);
                    transaction.setStatus("SUCCESS");
                    break;

                case "DEPOSIT":
                    restTemplate.postForEntity("http://account-service/api/accounts/credit",
                            new BalanceUpdateRequest(to, amount), String.class);
                    transaction.setStatus("SUCCESS");
                    break;

                case "WITHDRAW":
                    restTemplate.postForEntity("http://account-service/api/accounts/debit",
                            new BalanceUpdateRequest(from, amount), String.class);
                    transaction.setStatus("SUCCESS");
                    break;

                default:
                    return new TransactionResponse("FAILED", "Invalid transaction type", null);
            }

            // Save transaction
            Transaction saved = transactionRepository.save(transaction);

            // Send Kafka event
            kafkaProducer.publishTransactionEvent(saved);

            return new TransactionResponse("SUCCESS", "Transaction completed", saved.getId());

        } catch (Exception e) {
            // Save failed transaction for audit
            transaction.setStatus("FAILED");
            transactionRepository.save(transaction);
            return new TransactionResponse("FAILED", "Transaction failed: " + e.getMessage(), null);
        }
    }

//    public List<Transaction> getTransactionHistory(String account) {
//return transactionRepository.fin(account);
//
//    }
}

