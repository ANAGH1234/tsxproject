// PaymentTable component
import InvoiceDownload from "../../components/InvoiceDownload";
import InvoiceGenerate from "../../components/InvoiceGenerate";
import type { TransactionDTO } from "../../models/dashboard/dashboard";

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  INR: "₹",
};

interface PaymentTableProps {
  payments: TransactionDTO[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#Invoice</th>
            <th>Purchase Details</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.Id || index}>
              <td>{payment.InvoiceNo}</td>
              <td>{payment.CourseName}</td>
              <td>
                {currencySymbols[payment.Currency] || payment.Currency}
                {payment.Total}
              </td>
              <td>{new Date(payment.CreatedDate).toLocaleDateString()}</td>
              <td
                className={
                  payment.IsCancelled === 1 ? "status-cancelled" : "status-success"
                }
              >
                {payment.IsInvoice && (
                  <>
                    {payment.IsCancelled === 1 ? (
                      <span className="cancelled-text" style={{ color: "red" }}>
                        Canceled
                      </span>
                    ) : payment.PathUrl ? (
                      <span className="success-text">
                        Success |{" "}
                        <InvoiceDownload
                          invoiceNo={payment.InvoiceNo}
                          paymentId={payment.Id}
                        />
                      </span>
                    ) : (
                      <span className="success-text">
                        Success | <InvoiceGenerate paymentId={payment.Id} />
                      </span>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PaymentTable };