import React, {
    createContext,
    Fragment,
    useEffect,
    useReducer
} from "react";

import {
    BrowserRouter as Router,
} from "react-router-dom";

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

function App() {

    const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState);
    const [userState, userDispatch] = useReducer(UserReducer, initialUserState);

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
                                <div>asdfasdf</div>
                            </div>
                        </Router>
                    </Fragment>
                </ThemeProvider>
            </UserContext.Provider>
        </UIContext.Provider>
    );
}

export default App;