import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Global, 
    All, 
    SigninTitle, 
    SigninLabel, 
    SigninInput, 
    SigninButton
} from '../styled-components';
import { registerUser, saveUser } from '../firebase-config';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmError, setConfirmError] = useState(null);
    const [valid, setValid] = useState(emailError === null && passwordError === null && confirmError === null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <All>
            <Global />
            <SigninTitle>Sign up as new user</SigninTitle>
            <SigninLabel htmlFor='email' >Email {emailError}</SigninLabel>
            <SigninInput type="text" name='email' onChange={(ev) => setEmail(ev.target.value)} onBlur={() => {
                const match = email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
                if (match === null) {
                    setEmailError('is invalid');
                    setValid(emailError === null && passwordError === null && confirmError === null);
                }
                else {
                    setEmailError(null);
                    setValid(emailError === null && passwordError === null && confirmError === null);
                }
            }} border={emailError === null ? 'gray' : 'red'} />
            <SigninLabel htmlFor='password' >Password {passwordError}</SigninLabel>
            <SigninInput type="password" name='password' onChange={(ev) => setPassword(ev.target.value)} onBlur={() => {
                if (password.length < 4) {
                    setPasswordError('must be at least 4 characters long');
                    setValid(emailError === null && passwordError === null && confirmError === null);
                }
                else {
                    setPasswordError(null);
                    setValid(emailError === null && passwordError === null && confirmError === null);
                }
            }} border={passwordError === null ? 'gray' : 'red'} />
            <SigninLabel htmlFor='confirm' >Password confirmation {confirmError}</SigninLabel>
            <SigninInput type="password" name='confirm' onChange={(ev) => setConfirm(ev.target.value)} onBlur={() => {
                if (password !== confirm || confirm.length === 0) {
                    setConfirmError('does not match password');
                    setValid(emailError === null && passwordError === null && confirmError === null);
                }
                else {
                    setConfirmError(null);
                    setValid(emailError === null && passwordError === null && confirmError === null);
                }
            }} border={confirmError === null ? 'gray' : 'red'} />
            <SigninButton disabled={!valid} onClick={async () => {
                const response = await registerUser(email, password);
                if (response !== null) {
                    dispatch(setUser({ email: response.email, uid: response.iud }));
                    saveUser(response.uid);
                    navigate("/");
                }
            }}>Sign Up</SigninButton>

            <Link to="/login" style={{ alignSelf: 'center', fontSize: '12px', color: 'blue', marginTop: '5px' }}>Already signed up? Login</Link>
        </All>
    )
}