import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { List } from 'react-native-paper';
import { COLORS } from '../../../../theme/globalStyle';
import { useFormikContext } from 'formik';

const SelectList = ({ name = "", error = false, value = "", list = [], title = "Select Ground Type" }) => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const { setFieldValue } = useFormikContext();


    return (
        <List.Section>
            <List.Accordion
                style={{ backgroundColor: COLORS.bg_primary, borderBottomWidth: error ? 2 : .5, borderBottomColor: error ? '#ad2111' : null }}
                title={value ? value : title}
                left={props => <List.Icon {...props} icon={() => <MaterialCommunityIcons name='city' size={18} />} />}
            >

                {
                    list.map(item => (
                        <List.Item key={item} title={item} onPress={() => setFieldValue(name, item)} />
                    ))
                }
                {/* <List.Item title="ARTIFICIAL_TURF" onPress={() => setFieldValue(name, item)} /> */}
            </List.Accordion>
        </List.Section>
    );
};

export default SelectList;