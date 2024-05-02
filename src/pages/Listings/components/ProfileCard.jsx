import React from 'react'
import { Box, GenericBadge, GenericButton, Typography } from '../../../components/GenericComponents'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid';
import IMAGES from '../../../assets/images'
import { GoDotFill } from 'react-icons/go'

const ProfileCard = ({ jsonData, enableSponsoredProfile, columnPadding }) => {

    const navigate = useNavigate();

    const handleNavigate = (event, data) => {
        event.preventDefault();
        const jsonDataString = JSON.stringify(data);
        navigate(`/listing-details?jsonData=${encodeURIComponent(jsonDataString)}`);
    };

    return (
        <>
            {jsonData.map((data) => (
                <Box
                    // key={uuidv4()}
                    padding="16px"
                    width="100%"
                    className="custom-border rounded position-relative mb-4">
                    <Row>
                        {enableSponsoredProfile && (
                            <Col lg={3} md={6} className='d-flex justify-content-center mx-auto mb-3 mb-lg-0 pt-md-0 pt-4'>
                                <img className='img-fluid' src={data.img} alt="" />
                            </Col>
                        )}

                        <Col className={`d-flex flex-column justify-content-between ${columnPadding ? 'ps-1' : ''}`}>
                            <div className='d-flex flex-sm-row flex-column justify-content-between align-items-sm-center'>
                                <div>
                                    <Link
                                        className='text-decoration-none'
                                        onClick={(event) => handleNavigate(event, data)}>
                                        <Typography as="h2" color="#23262F" weight="700" size="24px" lineHeight="36px">
                                            {data.doctorName}
                                        </Typography>
                                    </Link>

                                    <div className='d-flex gap-2'>
                                        <GenericBadge
                                            text={data.designation}
                                            fontSize="12px"
                                            weight="700"
                                            color="#64666C"
                                        />
                                        <GenericBadge
                                            text={data.languages}
                                            fontSize="12px"
                                            weight="500"
                                            color="#64666C"
                                            borderColor="#E4E4E4"
                                            background="#fff"
                                        />
                                    </div>

                                    <div className='mt-3 d-flex align-items-center gap-2'>
                                        <Box width="65px" height="65px"
                                            className="custom-border rounded d-flex flex-column align-items-center justify-content-center ">
                                            <img width={44} src={data.doctorLogoImg} alt="" />
                                            <Typography as="span" color="#23262F" weight="700" size="12px" lineHeight="15px">
                                                {data.distance} ml
                                            </Typography>
                                        </Box>

                                        <Box width="140px" className="">
                                            <Typography as="span" color="#23262F" weight="500" size="14px" lineHeight="18px">
                                                {data.address}
                                            </Typography>
                                        </Box>
                                    </div>

                                    <div className='d-flex align-items-center gap-2 mt-3'>
                                        <img width={21} src={IMAGES.PHONE_CIRCLE} alt="icon" />
                                        <Typography className="mb-0" as="h5" color="#23262F" weight="700" size="16px" lineHeight="24px">
                                            {data.phone}
                                        </Typography>
                                    </div>
                                </div>
                                {enableSponsoredProfile && (
                                    <img className="mt-4" width={100} src={data.profileCompanyLogoImg} alt="" />
                                )}
                            </div>

                            {enableSponsoredProfile && (
                                <div className='d-flex align-items-end flex-wrap flex-sm-nowrap gap-2 mt-2xl-0 mt-3'>
                                    <GenericButton
                                        background={data.status === 'Close' ? '#23262F' : '#00C1B6'}
                                        hoverBgColor={data.status === 'Close' ? '#23262F' : '#50D1C9'}
                                        gap="15px" height="46px" width="100%" className="">
                                        <img width={24} src={IMAGES.PHONE_BTN_ICON} alt="" />
                                        Call
                                    </GenericButton>

                                    <GenericButton
                                        borderColor="#F3F3F3"
                                        hoverBgColor="#e3e3e3"
                                        hoverColor="#23262F"
                                        color="#23262F"
                                        background="#F3F3F3"
                                        height="46px"
                                        width="100%"
                                        className="">
                                        <img width={24} src={IMAGES.MAP_BTN_ICON} alt="" />
                                        Map
                                    </GenericButton>

                                    <GenericButton
                                        borderColor="#F3F3F3"
                                        hoverBgColor="#e3e3e3"
                                        hoverColor="#23262F"
                                        color="#23262F"
                                        background="#F3F3F3"
                                        height="46px"
                                        width="100%"
                                        className="">
                                        <img width={24} src={IMAGES.WEB_BTN_ICON} alt="" />
                                        Website
                                    </GenericButton>
                                </div>
                            )}

                        </Col>
                    </Row>

                    {enableSponsoredProfile && (
                        <div
                            style={{ top: '20px', right: '20px' }}
                            className='position-absolute d-flex align-items-center gap-2 profile-status'>
                            <GoDotFill color={data.status === 'Close' ? '#E91515' : '#00B293'} size="20px" />
                            <Typography as="p" className="mb-0" color="#23262F" size="14px" lineHeight="19px" weight="500">
                                {data.status}
                            </Typography>
                        </div>
                    )}
                </Box>
            ))}
        </>
    )
}

export default ProfileCard