import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

export default function App() {
    const navigate = useNavigate();
    const { loggedIn } = useSelector(state => state.user);
    const state = localStorage.getItem('user');

    useEffect(() => {
        if (!loggedIn && state === null) navigate("/login");
        else navigate("/")
        // eslint-disable-next-line
    }, [loggedIn])
    
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />}>
                <Route index element={<Profile />} />
            </Route>
        </Routes>
    )
}