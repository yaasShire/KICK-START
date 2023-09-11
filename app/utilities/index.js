import { COLORS } from "../theme/globalStyle";

//
const getStatusThemeBasedOnRoute = (routeObj, screenName) => {
    return {
        barStyle: routeObj.name === screenName ? "light-content" : "dark-content",
        backgroundColor: routeObj.name === screenName ? COLORS.primary_color : COLORS.bg_primary
    }
};