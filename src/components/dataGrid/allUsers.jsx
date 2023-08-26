import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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

function Row(props) {
  const { row } = props;
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
        <TableCell scope="row">{row.displayName}</TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell>{row.userRole==='user'?'Admin':row.userRole}</TableCell>
        <TableCell>
          <Button color="primary" onClick={() =>navigate(`/allRecords/${row._id}`)} >View</Button >
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
                    {row.fieldUsers.map((historyRow) => (
                      <TableRow key={historyRow._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell style={{visibility:'hidden'}} >
                          <IconButton
                            aria-label="expand row"
                            size="small"
                          >
                            <KeyboardArrowUpIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ color: subText }}  scope="row">
                          {historyRow.displayName}
                        </TableCell>
                        <TableCell sx={{ color: subText }}>{historyRow.email}</TableCell>
                        <TableCell sx={{ color: subText }}>{historyRow.userRole}</TableCell>
                        <TableCell sx={{ color: subText }}>
                          <Button color="primary" onClick={() =>navigate(`/allRecords/${historyRow._id}`)} >View</Button >
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
      <div className='d-flex flex-row-reverse bd-highlight mb-2'>
        <Button variant="contained" color="primary" onClick={() => navigate('/createuser')} > Create User </Button >
      </div >

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {users.status && users.result.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}



