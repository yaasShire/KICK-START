import * as yup from 'yup'

export const requestForgetPasswordValidationSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required('Phone number required')
})
