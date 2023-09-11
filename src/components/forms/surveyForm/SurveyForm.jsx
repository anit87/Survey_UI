import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Container, Button, Stack, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { Formik, Form, FieldArray } from "formik"
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { surveyFormSchema, surveyFormSchemaStep0, surveyFormSchemaStep1, surveyFormSchemaStep2, surveyFormSchemaStep3 } from '../../../utils/schemas/surveyForm';
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput'
import Alert from '../../Alert';
import { verifyUser } from '../../../utils/functions/verifyUser';
import { ageOptions, incomeOptions, trueFalseOptions, educationalOptions, governmentSchemesOptions, categoryOptions, casteOptions } from '../../../utils/constants';
import { getLocation } from '../../../utils/location/getLocation';
import FileUpload from '../../inputs/FileUpload';
import { objectToFormData, appendArrayToFormData } from '../../../utils/functions/objectToFormData';
const apiUrl = import.meta.env.VITE_API_URL + '/forms'
// const apiUrl = import.meta.env.VITE_API_URL + '/users/record'

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


const initialValues = {
    respondentName: '',
    address: '',
    pincode: '',
    mobileNo: '',
    residingYears: '',
    isOwnProperty: '',
    totalMembers: '',
    stayingMembers: '',
    religion: '',
    caste: '',
    cweEducation: '',
    respondentEducation: '',
    isParticipated: '',
    categoryFallUnder: '',
    birthdayDate: '',
    registeredVoter: '',
    voterIdNumber: '',
    ageGroupOfMembers: [{ name: '', age: '', gender: "", assembly: "", voterId: "", voterIdNum: "", voterIdImg: "" }],
    maritalStatus: '',
    occupationStatus: '',
    monthlyHouseholdIncome: '',
}

