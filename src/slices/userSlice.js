import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : '';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: 'pk.eyJ1IjoiYXJuYXZwdXJpIiwiYSI6ImNrZHNhb3ppYTBkNDYyeHFza3diMXZtdnkifQ.fCuBiUZ9JjgUbBlaBDvPrw',
        loggedIn: false,
        email: userData?.email ? userData.email : '', 
        uid: userData?.uid ? userData.uid : '',
        name: userData?.name ? userData.name : '',
        location: userData?.location ? userData.location : '', 
        profession: userData?.profession ? userData.profession : '', 
        visited: [],
        trips: []
    }, 
    reducers: {
        setUser: (state, action) => {
            state.loggedIn = true;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            localStorage.setItem('user', JSON.stringify({ ...state, email: action.payload.email, uid: action.payload.uid })); 
        }, 
        removeUser: (state) => {
            state.loggedIn = false;
            state.email = null;
            state.uid = null;
            localStorage.clear();
        },
        setDetails: (state, action) => {
            console.log(action.payload)
            state.name = action.payload.name;
            state.location = action.payload.location;
            state.profession = action.payload.profession;
            localStorage.setItem('user', JSON.stringify({ ...state, 
                name: action.payload.name, 
                location: action.payload.location, 
                profession: action.payload.profession }))
        }, 
        setTrips: (state, action) => {
            state.trips = action.payload;
            localStorage.setItem('user', JSON.stringify({ ...state, trips: action.payload }));
        }, 
        setVisited: (state, action) => {
            state.visited = action.payload;
            localStorage.setItem('user', JSON.stringify({ ...state, visited: action.payload }))
        }
    }
});

export const { setUser,removeUser, setDetails, setTrips, setVisited } = userSlice.actions;
export default userSlice.reducer;