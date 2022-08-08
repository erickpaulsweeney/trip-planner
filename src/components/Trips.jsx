import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateTrips } from "../firebase-config";
import { setTrips } from "../slices/userSlice";
import {
    AllTripsDiv,
    AllTripsSubDiv,
    Banner,
    EditButton,
    NoDetails,
    OutletDiv,
    SubBanner,
    TripItem,
    TripItemDate,
    TripItemDelete,
    TripItemTitle,
} from "../styled-components";

export default function Trips() {
    const { uid, trips } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClick = (idx) => {
        let newTrips = trips.slice();
        newTrips.splice(idx, 1);
        dispatch(setTrips(newTrips));
        updateTrips(uid, newTrips);
    };

    return (
        <OutletDiv>
            <Banner>Here's the list of all of your adventures</Banner>
            <AllTripsDiv>
                {trips.length === 0 && (
                    <SubBanner>
                        <NoDetails>No set adventure yet</NoDetails>
                        <Link to="/plan-a-trip">
                            <EditButton>Plan a trip</EditButton>
                        </Link>
                    </SubBanner>
                )}
                {trips.length > 0 && (
                    <>
                        <AllTripsSubDiv key={"planning"}>
                            <NoDetails>Upcoming Adventures</NoDetails>
                            {trips.map((el, idx) => {
                                if (el.status === "planning") {
                                    return (
                                        <Link to={`/trips/${idx}`}>
                                            <TripItem
                                                key={
                                                    el.title +
                                                    el.start +
                                                    Math.floor(
                                                        Math.random() * 1000
                                                    )
                                                }
                                            >
                                                <TripItemTitle
                                                    key={
                                                        el.title +
                                                        Math.floor(
                                                            Math.random() * 1000
                                                        )
                                                    }
                                                >
                                                    {el.title}
                                                </TripItemTitle>
                                                <TripItemDate
                                                    key={
                                                        el.start +
                                                        el.end +
                                                        Math.floor(
                                                            Math.random() * 1000
                                                        )
                                                    }
                                                >
                                                    {el.start} to {el.end}
                                                </TripItemDate>
                                                <TripItemDelete
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                        handleClick(idx);
                                                    }}
                                                >
                                                    ✕
                                                </TripItemDelete>
                                            </TripItem>
                                        </Link>
                                    );
                                } else return null;
                            })}
                        </AllTripsSubDiv>

                        <AllTripsSubDiv key={"completed"}>
                            <NoDetails>Completed Adventures</NoDetails>
                            {trips.map((el, idx) => {
                                if (el.status === "completed") {
                                    return (
                                        <Link to={`/trips/${idx}`}>
                                            <TripItem
                                                key={
                                                    el.title +
                                                    el.start +
                                                    Math.floor(
                                                        Math.random() * 1000
                                                    )
                                                }
                                            >
                                                <TripItemTitle
                                                    key={
                                                        el.title +
                                                        Math.floor(
                                                            Math.random() * 1000
                                                        )
                                                    }
                                                >
                                                    {el.title}
                                                </TripItemTitle>
                                                <TripItemDate
                                                    key={
                                                        el.start +
                                                        el.end +
                                                        Math.floor(
                                                            Math.random() * 1000
                                                        )
                                                    }
                                                >
                                                    {el.start} to {el.end}
                                                </TripItemDate>
                                                <TripItemDelete
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                        handleClick(idx);
                                                    }}
                                                >
                                                    ✕
                                                </TripItemDelete>
                                            </TripItem>
                                        </Link>
                                    );
                                } else return null;
                            })}
                        </AllTripsSubDiv>

                        <AllTripsSubDiv key={"cancelled"}>
                            <NoDetails>Cancelled Adventures</NoDetails>
                            {trips.map((el, idx) => {
                                if (el.status === "cancelled") {
                                    return (
                                        <Link to={`/trips/${idx}`}>
                                            <TripItem
                                                key={
                                                    el.title +
                                                    el.start +
                                                    Math.floor(
                                                        Math.random() * 1000
                                                    )
                                                }
                                            >
                                                <TripItemTitle
                                                    key={
                                                        el.title +
                                                        Math.floor(
                                                            Math.random() * 1000
                                                        )
                                                    }
                                                >
                                                    {el.title}
                                                </TripItemTitle>
                                                <TripItemDate
                                                    key={
                                                        el.start +
                                                        el.end +
                                                        Math.floor(
                                                            Math.random() * 1000
                                                        )
                                                    }
                                                >
                                                    {el.start} to {el.end}
                                                </TripItemDate>
                                                <TripItemDelete
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                        handleClick(idx);
                                                    }}
                                                >
                                                    ✕
                                                </TripItemDelete>
                                            </TripItem>
                                        </Link>
                                    );
                                } else return null;
                            })}
                        </AllTripsSubDiv>
                    </>
                )}
            </AllTripsDiv>
        </OutletDiv>
    );
}
