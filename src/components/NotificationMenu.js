import React, {useContext, useState} from "react";
import moment from "moment";
import {UIContext} from "../App";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    ListSubheader,
    Menu,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import useUpdateProfile from "../hooks/useUpdateProfile";
import {
    DeleteOutlined,
    Notifications as NotificationIcon
} from "@material-ui/icons";

function NotificationMenu({ children }) {
    const { uiState } = useContext(UIContext);
    const [menu, setMenu] = useState(null);
    const theme = useTheme();
    const xsScreen = useMediaQuery(theme.breakpoints.only("xs"));

    const { clearNotification } = useUpdateProfile();

    return (
        <div>
            <IconButton
                style={{
                    marginLeft: xsScreen ? "4px" : "8px",
                    color: !uiState.darkMode ? "black" : null,
                    backgroundColor: !uiState.darkMode ? "#f0f2f5" : null
                }}
                onClick={ (e) => setMenu(e.currentTarget) }
            >
                { children }
            </IconButton>

            <Menu
                open={ Boolean(menu) }
                anchorEl={ menu }
                keepMounted
                onClose={ () => setMenu(null) }
                style={{ marginTop: "50px" }}
                elevation={ 7 }
            >
                <List
                    subheader={
                        <ListSubheader
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "22px",
                                    fontWeight: 800
                                }}
                            >
                                Notifications
                            </Typography>
                            { uiState.notifications.length ? (
                                <IconButton onClick={ () => clearNotification() }>
                                    <DeleteOutlined />
                                </IconButton>
                            ) : null }
                        </ListSubheader>
                    }
                >
                    { uiState.notifications ? (
                        uiState.notifications.map((notification) => (
                            <ListItem button key={ notification.id }>
                                <ListItemIcon>
                                    <Avatar
                                        style={{
                                            background: "seagreen",
                                            color: "#fff"
                                        }}
                                    >
                                        <NotificationIcon />
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="body1" style={{ fontSize: "15px" }}>
                                        { notification.body }
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            fontSize: "13px",
                                            color: !uiState.darkMode ? "#65676b" : null
                                        }}
                                    >
                                        { moment(notification.createdAt).fromNow() }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText>
                                <Typography style={{ fontSize: "16px" }}>No Notifications</Typography>
                            </ListItemText>
                        </ListItem>
                    ) }
                </List>
            </Menu>
        </div>
    );
}

export default NotificationMenu;