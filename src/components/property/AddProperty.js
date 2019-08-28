import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Modal, Button, Form } from 'react-bootstrap';
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
    const [show, setShow] = useState(false);
    const [propertyImages, setPropertyPic] = useState([]);
    const [imageNumber, setImageNumber] = useState(0);

    const modalClose = () => setShow(false);
   
    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const openModel = () => {
        setShow(true);
        setOpen(prevOpen => !prevOpen);
    }

    const handleOpen = () => {
        if (!hidden) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            propertyImages.push(resultEvent.info.secure_url);
        }
    }

    let widget = window.cloudinary.createUploadWidget({
        cloudName: 'dxtgsafec',
        uploadPreset: 'xpqy7emf',
        multiple: true
    }, (error, result) => checkUploadResult(result));

    const showWidget = (widget) => {
        widget.open();
    }

    const imageChecker = () => {
        setImageNumber(propertyImages.length)
    }
    useEffect(()=> {
        setInterval(imageChecker, 3000);
        console.log(propertyImages);
    })

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
                    onClick={openModel}
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
            <Modal show={show} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post your property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Control type="text" placeholder="Address" />
                        <br />
                        <Form.Control type="text" placeholder="Zip Code" />
                        <br />
                        <Form.Control type="text" placeholder="Asking Price $" />
                        <br />
                        <Form.Control type="text" placeholder="ARV" />
                        <br />
                        <Form.Control type="text" placeholder="Repair Cost $" />
                        <br />
                        <Form.Control type="text" placeholder="sqr ft" />
                        <br />
                        <Form.Control type="text" placeholder="Description" />
                        <br />
                    <Button onClick={() => showWidget(widget)}>Upload</Button><p>{imageNumber} images uploaded</p>
                </Modal.Body>
            
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={modalClose}>
                        Post Property
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}