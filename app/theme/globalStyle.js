//

import { Dimensions } from "react-native"

//
export const COLORS = {
    // Main Colors
    primary_color: "#005844",
    secondary_color: "#7a7a7a",
    tertiary_color: "#fbbe14",
    // Background Colors
    bg_primary: '#ffffff',
    bg_secondary: '#f5f5f5',
    bg_tertiary: 'rgba(237, 237, 237, .3)',
    // Font Colors
    black900: "#343a40",
    black800: "#6d767d",
    black700: "#a9b5be",
    black600: "#f8f9fa",
    gray_color: "#d9d9d9",
    black_color: "#000",
    // Others;;;;;;;;;;;;;;;;;;;
    light_green_color: "#d5f1e7",
    linkColor: "#4e8ee0",
    gray_font_color: "#aeaeae",
    green: "#94c85b"
}
//
export const appLayout = {
    padding: '5%',
    paddingY: '5%',
    paddingX: '5%',
    flex_row: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    }
}
//
export const SIZES = {
    h1: {

    },
    h2: {

    },
    paragraph: {

    },
    smallText: {

    }
}

export const LAY_OUT = {
    padding: '3.2%',
    paddingY: '3.2%',
    paddingX: '3.2%',
    flex_row: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flex_col: {
        flexDirection: 'col',
        alignItems: 'center',
    },
}
//
export const SIZES2 = {
    text_xs: {
        fontSize: 9,
        letterSpacing: 0.6,
        fontFamily: "poppins400",
        color: COLORS.font_primary,
    },
    text_sm: {
        fontSize: 10,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_md: {
        fontSize: 12,
        letterSpacing: 0.4,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_base: {
        fontSize: 14,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_lg: {
        fontSize: 16,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_xl: {
        fontSize: 18,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_2xl: {
        fontSize: 20,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_3xl: {
        fontSize: 22,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_4xl: {
        fontSize: 24,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_5xl: {
        fontSize: 26,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_6xl: {
        fontSize: 28,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
    text_extra: {
        fontSize: 35,
        letterSpacing: 0.6,
        fontFamily: "poppins500",
        color: COLORS.font_primary,
    },
}

export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height

// https://www.behance.net/gallery/133297009/Futsal-Booking-App-Case-Study?locale=fr_FR