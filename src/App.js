import React, {
    createContext,
    Fragment,
    lazy,
    Suspense,
    useEffect,
    useReducer,
    useState,
} from "react";

import {
    BrowserRouter as Router, Redirect, Route, Switch,
} from "react-router-dom";

// Components
import Loader from "./components/Loader";
import Navbar from "./components/Navbar/Navbar";

// Context
import { UIReducer, initialUIState } from "./context/UIContext";
import { UserReducer, initialUserState } from "./context/UserContext";

import {
    createTheme, Snackbar,
    useMediaQuery,
    useTheme
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core";
import ProtectedRoute from "./utils/ProtectedRoute";
import BottomNav from "./components/Navbar/BottomNav";
import {Alert} from "@material-ui/lab";

export const UIContext = createContext();
export const UserContext = createContext();

// Views
const Home = lazy(() => import("./screens/Home"));
const Auth = lazy(() => import("./screens/Auth"));

function App() {

    const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState);
    const [userState, userDispatch] = useReducer(UserReducer, initialUserState);

    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up("md"));

    // Theme change
    const Theme = React.useMemo(() => createTheme({
        active: {
            success: "rgb(63, 162, 76)"
        },
        palette: {
            type: uiState.darkMode ? "dark" : "light",
            primary: {
                main: "rgb(1, 133, 243)"
            },
            secondary: {
                main: "rgb(63, 162, 76)",
            }
        }
    }), [uiState.darkMode]);

    useEffect(() => {
        uiDispatch({ type: "SET_USER_SCREEN", payload: mdScreen });
    }, [mdScreen]);

    return (
        <UIContext.Provider value={{ uiState, uiDispatch }}>
            <UserContext.Provider value={{ userState, userDispatch }}>
                <ThemeProvider theme={ Theme }>
                    <Fragment>
                        <Router>
                            { userState.isLoggedIn && <Navbar /> }
                            <div style={{
                                backgroundColor: !uiState.darkMode ? "rgb(240, 242, 245)" : "rgb(24, 25, 26)"
                            }}>
                                <Suspense fallback={ <Loader /> } >
                                    { loading ? (
                                        <Loader />
                                    ) : (
                                        <Switch>
                                            <Route
                                                exact
                                                path="/"
                                                render={ (props) => !userState.isLoggedIn ? (<Auth />) : (<Redirect to="/home" />) }
                                            />
                                            <ProtectedRoute
                                                exact
                                                path="/home"
                                                component={ Home }
                                                isLoggedIn={ userState.isLoggedIn }
                                            />
                                        </Switch>
                                    ) }
                                </Suspense>
                            </div>

                            { uiState.message && (
                                <Snackbar
                                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                    open={ uiState.message.display }
                                    autoHideDuration={ 6000 }
                                    onClose={ () => uiDispatch({ type: "SET_MESSAGE", payload: null }) }
                                    style={{ color: "#fff", marginTop: 60 }}
                                >
                                    <Alert
                                        onClose={ () => uiDispatch({ type: "SET_MESSAGE", payload: null }) }
                                        severity={ uiState.message.color }
                                    >
                                        { uiState.message.color }
                                    </Alert>
                                </Snackbar>
                            ) }

                            { !uiState.mdScreen && userState.isLoggedIn ? (
                                <BottomNav />
                            ) : null}

                        </Router>
                    </Fragment>
                </ThemeProvider>
            </UserContext.Provider>
        </UIContext.Provider>
    );
}

export default App;