import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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

const apiUrl = import.meta.env.VITE_API_URL + '/users'

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => console.log(row)} >
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
        <TableCell align="right" >{row.email}</TableCell>
        <TableCell align="right">{row.userRole}</TableCell>
        <TableCell align="right">{row.surveyRecords.length}</TableCell>
      </TableRow>
      {row.userRole !== "fielduser" && <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.fieldUsers.length < 1
                  ? "No user"
                  : "Field Users"}
              </Typography>
              {row.fieldUsers.length > 0 && <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Forms Filled</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fieldUsers.map((historyRow) => (
                    <TableRow key={historyRow._id} onClick={() => console.log(historyRow)} >
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                        >
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.displayName}
                      </TableCell>
                      <TableCell align="right">{historyRow.email}</TableCell>
                      <TableCell align="right">{historyRow.userRole}</TableCell>
                      <TableCell align="right">{historyRow.surveyRecords.length}</TableCell>
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
      <Typography variant="h6">User Information</Typography>
      <Typography> User Name: {userDetail.displayName} </Typography>
      <Typography> Email: {userDetail.email} </Typography>
      <Typography> Role: {userDetail.userRole} </Typography>
      <Typography>Forms Filled: 5</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role&nbsp;</TableCell>
              <TableCell align="right">Forms Filled&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.status && users.result.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom component="div"> Total Forms filled {users.totalResults} </Typography>
    </>
  );
}



const UserInfoCard = ({ userName, role, formsFilled }) => {
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">User Information</Typography>
      <Typography>
        User Name: {userName}
      </Typography>
      <Typography>
        Role: {role}
      </Typography>
      <Typography>
        Forms Filled: {formsFilled}
      </Typography>
    </Paper>
  )
}

