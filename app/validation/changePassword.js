import * as yup from 'yup'

export const changePasswordValidationSchema = yup.object().shape({

    phoneNumber: yup
        .string()
        .required('Phone number required'),
    newPassword: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('confirm password is required')
})
