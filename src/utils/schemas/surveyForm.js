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
    ageGroupOfMembers: Yup.array()
        .required('Please enter the required value.'),
    ageGroupOfMembers: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(4, 'Too Short').required('Required'),
                age: Yup.number().required('Required'),
                gender: Yup.string().required('Required'),
            })
        )
        .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
        .min(3, 'Minimum of 3 friends'),
    assemblyConstituencyMembers: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(3, 'Too Short').required('Required'),
                age: Yup.number().required('Required'),
                gender: Yup.string().required('Required'),
                assemblyName: Yup.string().min(3, 'Too Short').required('Required'),
            })
        )
        .required('Must have friends'),
    voterIDsList: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(3, 'Too Short').required('Required'),
                age: Yup.number().required('Required'),
                gender: Yup.string().required('Required'),
                assemblyName: Yup.string().min(3, 'Too Short').required('Required'),
            })
        )
        .required('Must have friends'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),

});