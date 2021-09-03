import React, { useState } from "react";
import useSearchFriends from "../../hooks/useSearchFriends";
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AvatarText from "../UI/AvatarText";

function SearchFriends() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const {
        searchFriends,
        friends,
        loading
    } = useSearchFriends();

    const handleSearch = () => {
        searchFriends(name);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <IconButton onClick={ handleOpen }>
                <Search />
            </IconButton>
            <Dialog open={ open } fullWidth maxWidth="sm" onClose={ handleClose }>
                <DialogContent>
                    <TextField
                        style={{ width: "100%" }}
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                        variant="outlined"
                        placeholder="Enter Friends Name"
                    />
                    <Button
                        style={{ width: "100%", marginTop: "16px" }}
                        variant="contained"
                        color="primary"
                        onClick={ handleSearch }
                    >
                        Search
                    </Button>
                    { friends.length ? (
                        <Typography variant="h4" style={{ marginTop: "20px" }}>
                            Search Friends ({ friends.length })
                        </Typography>
                    ) : null }
                    { loading ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "20px"
                            }}
                        >
                            <CircularProgress />
                        </div>
                    ) : (
                        <List>
                            { friends &&
                                friends.map((user) => (
                                    <ListItem
                                        button
                                        onClick={ handleClose }
                                        comoponent={ Link }
                                        to={ `/profile/${ user.id }` }
                                        key={ user.id }
                                    >
                                        <ListItemIcon>
                                            { user.profile_pic ? (
                                                <Avatar
                                                    style={{
                                                        width: "60px",
                                                        height: "60px"
                                                    }}
                                                >
                                                    <img
                                                        src={ user.profile_pic }
                                                        width="100%"
                                                        height="100%"
                                                        alt={ user.name }
                                                    />
                                                </Avatar>
                                            ) : (
                                                <AvatarText
                                                    text={ user.name }
                                                    bg={ user.active ? "seagreen" : "tomato" }
                                                />
                                            ) }
                                        </ListItemIcon>
                                        <ListItemText style={{ marginLeft: "8px" }}>
                                            <Typography style={{ fontSize: "17px", fontWeight: 700 }}>
                                                { user.name }
                                            </Typography>
                                            <Typography>{ user.email }</Typography>
                                        </ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                    ) }
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SearchFriends;