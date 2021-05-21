import { lazy } from "react"
// import Header from './Components/Header/Header'
// import Footer from './Components/Footer/Footer'
// import Home from './Components/Home/Home';
// import RoomDetails from './Components/RoomDetails/RoomDetails';
// // import Modal from "./Components/Modal/Modal"
// import Signup from "./Components/Signup/Signup"
// import SearchResults from "./Components/SearchResults/SearchResults"

// export const Header = lazy(() => import('./Components/Header/Header'))
// export const Footer = lazy(() => import('./Components/Footer/Footer'))
export const Home = lazy(() => import('./Components/Home/Home'))
export const RoomDetails = lazy(() => import('./Components/RoomDetails/RoomDetails'))
export const Signup = lazy(() => import('./Components/Signup/Signup'))
export const SearchResults = lazy(() => import('./Components/SearchResults/SearchResults'))
export const RoomsList = lazy(() => import('./Components/RoomsList/RoomsList'))
export const Favorites = lazy(() => import('./Components/Favorites/Favorites'))
export const HostForm = lazy(() => import('./Components/HostForm/HostForm'))