import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingOrders from '../../pending';
import ConfirmedOrders from '../../confirmed';
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle';
import CancelledOrders from '../../cancelled';
import CompletedOrders from '../../completed';
import ExpiredOrders from '../../expired';

const Tab = createMaterialTopTabNavigator();

const OrdersTopTabs = () => {
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
                name="Peding"
                component={PendingOrders}
                options={{ tabBarLabel: 'Pending' }}
            />
            <Tab.Screen
                name="Confirmed"
                component={ConfirmedOrders}
                options={{ tabBarLabel: 'Confirmed' }}
            />
            <Tab.Screen
                name="Cancelled"
                component={CancelledOrders}
                options={{ tabBarLabel: 'Cancelled' }}
            />
            <Tab.Screen
                name="Completed"
                component={CompletedOrders}
                options={{ tabBarLabel: 'Completed' }}
            />
            <Tab.Screen
                name="Expired"
                component={ExpiredOrders}
                options={{ tabBarLabel: 'Expired' }}
            />
        </Tab.Navigator>
    );
}

export default OrdersTopTabs