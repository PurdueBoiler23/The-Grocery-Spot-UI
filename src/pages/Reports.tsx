import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchReports } from "../api/transactions";

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [periodType, setPeriodType] = useState<string>("Year");

  useEffect(() => {
    const getReports = async () => {
        const data = await fetchReports();
        setReports(data);
    };
    getReports();
  }, []);

  useEffect(() => {
    let filteredData = reports.filter(report => report.periodType === periodType);

    setFilteredReports(filteredData);
  }, [periodType, reports]);

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter Reports
        </Typography>
        {/* Period Type Dropdown */}
        <FormControl sx={{ mb: 2, width: 150 }}>
          <InputLabel>Period Type</InputLabel>
          <Select value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
            <MenuItem value="Year">Year</MenuItem>
            <MenuItem value="Quarter">Quarter</MenuItem>
            <MenuItem value="Month">Month</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Net Profit Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredReports} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="periodName" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="netProfit" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Average Transaction Value Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredReports} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="periodName" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="averageTransactionValue" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    
  );
};

export default Reports;
