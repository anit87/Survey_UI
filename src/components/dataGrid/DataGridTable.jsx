import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, MenuItem, Stack, FormControl, Typography, ListItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import axios from 'axios';
import dayjs from 'dayjs';
import { useDrawerData } from '../../utils/DrawerDataContext';
import { capitalizeFirstLetter, verifyUser } from '../../utils/functions/verifyUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import Loader from '../loader';
import { incomeOptions, maritalOptions, trueFalseOptions, educationalOptions, religionOptions, occupationOptios } from "../../utils/constants"
import NoData from '../NoData';
const apiUrl = import.meta.env.VITE_API_URL + '/users/allrecords'


const formatDate = (dateString) => {
    const parsedDate = moment(dateString);
    const formattedDate = parsedDate.format("DD-MM-YYYY HH:mm");
    return formattedDate
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1565c0",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



export default function SurveyForms() {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState({
        status: false,
        data: []
    })
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = React.useState(null);

    // const { filterData } = useDrawerData();
    const [filterData, setFilterData] = useState({
        birthdayDate: '',
        maritalStatus: '',
        monthlyHouseholdIncome: '',
        isOwnProperty: '',
        occupationStatus: '',
        religion: '',
        cweEducation: '',
        startDate: '2023-08-01',
        endDate: new Date().toISOString().slice(0, 10)
    });
    console.log("filters ", filterData);

    const [userDetail, setUserDetail] = useState({})
    const token = useSelector(state => state.auth.token)

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate':
            case 'minDate': {
                return 'Please select a date in the first quarter of 2022';
            }

            case 'invalidDate': {
                return 'Your date is not valid';
            }

            default: {
                return '';
            }
        }
    }, [error]);
    useEffect(() => {
        const user = verifyUser(token)
        setUserDetail(user)
    }, [])

    // console.log("userDetail dash ", rows);

    useEffect(() => {
        getData()
    }, [filterData])

    const getData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("surveyApp"),
            };
            setisLoading(true)
            const url = `${apiUrl}?isOwnProperty=${filterData.isOwnProperty.toString() || ""}&maritalStatus=${filterData.maritalStatus || ""}&monthlyHouseholdIncome=${filterData.monthlyHouseholdIncome || ""}&occupationStatus=${filterData.occupationStatus}&religion=${filterData.religion}&cweEducation=${filterData.cweEducation}`

            const response = await axios.get(url, { headers })
            setRows(response.data)

            setisLoading(false)
        } catch (error) {
            console.log("Error in Dashboard ", error);
        }
    }



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const changeHandler = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        })
    }
    // console.log("dat ", dayjs('2023-08-10'));
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TableContainer component={Paper}>
                <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >All Survey's</h6>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
                >
                    {/* <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Filter By Age</Typography>
                        </Stack>
                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="birthdayDate"
                            label={""}
                            value={filterData.birthdayDate}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                ageOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl> */}
                    <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Filter By Marital Status</Typography>
                        </Stack>

                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="maritalStatus"
                            label={""}
                            value={filterData.maritalStatus}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                maritalOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Filter By Income</Typography>
                        </Stack>

                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="monthlyHouseholdIncome"
                            label={""}
                            value={filterData.monthlyHouseholdIncome}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                incomeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Own Property</Typography>
                        </Stack>

                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="isOwnProperty"
                            label={""}
                            value={filterData.isOwnProperty}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                trueFalseOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>


                    {/* <FormControl fullWidth>
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Filled From</Typography>
                        </Stack>

                        <TextField
                            margin="none"
                            size="small"
                            id="startDate"
                            name="startDate"
                            label={""}
                            type="date"
                            value={filterData.startDate}
                            onChange={(e) => changeHandler(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Typography variant="h6"
                            style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom
                        >Upto</Typography>
                        <DatePicker
                            defaultValue={dayjs()}
                            name="endDate"
                            // onError={(newError) => setError(newError)}
                            onChange={(value) => setFilterData({ ...filterData, endDate: value.format('YYYY-MM-DD') })}
                            slotProps={{
                                textField: {
                                    helperText: errorMessage,
                                    size: "small"
                                },
                            }}
                            minDate={dayjs(filterData.startDate)}
                            maxDate={dayjs()}
                        />
                    </FormControl> */}
                </Stack>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
                >
                    <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Occupation Status</Typography>
                        </Stack>

                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="occupationStatus"
                            label={""}
                            value={filterData.occupationStatus}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                occupationOptios.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Religion</Typography>
                        </Stack>

                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="religion"
                            label={""}
                            value={filterData.religion}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                religionOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth >
                        <Stack direction="row">
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>Education Of Chief Wage Earner</Typography>
                        </Stack>

                        <TextField id="select"
                            margin="none"
                            size="small"
                            fullWidth
                            name="cweEducation"
                            label={""}
                            value={filterData.cweEducation}
                            onChange={(e) => changeHandler(e)}
                            select
                        >
                            {
                                educationalOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Stack>


                {
                    <>

                        {isLoading ? <Loader /> :
                            rows.data.length < 1 ? <NoData msg="No Surveys Found" />
                                : rows.status && <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>S.No</StyledTableCell>
                                            <StyledTableCell>Respondent Name</StyledTableCell>
                                            <StyledTableCell align="center">Mobile No</StyledTableCell>
                                            <StyledTableCell align="center">Pincode</StyledTableCell>
                                            <StyledTableCell align="center">Marital Status</StyledTableCell>
                                            {(userDetail.userRole != '3' && userDetail.userRole != '2') &&
                                                <StyledTableCell align="center">Field Agent</StyledTableCell>}
                                            <StyledTableCell align="center">Created Date</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? rows.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : rows.data
                                        ).map((row, i) => (
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">
                                                    {parseInt(i) + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.respondentName}
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="center">
                                                    {row.mobileNo}
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="center">
                                                    {row.pincode}
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="center">
                                                    {row.maritalStatus === 1 ? "Single" : "Married"}
                                                </TableCell>
                                                {(userDetail.userRole != '3' && userDetail.userRole != '2') &&
                                                    <TableCell style={{ width: 160 }} align="center">
                                                        {capitalizeFirstLetter(row.userInfo.displayName || "admin")}
                                                    </TableCell>}
                                                <TableCell align="center">
                                                    {formatDate(row.date)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button onClick={() => navigate(`/formdetail/${row._id}`)} >View</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    {(rows.status && rows.data.length > 10) && <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={rows.data.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>}
                                </Table>}
                    </>}
            </TableContainer>
        </LocalizationProvider>
    );
}



// const url = `${apiUrl}?birthdayDate=${filterData.birthdayDate || ""}&maritalStatus=${filterData.maritalStatus || ""}&monthlyHouseholdIncome=${filterData.monthlyHouseholdIncome || ""}&startDate=${filterData.startDate}&endDate=${filterData.endDate}`