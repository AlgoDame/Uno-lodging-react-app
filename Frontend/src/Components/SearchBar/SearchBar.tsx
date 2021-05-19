import React, { ChangeEvent } from 'react'
import classes from './SearchBar.module.css';

interface Props {
    placeholder: string,
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void

}


const SearchBar = (props: Props) => {
    return (
        <div className={classes.Search}>
            <input type="text" placeholder={props.placeholder} onChange={props.handleSearch} />
        </div>
    )
}

export default SearchBar
