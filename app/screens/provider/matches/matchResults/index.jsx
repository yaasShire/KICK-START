import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import MatchCard from '../components/matchCard'
import { LAY_OUT } from '../../../../theme/globalStyle'
// import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import { authorizedProviderPost } from '../../../../api/authorizedProviderPost'
import { useFocusEffect } from '@react-navigation/native'
import EmptyC from '../../components/emptyC'

const MatchResults = ({ route }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [matches, setMatches] = useState([])

    const fetchMatchesByDate = async () => {
        try {
            const requestData = {
                date: route.params?.date
            }
            const { result } = await authorizedProviderPost("booking/getMatchesByDate", setError, setLoading, JSON.stringify(requestData))
            console.log(result);
            if (result?.message == "Matches retrieved successfully") {
                setMatches(result?.data)
            }
            if (result?.message == "No matches found for the specified date") {
                setMatches([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchMatchesByDate()
        }, [])
    )
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ padding: LAY_OUT.padding, rowGap: 12 }}
                data={matches}
                renderItem={({ item }) => (
                    <MatchCard data={item} />
                )}
                ListEmptyComponent={() => (
                    <EmptyC title='No Matches Found!' />
                )}
            />
        </View>
    )
}

export default MatchResults

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})