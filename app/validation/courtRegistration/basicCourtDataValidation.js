import * as yup from 'yup'

export const basicCourtDataValidation = yup.object().shape({
    name: yup
        .string()
        .required('Court name is required'),
    surface: yup
        .string()
        .required('Surface Type is required'),
    activePlayersPerTeam: yup
        .string()
        .required('Active Players Per Team is required'),
    basePrice: yup
        .string()
        .required('Price is required'),
})