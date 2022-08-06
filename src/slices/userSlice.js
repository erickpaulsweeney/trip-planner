import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: 'pk.eyJ1IjoiYXJuYXZwdXJpIiwiYSI6ImNrZHNhb3ppYTBkNDYyeHFza3diMXZtdnkifQ.fCuBiUZ9JjgUbBlaBDvPrw',
        loggedIn: false,
        email: null, 
        uid: null,
        name: '',
        location: '', 
        profession: '', 
        visited: [],
        trips: {
            updated: false,
            upcoming: [],
            completed: [],
            cancelled: []
        }
    }, 
    reducers: {
        setUser: (state, action) => {
            state.loggedIn = true;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            localStorage.setItem('user', JSON.stringify({ email: action.payload.email, uid: action.payload.uid })); 
        }, 
        setDetails: (state, action) => {
            console.log(action.payload);
            state.name = action.payload.name;
            state.location = action.payload.location;
            state.profession = action.payload.profession;
            localStorage.setItem('user', JSON.stringify({ ...state, 
                name: action.payload.name, 
                location: action.payload.location, 
                profession: action.payload.profession }))
        }
    }
});

export const { setUser, setDetails } = userSlice.actions;
export default userSlice.reducer;