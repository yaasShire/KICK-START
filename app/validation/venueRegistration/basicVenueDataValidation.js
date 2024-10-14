import * as yup from 'yup'

export const basicVenueDataValidation = yup.object().shape({
    name: yup
        .string()
        .required('Venue name is required'),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required('email is required'),
    description: yup
        .string()
        .required('Venue description is required'),
    phoneNumber: yup
        .string()
        .min(9, ({ min }) => `Phone number must be at least ${min} characters`)
        .max(10, ({ min }) => `Phone number must be at least ${min} characters`)
        .required('Venue phone number is required'),
    numberOfHoursOpen: yup
        .string()
        .max(2, ({ min }) => `Phone number must be at least ${min} characters`)
        .required('Venue number of hours open is required'),
    // facilityIdS: yup.number().required("region id is a required field"),
    facilityIdS: yup.array()
        .of(yup.number().required('Each facility id is required'))
        .min(1, 'At least one facility id is required')
})