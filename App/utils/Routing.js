import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gate from "../Screens/Gate/Gate";

const Stack = createNativeStackNavigator();

const Routing = () => {
    return (
        <Stack.Navigator initialRouteName="Gate">
            <Stack.Screen name="Gate" component={Gate} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Routing;
