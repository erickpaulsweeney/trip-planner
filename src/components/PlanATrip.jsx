import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Banner,
    DeleteButton,
    LocOptions,
    LocOptionsDiv,
    LocWrapper,
    OutletDiv,
    PlanDateInput,
    PlanDateWrapper,
    SigninButton,
    SigninInput,
    SigninLabel,
    StyledBold,
    TripLocationDiv,
    TripsDiv,
    TripStatus,
    TripStatusOption,
    UserFullDiv
} from '../styled-components';
import { fetchTrips, updateTrips } from '../firebase-config';
import { setTrips } from '../slices/userSlice';

export default function PlanATrip() {
    const { token, uid } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [status, setStatus] = useState(null);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [locations, setLocations] = useState([]);
    const [place, setPlace] = useState('');
    const [list, setList] = useState([]);
    const currDate = new Date();

    const searchLoc = async (input) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`)
        const data = await response.json();
        setList(data.features);
    }

    const handleSubmit = async () => {
        const tripObj = {
            status: status || 'planning',
            title: title || 'Unnamed Trip',
            start: start || currDate.toISOString().split('T')[0],
            end: end || start || currDate.toISOString().split('T')[0],
            locations: locations.length > 0 ? locations : ['Unnamed location']
        }
        const fetch = await fetchTrips(uid);
        if (fetch === null) {
            updateTrips(uid, [tripObj]);
            dispatch(setTrips([tripObj]));
        }
        else {
            const newTrips = fetch.trips;
            if (newTrips[0] === 'placeholder') {
                updateTrips(uid, [tripObj]);
                dispatch(setTrips([tripObj]));
            }
            else {
                newTrips.push(tripObj);
                updateTrips(uid, newTrips);
                dispatch(setTrips(newTrips));
            }
        }
        clearForm();
    }

    const clearForm = () => {
        setStatus(null);
        setTitle('');
        setStart(null);
        setEnd(null);
        setLocations([]);
        setPlace('');
    }

    const removeLocation = (input) => {
        let newLocations = locations.slice();
        newLocations.splice(input, 1);
        setLocations(newLocations);
    }

    return (
        <OutletDiv>
            <Banner>
                Plan your next adventure
                <TripStatus value={status} onChange={(ev) => setStatus(ev.target.value)}
                    selected={status === 'cancelled' ? '#ffb4b4' : status === 'completed' ? '#adff9b' : '#ffe89b'}>
                    <TripStatusOption value='planning'>Planning</TripStatusOption>
                    <TripStatusOption value='completed'>Completed</TripStatusOption>
                    <TripStatusOption value='cancelled'>Cancelled</TripStatusOption>
                </TripStatus>
            </Banner>
            <UserFullDiv>
                <SigninLabel htmlFor='trip-title'>What would your adventure be called?</SigninLabel>
                <SigninInput type='text' name='trip-title' value={title} onChange={(ev) => setTitle(ev.target.value)} />
                <PlanDateWrapper>
                    <SigninLabel htmlFor='trip-start'>When does your adventure <StyledBold>start</StyledBold>?</SigninLabel>
                    <PlanDateInput type='date' name='trip-start' onChange={(ev) => setStart(ev.target.value)} style={{ marginRight: '20px' }} />
                    <SigninLabel htmlFor='trip-end'>When does your adventure <StyledBold>end</StyledBold>?</SigninLabel>
                    <PlanDateInput type='date' name='trip-end'
                        min={start !== null ? start : ''}
                        value={end !== null ? end : start !== null ? start : ''}
                        isDisabled={start === null}
                        onChange={(ev) => setEnd(ev.target.value)}
                    />
                </PlanDateWrapper>
                <SigninLabel htmlFor='trip-locations'>Where do you plan to go?</SigninLabel>
                <LocWrapper>
                    <SigninInput type='text' name='location' value={place} style={{ marginBottom: '0' }}
                        onFocus={(ev) => searchLoc(ev.target.value)}
                        onChange={(ev) => {
                            setPlace(ev.target.value);
                            searchLoc(ev.target.value);
                        }}
                        onBlur={() => setTimeout(() => setList([]), 200)} />
                    {list.length > 0 &&
                        <LocOptionsDiv>
                            {list.map(el => <LocOptions key={el.id} onClick={() => {
                                let newLocations = locations.slice();
                                newLocations.push(el.place_name);
                                setLocations(newLocations);
                                setPlace('');
                                setList([]);
                            }}>{el.place_name}</LocOptions>)}
                        </LocOptionsDiv>
                    }
                </LocWrapper>
                <TripsDiv>
                    {locations.length > 0 && locations.map((el, idx) => <TripLocationDiv key={el}>
                        {el} <DeleteButton onClick={() => removeLocation(idx)}>✕</DeleteButton>
                    </TripLocationDiv>)}
                </TripsDiv>
                <SigninButton onClick={handleSubmit}>Save adventure</SigninButton>
            </UserFullDiv>
        </OutletDiv>
    )
}