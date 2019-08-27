import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
        height: 380,
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        color: "secondary"
    },
}));

const actions = [
    { icon: <AddIcon />, name: 'Post Property' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <DeleteIcon />, name: 'Delete Property' },
];

export default function AddProperty() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

   

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleOpen = () => {
        if (!hidden) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="Options"
                className={classes.speedDial}
                color="secondary" 
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onBlur={handleClose}
                onClick={handleClick}
                onClose={handleClose}
                onFocus={handleOpen}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                open={open}
            >
                <SpeedDialAction
                    key={actions[0].name}
                    icon={actions[0].icon}
                    tooltipTitle={actions[0].name}
                    tooltipOpen
                    onClick={handleClick}
                />
                <SpeedDialAction
                    key={actions[1].name}
                    icon={actions[1].icon}
                    tooltipTitle={actions[1].name}
                    tooltipOpen
                    onClick={handleClick}
                />
                <SpeedDialAction
                    key={actions[2].name}
                    icon={actions[2].icon}
                    tooltipTitle={actions[2].name}
                    tooltipOpen
                    onClick={handleClick}
                />
            </SpeedDial>
        </div>
    );
}