import { Transaction } from "../types/Transaction";

const API_URL = "https://localhost:7294/api/Transaction/GetAllTransactions";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch transactions");
    const data: Transaction[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
