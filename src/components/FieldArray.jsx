import React from 'react'
import { Box, Grid, Typography, Container, Button, Stack, IconButton } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const FieldArray = ({ children, arrayHelpers, array, label, objectOfValues }) => {
    return (
        <div>
            <Stack direction="row" spacing={4}>
                <Typography variant="subtitle2" gutterBottom>{label}</Typography>
                <IconButton onClick={() => arrayHelpers.push(objectOfValues)}><AddCircle /></IconButton>
            </Stack>
            {array.map((friend, index) => (
                <Stack key={index} direction="row" spacing={4}>

                    {children}
                    <IconButton onClick={() => arrayHelpers.remove(index)}><RemoveCircle /></IconButton>
                </Stack>
            ))}

        </div>
    )
}

export default FieldArray