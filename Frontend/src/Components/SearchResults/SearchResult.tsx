import { useContext } from 'react';
import bg2 from "../../assets/homeBg2.svg"
import styles from "./SearchResults.module.css"
import AuthContext from "../../store/AuthContext"

interface Props {
    title: "",
    location: ""
}

const SearchResult = (props: Props) => {
    const ctx = useContext(AuthContext);
    return (
        <div className={styles.Result} onClick={() => ctx.handleRoomClick(props.title)}>
            <img src={bg2} alt="" />
            <div>
                <h3>{props.title}</h3>
                <p>{props.location}</p>
            </div>
        </div>
    )
}

export default SearchResult
