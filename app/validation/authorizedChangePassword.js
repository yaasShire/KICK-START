import * as yup from 'yup'

export const authorizedchangePasswordValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        // .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    newPassword: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('confirm password is required')
})
