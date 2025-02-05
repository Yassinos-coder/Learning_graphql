import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosDefault from "../utils/AxiosDefault";
import * as SecureStore from 'expo-secure-store'

export const signup = createAsyncThunk("usersActions/signup", async ({ SignupData }, { rejectWithValue }) => {
    try {
        const GraphQLQuery = {
            query: `
              mutation signup($input: SignupInput!) {
                signup(input: $input) {
                  id
                  name
                  email
                  token  
                }
              }
            `,
            variables: {
                input: {
                    name: SignupData.name, // Add the name field
                    email: SignupData.email, // Add the email field
                    password: SignupData.password, // Add password or other fields required
                },
            },
        };
        const response = await AxiosDefault.post("/graphql", GraphQLQuery);
        return response.data.data.signup;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const signin = createAsyncThunk(
    'usersActions/signin',
    async ({ SigninData }, { rejectWithValue }) => {
      const GraphQLQuery = {
        query: `
          mutation signin($input: SigninInput!) {
            signin(input: $input) {
              id
              email
              token
            }
          }
        `,
        variables: {
          input: {
            email: SigninData.email,
            password: SigninData.password,
          },
        },
      };
  
      try {
        const response = await AxiosDefault.post('/graphql', GraphQLQuery);
        // Return the user data including token
        return response.data.data.signin;
      } catch (err) {
        // Reject with an error message
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );



const UserReducer = createSlice({
    name: "userActionsHandler",
    initialState: {
        user: null,
        status: "idle", // "idle" | "loading" | "succeeded" | "failed"
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                SecureStore.setItemAsync('jwtToken', action.payload.token)
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default UserReducer.reducer;
