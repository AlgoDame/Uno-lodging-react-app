import { useContext } from 'react';
import styles from "./SearchResults.module.css"
import AuthContext from "../../store/AuthContext"

interface Props {
    title: "",
    location: "",
    imageUrl: ''
}

const SearchResult = (props: Props) => {
    const ctx = useContext(AuthContext);
    return (
        <div className={styles.Result} onClick={() => ctx.handleRoomClick(props.title)}>
            <img src={props.imageUrl[0]} alt="" />
            <div>
                <h3>{props.title}</h3>
                <p>{props.location}</p>
            </div>
        </div>
    )
}

export default SearchResult
