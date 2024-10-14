import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle';

const VenueIncomeActionsList = ({ onEdit = () => { }, onDelete = () => { }, showEdit = true, incomeReportType = "", setIncomeReportType = () => { } }) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);



    return (
        <View
            style={{
                // paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'center',
                // backgroundColor: "pink",
                padding: 4
            }}>
            <Menu
                theme={{ colors: { primary: 'green' } }}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    // <MaterialCommunityIcons name='dots-vertical' size={18} onPress={openMenu} color={"rgba(0, 0, 0, .6)"} />
                    <TouchableOpacity onPress={openMenu} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", columnGap: 5 }}>
                        <Text style={[{ textTransform: "uppercase" }, SIZES2.text_md]}>{incomeReportType}</Text>
                        <Feather name='chevron-down' size={16} />
                    </TouchableOpacity>
                }>
                <Menu.Item onPress={() => {
                    setIncomeReportType("total")
                    closeMenu()
                }} title="Total" />
                <Menu.Item onPress={() => {
                    setIncomeReportType("monthly")
                    closeMenu()
                }} title="Monthly" />
                <Divider />
                <Menu.Item onPress={() => {
                    setIncomeReportType("yearly")
                    closeMenu()
                }} title="Yearly" />
                <Divider />

            </Menu>
        </View>
    );
};

export default VenueIncomeActionsList;