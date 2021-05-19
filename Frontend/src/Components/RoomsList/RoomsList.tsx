import React from 'react'
import ListItem from "./ListItem"
import styles from './RoomsList.module.css';
import { RoomData } from '../../store/AuthContext'
import AuthContext from '../../store/AuthContext'
import { useEffect, useState, useContext } from "react";
import { useParams, Route } from "react-router-dom"
interface Props {

}

const RoomsList = (props: Props) => {
    const [data, setData] = useState([] as RoomData[])
    const params = useParams() as {
        location: string
    }
    const ctx = useContext(AuthContext);
    useEffect(() => {
        console.log(params)
        const rooms = ctx.roomsData.filter(room => room.location.indexOf('a') !== -1);
        if (rooms) setData(rooms)
        // console.log(location, "data is", data)
    }, [ctx.roomsData, data])
    return (
        <Route path="/rooms/:location">
            <div className={styles.Wrapper}>
                {data.map(room => (<ListItem key={room.roomId} title={room.title} price={room.price} location={room.location} hostName={room.hostname} />))}
                {/* <ListItem /> */}
            </div>
        </Route>
    )
}

export default RoomsList
