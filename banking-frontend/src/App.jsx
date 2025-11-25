import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AccountsPage from "./pages/dashboard/AccountsPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import LoansPage from "./pages/dashboard/LoansPage";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SendMoney from "./pages/money/SendMoney";
import AddMoney from "./pages/money/AddMoney";
import Withdraw from "./pages/money/WithDraw";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function App() {
  return (
    // <BrowserRouter>
    <>
        <Navbar/>
      <Routes>
      
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/accounts"
          element={
            <ProtectedRoute>
              <AccountsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/loans"
          element={
            <ProtectedRoute>
              <LoansPage />
            </ProtectedRoute>
          }
        />
<Route
  path="/dashboard/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        <Route path="/send-money" element={<SendMoney />} />
<Route path="/add-money" element={<AddMoney />} />
<Route path="/withdraw" element={<Withdraw />} />

      </Routes>

<Footer />
    // {/* // </BrowserRouter> */}
</>
  );
}
