import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { verifyUser } from '../../utils/functions/verifyUser';
import { grey } from '@mui/material/colors'
import { useNavigate } from "react-router-dom"
const subText = grey[600];

const apiUrl = import.meta.env.VITE_API_URL + '/users'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,"#1565c0"
    backgroundColor: "#1565c0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >{parseInt(index) + 1}</TableCell>
        <TableCell >{row.displayName}</TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell>{row.userRole === 'user' ? 'Admin' : row.userRole}</TableCell>
        <TableCell  >
          <Button color="primary" onClick={() => navigate(`/allRecords/${row._id}`)} >View</Button >
        </TableCell>
      </TableRow>
      {row.userRole !== "fielduser" &&
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {row.fieldUsers.length < 1
                    ? "No user"
                    : ""}
                </Typography>
                {row.fieldUsers.length > 0 && <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.fieldUsers.map((historyRow, i) => (
                      <TableRow key={historyRow._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell style={{ visibility: 'hidden' }} >
                          <IconButton
                            aria-label="expand row"
                            size="small"
                          >
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ color: subText }} align='left'>
                          {parseInt(i) + 1}
                        </TableCell>
                        <TableCell sx={{ color: subText }} align='center' >
                          {historyRow.displayName}
                        </TableCell>
                        <TableCell sx={{ color: subText }} align='center' >{historyRow.email}</TableCell>
                        <TableCell sx={{ color: subText }} align='center'>{historyRow.userRole}</TableCell>
                        <TableCell sx={{ color: subText }} align='center'>
                          <Button color="primary" onClick={() => navigate(`/allRecords/${historyRow._id}`)} >View</Button >
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        userRole: PropTypes.string.isRequired,
      }),
    ),
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
  }).isRequired,
};

// const rows = [];


export default function CollapsibleTable() {
  const navigate = useNavigate()
  const [users, setUsers] = useState({
    status: false,
    result: [],
    totalResults: 0
  })
  const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    const user = verifyUser()
    setUserDetail(user)
  }, [])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("surveyApp"),
  };
  const getUsers = async () => {
    const response = await axios.get(apiUrl, { headers })
    console.log(response.data);
    setUsers(response.data)
  }
  console.log("userDetail ", userDetail);
  return (
    <>
      <div className='d-flex justify-content-between m-3'>
        <div className='col-10 pull-left'>
          <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Users</h6>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={() => navigate('/createuser')} > Create User </Button >
        </div >
      </div>


      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.status && users.result.map((row, index) => (
              <Row key={row._id} row={row} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}



