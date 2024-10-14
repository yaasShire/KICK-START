import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { COLORS } from '../../../../../theme/globalStyle';

const MenueActionsList = ({ onEdit = () => { }, onDelete = () => { }, showEdit = true }) => {
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
                anchor={<MaterialCommunityIcons name='dots-vertical' size={18} onPress={openMenu} color={"rgba(0, 0, 0, .6)"} />}>
                {
                    showEdit &&
                    <Menu.Item onPress={() => {
                        onEdit()
                        closeMenu()
                    }} title="Edit" />
                }
                <Divider />
                <Menu.Item onPress={() => {
                    onDelete()
                    closeMenu()
                }} title="Delete" />
            </Menu>
        </View>
    );
};

export default MenueActionsList;