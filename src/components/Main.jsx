import React from 'react'
import {
    Global,
    All,
    NavBar,
    NavTitle,
    NavItemsDiv,
    NavItem,
    SignOutButton
} from '../styled-components'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeUser } from '../slices/userSlice';
import { signoutUser } from '../firebase-config';

export default function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <All>
            <Global />
            <NavBar>
                <NavTitle>Dream Adventures</NavTitle>
                <NavItemsDiv>
                    <Link to={''}><NavItem>Profile</NavItem></Link>
                    <Link to={'plan-a-trip'}><NavItem>Plan a trip</NavItem></Link>
                </NavItemsDiv>
                <SignOutButton onClick={() => {
                    dispatch(removeUser());
                    signoutUser();
                    navigate("/login");
                }}>Sign Out</SignOutButton>
            </NavBar>
            <Outlet />
        </All>
    )
}