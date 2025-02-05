import { View, Text } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../redux/UserReducer";
import GateStyle from "./GateStyle";
import { Input, Button } from '@rneui/themed';

const Gate = () => {
  const dispatch = useDispatch();
  const [SignupData, setSignupData] = useState({})
  const [SigninData, setSigninData] = useState({})


  const TriggerSignup = () => {
    dispatch(signup({ SignupData: SignupData }));
  };

  const TriggerSignin = () => {
    dispatch(signin({ SigninData: SigninData }));

  }

  return (
    <View style={GateStyle.container}>
      <Text>Sign up Box</Text>
      <Input
        placeholder="Name"
        label="Name"
        style={GateStyle.inputs}
        onChangeText={(text) => setSignupData({ ...SignupData, name: text })}
      />
      <Input
        placeholder="Email"
        label="Email"
        style={GateStyle.inputs}
        onChangeText={(text) => setSignupData({ ...SignupData, email: text })}

      />
      <Input
        placeholder="Password"
        label="Password"
        style={GateStyle.inputs}
        onChangeText={(text) => setSignupData({ ...SignupData, password: text })}

      />

      <Button
        title="Sign up"
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => TriggerSignup()}
      />
      <Input
        placeholder="Email"
        label="Email"
        style={GateStyle.inputs}
        onChangeText={(text) => setSigninData({ ...SigninData, email: text })}
      />
      <Input
        placeholder="Password"
        label="Password"
        style={GateStyle.inputs}
        onChangeText={(text) => setSigninData({ ...SigninData, password: text })}

      />
      <Button
        title="Sign in"
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => TriggerSignin()}
      />
    </View>
  );
};

export default Gate;
