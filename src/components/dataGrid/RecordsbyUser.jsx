import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import NoData from "../NoData"
const apiUrl = import.meta.env.VITE_API_URL + '/users/records'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1565c0",
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function RecordsbyUser() {
  let { id } = useParams();
  const navigate = useNavigate()
  const [formsDetail, setFormsDetail] = useState({ data: [], user: { displayName: "" } })
  // console.log(formsDetail);

  useEffect(() => {
    getUsers()
  }, [])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("surveyApp"),
  };
  const getUsers = async () => {
    const response = await axios.post(apiUrl, { id }, { headers })
    console.log(response.data);
    setFormsDetail(response.data)
  }
  return (
    <>
      <h6 style={{ fontSize: "20px", fontWeight: "600" }} >{`Surveys By ${formsDetail.user.displayName}`}</h6>
      <TableContainer component={Paper}>
        {
          formsDetail.data.length < 1 ?
            <NoData msg="No Surveys Found"/> :
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Respondent Name</StyledTableCell>
                  <StyledTableCell align="right">Mobile No</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Pincode</StyledTableCell>
                  <StyledTableCell align="right">Marital Status</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formsDetail.data.map((row, i) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {parseInt(i) + 1}
                    </StyledTableCell>
                    <StyledTableCell scope="row">
                      {row.respondentName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.mobileNo}</StyledTableCell>
                    <StyledTableCell align="right">{row.address.slice(0, 7) + '...'}</StyledTableCell>
                    <StyledTableCell align="right">{row.pincode}</StyledTableCell>
                    <StyledTableCell align="right">{row.maritalStatus === 1 ? "Single" : "Married"}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => navigate(`/formdetail/${row._id}`)} >View</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        }
        <Button sx={{ m: 4 }} variant='contained' onClick={() => navigate(-1)}>Back</Button>
      </TableContainer>
    </>
  );
}

