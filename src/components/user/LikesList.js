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
        user.likes.map((like) => {
            axios.get(`/likedProperties/${like.listingId}`)
                .then((propsData)=> {
                    properties.push(propsData.data);
                    setPropsSent(true);
                })
        });
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
                {/* {properties.map(property => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={property.address}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))} */}
            </GridList> : <Spin></Spin> 
        }
        </div>
    );
}