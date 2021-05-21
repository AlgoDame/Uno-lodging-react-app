import logo from "../../assets/logo.svg"
import styles from './Spinner.module.css'

const Spinner = () => {
    return (
        <div className={styles.Loader}>
            <img src={logo} alt="" />
        </div>
    )
}

export default Spinner
