import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Container, Button, Stack, IconButton, useMediaQuery, useTheme, Toolbar } from "@mui/material"
import { Formik, Form, FieldArray } from "formik"
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';

import { surveyFormSchema } from '../../../utils/schemas/surveyForm';
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput'
import Alert from '../../Alert';
import { verifyUser } from '../../../utils/functions/verifyUser';


const FieldArrayAddIcon = ({ label, arrayHelpers, object }) => {
    return (
        <Stack direction="row">
            <Typography variant="subtitle1" style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} sx={{ pt: 1, pb: 1 }} gutterBottom>{label}</Typography>
            <IconButton size="small" onClick={() => arrayHelpers.push(object)}>
                <AddCircle fontSize="small" />
            </IconButton>
        </Stack>
    )
}
const FieldArrayRemoveIcon = ({ index, arrayHelpers, array }) => {
    return (
        <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
        >
            <Typography variant="subtitle2" style={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom > Member&nbsp;{index + 1} </Typography>
            <IconButton disabled={array.length < 2} size="small" onClick={() => arrayHelpers.remove(index)}>
                <RemoveCircle fontSize="small" />
            </IconButton>
        </Box>
    )
}


const trueFalseOptions = [
    {
        label: "Yes",
        value: true
    },
    {
        label: "No",
        value: false
    }
]
const educationalOptions = [
    {
        label: "Illiterate",
        value: 1
    },
    {
        label: "Literate but no formal schooling/school up to 4 years",
        value: 2
    },
    {
        label: "School 5 to 9 years",
        value: 3
    },
    {
        label: "SSC/HSC",
        value: 4
    },
    {
        label: "Some College but not graduate",
        value: 5
    },
    {
        label: "Graduate/Postgraduate - General",
        value: 6
    },
    {
        label: "Graduate/Postgraduate - Professional",
        value: 7
    }
]
const ageOptions = [
    {
        label: "18 years or below",
        value: 1
    },
    {
        label: "19 - 24",
        value: 2
    },
    {
        label: "25 - 35",
        value: 3
    },
    {
        label: "35 - 45",
        value: 4
    },
    {
        label: "Above 45 years",
        value: 5
    }
]

const initialValues = {
    respondentName: 'User',
    address: 'Hno 1',
    pincode: '',
    mobileNo: '9874563210',
    residingYears: '2',
    isOwnProperty: '',
    totalMembers: '6',
    stayingMembers: '4',
    religionAndCaste: 'Indian',
    cweEducation: '5',
    respondentEducation: '4',
    isParticipated: '1',
    birthdayDate: '',
    registeredVoter: '',
    ageGroupOfMembers: [{ name: 'user', age: '20', gender: "male" }],
    assemblyConstituencyMembers: [{ name: 'user', age: '20', gender: "female", assemblyName: "user" }],
    voterIDsList: [{ name: 'user', age: '20', gender: "male", assemblyName: "user" }],
    maritalStatus: '1',
    occupationStatus: '2',
    monthlyHouseholdIncome: '4',
}

const SurveyForm = ({ activeStep, submitDisabled }) => {
    const [userId, setUserId] = useState(" ")
    const [alert, setAlert] = useState(false);
    const [savedResp, setSavedResp] = useState({});
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const { id } = verifyUser()
        setUserId(id)
    }, [userId])


    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }
    console.log(userId, " ", userId);
    return (
        <>
            <Alert open={alert} type={!savedResp.status ? "error" : "info"} msg={savedResp.msg} onClose={() => setAlert(false)} />
            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={surveyFormSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log("user id ", userId);
                            const resp = await axios.post("http://localhost:4000/forms", { ...values, filledBy: userId })
                            setSavedResp(resp.data)
                            console.log("formik ", resp);
                            alertfn()
                            setSubmitting(false);
                        }}
                    >
                        {({ values, errors }) => (
                            < Form >
                                {/* <Toolbar variant='dense' /> */}
                                <br />
                                {activeStep === 0 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Respondent Name"
                                            title="Please Enter Your Name"
                                            name="respondentName"
                                            type="text"
                                            placeholder="Please Provide Your Full Name"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Address"
                                            title="Please Enter Your Full Address"
                                            name="address"
                                            type="text"
                                            placeholder="Enter Your Full Mailing Address Here"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Pincode"
                                            title="Enter Your Area Pincode"
                                            name="pincode"
                                            type="number"
                                            placeholder="454545"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Mobile No"
                                            title="Enter Your Mobile No"
                                            name="mobileNo"
                                            type="number"
                                            placeholder="9874563210"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Can You Please Tell Me Your Marital Status?"
                                            title="Are You Married?"
                                            id="maritalStatus"
                                            name="maritalStatus"
                                            options={[{ label: "Single", value: "1" }, { label: "Married", value: "2" }]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Can You Please Tell Me Your Occupation Status?"
                                            title="Can You Please Tell Me Your Occupation Status?"
                                            id="occupationStatus"
                                            name="occupationStatus"
                                            options={[{ label: "Working-Part time/Full time", value: "1" }, { label: "Home Maker/Housewife", value: "2" }]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="What Is the Monthly Household Income (MHI)"
                                            title="What is the Monthly Household Income (MHI)."
                                            id="monthlyHouseholdIncome"
                                            name="monthlyHouseholdIncome"
                                            options={[
                                                { label: "Below Rs. 20,000.", value: "1" },
                                                { label: "Above Rs. 20,000 to Below Rs. 30,000.", value: "2" },
                                                { label: "Above Rs. 30,000 to Below Rs. 50,000.", value: "3" },
                                                { label: "Above Rs. 50,000 to Below Rs. 75,000.", value: "4" },
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="From How Many Years Are You Residing in This Location?"
                                            title="How Many Years Have You Lived Here?"
                                            name="residingYears"
                                            type="number"
                                            placeholder="Years at Current Location"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Is This Your Own Property?"
                                            title="Is This Your Own Property?"
                                            name="isOwnProperty"
                                            id="isOwnProperty"
                                            options={trueFalseOptions}
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 1 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="How Many Members Are There in Your Family?"
                                            title="Total Number of Members in Your Family"
                                            name="totalMembers"
                                            type="number"
                                            placeholder="Total Members"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="How Many of You Are Staying in This Property?"
                                            title="Total Number of Members Staying in This Property"
                                            name="stayingMembers"
                                            type="number"
                                            placeholder="Number Staying Here?"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Religion, Caste & Sub Community"
                                            title="Religion, Caste & Sub-community Information"
                                            name="religionAndCaste"
                                            type="text"
                                            placeholder="Kindly Indicate Your Religion, Caste, and Sub-community"
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 2 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Select Education Details of Chief Wage Earner"
                                            title='I would now like to know the education level of the Chief Wage Earner (CWE) of your household. By Chief Wage Earner, I mean the person who contributes the maximum to the household income'
                                            id="chiefWageEarnereEducation"
                                            name="cweEducation"
                                            options={educationalOptions}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Select Education Details of Respondent"
                                            title="Provide Respondent's Education Details"
                                            id="respondentEducation"
                                            name="respondentEducation"
                                            options={educationalOptions}
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 3 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label={`In the Past 6 Months, Have You Participated in Surveys?`}
                                            title={`Have You Participated in Any Market Research Survey, Interview, or Discussion in the Past 6 Months?`}
                                            name="isParticipated"
                                            id="isParticipated"
                                            options={trueFalseOptions}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Could You Tell Me Your Age Please, Basis Your Last Birthday?"
                                            title="Please Provide Your Age Based On Your Last Birthday."
                                            id="birthdayDate"
                                            name="birthdayDate"
                                            options={ageOptions}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Are You a Registered Voter in This Assembly Constituency?"
                                            title="Are You a Registered Voter in This Assembly Constituency, i.e. Is Your Name Listed in the Voters List?"
                                            name="registeredVoter"
                                            id="registeredVoter"
                                            options={trueFalseOptions}
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 4 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                    <Grid item xs={12} sx={{ mt: 1 }}>
                                        <FieldArray
                                            name="ageGroupOfMembers"
                                            render={arrayHelpers => (
                                                <div>
                                                    <FieldArrayAddIcon
                                                        label="List the Age Group of Your Family Members Respondent Age"
                                                        arrayHelpers={arrayHelpers}
                                                        object={{ name: '', age: '', gender: "" }}
                                                    />
                                                    {values.ageGroupOfMembers.map((item, index) => (
                                                        <Stack key={index} sx={{ mb: 1 }} direction={isSmallScreen ? 'column' : 'row'} spacing={2}>

                                                            <FieldArrayRemoveIcon index={index} arrayHelpers={arrayHelpers} array={values.ageGroupOfMembers} />
                                                            <TextInput
                                                                label="Members Name"
                                                                title="Please Enter Name of Members"
                                                                name={`ageGroupOfMembers[${index}].name`}
                                                                type="text"
                                                                placeholder="Name"

                                                            />
                                                            <TextInput
                                                                label="Age"
                                                                title="Please Enter Age of Member"
                                                                name={`ageGroupOfMembers[${index}].age`}
                                                                type="number"
                                                                placeholder="Age"
                                                            />
                                                            <SelectInput
                                                                label="Gender"
                                                                title="Select Gender"
                                                                id={`ageGroupOfMembers[${index}].gender`}
                                                                name={`ageGroupOfMembers[${index}].gender`}
                                                                options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                            />

                                                            {isSmallScreen ? <Box sx={{ borderBottom: 1 }} /> : ""}
                                                        </Stack>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: 1 }}>
                                        <FieldArray
                                            name="assemblyConstituencyMembers"
                                            render={arrayHelpers => (
                                                <div>
                                                    <FieldArrayAddIcon
                                                        label="List the Family Members with Assembly Constituency Name"
                                                        arrayHelpers={arrayHelpers}
                                                        object={{ name: '', age: '', gender: "", assemblyName: "" }}
                                                    />
                                                    {values.assemblyConstituencyMembers.map((item, index) => (
                                                        <Stack key={index} sx={{ mb: 1 }} direction={isSmallScreen ? 'column' : 'row'} spacing={2}>

                                                            <FieldArrayRemoveIcon index={index} arrayHelpers={arrayHelpers} array={values.assemblyConstituencyMembers} />
                                                            <TextInput
                                                                label="Members Name"
                                                                title="Please Enter Name Of Members"
                                                                name={`assemblyConstituencyMembers[${index}].name`}
                                                                type="text"
                                                                placeholder="Name"

                                                            />
                                                            <TextInput
                                                                label="Age"
                                                                title="Please Enter Age of Member"
                                                                name={`assemblyConstituencyMembers[${index}].age`}
                                                                type="number"
                                                                placeholder="Age"
                                                            />
                                                            <SelectInput
                                                                label="Gender"
                                                                title="Select Gender"
                                                                id={`assemblyConstituencyMembers[${index}].gender`}
                                                                name={`assemblyConstituencyMembers[${index}].gender`}
                                                                options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                            />
                                                            <TextInput
                                                                label="Assembly Constituency Name"
                                                                title="Please Enter Assembly Constituency Name of Member"
                                                                name={`assemblyConstituencyMembers[${index}].assemblyName`}
                                                                type="text"
                                                                placeholder="Assembly Constituency Name"

                                                            />
                                                            <br />
                                                            {isSmallScreen ? <Box sx={{ borderBottom: 1 }} /> : ""}

                                                        </Stack>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: 1 }}>
                                        <FieldArray
                                            name="voterIDsList"
                                            render={arrayHelpers => (
                                                <div>
                                                    <FieldArrayAddIcon
                                                        label="List the Family Members with Voter IDs"
                                                        arrayHelpers={arrayHelpers}
                                                        object={{ name: '', age: '', gender: "", assemblyName: "" }}
                                                    />
                                                    {values.voterIDsList.map((item, index) => (
                                                        <Stack key={index} sx={{ mb: 1 }} direction={isSmallScreen ? 'column' : 'row'} spacing={2}>

                                                            <FieldArrayRemoveIcon index={index} arrayHelpers={arrayHelpers} array={values.voterIDsList} />
                                                            <TextInput
                                                                label="Members Name"
                                                                title="Please Enter Name Of Members"
                                                                name={`voterIDsList[${index}].name`}
                                                                type="text"
                                                                placeholder="Name"
                                                            />
                                                            <TextInput
                                                                label="Age"
                                                                title="Please Enter Age Of Member"
                                                                name={`voterIDsList[${index}].age`}
                                                                type="number"
                                                                placeholder="Age"
                                                            />
                                                            <SelectInput
                                                                label="Gender"
                                                                title="Select Gender"
                                                                id={`voterIDsList[${index}].gender`}
                                                                name={`voterIDsList[${index}].gender`}
                                                                options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                            />
                                                            <TextInput
                                                                label="Assembly Constituency Name"
                                                                title="Please Enter Assembly Constituency Name of Member"
                                                                name={`voterIDsList[${index}].assemblyName`}
                                                                type="text"
                                                                placeholder="Assembly Constituency Name"

                                                            />
                                                            <br />
                                                            {isSmallScreen ? <Box sx={{ borderBottom: 1 }} /> : ""}
                                                        </Stack>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </Grid>

                                </Grid>}
                                <div className='d-flex flex-row-reverse bd-highlight'>
                                    {submitDisabled && <Button variant='contained' style={{ textAlign: "right" }} type='submit' sx={{ mt: 2, pl: 3, pr: 3 }} >Submit</Button>}
                                </div>

                            </Form>
                        )}

                    </Formik >
                </Box>
            </Container >
        </>
    )
}

export default SurveyForm