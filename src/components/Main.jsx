import React from 'react'
import {
    Global,
    All,
    NavBar,
    NavTitle,
    NavItemsDiv,
    NavItem
} from '../styled-components'
import { Link, Outlet } from "react-router-dom";

export default function Main() {
    return (
        <All>
            <Global />
            <NavBar>
                <NavTitle>Dream Adventures</NavTitle>
                <NavItemsDiv>
                    <Link to={''}><NavItem>Profile</NavItem></Link>
                    <Link to={'plan-a-trip'}><NavItem>Plan a trip</NavItem></Link>
                </NavItemsDiv>
            </NavBar>
            <Outlet />
        </All>
    )
}