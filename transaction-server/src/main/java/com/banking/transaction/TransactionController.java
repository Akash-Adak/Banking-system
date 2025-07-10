package com.banking.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(@RequestBody TransactionRequest request) {
        return ResponseEntity.ok(transactionService.processTransaction(request));
    }
//
//    @GetMapping("/history/{account}")
//    public ResponseEntity<List<Transaction>> getHistory(@PathVariable String account) {
//        return ResponseEntity.ok(transactionService.getTransactionHistory(account));
//    }
}
