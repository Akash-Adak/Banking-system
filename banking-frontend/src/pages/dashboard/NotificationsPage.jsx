import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "TRANSACTION",
        title: "₹2,500 debited from ACC123",
        message: "UPI payment to ABC Store",
        createdAt: new Date().toISOString(),
        read: false,
      },
      {
        id: 2,
        type: "ALERT",
        title: "Low balance alert",
        message: "Your savings account ACC123 balance is below ₹5,000",
        createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        read: true,
      },
    ]);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell /> Notifications
        </h1>
        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 && (
          <p className="text-gray-500">No notifications.</p>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border ${
              n.read ? "bg-white" : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-600">{n.message}</p>
              </div>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(n.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
