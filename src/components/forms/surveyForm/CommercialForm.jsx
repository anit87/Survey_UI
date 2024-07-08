import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Button, Stack, IconButton, Toolbar } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Alert from '../../Alert';
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput';
import { verifyUser } from '../../../utils/functions/verifyUser';
import { useLanguageData } from '../../../utils/LanguageContext';
import { surveyFormSchema } from '../../../utils/schemas/surveyForm';
import { generateEstablishmentOptions } from '../../../utils/constants';
import Loader from '../../loader';

const CommercialForm = () => {
    const { translate } = useLanguageData();
    const establishmentOptions = generateEstablishmentOptions(translate);
    const initialValues = {
        establishmentName: '',
        establishmentType: '',
        natureOfBusiness: '',
        contactPerson: ''
    }
    return (
        <>
            <Toolbar />
            <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Sahaya Hasta</h6>
            <br />

            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={async (values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => {
                            return (
                                < Form >
                                    {formik.isSubmitting ? <Loader /> :
                                        <div>
                                            <br />
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate("NameOfTheEstablishment")}
                                                        name="establishmentName"
                                                        type="text"
                                                        placeholder="Please Provide Establishment Name"
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <SelectInput
                                                        label={translate('TypeOfEstablishment')}
                                                        id="establishmentType"
                                                        name="establishmentType"
                                                        options={establishmentOptions}
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate("NatureOfBusiness")}
                                                        name="natureOfBusiness"
                                                        type="text"
                                                        placeholder="Enter Nature Of Business"
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate('ContactPersonName')}
                                                        name="contactPerson"
                                                        type="text"
                                                        placeholder="Contact Person Name"
                                                    />
                                                </Grid>

                                            </Grid>
                                        </div>
                                    }
                                    <div className='d-flex flex-row-reverse bd-highlight' style={{ float: "right" }}>
                                        {
                                            <Button variant='contained'
                                                type='submit'
                                                style={{ textAlign: "right" }}
                                                sx={{ mt: 3, pl: 3, pr: 3 }}
                                            >
                                                Submit
                                            </Button>
                                        }
                                    </div>
                                </Form>
                            )
                        }}

                    </Formik >
                </Box>
            </Container >
        </>
    )
}

export default CommercialForm;