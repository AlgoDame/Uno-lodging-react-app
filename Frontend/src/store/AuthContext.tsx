import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import axios from "axios"
import { withRouter } from "react-router-dom"
const initialData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    type: ""
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
    loginType: "guest",
    data: initialData,
    passwordConfirmation: "",
    isSignup: false,
    show: false,
    userType: "guest",
    toggleModal: () => { },
    guestSignUp: () => { },
    hostSignUp: () => { },
    signIn: () => { },

});
const AuthContextComp = (props) => {

    // const [files, setFiles] = useState<(string | Buffer)[]>([]);
    const [data, setData] = useState(initialData)
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [loginType, setLoginType] = useState("guest")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [isSignup, setSignup] = useState(false);
    const [userType, setUserType] = useState("guest");

    useEffect(() => {
        setData(initialData);
        console.log("useeffect just ran!!")
    }, [show])
    const validateEmail = (email) => {
        const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return testRegex.test(email)
    }
    const validatePassword = (password) => {
        let numReg = /[0-9]/g
        return password.trim().length > 7 && numReg.test(password)
    }

    const status = (validationType) => {
        switch (validationType) {
            case "email":
                const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                if (!testRegex.test(data.email)) {
                    return "Invalid email address"
                }
                else {
                    return ""
                }
            case "password":
                let numReg = /[0-9]/g
                if (!(data.password.trim().length > 7 && numReg.test(data.password))) {
                    return "passwords must be greater than 7 and should contain numbers and alphabets"
                }
                else if (passwordConfirmation !== data.password) {
                    return "passwords do not match"
                }
                else return "";
            default:
                return true;

        }
    }
    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, email: e.target.value });
    }
    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, password: e.target.value });
    }

    const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, firstName: e.target.value })
    }
    const handleLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, lastName: e.target.value })
    }
    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, phone: e.target.value })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log(e.target.value, loginType)
        setLoginType(e.target.value);
    }

    const handleLoginSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (validateEmail(data.email) && validatePassword(data.password)) {
            const body = { email: data.email, password: data.password, type: loginType };
            await validateLogin(body)
            console.log(loginType)
            console.log(body);
        }
        else console.log("invalid Email or Password")
    }
    const handleSignupSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const emailStatus = status("email");
        const passwordStatus = status("password")
        if (emailStatus !== "" || passwordStatus !== "") {
            console.log(emailStatus, passwordStatus)
        }
        const body = { ...data, type: props.type }
        await validateSignup(body)
        console.log(body)
    }
    const validateLogin = async (body) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:5000/api/login", body, { headers: { 'content-type': "application/json" } })
            console.log(data)
        }
        catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }
    }
    const validateSignup = async (body) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:5000/api/signup", body, { headers: { 'content-type': "application/json" } })
            console.log(data)
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
        props.history.push("/signup/guest")
        setShow(true);
        setUserType("guest")
    }
    const hostSignUp = () => {
        setSignup(true);
        props.history.push("/signup/guest")
        setShow(true);
        setUserType("host")
    }
    const signIn = () => {
        setSignup(false)
        // toggleModal()
        props.history.push("/signin")
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
            data,
            passwordConfirmation,
            toggleModal,
            guestSignUp,
            hostSignUp,
            signIn,
            show,
            isSignup,
            userType
        }}>{props.children}</AuthContext.Provider>
    )

}


export const AuthContextProvider = withRouter(AuthContextComp)
export default AuthContext