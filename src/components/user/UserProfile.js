import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, Icon, Divider } from 'antd';
import '../../App.css'

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

const AvatarUser = () => (
    <div className="avatar-user">
        <Avatar src="http://dev.w4e.com.br/felipe/jhondoe.jpg" size={90} />
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

const ContactUser = () => (
    <div className="contact">
        <strong>Jhon Doe</strong>
        <small>CEO</small>
        <div className="mail"><Icon type="google" />jhon@gmail.com</div>
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
)

 export default function Profile(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    });

    return (
        <CardProfile loading={loading}>
            <Meta
                title="Card Profile"
                description="Your user here"
            />
            <BgUser>
                <AvatarUser />
            </BgUser>
            <Row type="flex" gutter={18}>
                <Col span={6}>
                    <ContactUser />
                </Col>
                <Col span={18}>
                    <Description />
                </Col>
            </Row>
        </CardProfile>
    );
};


