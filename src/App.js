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

// Context
import { UIReducer, initialUIState } from "./context/UIContext";
import { UserReducer, initialUserState } from "./context/UserContext";

import {
    createTheme,
    useMediaQuery,
    useTheme
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core";

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
                            { userState.isLoggedIn && <div>This is navbar</div> }
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
                                        </Switch>
                                    ) }
                                </Suspense>
                            </div>
                        </Router>
                    </Fragment>
                </ThemeProvider>
            </UserContext.Provider>
        </UIContext.Provider>
    );
}

export default App;