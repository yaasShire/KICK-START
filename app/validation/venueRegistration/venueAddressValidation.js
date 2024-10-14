import * as yup from 'yup'

export const venueAddressValidation = yup.object().shape({
    address: yup
        .string()
        .required('Venue address is required'),
    // city: yup
    //     .string()
    //     .required('Venue city is required')
    // region: yup
    //     .string()
    //     .required('Venue description is required')
})