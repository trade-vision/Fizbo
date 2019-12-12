import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Form, Modal } from 'react-bootstrap';
import { Button } from 'antd'
import Carousel from 'react-bootstrap/Carousel'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import '../../css/App.css';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        marginRight: theme.spacing(1),
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

export default function PropertyCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [openPicModal, setOpenPicModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = (e) => {
        let option = e.target.innerHTML;
        if(option[0] === 'E'){
            console.log('Edit');
            setOpenEditModal(true);
        } else if(option[0] === 'D'){
            console.log('Delete');
        }
        setAnchorEl(null);
    };

    const closeEditModal = () => setOpenEditModal(false);
    

    const propertyInfo = props.userProperties;
    function handleExpandClick() {
        setExpanded(!expanded);
    }

    

    const openPicture = () => {
        setOpenPicModal(true);
    }

    const closePicture = () => {
        setOpenPicModal(!openPicModal);
        
    }

    const [address, setAddress] = useState('');
    const [zipCode, setZip] = useState('');
    const [askingPrice, setAskingPrice] = useState('');
    const [arv, setArv] = useState('');
    const [repairCost, setrepairCost] = useState('');
    const [sqrFt, setSqrFt] = useState('');
    const [comparableProp, setComparableProp] = useState('');
    const [description, setDescription] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const [isSuccessful, setisSuccessful] = useState(false);
    const [paymentToken, setPaymentToken] = useState(false);

    const handleAddress = (event) => {
        const place = event.target.value;
        setAddress(place);
    }

    const handleZip = (event) => {
        const zip = event.target.value;
        setZip(zip);
    }

    const handleAskingPrice = (event) => {
        const price = event.target.value;
        setAskingPrice(price);
    }

    const handleArv = (event) => {
        const aRv = event.target.value;
        setArv(aRv);
    }

    const handleRepairCost = (event) => {
        const cost = event.target.value;
        setrepairCost(cost);
    }

    const handleSqrFt = (event) => {
        const demensions = event.target.value;
        setSqrFt(demensions);
    }

    const handleCompareProp = (event) => {
        const price = event.target.value;
        if (price[0] === '$') {
            setComparableProp(price.slice(1));
        } else {
            setComparableProp(price)
        }

    }

    const handleDescription = (event) => {
        const descriptionInfo = event.target.value;
        setDescription(descriptionInfo);
    }

    useEffect(() => {
       
    });

    return (
        <div>
            <Grid container justify="center" >
                <Modal show={openPicModal} maskClosable={true} onHide={closePicture} footer={[
                    <Button key="back" onClick={closePicture} type="primary">
                        Return
                    </Button>    
                ]}>
                
                        <Carousel>
                    {
                    propertyInfo.images.map((pic)=> 
                      
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={pic.url}
                                    alt="First slide"
                                    height="600"
                                    width="1200"
                                />
                            </Carousel.Item>
                     
                    )
                    }
                        </Carousel>  
            </Modal>
            </Grid>
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.user.name[0]}
          </Avatar>
                }
                action={

                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleEdit}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: 200,
                                },
                            }}
                        >
                            {["Edit", "Delete"].map(option => (
                                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleEdit}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                            }
                title={propertyInfo.address}
                    subheader={moment(propertyInfo.createdAt).fromNow()}
            />
            {propertyInfo.images[0] ? <CardMedia
                className={classes.media}
                image={propertyInfo.images[0].url}
                title="Click to enlarge"
                //add click handler
                onClick={openPicture}
            /> : null}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                        {`${propertyInfo.sqr_feet} sqr ft.`}
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >

                    <ExpandMoreIcon />
                </IconButton>
                
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        Beautiful property
       </Typography>
                    <Typography paragraph>
                        Owned by: Somebody
          </Typography>
                </CardContent>
            </Collapse>
        </Card> 
            <Modal show={openEditModal} onHide={closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Address" onChange={handleAddress} />
                    <br />
                    <Form.Control type="text" placeholder="Zip Code" onChange={handleZip} />
                    <br />
                    <Form.Control type="text" placeholder="Asking Price $" onChange={handleAskingPrice} />
                    <br />
                    <Form.Control type="text" placeholder="ARV" onChange={handleArv} />
                    <br />
                    <Form.Control type="text" placeholder="Repair Cost $" onChange={handleRepairCost} />
                    <br />
                    <Form.Control type="text" placeholder="sqr ft" onChange={handleSqrFt} />
                    <br />
                    <Form.Control type="text" placeholder="Comparable Prop $" onChange={handleCompareProp} />
                    <br />
                    <Form.Control type="text" placeholder="Description" onChange={handleDescription} />
                    <br />
                </Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" >
                        Close
          </Button>
                    <Button variant="primary">
                        Submit Changes
          </Button>
                   
                </Modal.Footer>
            </Modal>
        </div>
    );
}
