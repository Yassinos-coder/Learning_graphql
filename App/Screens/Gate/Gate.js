import { View, Text, Button } from 'react-native'
import React from 'react'
import axios from 'axios'

const Gate = () => {
    const Signup = async () => {
        const GraphQLQuery = {
            query: `
              mutation signup($input: SignupInput!) {
                signup(input: $input) {
                  id
                  name
                  email
                }
              }
            `,
            variables: {
              input: {
                name: 'John Doe', // Add the name field
                email: 'john.doe@example.com', // Add the email field
                password: 'yourPasswordHere', // Add password or other fields required
              },
            },
        };
    
        try {
            const response = await axios.post('http://localhost:8009/graphql', GraphQLQuery, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Signup successful:', response.data);
            // You can use response.data to handle the signup data or error
        } catch (err) {
            console.error('Error during signup:', err);
            throw err;
        }
    };
    

    return (
        <View>
            <Button onPress={Signup}>Test</Button>
        </View>
    )
}

export default Gate