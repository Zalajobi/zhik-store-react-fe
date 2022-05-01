import { createSlice } from '@reduxjs/toolkit'

export const authTokenSlice = createSlice({
	name: 'authToken',
	initialState: {
		value: '',
	},
	reducers: {
		authorizationToken: (state, action) => {
			console.log(action.payload)
			state.value = action.payload
			console.log(state.value)
		},
	},
})

export const { authorizationToken } = authTokenSlice.actions

export const authorizationTokenAsync = (token) => (dispatch) => {
	setTimeout(() => {
		dispatch(authorizationToken(token))
	}, 1000)
}

export const getAuthToken = (state) => {
	console.log(state.authToken.value)
	return state.authToken.value
}

export const selectAuthToken = (state) => state.authToken.value

export default authTokenSlice.reducer
