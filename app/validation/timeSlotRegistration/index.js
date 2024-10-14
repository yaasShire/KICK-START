import * as yup from 'yup'

export const timeSlotRegistrationValidation = yup.object().shape({
    price: yup
        .string()
        .required('Price is required'),
})