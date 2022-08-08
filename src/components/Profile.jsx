import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../firebase-config";
import { setDetails } from "../slices/userSlice";
import {
    OutletDiv,
    SigninLabel,
    SigninInput,
    SigninButton,
    Banner,
    UserDiv,
    NoDetails,
    UserDetail,
    UserDetailsDiv,
    LocOptionsDiv,
    LocOptions,
    LocWrapper,
    Focus,
    OutletSubDiv,
    EditButton,
    TripItem,
    TripItemTitle,
} from "../styled-components";
import { Link } from "react-router-dom";

export default function Profile() {
    const { token, uid, name, location, profession, visited } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(name.length === 0);
    const [newName, setNewName] = useState(name);
    const [newLocation, setNewLocation] = useState(location);
    const [newProfession, setNewProfession] = useState(profession);
    const [list, setList] = useState([]);

    const searchLoc = async (input) => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`
        );
        const data = await response.json();
        setList(data.features);
    };

    useEffect(() => {
        setEdit(name.length === 0);
    }, [name]);

    return (
        <OutletDiv>
            <Banner>
                Welcome back, {name?.length > 0 ? name : "adventurer"}!
            </Banner>
            <OutletSubDiv>
                {edit && (
                    <UserDiv>
                        <NoDetails>
                            {name
                                ? "Edit your details"
                                : "No profile details yet"}
                        </NoDetails>
                        <SigninLabel htmlFor="name">Your name:</SigninLabel>
                        <SigninInput
                            type="text"
                            name="name"
                            value={newName}
                            onChange={(ev) => setNewName(ev.target.value)}
                        />
                        <SigninLabel htmlFor="location">
                            Your location:
                        </SigninLabel>
                        <LocWrapper>
                            <SigninInput
                                type="text"
                                name="location"
                                value={newLocation}
                                style={{ marginBottom: "0" }}
                                onFocus={(ev) => searchLoc(ev.target.value)}
                                onChange={(ev) => {
                                    setNewLocation(ev.target.value);
                                    searchLoc(ev.target.value);
                                }}
                                onBlur={() =>
                                    setTimeout(() => setList([]), 200)
                                }
                            />
                            {list.length > 0 && (
                                <LocOptionsDiv>
                                    {list.map((el) => (
                                        <LocOptions
                                            key={el.id}
                                            onClick={() => {
                                                setNewLocation(el.place_name);
                                                setList([]);
                                            }}
                                        >
                                            {el.place_name}
                                        </LocOptions>
                                    ))}
                                </LocOptionsDiv>
                            )}
                        </LocWrapper>
                        <SigninLabel htmlFor="profession">
                            Your profession:
                        </SigninLabel>
                        <SigninInput
                            type="text"
                            name="profession"
                            value={newProfession}
                            onChange={(ev) => setNewProfession(ev.target.value)}
                        />
                        <SigninButton
                            onClick={() => {
                                dispatch(
                                    setDetails({
                                        name: newName,
                                        location: newLocation,
                                        profession: newProfession,
                                    })
                                );
                                updateUser(
                                    uid,
                                    newName,
                                    newLocation,
                                    newProfession
                                );
                                setEdit(false);
                            }}
                        >
                            Save
                        </SigninButton>
                    </UserDiv>
                )}
                {!edit && (
                    <UserDiv>
                        <EditButton onClick={() => setEdit(true)}>
                            Edit details
                        </EditButton>
                        <UserDetailsDiv>
                            <UserDetail>Name</UserDetail>
                            <UserDetail>
                                <Focus>{name}</Focus>
                            </UserDetail>
                        </UserDetailsDiv>
                        <UserDetailsDiv>
                            <UserDetail>Location</UserDetail>
                            <UserDetail>
                                <Focus>{location}</Focus>
                            </UserDetail>
                        </UserDetailsDiv>
                        <UserDetailsDiv>
                            <UserDetail>Profession</UserDetail>
                            <UserDetail>
                                <Focus>{profession}</Focus>
                            </UserDetail>
                        </UserDetailsDiv>
                    </UserDiv>
                )}
                <UserDiv>
                    {visited.length === 0 && (
                        <UserDetailsDiv>
                            <Link to="/plan-a-trip">
                                <EditButton>Plan a trip</EditButton>
                            </Link>
                            <NoDetails>No visited locations yet</NoDetails>
                        </UserDetailsDiv>
                    )}
                    {visited.length !== 0 && (
                        <>
                            <NoDetails>Your visited adventure spots</NoDetails>
                            <UserDetailsDiv>
                                {visited.map((el) => (
                                    <TripItem
                                        key={
                                            el +
                                            Math.floor(Math.random() * 1000)
                                        }
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <TripItemTitle>{el}</TripItemTitle>
                                    </TripItem>
                                ))}
                            </UserDetailsDiv>
                        </>
                    )}
                </UserDiv>
            </OutletSubDiv>
        </OutletDiv>
    );
}
