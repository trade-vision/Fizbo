import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { Modal, Spin, message } from 'antd'; 
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
import { Button } from '@material-ui/core';


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
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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

    const update = () => {
        console.log(properties);
    }

    useEffect(()=> {
        if (!propsSent){
            grabLikedProperties();
        }  
    });

    return (
        <div className={classes.root}>
            {propsSent ?  <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Your Likes</ListSubheader>
                    <Button onClick={()=>{
                        console.log(user.likes, properties);
                    }}></Button>
                </GridListTile>
                {properties.map(property => (
                    <GridListTile key="https://i.etsystatic.com/10775770/r/il/c32cd1/830729388/il_1588xN.830729388_4b8n.jpg">
                        <img src={property.images[0].url} alt={property.address} />
                        <GridListTileBar
                            title={property.address}
                            subtitle={<span>by: {property.id}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${property.address}`} className={classes.icon}>
                                    <InfoIcon onClick={update}/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList> : <Spin></Spin> 
        }
        </div>
    );
}