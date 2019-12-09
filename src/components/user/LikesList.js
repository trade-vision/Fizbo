import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { Modal, Spin, message } from 'antd'; 
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from 'axios';



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'secondary',
    },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props) {
    const user =  props.user;
    const [properties, setProperties] = useState([]);
    const [propsSent, setPropsSent] = useState(false);
    const [color, setColor] = useState('secondary')
    const [updating, setUpdating] = useState(false);
    const classes = useStyles();

    const grabLikedProperties = () => {
        // console.log(user);
        user.likes.map((like, i) => {
            axios.get(`/likedProperties/${like.listingId}`)
                .then(async (propsData) => {
                    // console.log(propsData);
                    propsData.data.images = [];
                    let images = await axios.get(`images/${propsData.data.id}`);
                    if (images.data.length > 0) {
                        images.data.map((image) => {
                            image.propId = propsData.data.id;
                            propsData.data.images.push(image);
                        });
                    }
                    
                    properties.push(propsData.data);
                    if (i === user.likes.length - 1 && propsData.data.images.length > 0) {
                        setPropsSent(true);
                    }
                })
        });
        console.log(properties);
    }

    const update = (propId) => {
        setUpdating(true);
        setProperties(properties.filter(prop => prop.id !== propId))
        axios.put(`unlike/${propId}`)
            .then((unlike) => {
                setUpdating(false);
                message.success('Property unliked')
            })
            .catch((err) => {
                console.log(err);
            })
       
    }

    useEffect(()=> {
        if (!propsSent){
            grabLikedProperties();
        }  
    });

    return (
        <div className={classes.root}>
            {propsSent ? <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Your Likes</ListSubheader>  
                </GridListTile>
                {
                    updating ? <Spin></Spin> : properties.map(property => (
                    <GridListTile key={property.images[0].url} cols={2} rows={2}>
                        <img src={property.images[0].url} alt={property.address} />
                        <GridListTileBar
                            title={property.address}
                            actionIcon={
                                <IconButton aria-label={`info about ${property.address}`} >
                                    <FavoriteIcon onClick={() => { update(property.id)}} color={color}/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))  
                }
            </GridList> : <Spin></Spin> 
        }
        </div>
    );
}