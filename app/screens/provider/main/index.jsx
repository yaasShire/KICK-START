import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ProvierBottomTabs from '../components/providerBottomTabs'
import { useNavigation } from '@react-navigation/native'
import { hideBottomTabs } from '../../../utilities'

const MainProvider = () => {
    const { getParent } = useNavigation()

    useEffect(() => {
        return hideBottomTabs(getParent)
    }, [])
    
    return (
        <ProvierBottomTabs />
    )
}

export default MainProvider