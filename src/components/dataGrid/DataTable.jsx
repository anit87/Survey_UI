import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams, useNavigate } from 'react-router-dom';
import SmallImageCard from '../SmallImageCard';
const apiUrl = import.meta.env.VITE_API_URL

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



export default function DataTable({ formsDetail }) {
    let { id } = useParams();
    const navigate = useNavigate()
    // const [formsDetail, setFormsDetail] = useState([])
    // console.log(formsDetail);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Age</StyledTableCell>
                        <StyledTableCell align="right">Gender</StyledTableCell>
                        <StyledTableCell align="right">Assembly</StyledTableCell>
                        <StyledTableCell align="right">Voter Id</StyledTableCell>
                        <StyledTableCell align="right">Voter Id</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                {formsDetail &&
                    <TableBody>
                        {formsDetail.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.age}</StyledTableCell>
                                <StyledTableCell align="right">{row.gender}</StyledTableCell>
                                <StyledTableCell align="right">{row.assembly}</StyledTableCell>
                                <StyledTableCell align="right">{row.voterId == 1 ? "Yes" : "No"}</StyledTableCell>
                                <StyledTableCell align="right">{row.voterIdNum}</StyledTableCell>
                                <StyledTableCell align="right"
                                    onClick={() => window.open(`${apiUrl}/uploads/${row.voterIdImg || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                >
                                    <SmallImageCard imageUrl={`${apiUrl}/uploads/${row.voterIdImg || "Voter_Id_Image/no-image.png"}`} />
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                }
            </Table>
        </TableContainer>
    );
}