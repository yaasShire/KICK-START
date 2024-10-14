import * as yup from 'yup'

export const paymentValidationSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .min(8, ({ min }) => "phoneNumber is required")
        .required('Password is required'),
})
