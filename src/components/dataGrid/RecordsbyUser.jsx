import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import NoData from "../NoData";
import Loader from '../loader';
import TableHeader, { StyledTableCell } from './TableHeader';

const apiUrl = import.meta.env.VITE_API_URL + '/users/records';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const RecordsbyUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formsDetail, setFormsDetail] = useState({ data: [], user: { displayName: "" } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserRecords();
  }, [id]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("surveyApp"),
  };

  const fetchUserRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(apiUrl, { id }, { headers });
      setFormsDetail(response.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const tableCells = [
    { label: 'S.No' },
    { label: 'Respondent Name' },
    { label: 'Mobile No' },
    { label: 'Pincode' },
    { label: 'Marital Status' },
    { label: '' }
  ];

  return (
    <>
      <h6 style={{ fontSize: "20px", fontWeight: "600" }}>{`Surveys By ${formsDetail.user.displayName}`}</h6>
      <TableContainer component={Paper}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : formsDetail.data.length < 1 ? (
          <NoData msg="No Surveys Found" />
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHeader tableCells={tableCells} />
            <TableBody>
              {formsDetail.data.map((row, i) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell scope="row">
                    {row.respondentName}
                  </StyledTableCell>
                  <StyledTableCell>{row.mobileNo}</StyledTableCell>
                  <StyledTableCell>{row.pincode}</StyledTableCell>
                  <StyledTableCell>{row.maritalStatus === 1 ? "Single" : "Married"}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => navigate(`/formdetail/${row._id}`)}>View</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button sx={{ m: 4 }} variant='contained' onClick={() => navigate(-1)}>Back</Button>
      </TableContainer>
    </>
  );
}

export default RecordsbyUser;
