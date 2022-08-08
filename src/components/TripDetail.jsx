import React, { useState } from "react";
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
    UserFullDiv,
} from "../styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setTrips } from "../slices/userSlice";
import { updateTrips } from "../firebase-config";

export default function TripDetail() {
    const { idx } = useParams();
    const { token, uid, trips } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selected = trips[idx];
    const [place, setPlace] = useState("");
    const [locations, setLocations] = useState(selected.locations);
    const [list, setList] = useState([]);
    const [status, setStatus] = useState(selected.status);
    const [title, setTitle] = useState(selected.title);
    const [start, setStart] = useState(selected.start);
    const [end, setEnd] = useState(selected.end);

    const handleClick = () => {
        let newTrips = JSON.parse(JSON.stringify(trips));
        newTrips[idx].locations = locations;
        newTrips[idx].status = status;
        newTrips[idx].title = title;
        newTrips[idx].start = start;
        newTrips[idx].end = end;
        dispatch(setTrips(newTrips));
        updateTrips(uid, newTrips);
        navigate("/trips");
    };

    const searchLoc = async (input) => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${token}`
        );
        const data = await response.json();
        setList(data.features);
    };

    const removeLocation = (input) => {
        let newLocations = locations.slice();
        newLocations.splice(input, 1);
        setLocations(newLocations);
    };

    return (
        <OutletDiv>
            <Banner>
                Edit your adventure plan
                <TripStatus
                    value={status}
                    onChange={(ev) => setStatus(ev.target.value)}
                    selected={
                        status === "cancelled"
                            ? "#ffb4b4"
                            : status === "completed"
                            ? "#adff9b"
                            : "#ffe89b"
                    }
                >
                    <TripStatusOption value="planning">
                        Planning
                    </TripStatusOption>
                    <TripStatusOption value="completed">
                        Completed
                    </TripStatusOption>
                    <TripStatusOption value="cancelled">
                        Cancelled
                    </TripStatusOption>
                </TripStatus>
            </Banner>
            <UserFullDiv>
                <SigninLabel htmlFor="trip-title">
                    What would your adventure be called?
                </SigninLabel>
                <SigninInput
                    type="text"
                    name="trip-title"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
                <PlanDateWrapper>
                    <SigninLabel htmlFor="trip-start">
                        When does your adventure <StyledBold>start</StyledBold>?
                    </SigninLabel>
                    <PlanDateInput
                        type="date"
                        name="trip-start"
                        value={start}
                        onChange={(ev) => setStart(ev.target.value)}
                        style={{ marginRight: "20px" }}
                    />
                    <SigninLabel htmlFor="trip-end">
                        When does your adventure <StyledBold>end</StyledBold>?
                    </SigninLabel>
                    <PlanDateInput
                        type="date"
                        name="trip-end"
                        min={start !== null ? start : ""}
                        value={end !== null && end >= start ? end : start !== null ? start : ""}
                        isDisabled={start === null}
                        onChange={(ev) => setEnd(ev.target.value)}
                    />
                </PlanDateWrapper>
                <SigninLabel htmlFor="trip-locations">
                    Where do you plan to go?
                </SigninLabel>
                <LocWrapper>
                    <SigninInput
                        type="text"
                        name="location"
                        value={place}
                        style={{ marginBottom: "0" }}
                        onFocus={(ev) => searchLoc(ev.target.value)}
                        onChange={(ev) => {
                            setPlace(ev.target.value);
                            searchLoc(ev.target.value);
                        }}
                        onBlur={() => setTimeout(() => setList([]), 200)}
                    />
                    {list.length > 0 && (
                        <LocOptionsDiv>
                            {list.map((el) => (
                                <LocOptions
                                    key={el.id}
                                    onClick={() => {
                                        let newLocations = locations.slice();
                                        newLocations.push(el.place_name);
                                        setLocations(newLocations);
                                        setPlace("");
                                        setList([]);
                                    }}
                                >
                                    {el.place_name}
                                </LocOptions>
                            ))}
                        </LocOptionsDiv>
                    )}
                </LocWrapper>
                <TripsDiv>
                    {locations.length > 0 &&
                        locations.map((el, idx) => (
                            <TripLocationDiv key={el}>
                                {el}{" "}
                                <DeleteButton
                                    onClick={() => removeLocation(idx)}
                                >
                                    ✕
                                </DeleteButton>
                            </TripLocationDiv>
                        ))}
                </TripsDiv>
                <SigninButton onClick={handleClick}>
                    Save adventure
                </SigninButton>
            </UserFullDiv>
        </OutletDiv>
    );
}
