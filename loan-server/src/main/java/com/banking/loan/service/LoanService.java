package com.banking.loan.service;

import com.banking.loan.model.LoanRequestDto;
import com.banking.loan.model.LoanResponseDto;
import com.banking.loan.model.RepaymentDto;

import java.util.List;

public interface LoanService {

    LoanResponseDto applyLoan(LoanRequestDto request);

    LoanResponseDto approveLoan(Long loanId);

    LoanResponseDto rejectLoan(Long loanId);

    List<LoanResponseDto> getLoansByAccountNumber(String accountNumber);

    LoanResponseDto getLoanById(Long id);

    LoanResponseDto makeRepayment(RepaymentDto repaymentDto);
}
