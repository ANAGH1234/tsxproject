import React, { useEffect, useState } from "react";
import "/src/assets/css/paymentdetails.css";
import authUser from "../../helpers/authUser";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import { fetchPaymentDetails } from "../../services/PaymentService";
import type { TransactionDTO } from "../../models/dashboard/dashboard";
import { PaymentTable } from "./PaymentTable";


const PaymentDetails: React.FC = () => {
  const [payments, setPayments] = useState<TransactionDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paymentsPerPage: number = 20;

  const user = authUser.Get();
  const userEmail: string = user?.email || "";

  useEffect(() => {
    if (!userEmail) {
      console.error("User email not available");
      setLoading(false);
      return;
    }

    fetchPaymentDetails(userEmail)
      .then((data: TransactionDTO[]) => {console.log(data);setPayments(data)})
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  console.log(payments);
  

  if (loading) return <LoadingSpinner />;
  if (!Array.isArray(payments)) return <p className="error-text">Error: Invalid data format</p>;

  const totalPages: number = Math.ceil(payments.length / paymentsPerPage);
  const currentPayments: TransactionDTO[] = payments.slice(
    (currentPage - 1) * paymentsPerPage,
    currentPage * paymentsPerPage
  );

  return (
    <div className="ps-2 mt-5 mb-3">
      <div className="block-header">
        <h2>Payment History</h2>
      </div>
      {payments.length === 0 ? (
        <p className="no-data">No Payments Found</p>
      ) : (
        <>
          <PaymentTable payments={currentPayments} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
