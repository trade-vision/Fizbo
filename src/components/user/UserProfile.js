import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, Icon, Divider } from 'antd';
import {Button} from 'react-bootstrap';
import { withRouter } from "react-router";
import PropertyList from '../property/UserPropertyList'
import axios from 'axios';


import '../../css/App.css'

const { Meta } = Card;

const Loading = () => (
    <div className="loading">
        <div className="loader"></div>
    </div>
);

const CardProfile = ({ loading, children }) => (
    <div className="card-profile">
        {loading && <Loading />}
        {children}
    </div>
);



const BgUser = ({ children }) => (
    <div className="bg-user">{children}</div>
);

const Description = () => (
    <div className="description">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
  </div>
);

// 
function Profile(props) {
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState('');
    const userData = props.history.location.state;
    const [properties, setUserProps] = useState([]);
    
    const handleUserProperties = () => {
        try {
                axios.get(`/properties/${userData.id}`)
                    .then((propResponse) => {
                        let myProps = propResponse.data;
                        setUserProps(myProps);
                    //grabbing the images for each property
                        // myProps.map(async (prop)=> {
                        //     let images = await axios.get(`images/${prop.id}`);
                        //     console.log(images);
                        // })
                    });
                
              
                
                
        } catch {

        }
    }
    

    useEffect(() => { 
        // console.log(props.properties);
        handleUserProperties();
        setTimeout(() => {
            setLoading(false);  
        }, 1500);
    }, []);

   

    return (
        <div>
        <CardProfile loading={loading}>
            <BgUser>
                <div className="avatar-user">
                    <Avatar src={userData.profile_pic} size={160} />
                </div>
            </BgUser>
            <Row type="flex" gutter={18}>
                <Col span={6}>
                    <div className="contact">
                        <strong>{userData.name}</strong>
                        <small>{userData.company}</small>
                        <div className="mail"><Icon type="google" />{userData.email}</div>
                        <div className="social">
                            <Icon className="facebook" type="facebook" />
                            <Divider type="left" />
                            <Icon className="twitter" type="twitter" />
                            <Divider type="left" />
                            <Icon className="instagram" type="instagram" />
                            <Divider type="left" />
                            <Icon className="linkedin" type="linkedin" />
                        </div>
                    </div>
                </Col>
                    <Col md={{ span: 3, offset: 15 }}>
                        <Button className="editProfile">Edit Profile</Button>
                </Col>
            </Row>
        </CardProfile>
            <PropertyList userProps={properties} className="card-profile"/>
        </div>
        );
    };
    
    
export default withRouter(Profile);