import React, { useState } from 'react'
import { Box, Grid, Typography, Container, Button, Stack, IconButton } from "@mui/material"
import { Formik, Form, FieldArray } from "formik"
import { AddCircle, RemoveCircle } from '@mui/icons-material';

import { surveyFormSchema } from "../utils/schemas/surveyForm"
import TextInput from '../components/TextInput'
import SelectInput from '../components/SelectInput'
import FieldArray1 from '../components/FieldArray';

// import { Button } from 'react-bootstrap'


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
    respondentName: '',
    address: '',
    pincode: '',
    mobileNo: '',
    residingYears: '',
    isOwnProperty: '',
    totalMembers: '',
    stayingMembers: '',
    religionAndCaste: '',
    cweEducation: '',
    respondentEducation: '',
    isParticipated: '',
    birthdayDate: '',
    registeredVoter: '',
    ageGroupOfMembers: [{ name: '', age: '', gender: "" }],
    assemblyConstituencyMembers: [{ name: '', age: '', gender: "", assemblyName: "" }],
    voterIDsList: [{ name: '', age: '', gender: "", assemblyName: "" }],
    maritalStatus: '',
    occupationStatus: '',
    monthlyHouseholdIncome: '',
}

const SurveyForm = () => {
    const [userDetails, setUserDetails] = useState(null)
    const [alert, setAlert] = useState(false);

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }
    return (
        <>
            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1, p: 1 }} >
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={surveyFormSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log("formik ", values);
                            alertfn()
                            setSubmitting(false);
                        }}
                    >
                        {({ values }) => (
                            < Form >
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" align="center" gutterBottom>
                                            Survey Form
                                        </Typography>
                                    </Grid>
                                    <>
                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="RESPONDENT NAME"
                                                title="Please enter your Name"
                                                name="respondentName"
                                                type="text"
                                                placeholder="Please provide your full name..."
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="ADDRESS"
                                                title="Please enter your full address"
                                                name="address"
                                                type="text"
                                                placeholder="Enter your full mailing address here..."
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="PINCODE"
                                                name="pincode"
                                                type="number"
                                                placeholder="454545"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="MOBILE No"
                                                name="mobileNo"
                                                type="number"
                                                placeholder="9874563210"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="FROM HOW MANY YEARS ARE YOU RESIDING IN THIS LOCATION?"
                                                name="residingYears"
                                                type="number"
                                                placeholder="Years at current location"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="IS THIS YOUR OWN PROPERTY?"
                                                title="Is this your own property"
                                                name="isOwnProperty"
                                                id="isOwnProperty"
                                                options={trueFalseOptions}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="HOW MANY MEMBERS ARE THERE IN YOUR FAMILY?"
                                                title="Total number of members in your family"
                                                name="totalMembers"
                                                type="number"
                                                placeholder="Total Members"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="HOW MANY OF YOU ARE STAYING IN THIS PROPERTY?"
                                                title="Total number of members staying in this property"
                                                name="stayingMembers"
                                                type="number"
                                                placeholder="Number staying here?"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="RELIGION, CASTE & SUB COMMUNITY"
                                                name="religionAndCaste"
                                                type="text"
                                                placeholder="Kindly indicate your religion, caste, and sub-community"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="SELECT EDUCATION DETAILS OF CHIEF WAGE EARNER"
                                                title='I would now like to know the education level of the Chief Wage Earner (CWE) of your household. By Chief Wage Earner, I mean the person who contributes the maximum to the household income'
                                                id="chiefWageEarnereEducation"
                                                name="cweEducation"
                                                options={educationalOptions}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="SELECT EDUCATION DETAILS OF THE RESPONDENT"
                                                title="Provide respondent's education details"
                                                id="respondentEducation"
                                                name="respondentEducation"
                                                options={educationalOptions}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={`IN THE PAST 6 MONTHS, HAVE YOU PARTICIPATED IN MARKET RESEARCH SURVEYS?`}
                                                title={`Have you participated in any market research surveyy,interview, or discussion in the past 6 months?`}
                                                name="isParticipated"
                                                id="isParticipated"
                                                options={trueFalseOptions}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="COULD YOU TELL ME YOUR AGE PLEASE, BASIS YOUR LAST BIRTHDAY?"
                                                title="Please provide your age based on your last birthday."
                                                id="birthdayDate"
                                                name="birthdayDate"
                                                options={ageOptions}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="ARE YOU A REGISTERED VOTER IN THIS ASSEMBLY CONSTITUENCY?"
                                                title="Are you a registered voter in this assembly constituency, i.e. is your name listed in the voters list?"
                                                name="registeredVoter"
                                                id="registeredVoter"
                                                options={trueFalseOptions}
                                            />
                                        </Grid>
                                    </>
                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <FieldArray
                                            name="ageGroupOfMembers"
                                            render={arrayHelpers => (
                                                <div>
                                                    <Stack direction="row" spacing={4}>
                                                        <Typography variant="subtitle2" gutterBottom>LIST THE AGE GROUP OF YOUR FAMILY MEMBERS RESPONDENT AGE</Typography>
                                                        <IconButton onClick={() => arrayHelpers.push({ name: '', age: '', gender: "" })}><AddCircle /></IconButton>
                                                    </Stack>
                                                    {values.ageGroupOfMembers.map((friend, index) => (
                                                        <Stack key={index} direction="row" spacing={4}>
                                                            <TextInput
                                                                label="Members Name"
                                                                title="Please enter Name of members"
                                                                name={`ageGroupOfMembers[${index}].name`}
                                                                type="text"
                                                                placeholder="Name"

                                                            />
                                                            <TextInput
                                                                label="Age"
                                                                title="Please enter age of member"
                                                                name={`ageGroupOfMembers[${index}].age`}
                                                                type="number"
                                                                placeholder="Name"
                                                            />
                                                            <SelectInput
                                                                label="Gender"
                                                                title="Select gender"
                                                                id={`ageGroupOfMembers[${index}].gender`}
                                                                name={`ageGroupOfMembers[${index}].gender`}
                                                                options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                            />
                                                            <IconButton onClick={() => arrayHelpers.remove(index)}><RemoveCircle /></IconButton>
                                                        </Stack>
                                                    ))}

                                                </div>
                                            )}
                                        />
                                    </Grid>

                                    {/* <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="LIST THE AGE GROUP OF YOUR FAMILY MEMBERS RESPONDENT AGE"
                                            title="Can you please list the age group of your family members Respondent age"
                                            name="ageGroupOfMembers"
                                            type="text"
                                            placeholder="Indicate the age group of your family members and your own age"
                                        />
                                    </Grid> */}

                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <FieldArray
                                            name="assemblyConstituencyMembers"
                                            render={arrayHelpers => (
                                                <div>
                                                    <Stack direction="row" spacing={4}>
                                                        <Typography variant="subtitle2" gutterBottom>LIST THE FAMILY MEMBERS WITH ASSEMBLY CONSTITUENCY NAME</Typography>
                                                        <IconButton onClick={() => arrayHelpers.push({ name: '', age: '', gender: "", assemblyName: "" })}><AddCircle /></IconButton>
                                                    </Stack>
                                                    {values.assemblyConstituencyMembers.map((friend, index) => (
                                                        <Stack key={index} direction="row" spacing={4}>
                                                            <TextInput
                                                                label="Members Name"
                                                                title="Please enter Name of members"
                                                                name={`assemblyConstituencyMembers[${index}].name`}
                                                                type="text"
                                                                placeholder="Name"

                                                            />
                                                            <TextInput
                                                                label="Age"
                                                                title="Please enter age of member"
                                                                name={`assemblyConstituencyMembers[${index}].age`}
                                                                type="number"
                                                                placeholder="Name"
                                                            />
                                                            <SelectInput
                                                                label="Gender"
                                                                title="Select gender"
                                                                id={`assemblyConstituencyMembers[${index}].gender`}
                                                                name={`assemblyConstituencyMembers[${index}].gender`}
                                                                options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                            />
                                                            <TextInput
                                                                label="Assembly Constituency Name"
                                                                title="Please enter Assembly Constituency Name of Member"
                                                                name={`assemblyConstituencyMembers[${index}].assemblyName`}
                                                                type="text"
                                                                placeholder="Assembly Constituency Name"

                                                            />
                                                            <IconButton onClick={() => arrayHelpers.remove(index)}><RemoveCircle /></IconButton>
                                                        </Stack>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                    {/* <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="LIST THE FAMILY MEMBERS WITH ASSEMBLY CONSTITUENCY NAME"
                                            title="Can you please list the family members with Assembly Constituency Name"
                                            name="assemblyConstituencyMembers"
                                            type="text"
                                            placeholder=""
                                        />
                                    </Grid> */}

                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <FieldArray
                                            name="voterIDsList"
                                            render={arrayHelpers => (
                                                <div>
                                                    <Stack direction="row" spacing={4}>
                                                        <Typography variant="subtitle2" gutterBottom>LIST THE FAMILY MEMBERS WITH VOTER ID's</Typography>
                                                        <IconButton onClick={() => arrayHelpers.push({ name: '', age: '', gender: "", assemblyName: "" })}><AddCircle /></IconButton>
                                                    </Stack>
                                                    {values.voterIDsList.map((friend, index) => (
                                                        <Stack key={index} direction="row" spacing={4}>
                                                            <TextInput
                                                                label="Members Name"
                                                                title="Please enter Name of members"
                                                                name={`voterIDsList[${index}].name`}
                                                                type="text"
                                                                placeholder="Name"

                                                            />
                                                            <TextInput
                                                                label="Age"
                                                                title="Please enter age of member"
                                                                name={`voterIDsList[${index}].age`}
                                                                type="number"
                                                                placeholder="Name"
                                                            />
                                                            <SelectInput
                                                                label="Gender"
                                                                title="Select gender"
                                                                id={`voterIDsList[${index}].gender`}
                                                                name={`voterIDsList[${index}].gender`}
                                                                options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                            />
                                                            <TextInput
                                                                label="Assembly Constituency Name"
                                                                title="Please enter Assembly Constituency Name of Member"
                                                                name={`voterIDsList[${index}].assemblyName`}
                                                                type="text"
                                                                placeholder="Assembly Constituency Name"

                                                            />
                                                            <IconButton onClick={() => arrayHelpers.remove(index)}><RemoveCircle /></IconButton>
                                                        </Stack>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </Grid>

                                    {/* <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="LIST THE FAMILY MEMBERS WITH VOTER ID's"
                                            title="Can you please list the family members with Voter ID's"
                                            name="voterIDsList"
                                            type="text"
                                            placeholder="List family members with Voter IDs"
                                        />
                                    </Grid> */}

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="CAN YOU PLEASE TELL ME YOUR MARITAL STATUS?"
                                            title="Are You Married?"
                                            id="maritalStatus"
                                            name="maritalStatus"
                                            options={[{ label: "Single", value: "1" }, { label: "Married", value: "2" }]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="CAN YOU PLEASE TELL ME YOUR OCCUPATION STATUS?"
                                            title="Can you please tell me your occupation status?"
                                            id="occupationStatus"
                                            name="occupationStatus"
                                            options={[{ label: "Working-Part time/Full time", value: "1" }, { label: "Home Maker/Housewife", value: "2" }]}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="WHAT IS THE MONTHLY HOUSEHOLD INCOME (MHI)?."
                                            title="What is the Monthly Household Income (MHI) of your household."
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
                                </Grid>

                                <Button variant='contained' type='submit' sx={{ mt: 3, mb: 2, pl: 3, pr: 3 }} >Submit</Button>

                            </Form>
                        )}

                    </Formik >
                </Box>
            </Container >
        </>
    )
}

export default SurveyForm


