import React from 'react'
import classes from './SearchBar.module.css'
interface Props {
    placeholder: string,

}


const SearchBar = (props: Props) => {
    return (
        <div className={classes.Search}>
            <input type="text" placeholder={props.placeholder} />
        </div>
    )
}

export default SearchBar
