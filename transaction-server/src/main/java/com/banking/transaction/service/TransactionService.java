package com.banking.transaction.service;

import com.banking.transaction.model.BalanceUpdateRequest;
import com.banking.transaction.kafka.KafkaProducer;
import com.banking.transaction.model.TransactionRequest;
import com.banking.transaction.model.TransactionResponse;
import com.banking.transaction.model.Transaction;
import com.banking.transaction.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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

    public TransactionResponse processTransaction(TransactionRequest request, String token) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        HttpEntity<BalanceUpdateRequest> debitEntity = new HttpEntity<>(new BalanceUpdateRequest(request.getFromAccount(), request.getAmount()), headers);
        HttpEntity<BalanceUpdateRequest> creditEntity = new HttpEntity<>(new BalanceUpdateRequest(request.getToAccount(), request.getAmount()), headers);

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
                    restTemplate.postForEntity("http://ACCOUNT/api/accounts/debit", debitEntity, String.class);
                    restTemplate.postForEntity("http://ACCOUNT/api/accounts/credit", creditEntity, String.class);
                    transaction.setStatus("SUCCESS");
                    break;

                case "DEPOSIT":
                    restTemplate.postForEntity("http://ACCOUNT/api/accounts/credit", creditEntity, String.class);
                    transaction.setStatus("SUCCESS");
                    break;

                case "WITHDRAW":
                    restTemplate.postForEntity("http://ACCOUNT/api/accounts/debit", debitEntity, String.class);
                    transaction.setStatus("SUCCESS");
                    break;

                default:
                    return new TransactionResponse("FAILED", "Invalid transaction type", null);
            }

            Transaction saved = transactionRepository.save(transaction);
            kafkaProducer.publishTransactionEvent(saved);

            return new TransactionResponse("SUCCESS", "Transaction completed", saved.getId());

        } catch (Exception e) {
            transaction.setStatus("FAILED");
            transactionRepository.save(transaction);
            return new TransactionResponse("FAILED", "Transaction failed: " + e.getMessage(), null);
        }
    }


    public List<Transaction> getTransactionHistory(String account) {
        return transactionRepository.findByFromAccount(account);
    }
}

