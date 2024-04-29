import React from 'react'
import PropTypes from "prop-types"
// import { Col, Row } from 'react-bootstrap';
import GenericModal from '../../components/GenericComponents/Modal';
import { Box, Typography } from '../../components/GenericComponents';
// import IMAGES from '../../../assets/images';

const LoginModal = ({ show, onHide, title }) => {


    return (
        <GenericModal show={show} onHide={onHide} size="md" title={title}>
            <Box padding="25px 25px" className="w-100">
                <Typography align="center" as="h2" weight="700" color="#06312E" size="28px">
                    Login to your account
                </Typography>

                


            </Box>
        </GenericModal>
    )
}

LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
export default LoginModal;