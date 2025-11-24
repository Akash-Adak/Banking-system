import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    setLoans([
      {
        id: "LN001",
        type: "HOME_LOAN",
        principal: 1500000,
        emi: 16500,
        tenureMonths: 120,
        remainingMonths: 100,
        status: "ACTIVE",
      },
      {
        id: "LN002",
        type: "PERSONAL_LOAN",
        principal: 200000,
        emi: 5500,
        tenureMonths: 36,
        remainingMonths: 12,
        status: "ACTIVE",
      },
    ]);
  }, []);

  const columns = [
    { header: "Loan ID", accessor: "id" },
    { header: "Type", accessor: "type" },
    {
      header: "Principal",
      accessor: "principal",
      render: (val) => `₹ ${val.toLocaleString("en-IN")}`,
    },
    {
      header: "EMI",
      accessor: "emi",
      render: (val) => `₹ ${val.toLocaleString("en-IN")}`,
    },
    {
      header: "Tenure",
      accessor: "tenureMonths",
      render: (val) => `${val} months`,
    },
    {
      header: "Remaining",
      accessor: "remainingMonths",
      render: (val) => `${val} months`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Loans</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Apply for Loan
        </button>
      </div>

      <Table columns={columns} data={loans} />
    </DashboardLayout>
  );
}
