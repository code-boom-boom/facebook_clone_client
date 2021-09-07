import React from "react";
import {makeStyles, Popover} from "@material-ui/core";
import PopoverProfileCard from "./PopoverProfileCard";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none"
    },
    paper: {
        padding: theme.spacing(1)
    }
}));

export default function MouseOverPopover({ children, user }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return (
        <div>
            <div
                aria-owns={ open ? "mouse-over-popover" : undefined }
                aria-haspopup="true"
                onMouseEnter={ handlePopoverOpen }
                onMouseLeave={ handlePopoverClose }
            >
                { children }
            </div>
            <Popover
                open={ open }
                id="mouse-over-popover"
                className={ classes.popover }
                classes={{ paper: classes.paper }}
                anchorEl={ anchorEl }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                onClose={ handlePopoverClose }
                disableRestoreFocus
            >
                <PopoverProfileCard user={ user } />
            </Popover>
        </div>
    );
}