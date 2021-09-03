import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {UIContext} from "../../App";
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
import {
    Add as AddIcon,
    PostAdd as PostIcon
} from "@material-ui/icons";

function CreatePostMenu() {
    const history = useHistory();
    const { uiState, uiDispatch } = useContext(UIContext);

    const [postMenu, setPostMenu] = useState(null);
    const theme = useTheme();
    const xsScreen = useMediaQuery(theme.breakpoints.only("xs"));

    const handlePostOpen = () => {
        history.push("/");
        uiDispatch({ type: "SET_POST_MODEL", payload: true });
        setPostMenu(null);
    }

    return (
        <div>
            <IconButton
                style={{
                    marginLeft: "8px",
                    color: !uiState.darkMode ? "black" : null,
                    backgroundColor: !uiState.darkMode ? "#f0f2f5" : null
                }}
                onClick={ (e) => setPostMenu(e.currentTarget) }
            >
                <AddIcon style={{ width: xsScreen && "20px", height: xsScreen && "20px" }} />
            </IconButton>

            <Menu
                id="post-menu"
                open={ Boolean(postMenu) }
                anchorEl={ postMenu }
                keepMounted
                onClose={ () => setPostMenu(null) }
                style={{ marginTop: "50px" }}
                elevation={ 7 }
            >
                <List
                    subheader={
                        <ListSubheader>
                            <Typography style={{ fontSize: "22px", fontWeight: 800 }}>
                                Create
                            </Typography>
                        </ListSubheader>
                    }
                >
                    <ListItem button onClick={ handlePostOpen }>
                        <ListItemIcon>
                            <Avatar
                                style={{
                                    background: "teal",
                                    color: "#fff"
                                }}
                            >
                                <PostIcon />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography style={{ fontSize: "15px" }}>Post</Typography>
                            <Typography style={{ fontSize: "13px", color: !uiState.darkMode ? "#65676b" : null }}>Share a post on news feed</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Menu>
        </div>
    );
}

export default CreatePostMenu;