package com.banking.loan.notification;

import com.banking.loan.model.LoanRequestDto;

public class LoanEmailBuilder {

    private LoanEmailBuilder() {
        // Utility class
    }

    public static String buildLoanEmail(String fullName, LoanRequestDto req) {

        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        margin: 30px auto;
                        width: 90%%;
                        max-width: 600px;
                        border-radius: 10px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    .header {
                        background-color: #0046be;
                        color: white;
                        padding: 15px;
                        border-radius: 10px 10px 0 0;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        color: #333333;
                        line-height: 1.6;
                    }
                    .highlight {
                        font-weight: bold;
                        color: #0046be;
                    }
                    .footer {
                        text-align: center;
                        font-size: 12px;
                        color: #888888;
                        padding-top: 15px;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <div class="header">
                        <h1>Loan Application Received 📝</h1>
                    </div>

                    <div class="content">
                        <p>Hello <strong>%s</strong>,</p>

                        <p>
                            Your loan application for
                            <span class="highlight">%s</span>
                            has been successfully submitted.
                        </p>

                        <p><strong>Loan Amount:</strong> ₹ %s</p>
                        <p><strong>Tenure:</strong> %s months</p>
                        <p><strong>Interest Rate:</strong> %s %%</p>

                        <p>
                            Our team is currently reviewing your request.
                            You will be notified once your loan is processed.
                        </p>

                        <p>
                            Thank you for choosing
                            <strong>EFB – Equinox Finance Bank</strong>.
                        </p>
                    </div>

                    <div class="footer">
                        &copy; 2025 EFB – Equinox Finance Bank. All rights reserved.
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                fullName,
                req.getLoanType(),
                req.getPrincipalAmount(),
                req.getTenureMonths(),
                req.getInterestRate()
        );
    }
}