const SurveyForm = ({ activeStep, setActiveStep, submitDisabled, formId, formsDetail }) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [userId, setUserId] = useState(" ")
    const [alert, setAlert] = useState(false);
    let [counter, setCounter] = useState(0)
    const [savedResp, setSavedResp] = useState({});
    const [editable, setEditable] = useState(formId)
    const [selectedFile, setSelectedFile] = useState(null);

    const [selectedFileArray, setSelectedFileArray] = useState([
        { id: 0, img: "" }
    ]);
    const [inputValues, setInputValues] = useState([]);

    // console.log(selectedFile);
    const token = localStorage.getItem('surveyApp')
    const mydata = useSelector(state => state.auth)

    useEffect(() => {
        const data = mydata.token || token
        const { id } = verifyUser(data)
        setUserId(id)
    }, [userId, token])

    useEffect(() => {
        setCounter(counter++)
    }, [formsDetail])


    // useEffect(() => {
    //     getUsers()
    // }, [formId])

    // const getUsers = async () => {
    //     const response = await axios.post(apiUrl, { id: formId })
    //     setFormsDetail(response.data.data)
    // }

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }

    const handleInputChange = (id, event, index) => {
        if (id === 1) {
            const file = event.target.files[0];
            setSelectedFile(file);
        } else if (id === 2) {
            console.log("change 2 ", id, "*", index, event.target.files);
            const updatedValues = [...inputValues];
            updatedValues[index] = event.target.files[0];
            setInputValues(updatedValues);
        }
    };
    // console.log("arr files ", inputValues, selectedFile);
    return (
        <>
            <Alert open={alert} type={!savedResp.status ? "error" : "info"} msg={savedResp.msg} onClose={() => setAlert(false)} />
            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        initialValues={formsDetail ? formsDetail : initialValues}
                        // validationSchema={surveyFormSchema}
                        validationSchema={
                            activeStep == 0 ? surveyFormSchemaStep0 :
                                activeStep == 1 ? surveyFormSchemaStep1 :
                                    activeStep == 2 ? surveyFormSchemaStep2 :
                                        activeStep == 3 ? surveyFormSchemaStep3 :
                                            activeStep == 4 ? surveyFormSchema : surveyFormSchema
                        }
                        submitting={true}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (values, { setSubmitting, resetForm, validateForm, setFieldError }) => {
                            // console.log("vals--------", values);
                            if (activeStep != 4) {
                                setActiveStep(activeStep + 1)
                            } else if (activeStep == 4 && !values.ageGroupOfMembers[0].name) {
                                setFieldError("ageGroupOfMembers", "Please Enter all Values")
                            } else {
                                const locat = await getLocation()
                                const formData = objectToFormData(values)
                                formData.append('voterIdImage', selectedFile);
                                formData.append('location', JSON.stringify(locat));
                                formData.append('filledBy', userId);
                                if (inputValues.length > 0) {
                                    appendArrayToFormData(formData, 'voterIdImageMember', inputValues)
                                }

                                const resp = await axios.post(apiUrl, formData)
                                setSavedResp(resp.data)
                                alertfn()
                                resetForm()
                                setActiveStep(0)
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ values, errors }) => (
                            < Form >

                                <br />
                                {activeStep === 0 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Applicant Name *"
                                            title="Please Enter Your Name"
                                            name="respondentName"
                                            type="text"
                                            placeholder="Please Provide Your Full Name"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Address *"
                                            title="Please Enter Your Full Address"
                                            name="address"
                                            type="text"
                                            placeholder="Enter Your Full Mailing Address Here"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Pincode *"
                                            title="Enter Your Area Pincode"
                                            name="pincode"
                                            type="number"
                                            placeholder="454545"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Mobile Number *"
                                            title="Enter Your Mobile No"
                                            name="mobileNo"
                                            type="number"
                                            placeholder="9874563210"
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Can You Please Tell Me Your Marital Status *"
                                            title="Are You Married?"
                                            id="maritalStatus"
                                            name="maritalStatus"
                                            options={[{ label: "Single", value: "1" }, { label: "Married", value: "2" }]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Can You Please Tell Me Your Occupation Status *"
                                            title="Can You Please Tell Me Your Occupation Status?"
                                            id="occupationStatus"
                                            name="occupationStatus"
                                            options={[
                                                { label: "Self-employed", value: "1" },
                                                { label: "Full-time", value: "2" },
                                                { label: "Part-time/freelancer", value: "3" },
                                                { label: "Home maker", value: "4" }
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="What Is the Monthly Household Income (MHI) *"
                                            title="What is the Monthly Household Income (MHI)."
                                            id="monthlyHouseholdIncome"
                                            name="monthlyHouseholdIncome"
                                            options={incomeOptions}
                                        />
                                    </Grid>

                                    {/* <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Years of Residence in Current Location *"
                                            title="How Many Years Have You Lived Here?"
                                            name="residingYears"
                                            type="number"
                                            placeholder="Years at Current Location"

                                        />
                                    </Grid> */}

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Do You Own This Property? *"
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
                                            label="How Many Members Are There in Your Family? *"
                                            title="Total Number of Members in Your Family"
                                            name="totalMembers"
                                            type="number"
                                            placeholder="Total Members"
                                        />
                                    </Grid>

                                    {/* <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="How Many of You Are Staying in This Property? *"
                                            title="Total Number of Members Staying in This Property"
                                            name="stayingMembers"
                                            type="number"
                                            placeholder="Number Staying Here?"
                                        />
                                    </Grid> */}

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Religion *"
                                            title="Kindly Select Your Religion"
                                            id="religion"
                                            name="religion"
                                            options={[
                                                { label: "Hindu", value: "1" },
                                                { label: "Muslim", value: "2" },
                                                { label: "Christianity", value: "3" },
                                                { label: "Sikh", value: "4" },
                                                { label: "Other", value: "5" }
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Select Education Details of Chief Wage Earner (Head of the family) *"
                                            title='I would now like to know the education level of the Chief Wage Earner (CWE) of your household. By Chief Wage Earner, I mean the person who contributes the maximum to the household income'
                                            id="chiefWageEarnereEducation"
                                            name="cweEducation"
                                            options={educationalOptions}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Caste *"
                                            title="Caste"
                                            id="caste"
                                            name="caste"
                                            options={casteOptions}
                                        />
                                    </Grid>

                                </Grid>}

                                {activeStep === 2 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                                    {/* <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Respondent's Highest Level of Education *"
                                            title="Provide Applicant's Education Details"
                                            id="respondentEducation"
                                            name="respondentEducation"
                                            options={educationalOptions}
                                        />
                                    </Grid> */}
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Is The Applicant a Registered Voter In This Assembly Constituency *"
                                            title="Are You a Registered Voter in This Assembly Constituency, i.e. Is Your Name Listed in the Voters List?"
                                            name="registeredVoter"
                                            id="registeredVoter"
                                            options={trueFalseOptions}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Voter ID"
                                            title="Please Enter Voter ID Number"
                                            name="voterIdNumber"
                                            type="number"
                                            placeholder="Please Provide Your Voter ID Number"
                                        />
                                        {/* <FileUpload name="voterIdImage" handleFileChange={(e) => handleFileChange(e, 0)} selectedFile={selectedFile} /> */}
                                        <FileUpload name="voterIdImage" onInputChange={(event, newIndex) => handleInputChange(1, event, newIndex)} selectedFile={selectedFile} />
                                    </Grid>
                                </Grid>}

                                {activeStep === 3 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label={`Government Schemes Availed *`}
                                            name="isParticipated"
                                            id="isParticipated"
                                            options={governmentSchemesOptions}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Applicant's age *"
                                            title="Please Provide Your Age Based On Your Last Birthday."
                                            id="birthdayDate"
                                            name="birthdayDate"
                                            options={ageOptions}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label={`What Category Do You Fall Under?*`}
                                            name="categoryFallUnder"
                                            id="categoryFallUnder"
                                            options={categoryOptions}
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
                                                        label="Information On Family Members *"
                                                        arrayHelpers={arrayHelpers}
                                                        object={{ name: '', age: '', gender: "", assembly: "", voterId: "", voterIdNum: "", voterIdImg: "" }}
                                                    />
                                                    {values.ageGroupOfMembers.map((item, index) => (
                                                        // <Stack key={index} sx={{ mb: 1 }} direction={isSmallScreen ? 'column' : 'row'} spacing={2}>
                                                        <Grid key={index} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                            <Grid item md={1} xs={12} style={{ display: "flex" }}>
                                                                <FieldArrayRemoveIcon index={index} arrayHelpers={arrayHelpers} array={values.ageGroupOfMembers} />
                                                            </Grid>
                                                            <Grid item md={2} xs={12}>
                                                                <TextInput
                                                                    label="Members Name *"
                                                                    name={`ageGroupOfMembers[${index}].name`}
                                                                    type="text"
                                                                    placeholder="Name"

                                                                />
                                                            </Grid>
                                                            <Grid item md={1} xs={12}>
                                                                <TextInput
                                                                    label="Age *"
                                                                    name={`ageGroupOfMembers[${index}].age`}
                                                                    type="number"
                                                                    placeholder="Age"
                                                                />
                                                            </Grid>
                                                            <Grid item md={1} xs={12}>
                                                                <SelectInput
                                                                    label="Gender *"
                                                                    id={`ageGroupOfMembers[${index}].gender`}
                                                                    name={`ageGroupOfMembers[${index}].gender`}
                                                                    options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                                />
                                                            </Grid>
                                                            <Grid item md={2} xs={12}>
                                                                <TextInput
                                                                    label="Assembly/Constituency*"
                                                                    name={`ageGroupOfMembers[${index}].assembly`}
                                                                    type="text"
                                                                    placeholder="Assembly/Constituency"
                                                                />
                                                            </Grid>
                                                            <Grid item md={2} xs={12}>
                                                                <SelectInput
                                                                    label="Voter ID *"
                                                                    id={`ageGroupOfMembers[${index}].voterId`}
                                                                    name={`ageGroupOfMembers[${index}].voterId`}
                                                                    options={[{ label: "Yes", value: 1 }, { label: "No", value: 0 }]}
                                                                />
                                                            </Grid>
                                                            <Grid item md={2} xs={12}>

                                                                <TextInput
                                                                    label="Voter ID Number"
                                                                    name={`ageGroupOfMembers[${index}].voterIdNum`}
                                                                    type="number"
                                                                    placeholder="Please Provide Your Voter ID Number"
                                                                />

                                                                {/* <FileUpload index={index} name={`ageGroupOfMembers[${index}].voterIdImg`} handleFileChange={(e, key) => handleFileChange(e, key, 1)} /> */}
                                                                <FileUpload index={index} onInputChange={(event, newIndex) => handleInputChange(2, event, newIndex)} />
                                                            </Grid>


                                                            {isSmallScreen ? <Box sx={{ borderBottom: 1 }} /> : ""}
                                                        </Grid>

                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>}
                                <div className='d-flex flex-row-reverse bd-highlight' style={{ float: "right" }}>
                                    {<Button variant='contained' style={{ textAlign: "right" }} type='submit'
                                        sx={{ mt: 3, pl: 3, pr: 3 }}
                                    >
                                        {activeStep === 4 ? "Submit" : "Next"}
                                    </Button>
                                    }
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