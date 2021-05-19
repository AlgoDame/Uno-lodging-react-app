/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import axios from "axios"
import { withRouter, Redirect, useParams } from "react-router-dom"
const initialData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    type: ""
}
export interface RoomData {
    hostid: string;
    hostname: string;
    price: string;
    description: string;
    location: string;
    title: string;
    roomId: string
}
const AuthContext = React.createContext({
    loading: false,
    handleEmailInputChange: (e: ChangeEvent<HTMLInputElement>) => { },
    handlePasswordInputChange: (e: ChangeEvent<HTMLInputElement>) => { },
    handlePasswordConfirmationChange: (e: ChangeEvent<HTMLInputElement>) => { },
    handleFirstNameInput: (e: ChangeEvent<HTMLInputElement>) => { },
    handleLastNameInput: (e: ChangeEvent<HTMLInputElement>) => { },
    handlePhoneInput: (e: ChangeEvent<HTMLInputElement>) => { },
    handleSelect: (e: ChangeEvent<HTMLSelectElement>) => { },
    handleLoginSubmit: (e: MouseEvent<HTMLButtonElement>) => { },
    handleSignupSubmit: (e: MouseEvent<HTMLButtonElement>) => { },
    logout: () => { },
    loginType: "guest",
    data: initialData,
    // loggedInUserData: initialData,
    passwordConfirmation: "",
    isSignup: false,
    show: false,
    // userData: {},
    userType: "guest",
    toggleModal: () => { },
    guestSignUp: () => { },
    hostSignUp: () => { },
    signIn: () => { },
    fetchRoomsData: () => { },
    userData: initialData,
    roomsData: [{
        hostid: "",
        hostname: "",
        price: "",
        description: "",
        location: "",
        title: "",
        roomId: ""
    }],
    searchResults: [{
        hostid: "",
        hostname: "",
        price: "",
        description: "",
        location: "",
        title: "",
    }],
    handleSearchResults: (e: ChangeEvent<HTMLInputElement>) => { },
    showResults: false,
    route: "",
    loggedIn: false,
    roomShown: {
        hostid: "",
        hostname: "",
        price: "",
        description: "",
        location: "",
        title: "",
        roomId: ""
    },
    handleRoomClick: (data) => { },
    formError: "",

});

