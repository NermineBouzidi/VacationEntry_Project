import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const VacationEntry = () => {
  const [transactionNo, setTransactionNo] = useState("");
  const [transactionDate, setTransactionDate] = useState(null);
  const [employee, setEmployee] = useState("");
  const [vacationType, setVacationType] = useState("");
  const [dayRequested, setDayRequested] = useState("");
  const [netVacation, setNetVacation] = useState("");
  const [holidays, setHolidays] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [workDate, setWorkDate] = useState(null);
  const [balanceVacation, setBalanceVacation] = useState("");
  const [emergencyLeave, setEmergencyLeave] = useState("");
  const [note, setNote] = useState("");
  const [calculatedDaysPhrase, setCalculatedDaysPhrase] = useState(""); // New state for the calculated days phrase

  const holiday = [
    dayjs('2024-04-09'), // Example: Eid al-Fitr
    dayjs('2024-09-02'), // Example: Labor Day
  ];

  const isHoliday = (date) => {
    // Check if the date is a Friday, Saturday, or a specific holiday
    const day = date.day();
    return day === 5 || day === 6 || day === 0 || holiday.some(holiday => holiday.isSame(date, 'day'));
  };

  const calculateDays = (numberOfDays, startDate) => {
    let nb = 0;
    let days = 0;
    let currentDate = dayjs(startDate);
    let fixedWorkDate;

    while (nb < numberOfDays) {
      currentDate = currentDate.add(1, 'day');
      if (!isHoliday(currentDate)) {
        days++;
      }
      nb++;
    }

    // Calculate fixed work date by finding the next workday after the vacation
    fixedWorkDate = currentDate;
    while (isHoliday(fixedWorkDate)) {
      fixedWorkDate = fixedWorkDate.add(1, 'day');
    }

    return {
      numberOfDays: days,
      fixedWorkDate,
    };
  };

  const handleCalculate = () => {
    if (fromDate && dayRequested) {
      const { numberOfDays, fixedWorkDate } = calculateDays(Number(dayRequested), fromDate);
      setWorkDate(fixedWorkDate);
      setToDate(fromDate.add(Number(dayRequested), 'day'));
      setCalculatedDaysPhrase(`Days Without Holidays: ${numberOfDays}`);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [fromDate, dayRequested]);

  const handleSubmit = () => {
    handleCalculate();
    console.log({
      transactionNo,
      transactionDate: transactionDate?.format('YYYY-MM-DD') || "",
      employee,
      vacationType,
      dayRequested,
      netVacation,
      holidays,
      fromDate: fromDate?.format('YYYY-MM-DD') || "",
      toDate: toDate?.format('YYYY-MM-DD') || "",
      workDate: workDate?.format('YYYY-MM-DD') || "",
      balanceVacation,
      emergencyLeave,
      note,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vacation Entry
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Transaction No." 
                value={transactionNo}
                onChange={(e) => setTransactionNo(e.target.value)} 
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Transaction Date"
                value={transactionDate}
                onChange={(newValue) => setTransactionDate(newValue)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="10">Employee 1</MenuItem>
                  <MenuItem value="20">Employee 2</MenuItem>
                  <MenuItem value="30">Employee 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vacation Type</InputLabel>
                <Select
                  value={vacationType}
                  onChange={(e) => setVacationType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="10">Type 1</MenuItem>
                  <MenuItem value="20">Type 2</MenuItem>
                  <MenuItem value="30">Type 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Day Requested"
                value={dayRequested}
                onChange={(e) => setDayRequested(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Net Vacation" 
                value={netVacation}
                onChange={(e) => setNetVacation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Holidays" 
                value={holidays}
                onChange={(e) => setHolidays(e.target.value)}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box my={2} display="flex" flexDirection="column" gap={2}>
                  <DatePicker
                    label="From Date"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                  />
                  <DatePicker
                    label="To Date"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                  />
                  <DatePicker
                    label="Work Date"
                    value={workDate}
                    onChange={(newValue) => setWorkDate(newValue)}
                  />
              <Typography variant="body1" color="textSecondary">
                {calculatedDaysPhrase}
              </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    padding: 2,
                    borderRadius: 2,
                  }}
                  my={4}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <TextField
                    fullWidth
                    label="Balance Vacation"
                    defaultValue={0}
                    value={balanceVacation}
                    onChange={(e) => setBalanceVacation(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Emergency leave"
                    defaultValue={0}
                    value={emergencyLeave}
                    onChange={(e) => setEmergencyLeave(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Note" 
                multiline 
                rows={4} 
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default VacationEntry;
