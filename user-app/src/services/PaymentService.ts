import apiClient from "../helpers/apiClient";
import type { TransactionDTO, GenerateInvoiceResponse, Paging } from "../models/dashboard/dashboard";

type PaymentDetailsResponse = Paging<TransactionDTO>;

export const fetchPaymentDetails = async (email: string): Promise<TransactionDTO[]> => {
    try {
        const response = await apiClient.get<PaymentDetailsResponse>(
            `/User/PaymentDetails?page=1&filterId=1&textsrch=${encodeURIComponent(email)}&CourseId=0`
        );
        return response.data.Data || [];
    } catch (error) {
        console.error("Error fetching payments:", error);
        return [];
    }
};

export const downloadInvoice = async (invoiceNo: string, paymentId: number): Promise<void> => {
    try {
        const response = await apiClient.get(`/Dashboard/DownloadInvoice/DownloadInvoice/${paymentId}`, {
            responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Invoice_${invoiceNo}.pdf`;
        link.click();
    } catch (error) {
        console.error("Error downloading invoice:", error);
    }
};

export const generateInvoice = async (paymentId: number): Promise<void> => {
    try {
        const response = await apiClient.get<GenerateInvoiceResponse>(`/Dashboard/GenerateInvoice/GenerateInvoice/${paymentId}`);
        if (response.data.Success) {
            window.location.reload();
        }
    } catch (error) {
        console.error("Error generating invoice:", error);
    }
};