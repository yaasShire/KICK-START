import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle';
import MatchResults from '../../matchResults';

const Tab = createMaterialTopTabNavigator();

function DateScreen({ route }) {
    const { date } = route.params;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{date}</Text>
        </View>
    );
}

const generateDates = (centerDate, range = 5) => {
    const dates = [];
    const center = moment(centerDate);

    for (let i = -range; i <= range; i++) {
        const date = center.clone().add(i, 'days');
        let label = date.format('ddd DD MMM');

        if (i === -1) {
            label = 'Yesterday';
        } else if (i === 0) {
            label = 'Today';
        } else if (i === 1) {
            label = 'Tomorrow';
        }

        dates.push({ label, date: date.format('YYYY-MM-DD') });
    }

    return dates;
};

const MyTabs = () => {
    const [dates, setDates] = useState(generateDates(moment(), 2));
    const [index, setIndex] = useState(dates.findIndex(date => date.label === 'Today'));

    const loadMoreDates = (direction) => {
        const newDates = [...dates];
        const startDate = moment(newDates[0].date, 'YYYY-MM-DD');
        const endDate = moment(newDates[newDates.length - 1].date, 'YYYY-MM-DD');

        if (direction === 'left') {
            for (let i = 1; i <= 5; i++) {
                startDate.subtract(1, 'days');
                let label = startDate.format('ddd DD MMM');

                if (startDate.isSame(moment().subtract(1, 'days'), 'day')) {
                    label = 'Yesterday';
                } else if (startDate.isSame(moment(), 'day')) {
                    label = 'Today';
                } else if (startDate.isSame(moment().add(1, 'days'), 'day')) {
                    label = 'Tomorrow';
                }

                newDates.unshift({ label, date: startDate.format('YYYY-MM-DD') });
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                endDate.add(1, 'days');
                let label = endDate.format('ddd DD MMM');

                if (endDate.isSame(moment().subtract(1, 'days'), 'day')) {
                    label = 'Yesterday';
                } else if (endDate.isSame(moment(), 'day')) {
                    label = 'Today';
                } else if (endDate.isSame(moment().add(1, 'days'), 'day')) {
                    label = 'Tomorrow';
                }

                newDates.push({ label, date: endDate.format('YYYY-MM-DD') });
            }
        }
        setDates(newDates);
    };

    useEffect(() => {
        if (index <= 2) {
            loadMoreDates('left');
        } else if (index >= dates.length - 3) {
            loadMoreDates('right');
        }
    }, [index]);

    return (
        <Tab.Navigator
            initialRouteName="Today"
            screenOptions={{
                lazy: true,
                tabBarScrollEnabled: true,
                tabBarInactiveTintColor: COLORS.gray_font_color,
                tabBarActiveTintColor: "#000",
                tabBarIndicatorStyle: {
                    height: 2,
                    backgroundColor: "#000"
                },
                tabBarStyle: {
                    elevation: 0,
                    backgroundColor: "#fff"
                },
                tabBarItemStyle: {
                    width: 'auto',
                    alignItems: "center",
                },
                tabBarLabelStyle: {
                    fontSize: SIZES2.text_sm.fontSize,
                    fontWeight: "600",
                    textTransform: 'capitalize',
                },
            }}
        >
            {dates.map((item, idx) => (
                <Tab.Screen
                    key={idx}
                    name={item.label}
                    component={MatchResults}
                    options={{ tabBarLabel: item.label }}
                    initialParams={{ date: item.date }}
                    listeners={{
                        tabPress: () => setIndex(idx),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default function MatchesTopTabs() {
    return (
        <MyTabs />
    );
}
