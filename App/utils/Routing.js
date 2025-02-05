import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'  // Missing import
import Gate from '../Screens/Gate/Gate'

const Stack = createStackNavigator()

const Routing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Gate">
                <Stack.Screen
                    name="Gate"
                    component={Gate}
                    options={{ headerShown: false }}  // This will remove the header entirely
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routing
