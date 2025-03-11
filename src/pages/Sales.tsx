import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../api/transactions";
import { Transaction } from "../types/Transaction";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const Sales: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  // Convert transaction data to DataGrid row format
  const rows: GridRowsProp = transactions.map((transaction) => ({
    id: transaction.transactionId,  // unique `id` for each row
    transactionId: transaction.transactionId,
    dateOfTransaction: new Date(transaction.dateOfTransaction).toLocaleDateString(),
    customerId: transaction.customerId,
    transactionAmount: transaction.transactionAmount
  }));

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'transactionId', headerName: 'Transaction ID', flex: 1 },
    { field: 'dateOfTransaction', headerName: 'Date', flex: 1 },
    { field: 'customerId', headerName: 'Customer ID', flex: 1 },
    { 
      field: 'transactionAmount', 
      headerName: 'Transaction Amount',
      type: 'number',
      flex: 1,
      align: 'left',
      headerAlign: 'left'
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div style={{ width: "100%" }}>
        <h2 style={{padding: 20}}>Sales Data</h2>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0, width: '100%' }}
        />
    </div>


  );
};

export default Sales;
