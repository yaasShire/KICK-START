import * as yup from 'yup'

export const courtDimensionsValidation = yup.object().shape({
    width: yup
        .string()
        .required('Court width is required'),
    height: yup
        .string()
        .required('Surface height is required'),
    additionalInfo: yup
        .string()
        .required('Description is required')
})