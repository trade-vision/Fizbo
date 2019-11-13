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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Modal, Button, Form } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Grid from '@material-ui/core/Grid';
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
    let [openPicModal, setOpenPicModal] = useState(false);
    let [currentPic, setCurrentPic] = useState(0);
    

    const propertyInfo = props.userProperties;
    function handleExpandClick() {
        setExpanded(!expanded);
    }

    

    const openPicture = () => {
        setOpenPicModal(true);
    }

    const closePicture = () => {
        setOpenPicModal(!openPicModal);
        setCurrentPic(currentPic += 1);
    }
    useEffect(() => {
       
    });

    return (
        <div>
            <Grid container justify="center" >
            <Modal show={openPicModal} onHide={closePicture} >
                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body>
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
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closePicture}>Close</Button>
                </Modal.Footer>
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
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={propertyInfo.address}
                subheader="September 14, 2016"
            />
            {propertyInfo.images[0] ? <CardMedia
                className={classes.media}
                image={propertyInfo.images[0].url}
                title="Paella dish"
                //add click handler
                onClick={openPicture}
            /> : null}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`3 beds |  1 baths |  ${propertyInfo.sqr_feet}`}
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
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
        </div>
    );
}
