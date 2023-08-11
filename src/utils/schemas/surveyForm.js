import * as Yup from 'yup'

export const surveyFormSchema = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    residingYears: Yup.number()
        .required('Please enter the required value.'),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    stayingMembers: Yup.number()
        .required('Please enter the required value.'),
    religionAndCaste: Yup.string()
        .required('Please enter the required value.'),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    respondentEducation: Yup.string()
        .required('Please enter the required value.'),
    isParticipated: Yup.string()
        .required('Please enter the required value.'),
    birthdayDate: Yup.string()
        .required('Please enter the required value.'),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),
    ageGroupOfMembers: Yup.string()
        .required('Please enter the required value.'),
    assemblyConstituencyMembers: Yup.string()
        .required('Please enter the required value.'),
    voterIDsList: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),


});