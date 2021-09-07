import React, {Fragment, useContext} from "react";
import {UIContext, UserContext} from "../App";
import {Avatar, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme} from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import {Link} from "react-router-dom";
import AvatarText from "../components/UI/AvatarText";
import { homeLeftItems } from "../data/Home";
import MyFriendLists from "../components/Friends/MyFriendLists";

const Home = () => {

    const { uiState, uiDispatch } = useContext(UIContext);
    const { userState } = useContext(UserContext);

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.between(960, 1400));

    return (
        <div>
            { uiState.mdScreen ? (
                <Fragment>
                    <Sidebar
                        anchor="left"
                        background={ !uiState.darkMode ? "rgb(240, 242, 245)" : "rgb(24, 25, 26)" }
                        boxShadow={ false }
                    >
                        <List>
                            <ListItem
                                button
                                component={ Link }
                                to={ `/profile/${ userState.currentUser.id }` }
                            >
                                <ListItemIcon>
                                    { userState.currentUser.profile_pic ? (
                                        <Avatar
                                            style={{
                                                width: "50px",
                                                height: "50px"
                                            }}
                                        >
                                            <img
                                                src={ userState.currentUser.profile_pic }
                                                width="100%"
                                                height="100%"
                                            />
                                        </Avatar>
                                    ) : (
                                        <AvatarText
                                            text={ userState.currentUser.name }
                                            bg={ userState.currentUser.active ? "seagreen" : "tomato" }
                                        />
                                    ) }
                                </ListItemIcon>
                                <ListItemText
                                    style={{ marginLeft: "6px" }}
                                    primary={ userState.currentUser.name }
                                />
                            </ListItem>
                            { homeLeftItems.map((list, index) => (
                                <ListItem button key={ index } component={ Link } to={ list.to } >
                                    <ListItemIcon>
                                        <Avatar alt={ list.title } src={ require(`../assets/${ list.img }`) } />
                                    </ListItemIcon>
                                    <ListItemText primary={ list.title } />
                                </ListItem>
                            )) }
                        </List>
                    </Sidebar>
                    <Sidebar
                        anchor="right"
                        background={ !uiState.darkMode ? "rgb(240, 242, 245)" : "rbg(24, 25, 26)" }
                        boxShadow={ false }
                        drawerWidth={ 380 }
                    >
                        <MyFriendLists />
                    </Sidebar>
                </Fragment>
            ) : (
                <Fragment>
                    <div>The small monster</div>
                </Fragment>
            ) }
        </div>
    );
};

export default Home;