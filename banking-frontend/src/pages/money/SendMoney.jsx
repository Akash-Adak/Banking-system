import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  ArrowRight, 
  Building2, 
  User, 
  IndianRupee, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  History,
  TrendingUp,
  CreditCard,
  FileText,
  ChevronLeft,
  Lock,
  Loader2,
  Share2,
  Download
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// 2. Mock API
const api_transaction = {
  post: (url, data) => new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
        if (Math.random() > 0.1) resolve({ status: 200, data: { txnId: "TXN" + Date.now() } });
        else reject(new Error("Network Error"));
    }, 2000);
  })
};
const balance=localStorage.getItem("accountBalance");
// --- END MOCK DEFINITIONS ---

// Helper for formatting currency input
const formatInputCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN").format(value);
};

export default function SendMoney() {
  // STEPS: 0=Details, 1=Review, 2=PIN, 3=Processing, 4=Success, 5=Fail
  const [step, setStep] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState("");
  
  // Form State
  const username=localStorage.getItem("username");
  const accountNumber = localStorage.getItem(`accountNumber-${username}`) ;
  const [form, setForm] = useState({
    recipientName: "",
    toAccount: "",
    confirmToAccount: "",
    ifsc: "",
    amount: "",
    remarks: "",
    type: "TRANSFER",
    fromAccount: accountNumber,
  });

  const [errors, setErrors] = useState({});
  const [bankDetails, setBankDetails] = useState(null);
  const [pin, setPin] = useState(["", "", "", ""]);

  // Auto-detect Bank from IFSC Mock
  useEffect(() => {
    if (form.ifsc.length === 11) {
       const code = form.ifsc.toUpperCase().slice(0, 4);
       const banks = {
           "HDFC": "HDFC Bank",
           "SBIN": "State Bank of India",
           "ICIC": "ICICI Bank",
           "BARB": "Bank of Baroda",
           "UTIB": "Axis Bank"
       };
       setBankDetails(banks[code] || "Unknown Bank");
    } else {
        setBankDetails(null);
    }
  }, [form.ifsc]);

  // Validation Logic
  const validateStep1 = () => {
    const newErrors = {};
    if (!form.recipientName) newErrors.recipientName = "Recipient name is required";
    if (!/^\d{9,18}$/.test(form.toAccount)) newErrors.toAccount = "Invalid Account Number (9-18 digits)";
    if (form.toAccount !== form.confirmToAccount) newErrors.confirmToAccount = "Account numbers do not match";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.toUpperCase())) newErrors.ifsc = "Invalid IFSC Code format";
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = "Enter a valid amount";
    if (Number(form.amount) > 1000000) newErrors.amount = "Limit exceeded (Max ₹10L)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 const navigate = useNavigate();
  const handleProceedToReview = () => {
    if (validateStep1()) setStep(1);
  };

  const handlePinChange = (index, value) => {
    if (isNaN(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    // Auto focus next input
    if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleTransfer = async () => {
     if (pin.join("").length !== 4) return alert("Please enter 4-digit PIN");
     
     setStep(3); // Processing
     
     const sequence = [
         "Authenticating Secure PIN...",
         "Connecting to Bank Server...",
         `Verifying Receiver: ${form.recipientName}...`,
         "Initiating Fund Transfer..."
     ];

     for (let i = 0; i < sequence.length; i++) {
         setLoadingMsg(sequence[i]);
         await new Promise(r => setTimeout(r, 800)); // Simulate delay per step
     }

     try {
         await api_transaction.post("/api/transactions", {
             ...form, 
             amount: Number(form.amount),
             ifsc: form.ifsc.toUpperCase()
         });
         setStep(4); // Success
     } catch (err) {
         setStep(5); // Fail
     }
  };

  // --- RENDER HELPERS ---

  const InputGroup = ({ label, error, children, subLabel }) => (
    <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
            {label}
            {subLabel && <span className="text-gray-400 font-normal text-xs">{subLabel}</span>}
        </label>
        {children}
        {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10}/> {error}</p>}
    </div>
  );

  // 1. INPUT FORM
  if (step === 0) return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6 text-gray-500 hover:text-blue-700 cursor-pointer transition">
             <ChevronLeft size={20}/>  <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <IndianRupee className="bg-white/20 p-1 rounded-lg" size={32}/> Send Money
                </h1>
                <p className="text-blue-100 text-sm mt-1 ml-1">Secure Instant Bank Transfer (IMPS/NEFT)</p>
            </div>

            <div className="p-8">
                {/* From Account Badge */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Debiting From</p>
                        <p className="text-blue-900 font-bold font-mono text-lg mt-1">XXXX XXXX {accountNumber.slice(-4)}</p>
                        <p className="text-xs text-blue-600">Savings Account • EBT Bank</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Available Balance</p>
                        <p className="text-green-700 font-bold text-lg">₹ {balance}</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-x-6">
                    <div className="md:col-span-2">
                        <InputGroup label="Recipient Name" error={errors.recipientName}>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                    placeholder="Enter receiver's full name"
                                    value={form.recipientName}
                                    onChange={e => setForm({...form, recipientName: e.target.value})}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <InputGroup label="Account Number" error={errors.toAccount}>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                maxLength={18}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-mono"
                                placeholder="Receiver's Account No."
                                value={form.toAccount}
                                onChange={e => setForm({...form, toAccount: e.target.value.replace(/\D/g,'')})}
                            />
                        </div>
                    </InputGroup>

                    <InputGroup label="Re-enter Account No." error={errors.confirmToAccount}>
                         <div className="relative">
                            <Building2 className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="password" 
                                maxLength={18}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-mono placeholder:tracking-widest"
                                placeholder="••••••••••••"
                                value={form.confirmToAccount}
                                onChange={e => setForm({...form, confirmToAccount: e.target.value.replace(/\D/g,'')})}
                            />
                        </div>
                    </InputGroup>

                    <div className="md:col-span-2">
                        <InputGroup label="IFSC Code" error={errors.ifsc} subLabel={bankDetails && <span className="text-green-600 font-bold">{bankDetails}</span>}>
                            <div className="relative">
                                <div className="absolute left-3 top-3.5 text-gray-400 font-bold text-xs border border-gray-300 rounded px-1">IFSC</div>
                                <input 
                                    type="text" 
                                    maxLength={11}
                                    className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-mono uppercase"
                                    placeholder="e.g. SBIN0001234"
                                    value={form.ifsc}
                                    onChange={e => setForm({...form, ifsc: e.target.value.toUpperCase()})}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div className="md:col-span-2 pt-4 border-t border-dashed border-gray-200">
                        <InputGroup label="Amount" error={errors.amount}>
                            <div className="relative">
                                <span className="absolute left-4 top-2 text-gray-400 text-2xl font-bold">₹</span>
                                <input 
                                    type="number" 
                                    className="w-full pl-10 pr-4 py-2 text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 outline-none transition-colors placeholder:text-gray-300"
                                    placeholder="0.00"
                                    value={form.amount}
                                    onChange={e => setForm({...form, amount: e.target.value})}
                                />
                            </div>
                        </InputGroup>
                    </div>
                    
                    <div className="md:col-span-2">
                        <InputGroup label="Remarks (Optional)">
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                placeholder="What is this for?"
                                value={form.remarks}
                                onChange={e => setForm({...form, remarks: e.target.value})}
                            />
                        </InputGroup>
                    </div>
                </div>

                <button 
                    onClick={handleProceedToReview}
                    className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                >
                    Proceed to Review <ArrowRight size={20}/>
                </button>
            </div>
            
            <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-200 flex justify-center items-center gap-2">
                <Lock size={12}/> Your transaction is secured with 256-bit SSL encryption
            </div>
        </div>
      </div>
  );

  // 2. REVIEW SCREEN
  if (step === 1) return (
      <DashboardLayout>
          <div className="max-w-md mx-auto mt-10">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                  <div className="bg-blue-900 p-6 text-white text-center pb-12">
                      <h2 className="text-lg font-medium opacity-80">Review Transfer</h2>
                      <h1 className="text-4xl font-bold mt-2">₹ {formatInputCurrency(form.amount)}</h1>
                  </div>
                  
                  <div className="bg-white rounded-t-3xl -mt-6 p-8 relative z-10">
                      <div className="flex flex-col gap-6">
                          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                              <span className="text-gray-500 text-sm">To</span>
                              <div className="text-right">
                                  <p className="font-bold text-gray-800 text-lg">{form.recipientName}</p>
                                  <p className="text-sm text-gray-500">A/c: {form.toAccount}</p>
                                  <p className="text-xs text-blue-600 font-bold">{bankDetails || form.ifsc}</p>
                              </div>
                          </div>
                          
                          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                              <span className="text-gray-500 text-sm">From</span>
                              <div className="text-right">
                                  <p className="font-bold text-gray-800">My Savings Account</p>
                                  <p className="text-sm text-gray-500">XXXX {accountNumber.slice(-4)}</p>
                              </div>
                          </div>

                          <div className="flex justify-between items-center">
                              <span className="text-gray-500 text-sm">Remarks</span>
                              <span className="text-gray-800 font-medium">{form.remarks || "Fund Transfer"}</span>
                          </div>
                      </div>

                      <div className="mt-8 flex gap-4">
                          <button 
                            onClick={() => setStep(0)}
                            className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition"
                          >
                              Edit
                          </button>
                          <button 
                            onClick={() => setStep(2)}
                            className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition"
                          >
                              Pay Securely
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </DashboardLayout>
  );

  // 3. PIN SCREEN
  if (step === 2) return (
      <DashboardLayout>
           <div className="max-w-md mx-auto mt-16 text-center">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="mb-6 inline-flex p-4 bg-blue-50 rounded-full text-blue-700">
                      <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Secure PIN</h2>
                  <p className="text-gray-500 text-sm mb-8">Please enter your 4-digit transaction PIN to authorize the transfer of <b>₹{formatInputCurrency(form.amount)}</b></p>
                  
                  <div className="flex justify-center gap-4 mb-8">
                      {[0,1,2,3].map(i => (
                          <input 
                            key={i}
                            id={`pin-${i}`}
                            type="password"
                            maxLength={1}
                            className="w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            value={pin[i]}
                            onChange={(e) => handlePinChange(i, e.target.value)}
                          />
                      ))}
                  </div>

                  <button 
                     onClick={handleTransfer}
                     className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                  >
                      Authorize Payment <ArrowRight size={18}/>
                  </button>
              </div>
           </div>
      </DashboardLayout>
  );

  // 4. LOADING SCREEN
  if (step === 3) return (
      <DashboardLayout>
          <div className="flex h-[80vh] flex-col items-center justify-center text-center">
               <div className="relative">
                   <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                       <ShieldCheck className="text-blue-600" size={32}/>
                   </div>
               </div>
               <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">Processing Payment</h2>
               <p className="text-gray-500 animate-pulse">{loadingMsg}</p>
               <p className="text-xs text-gray-400 mt-8">Do not close this window or press back</p>
          </div>
      </DashboardLayout>
  );

  // 5. SUCCESS SCREEN
  if (step === 4) return (
      <DashboardLayout>
          <div className="max-w-md mx-auto mt-8">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="bg-green-600 p-8 text-center text-white relative overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
                      <div className="relative z-10">
                          <div className="w-16 h-16 bg-white text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <CheckCircle2 size={36} strokeWidth={3}/>
                          </div>
                          <h1 className="text-2xl font-bold">Payment Successful!</h1>
                          <p className="opacity-90 mt-1 text-sm">Transaction completed on {new Date().toLocaleDateString()}</p>
                          <h2 className="text-4xl font-bold mt-6">₹ {formatInputCurrency(form.amount)}</h2>
                      </div>
                  </div>
                  
                  <div className="p-8">
                      <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 mb-6">
                          <div className="grid grid-cols-2 gap-y-4 text-sm">
                              <div className="text-gray-500">Transaction ID</div>
                              <div className="text-right font-mono font-bold text-gray-800">TXN{Date.now().toString().slice(-8)}</div>
                              
                              <div className="text-gray-500">Paid to</div>
                              <div className="text-right font-bold text-gray-800">{form.recipientName}</div>
                              
                              <div className="text-gray-500">Bank Ref No.</div>
                              <div className="text-right font-mono text-gray-800">SBI{Math.floor(Math.random()*10000000)}</div>
                              
                              <div className="text-gray-500">Payment Mode</div>
                              <div className="text-right font-bold text-gray-800">IMPS</div>
                          </div>
                      </div>

                      <div className="flex gap-4">
                          <button className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2">
                             <Share2 size={18}/> Share
                          </button>
                          <button 
                             onClick={() => {
                                 setStep(0);
                                 setForm({...form, amount: "", remarks: ""});
                                 setPin(["","","",""]);
                             }}
                             className="flex-1 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 flex items-center justify-center gap-2"
                          >
                             Done
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </DashboardLayout>
  );

  return null;
}