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
import { verifyUser, capitalizeFirstLetter } from '../../utils/functions/verifyUser';
import { grey } from '@mui/material/colors'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader';
import NoData from '../NoData';
import { userToUpdate } from '../../features/auth/authSlice';
import { fetchUsersData } from '../../features/auth/usersSlice';
import TableHeader from './TableHeader';

const tableCells = [{ label: '' }, { label: 'S.No' }, { label: 'Name' }, { label: 'Phone' }, { label: 'Email' }, { label: 'Role' }, { label: '' }]

const subText = grey[600];

const apiUrl = import.meta.env.VITE_API_URL + '/users'

function Row(props) {
  const { row, index, userDetail } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          {
            userDetail.userRole !== "2" &&
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        </TableCell>
        <TableCell >{parseInt(index) + 1}</TableCell>
        <TableCell >{capitalizeFirstLetter(row.displayName)}</TableCell>
        <TableCell >{row.phoneNumber || "- - -"}</TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell>{row.userRole === '2' ? 'Supervisor' : '3' ? 'Field Agent' : ""}</TableCell>
        <TableCell  >
          <Button color="primary" onClick={() => navigate(`/allRecords/${row._id}`)} >View</Button >
          <Button color="primary" onClick={() => (dispatch(userToUpdate(row)), navigate(`/createuser/${row._id}`))} >Edit</Button >
        </TableCell>
      </TableRow>
      {row.userRole !== "fielduser" &&
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {row.fieldUsers.length < 1
                    ? "No Field Agent"
                    : ""}
                </Typography>
                {row.fieldUsers.length > 0 && <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.fieldUsers.map((historyRow, i) => (
                      <TableRow key={historyRow._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                        {/* <TableRow key={historyRow._id} > */}
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
                          {capitalizeFirstLetter(historyRow.displayName)}
                        </TableCell>
                        <TableCell sx={{ color: subText }} align='center' >{historyRow.phoneNumber || "- - -"}</TableCell>
                        <TableCell sx={{ color: subText }} align='center' >{historyRow.email}</TableCell>
                        <TableCell sx={{ color: subText }} align='right'>{historyRow.userRole === '2' ? 'Supervisor' : '3' ? 'Field Agent' : "a"}</TableCell>
                        <TableCell sx={{ color: subText }} align='center'>
                          <Button sx={{ pr: 3 }} color="primary" onClick={() => navigate(`/allRecords/${historyRow._id}`)} >View</Button >
                          <Button sx={{ pr: 3 }} color="primary" onClick={() => (dispatch(userToUpdate(historyRow)), navigate(`/createuser/${historyRow._id}`))} >Edit</Button >
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </React.Fragment>
  );
}


export default function CollapsibleTable() {
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  const [users, setUsers] = useState({
    status: false,
    result: []
  })
  const [userDetail, setUserDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    const user = verifyUser(token)
    setUserDetail(user)
  }, [])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("surveyApp"),
  };
  const getUsers = async () => {
    setIsLoading(true)
    console.time('myCode');
    const response = await axios.get(apiUrl, { headers })
    console.timeEnd('myCode');
    setUsers(response.data)
    setIsLoading(false)
  }
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


      {isLoading ? <Loader /> :
        <TableContainer component={Paper}>

          {
            users.result.length < 1 ?
              <NoData msg="No User Found" /> :
              <Table aria-label="collapsible table">
                <TableHeader tableCells={tableCells} />
                <TableBody>
                  {users.status && users.result.map((row, index) => (
                    <Row key={row._id} row={row} index={index} userDetail={userDetail} />
                  ))}
                </TableBody>
              </Table>
          }
        </TableContainer>
      }
      <br />
    </>
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
