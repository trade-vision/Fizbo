import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, Icon, Divider } from 'antd';
import {Button, Modal, Form} from 'react-bootstrap';
import { withRouter, Redirect } from "react-router";
import PropertyList from '../property/UserPropertyList'
import Map from '../property/Map'
import Grid from '@material-ui/core/Grid';
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
    const [propImages, setPropImages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    const [viewMapText, setViewMapText] = useState(['View on map', 'Hide Map']);
    const [isMapShown, setIsMapShown] = useState(false);
    let [numMapToggle, setNumMapToggle] = useState(0)
    
    const handleUserProperties = () => {
        try {
                axios.get(`/properties/${userData.id}`)
                    .then((propResponse) => {
                        let myProps = propResponse.data;
                        // console.log(myProps);
                        myProps.forEach(prop => prop.images = []);
                        setUserProps(myProps);
                        
                    // grabbing the images for each property
                        myProps.map(async (prop)=> {
                            let images = await axios.get(`images/${prop.id}`);
                            images.data.map((image) => {
                                // console.log(image);
                                image.propId = prop.id;
                                prop.images.push(image);
                            });
                        })
                    });    
        } catch {

        }
    }

    const changePicture = () => {
        setNumMapToggle(numMapToggle += 1);
    }
    
    const showMap = () => {
        changePicture();
        // setViewMapText();
        console.log()
        setIsMapShown(!isMapShown)
    }
    const toggleModal = () => setIsOpen(!isOpen);

    //---------- Edit Profile Functions ----------------

    const [defaultUser, setDefaultUser] = useState(userData);
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [number, setNumer] = useState();
    const [company, setCompany] = useState();
    const [facebook, setFb] = useState();
    const [twitter, setTwitter] = useState();
    const [insta, setInsta] = useState();
    const [linkedIn, setLinkedin] = useState();


    const handleUsername = (e) => {
        const username =  e.target.value;
        setUser(username);
    }

    const handleEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handleNumber = (e) => {
        const number = e.target.value;
        setNumer(number);
    }

    const handleCompany = (e) => {
        const company =  e.target.value
        setCompany(company);
    }

    const handleFacebook = (e) => {
        const fbProfile = e.target.value
        setFb(fbProfile);
    }

    const handleTwitter = (e) => {
        const twitter = e.target.value
        setTwitter(twitter);
    }

    const handleInsta = (e) => {
        const insta = e.target.value
        setInsta(insta);
    }

    const handleLinkedin = (e) => {
        const linkedIn = e.target.value
        setLinkedin(linkedIn);
    }

    const editProfile = async () => {
        let newEdits = {
            name: user,
            email: email,
            phone_number: number,
            company: company,
            facebook_profile: facebook,
            twitter_profile: twitter,
            insta_profile: insta,
            linkedIn_profile: linkedIn
        }
        
        axios.put('/editProfile', newEdits)
            .then((successEdit)=> {
                const newUserData = successEdit.data;
                setDefaultUser(newUserData);
            }).catch(err => console.log(err));
        setIsOpen(!isOpen);
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
                        <Avatar src={defaultUser.profile_pic} size={160} />
                </div>
            </BgUser>
            <Row type="flex" gutter={18}>
                <Col span={6}>
                    <div className="contact">
                        <strong>{defaultUser.name}</strong>
                        <small>{defaultUser.company}</small>
                        <small>{defaultUser.phone_number}</small>
                        <div className="mail"><Icon type="google" />{defaultUser.email}</div>
                        <div className="social">
                                <Icon className="facebook" type="facebook" onClick={() => <Redirect to="www.facebook.com"/>}/>
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
                        <Button className="editProfile" onClick={toggleModal}>Edit Profile</Button>
                        <Modal show={isOpen} onHide={toggleModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form.Control type="text" autoComplete={userData.name} placeholder="Name" onChange={handleUsername} />
                                <br />
                                <Form.Control type="text" autoComplete={userData.email} placeholder="Email" onChange={handleEmail} />
                                <br />
                                <Form.Control type="text" autoComplete={userData.phone_number} placeholder="Phone #"onChange={handleNumber} />
                                <br />
                                <Form.Control type="text" autoComplete={userData.company} placeholder="Company" onChange={handleCompany} />
                                <br />
                                <Form.Control type="text" placeholder="Facebook link" onChange={handleFacebook} />
                                <br />
                                <Form.Control type="text" placeholder="twitter link" onChange={handleTwitter} />
                                <br />
                                <Form.Control type="text" placeholder="Instagram link" onChange={handleInsta} />
                                <br />
                                <Form.Control type="text" placeholder="Linkedin link" onChange={handleLinkedin} />
                                <br />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={editProfile}>Submit</Button>
                                <Button variant="secondary" onClick={toggleModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                </Col>
            </Row>
        </CardProfile>
            <PropertyList user={userData} userProps={properties} propImages={propImages} className="card-profile"/>
            {isMapShown ? <Map /> : null}
            <div>
                <Grid container justify="center" >
            <Button onClick={showMap}>{viewMapText[(numMapToggle) % viewMapText.length]}</Button>
                </Grid>
            </div>
        </div>
        );
    };
    
    
export default withRouter(Profile);