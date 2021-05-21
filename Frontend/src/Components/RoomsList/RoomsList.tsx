import React from 'react'
import ListItem from "./ListItem"
import styles from './RoomsList.module.css';
import { RoomData } from '../../store/AuthContext'
import AuthContext from '../../store/AuthContext'
import { useEffect, useState, useContext } from "react";
import { useParams, Route } from "react-router-dom";



const RoomsList = () => {
    const [data, setData] = useState([] as RoomData[])
    const { location } = useParams() as {
        location: string
    }
    const ctx = useContext(AuthContext);
    useEffect(() => {
        console.log(location)
        const rooms = ctx.roomsData.filter(room => room.location.toLowerCase().indexOf(location.toLowerCase()) !== -1);
        if (rooms) setData(rooms)
        console.log("Lagos state".indexOf("Lagos"))
        // console.log(location, "data is", data)
    }, [ctx.roomsData, location])
    return (
        <Route path="/rooms/:location">
            <div className={styles.Wrapper}>
                <h4 style={{ fontSize: "2em", fontWeight: 700 }}>{data.length} room(s) in {location}</h4>
                {data.map(room => (<ListItem favClick={ctx.handleFavorites} room={room} favorites={ctx.favorites} click={ctx.handleRoomClick} />))}
                {/* <ListItem /> */}
            </div>
        </Route>
    )
}

export default RoomsList
