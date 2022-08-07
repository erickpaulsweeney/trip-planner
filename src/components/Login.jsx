import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Global, 
    All, 
    SigninTitle, 
    SigninLabel, 
    SigninInput, 
    SigninButton
} from '../styled-components';
import { loginUser, saveUser } from '../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { setDetails, setTrips, setUser, setVisited } from '../slices/userSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [valid, setValid] = useState(emailError === null && passwordError === null);
    const { loggedIn } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) navigate("/");
        // eslint-disable-next-line
    }, [loggedIn])
    
    return (
        <All>
            <Global />
            <SigninTitle>Login</SigninTitle>
            <SigninLabel htmlFor='email' >Email {emailError}</SigninLabel>
            <SigninInput type="text" name='email' onChange={(ev) => setEmail(ev.target.value)} onBlur={() => {
                const match = email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
                if (match === null) {
                    setEmailError('is invalid');
                    setValid(emailError === null && passwordError === null);
                }
                else {
                    setEmailError(null);
                    setValid(emailError === null && passwordError === null);
                }
            }} border={emailError === null ? 'gray' : 'red'} />
            <SigninLabel htmlFor='password' >Password {passwordError}</SigninLabel>
            <SigninInput type="password" name='password' onChange={(ev) => setPassword(ev.target.value)} onBlur={() => {
                if (password.length < 4) {
                    setPasswordError('must be at least 4 characters long');
                    setValid(emailError === null && passwordError === null);
                }
                else {
                    setPasswordError(null);
                    setValid(emailError === null && passwordError === null);
                }
            }} border={passwordError === null ? 'gray' : 'red'} />
            <SigninButton disabled={!valid} onClick={async () => {
                const response = await loginUser(email, password);
                if (response !== null) {
                    const prevData = await saveUser(response.uid);
                    console.log(prevData)
                    if (typeof prevData === 'object') {
                        if (prevData.name !== response.uid && prevData.location !== response.uid && prevData.profession !== response.uid) {
                            console.log('test')
                            dispatch(setDetails({ name: prevData.name, location: prevData.location, profession: prevData.profession }));
                        }
                        if (prevData.trips[0] !== "placeholder") {
                            dispatch(setTrips(prevData.trips));
                        }
                        if (prevData.visited[0] !== "placeholder") {
                            dispatch(setVisited(prevData.visited));
                        }
                    }
                    dispatch(setUser({ email: response.email, uid: response.uid }));
                }
            }} >Login</SigninButton>

            <Link to="/signup" style={{ alignSelf: 'center', fontSize: '12px', color: 'blue', marginTop: '5px' }}>No account yet? Sign up</Link>
        </All>
    )
}