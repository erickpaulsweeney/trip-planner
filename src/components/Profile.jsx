import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDetails } from '../slices/userSlice';
import {
    OutletDiv,
    SigninLabel,
    SigninInput,
    SigninButton,
    Banner,
    UserDiv,
    NoDetails,
    UserDetail,
    LocOptionsDiv,
    LocOptions,
    LocWrapper, 
    Focus
} from '../styled-components';

export default function Profile() {
    const { token, name, location, profession } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(name ? false : true);
    const [newName, setNewName] = useState(name);
    const [newLocation, setNewLocation] = useState(location);
    const [newProfession, setNewProfession] = useState(profession);
    const [list, setList] = useState([]);

    const searchLoc = async (input) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`)
        const data = await response.json();
        setList(data.features);
    }

    return (
        <OutletDiv>
            <Banner>Welcome back, {name.length > 0 ? name : 'adventurer'}!</Banner>
            {edit &&
                <UserDiv>
                    <NoDetails>{name ? 'Edit your details' : 'No profile details yet'}</NoDetails>
                    <SigninLabel htmlFor='name' >Your name:</SigninLabel>
                    <SigninInput type='text' name='name' value={newName} onChange={(ev) => setNewName(ev.target.value)} />
                    <SigninLabel htmlFor='location' >Your location:</SigninLabel>
                    <LocWrapper>
                        <SigninInput type='text' name='location' value={newLocation}
                            onFocus={(ev) => searchLoc(ev.target.value)}
                            onChange={(ev) => {
                                setNewLocation(ev.target.value);
                                searchLoc(ev.target.value);
                            }}
                            onBlur={() => setTimeout(() => setList([]), 200)} />
                        {list.length > 0 &&
                            <LocOptionsDiv>
                                {list.map(el => <LocOptions key={el.id} onClick={() => {
                                    console.log(el.place_name);
                                    setNewLocation(el.place_name);
                                    setList([]);
                                }}>{el.place_name}</LocOptions>)}
                            </LocOptionsDiv>
                        }
                    </LocWrapper>
                    <SigninLabel htmlFor='profession' >Your profession:</SigninLabel>
                    <SigninInput type='text' name='profession' value={newProfession} onChange={(ev) => setNewProfession(ev.target.value)} />
                    <SigninButton onClick={() => {
                        dispatch(setDetails({ name: newName, location: newLocation, profession: newProfession }));
                        setEdit(false);
                    }}>Save</SigninButton>
                </UserDiv>}
            {!edit &&
                <UserDiv>
                    <UserDetail>Name: <Focus>{name}</Focus></UserDetail>
                    <UserDetail>Location: <Focus>{location}</Focus></UserDetail>
                    <UserDetail>Profession: <Focus>{profession}</Focus></UserDetail>
                </UserDiv>}
            
        </OutletDiv>
    )
}