const AuthContextComp = (props: any) => {

    // const [files, setFiles] = useState<(string | Buffer)[]>([]);
    const [userData, setUserData] = useState(initialData)
    const [allUsers, setAllUsers] = useState([])
    const [roomShown, setRoomShown] = useState({} as RoomData)
    const [roomsData, setRoomsData] = useState<RoomData[]>([])
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [loginType, setLoginType] = useState("guest")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [searchResults, setSearchResults] = useState<RoomData[]>([])
    const [isSignup, setSignup] = useState(false);
    const [userType, setUserType] = useState("guest");
    const [showResults, setShowResults] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loggedInUserData, setLoggedInUserData] = useState(initialData)
    const [formError, setFormError] = useState("");

    useEffect(() => {
        setUserData(initialData);
        setFormError("")
    }, [show]);

    //Fetch all data on page load
    const fetchRoomsData = async () => {
        setLoading(true)
        try {
            const res = await axios.get("http://localhost:5000/api/rooms")
            const { data } = await res;
            // const newData = [...data]
            setRoomsData(data);
            console.log("roomsData", roomsData, "data", data)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    const fetchUsersData = async () => {
        setLoading(true)
        try {
            const res = await axios.get("http://localhost:5000/api/allGuests")
            const { data } = await res;
            // const newData = [...data]
            // setRoomsData(data);
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    useEffect(() => {
        // const { data } = await
        fetchRoomsData();
        fetchUsersData()
        const loggedInUser = localStorage.getItem("user");
    }, [])
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setLoggedInUserData(foundUser);
            setLoggedIn(true)
        }
        console.log("data", loggedInUserData)
        console.log("userData", userData)
    }, [])

    const handleSearchResults = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === "") setShowResults(false)
        else {
            setShowResults(true)
            const results = roomsData.filter(item => item.location.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setSearchResults(results)
        }


    }
    const validateEmail = (email: string) => {
        const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return testRegex.test(email)
    }
    const validatePassword = (password: string) => {
        let numReg = /[0-9]/g
        return password.trim().length >= 7 && numReg.test(password)
    }
    const handleRoomClick = (title: string) => {
        // return (e: MouseEventHandler<HTMLDivElement>) => {
        //This should later be handled with a unique room id
        const room = roomsData.find(room => room.title === title)
        if (room) {
            setRoomShown(room);
            props.history.push("/room/" + room.roomId);
            setShowResults(false)
        };
        console.log(title, room)
        // }
    }
    const status = (validationType: string) => {
        switch (validationType) {
            case "email":
                const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                if (!testRegex.test(userData.email)) {
                    return "Invalid email address"
                }
                else {
                    return ""
                }
            case "password":
                let numReg = /[0-9]/g
                if (!(userData.password.trim().length > 7 && numReg.test(userData.password))) {
                    return "passwords must be greater than 7 and should contain numbers and alphabets"
                }
                else if (passwordConfirmation !== userData.password) {
                    return "passwords do not match"
                }
                else return "";
            default:
                return true;

        }
    }
    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, email: e.target.value });
    }
    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, password: e.target.value });
    }

    const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, firstName: e.target.value })
    }
    const handleLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, lastName: e.target.value })
    }
    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, phone: e.target.value })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log(e.target.value, loginType)
        setLoginType(e.target.value);
    }

    const handleLoginSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const body = { email: userData.email, password: userData.password, type: loginType };
        const data = await validateLogin(body);
        if (data && data.status === "Successful") {
            setLoggedIn(true)
            setLoggedInUserData(data.data)
            localStorage.setItem("user", JSON.stringify(data.data))
            // props.history.push("/")

            setShow(false)
            // window.location.reload()
            console.log("logged in data is", data.data)
            return <Redirect to="/home" />
        } else {
            data.message ? setFormError(data.message) : setFormError(data.status);
            setTimeout(() => setFormError(""), 2000)
            console.log("login failed")
        }
        console.log(loginType)
        console.log(body)
    }
    const handleSignupSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const emailStatus = status("email");
        const passwordStatus = status("password")
        if (emailStatus !== "" || passwordStatus !== "") {
            console.log(emailStatus, passwordStatus)
        }
        const body = { ...userData, type: userType }
        const data = await validateSignup(body)
        if (data.status === "Successful") {
            setLoggedIn(true)
            setLoggedInUserData(data.data)
            localStorage.setItem("user", JSON.stringify(data.data));
            setShow(false)
        }
        else {
            data.message ? setFormError(data.message) : setFormError(data.status);
            setTimeout(() => setFormError(""), 2000)
        }

        console.log(body)
    }
    const validateLogin = async (body: { email: string; password: string; type: string; }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:5000/api/login", body, { headers: { 'content-type': "application/json" } })
            console.log(data)
            return data
        }
        catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }
    }
    const logout = () => {
        localStorage.removeItem("user");
        setLoggedIn(false);
        // props.history.push("/")
        window.location.reload()
    }
    const validateSignup = async (body: { type: any; email: string; password: string; firstName: string; lastName: string; phone: string; }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:5000/api/signup", body, { headers: { 'content-type': "application/json" } })
            console.log(data)
            return data
        }
        catch (e) {

            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const toggleModal = () => {
        setShow(!show);
    }
    const guestSignUp = () => {
        setSignup(true);
        // props.history.push("/signup/guest")
        setShow(true);
        setUserType("guest")
    }
    const hostSignUp = () => {
        setSignup(true);
        // props.history.push("/signup/guest")
        setShow(true);
        setUserType("host")
    }
    const signIn = () => {
        setSignup(false)
        // toggleModal()
        // props.history.push("/signin")
        setShow(true)
    }
    return (
        <AuthContext.Provider value={{
            loading,
            loginType,
            handleEmailInputChange,
            handlePasswordInputChange,
            handlePasswordConfirmationChange,
            handleFirstNameInput,
            handleLastNameInput,
            handlePhoneInput,
            handleSelect,
            handleLoginSubmit,
            handleSignupSubmit,
            data: userData,
            passwordConfirmation,
            toggleModal,
            guestSignUp,
            hostSignUp,
            signIn,
            show,
            isSignup,
            userType,
            fetchRoomsData,
            roomsData,
            searchResults,
            handleSearchResults,
            showResults,
            route: props.location.pathname,
            loggedIn,
            userData: loggedInUserData,
            logout,
            roomShown,
            handleRoomClick,
            formError
        }}>{props.children}</AuthContext.Provider>
    )

}


export const AuthContextProvider = withRouter(AuthContextComp)
export default AuthContext