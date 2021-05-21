import styles from "./SearchResults.module.css";
import SearchResult from "./SearchResult"

interface Props {
    results: Record<string, any>[],
}

const SearchResults = (props: Props) => {
    return (
        <div className={styles.Wrapper}>
            {props.results.length > 0 ? props.results.map(room => <SearchResult key={room.title} title={room.title} location={room.location} imageUrl={room.imageUrl} />) : <h4>No Rooms available in this location...</h4>}
        </div>
    )
}

export default SearchResults
