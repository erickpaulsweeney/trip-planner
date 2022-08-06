import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
}

body {
    overflow: hidden;
    background-image: linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% );;
}

a {
    color: inherit;
    text-decoration: none;
}
`

export const All = styled.div`
    width: 70%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`

export const SigninTitle = styled.div`
    height: 10em;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20px;
`

export const SigninLabel = styled.label`
    font-size: 18px;
`

export const SigninInput = styled.input`
    width: 100%;
    font-size: 20px;
    padding: 10px;
    border: 1px solid ${props => props.border};
    border-radius: 5px;
    margin-bottom: 20px;
    position: relative;
    background-color: white;
`

export const SigninButton = styled.button`
    width: 10em;
    height: 2em;
    font-size: 18px;
    align-self: center;
`

export const NavBar = styled.div`
    width: 100%;
    height: 10em;
    border-bottom: 1px solid #14213d;
`

export const NavTitle = styled.div`
    width: 100%;
    height: 50%;
    font-size: 36px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const NavItemsDiv = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    gap: 30px;
`

export const NavItem = styled.div`
    height: 100%;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 5px solid transparent;
    cursor: pointer;

    &:hover {
        color: black;
        border-bottom: 5px solid #457b9d;
    }
`

export const OutletDiv = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Banner = styled.div`
    width: 100%;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 700;
`

export const UserDiv = styled.div`
    width: 50%;
    min-height: 30em;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const NoDetails = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`

export const UserDetail = styled.div`
    font-size: 20px;
`

export const LocOptionsDiv = styled.div`
    position: absolute;
    top: 80%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 3;
    background-color: white;
    border: 1px solid gray;
    border-bottom: none;
    border-radius: 5px;
`

export const LocOptions = styled.div`
    width: 100%;
    height: 2em;
    font-size: 18px;
    padding: 5px 10px;
    border-bottom: 1px solid gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
        background-color: dodgerblue;
        color: white;
    }

    &:active {
        background-color: dodgerblue;
        color: white;
    }
`

export const LocWrapper = styled.div`
    position: relative;
`

export const Focus = styled.span`
    font-weight: 700;
    color: #444444;
`