import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS, SIZES2 } from '../../../theme/globalStyle';
import OneTimeBooking from '../oneTimeBooking';
import RecurringBooking from '../recurringBooking';


// 
const Tab = createMaterialTopTabNavigator();

const OrdersTopTabsForCustomer = ({ }) => {

    // 
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{ //use this config
                lazy: true,
                tabBarScrollEnabled: true,
                tabBarInactiveTintColor: COLORS.gray_font_color,
                tabBarActiveTintColor: "#000",
                // tabBarIndicator: () => null,
                tabBarIndicatorStyle: {
                    height: 2,
                    width: 0.7,
                    backgroundColor: "#000"
                },
                tabBarStyle: {
                    elevation: 0,
                    backgroundColor: "#fff"
                },
                indicatorStyle: {
                    backgroundColor: 'blue', // Color of the tab indicator
                    borderRadius: 10, // Adjust the border radius as needed
                },
                tabBarItemStyle: {
                    width: 'auto',
                    alignItems: "center",
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontSize: SIZES2.text_sm.fontSize,
                    fontWeight: "600",
                    textTransform: 'capitalize',
                },
            }}
        >
            <Tab.Screen
                name="OneTime"
                component={OneTimeBooking}
                options={{ tabBarLabel: 'One Time' }}
            />
            <Tab.Screen
                name="Recurring"
                component={RecurringBooking}
                options={{ tabBarLabel: 'Recurring' }}
            />
        </Tab.Navigator>
    );
}

export default OrdersTopTabsForCustomer