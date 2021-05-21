/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import axios from "axios"
import { withRouter, Redirect } from "react-router-dom"
const initialData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    type: "",
    favorites: ['']
}
export interface RoomData {
    hostid: string;
    hostname: string;
    price: string;
    description: string;
    location: string;
    title: string;
    roomId: string;
    features: string;
    booked: boolean,
    imageUrl: string[]
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
        roomId: "",
        features: "",
        booked: false,
        imageUrl: [""]
    }],
    searchResults: [{
        hostid: "",
        hostname: "",
        price: "",
        description: "",
        location: "",
        title: "",
        features: "",
        booked: false,
        imageUrl: [""]
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
        roomId: "",
        features: "",
        booked: false,
        imageUrl: [""]
    },
    handleRoomClick: (data) => { },
    formError: "",
    handleFavorites: (data) => { },
    favorites: [""],
    updateUser: (a, b, c) => { },
    submitBooking: (data) => "" as any

});

const AuthContextComp = (props: any) => {

    // const [files, setFiles] = useState<(string | Buffer)[]>([]);
    const [userData, setUserData] = useState(initialData)
    const [allUsers, setAllUsers] = useState([initialData])
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
    const [favorites, setFavorites] = useState([] as string[])

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
            setAllUsers(data);
            return data;
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
        fetchUsersData();
    }, [])
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            const updatedUser = allUsers.find(user => user.email === foundUser.email);
            if (updatedUser) {
                localStorage.setItem("user", JSON.stringify(updatedUser))
                setLoggedInUserData(updatedUser);
                setFavorites(updatedUser.favorites)
                setLoggedIn(true)
            }
            console.log(updatedUser, "updated user")
        }
        console.log("data", allUsers)
        console.log("userData", userData)
    }, [allUsers, favorites])

    const handleSearchResults = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === "") setShowResults(false)
        else {
            setShowResults(true)
            const results = roomsData.filter(item => item.location && item.location.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setSearchResults(results)
        }


    }


    // const validateEmail = (email: string) => {
    //     const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    //     return testRegex.test(email)
    // }
    // const validatePassword = (password: string) => {
    //     let numReg = /[0-9]/g
    //     return password.trim().length >= 7 && numReg.test(password)
    // }
    const submitBooking = async (data) => {
        // const body = { ...data, bookingDate: new Date() };
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/bookings", data);
        if (res.data.status === "Successful") {
            await updateRoom({ booked: true }, data.roomId)
        }
        console.log(res.data)
        setLoading(false)
        return res.data
    }
    const updateRoom = async (body, id) => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/updateRoom/${id}`, body);
            return data
        }
        catch (e) {
            return e.message
        }
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
    const handleFavorites = (id: string) => {
        let currFavorites = favorites;
        if (currFavorites.includes(id)) {
            currFavorites.splice(currFavorites.indexOf(id), 1)
        }
        else { currFavorites.push(id); }
        setFavorites(currFavorites)
        const body = { favorites: currFavorites }
        const res = updateUser(loggedInUserData.email, "guest", body)
        console.log("I updated", res);
        console.log(favorites)
    }

    const updateUser = async (id: string, type: string, data) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/user/${id}?type=${type}`, data);
            return res.data
        } catch (e) {
            console.log(e.message)
        }
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
        const body = { ...userData, type: userType, favorites: [] }
        const data = await validateSignup(body)
        if (data.status === "Successful") {
            setLoggedIn(true)
            setLoggedInUserData(data.data)
            localStorage.setItem("user", JSON.stringify(data.data));
            setShow(false);
            console.log("sign up successful")
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
    const validateSignup = async (body: { favorites: string[]; type: any; email: string; password: string; firstName: string; lastName: string; phone: string; }) => {
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
            formError,
            handleFavorites,
            favorites,
            updateUser,
            submitBooking
        }}>{props.children}</AuthContext.Provider>
    )

}


export const AuthContextProvider = withRouter(AuthContextComp)
export default AuthContext