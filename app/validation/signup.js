import * as yup from 'yup'

export const signUpValidationSchema = yup.object().shape({

    fullName: yup
        .string()
        .required('Phone number required'),
    phoneNumber: yup
        .string()
        .required('Phone number required'),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required('email is required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('confirm password is required')
})
