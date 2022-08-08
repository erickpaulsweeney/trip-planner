import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Commissioner', sans-serif;
    }

    body {
        overflow: hidden;
        background: #F2F2F2;
        color: black;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;

export const All = styled.div`
    max-width: 1000px;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const SigninTitle = styled.div`
    height: 10em;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20px;
`;

export const SigninLabel = styled.label`
    font-size: 18px;
`;

export const SigninInput = styled.input`
    width: 100%;
    font-size: 20px;
    padding: 10px;
    border: 1px solid ${(props) => props.border};
    border-radius: 5px;
    margin-bottom: 20px;
    position: relative;
    background-color: white;

    &:focus {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;

export const PlanDateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const PlanDateInput = styled.input`
    width: 50%;
    font-size: 20px;
    padding: 10px;
    border: 1px solid ${(props) => props.border};
    border-radius: 5px;
    margin-bottom: 20px;
    position: relative;
    background-color: white;

    &:focus {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;

export const SigninButton = styled.button`
    min-width: 7em;
    height: 2em;
    padding: 0 1.5em;
    font-size: 18px;
    font-weight: 500;
    align-self: center;
    border: none;
    border-radius: 3em;
    background-color: white;
    border: 2px solid #140f77;
    color: #140f77;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #140f77;
    }
`;

export const NavBar = styled.div`
    width: 100%;
    height: 10em;
    border-bottom: 1px solid #0d0d0d;
    position: relative;
`;

export const NavTitle = styled.div`
    width: 100%;
    height: 50%;
    font-family: "Secular One", sans-serif;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #140f77;
    background: -webkit-radial-gradient(center, #140f77, #3f2793);
    background: -moz-radial-gradient(center, #140f77, #3f2793);
    background: radial-gradient(ellipse at center, #140f77, #3f2793);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const NavItemsDiv = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    gap: 30px;
`;

export const NavItem = styled.div`
    height: 100%;
    font-family: "Secular One", sans-serif;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 5px solid transparent;
    color: #6f6f6f;
    cursor: pointer;

    &:hover {
        color: #0d0d0d;
        border-bottom: 5px solid #140f77;
    }
`;

export const OutletDiv = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const OutletSubDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Banner = styled.div`
    width: 100%;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 700;
    position: relative;
`;

export const UserDiv = styled.div`
    width: 47%;
    min-height: 30em;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
`;

export const UserFullDiv = styled.div`
    width: 100%;
    min-height: 30em;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const NoDetails = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const UserDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    max-height: 30em;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const UserDetail = styled.div`
    font-size: 18px;
`;

export const Focus = styled.span`
    font-size: 24px;
    font-weight: 600;
    color: #140f77;
`;

export const StyledBold = styled.span`
    font-weight: 600;
    color: #140f77;
`;

export const LocOptionsDiv = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 3;
    background-color: white;
    border: 1px solid gray;
`;

export const LocOptions = styled.div`
    width: 100%;
    height: 2em;
    font-size: 14px;
    padding: 5px 10px;
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
`;

export const LocWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

export const SignOutButton = styled.div`
    position: absolute;
    bottom: 1em;
    right: 0em;
    width: 6em;
    height: 2em;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 3em;
    background-color: white;
    border: 2px solid #140f77;
    color: #140f77;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #140f77;
    }
`;

export const EditButton = styled.div`
    position: absolute;
    top: 0em;
    right: 0em;
    width: 7em;
    height: 2em;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 3em;
    background-color: white;
    border: 2px solid #140f77;
    color: #140f77;
    z-index: 2;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #140f77;
    }
`;

export const TripsDiv = styled.div`
    width: 100%;
    max-height: 7em;
    margin-bottom: 20px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const TripLocationDiv = styled.div`
    min-width: 10em;
    max-height: 2.5em;
    padding: 0.3em 1em;
    font-size: 14px;
    background-color: white;
    border: 1px solid gray;
    border-radius: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const DeleteButton = styled.button`
    background-color: transparent;
    color: gray;
    font-size: 12px;
    border: none;
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #140f77;
        color: white;
        font-weight: 600;
    }
`;

export const TripStatus = styled.select`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 10em;
    padding: 0.2em 1em;
    border-radius: 1em;
    font-size: 14px;
    background-color: ${(props) => props.selected};
    cursor: pointer;
`;

export const TripStatusOption = styled.option`
    font-size: 14px;
    display: ${(props) => props.selected};
    background-color: white;
`;

export const AllTripsDiv = styled.div`
    width: 100%;
    min-height: 30em;
    display: flex;
    justify-content: space-between;
`;

export const AllTripsSubDiv = styled.div`
    width: 30%;
    min-height: 30em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    border: 1px solid gray;
    border-radius: 10px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const SubBanner = styled.div`
    width: 100%;
    max-height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const TripItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid gray;
    border-bottom: 3px solid gray;
    padding: 0.5em 1em;
    border-radius: 10px;
    transition: all 500ms ease;
    cursor: pointer;
    position: relative;

    &:hover {
        border-bottom: 1px solid gray;
    }
`;

export const TripItemTitle = styled.div`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: #140f77;
`;

export const TripItemDate = styled.div`
    width: 100%;
    font-size: 14px;
    color: gray;
`;

export const TripItemDelete = styled.button`
    background-color: transparent;
    color: gray;
    font-size: 10px;
    border: none;
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0.5em;
    right: 0.5em;

    &:hover {
        background-color: #140f77;
        color: white;
        font-weight: 600;
    }
`;