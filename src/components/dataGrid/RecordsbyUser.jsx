import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const apiUrl = import.meta.env.VITE_API_URL + '/users/records'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const rows = [{
  name: "aa",
  fat: "aa"
},
{
  name: "bb",
  fat: "bb"
}];

export default function RecordsbyUser() {
  let { id } = useParams();
  const navigate = useNavigate()
  const [formsDetail, setFormsDetail] = useState([])

  useEffect(() => {
    getUsers()
  }, [])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("surveyApp"),
  };
  const getUsers = async () => {
    const response = await axios.post(apiUrl,{id}, { headers })
    console.log(response.data);
    setFormsDetail(response.data.data)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Respondent Name</StyledTableCell>
            <StyledTableCell align="right">Mobile No</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Pincode(g)</StyledTableCell>
            <StyledTableCell align="right">Marital Status</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formsDetail.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.respondentName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.mobileNo}</StyledTableCell>
              <StyledTableCell align="right">{ row.address.slice(0, 7)+'...'}</StyledTableCell>
              <StyledTableCell align="right">{row.pincode}</StyledTableCell>
              <StyledTableCell align="right">{row.maritalStatus===1?"Single":"Married"}</StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={()=>navigate(`/formdetail/${row._id}`)} >View</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}