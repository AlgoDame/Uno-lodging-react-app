import logo from "../../assets/logo.svg"
import styles from './Spinner.module.css'

const Spinner = () => {
    return (
        <div className={styles.Loader}>
            <img src={logo} alt="" />
            {/* <h4 style={{ marginTop: "50px" }}>Hang On</h4> */}
        </div>
    )
}

export default Spinner
