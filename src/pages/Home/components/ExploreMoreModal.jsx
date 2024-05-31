import React from 'react';
import PropTypes from "prop-types";
import { Col, Row } from 'react-bootstrap';
import GenericModal from '../../../components/GenericComponents/Modal';
import { Box } from '../../../components/GenericComponents';
import AdsSection from "../../../components/Shared/AdsSection";
import { Link } from 'react-router-dom';

const ExploreMoreModal = ({ show, onHide, exploreModalItems }) => {

    const { heading, items } = exploreModalItems;

    console.log("exploreModalItems", exploreModalItems)

    return (
        <GenericModal show={show} onHide={onHide} size="lg" title={heading.name}>
            <Box padding="25px 40px" className="w-100 box-link-grid">
                {items.map((item, index) => (
                    <Link key={index} className='modal-link transition-2 w-100 text-center' to="/listings">
                        <Box
                            background="#F3F3F3"
                            height="48px"
                            padding="8px 10px"
                            radius="4px"
                            className="d-flex align-items-center justify-content-center link-box w-100"
                        >
                            {item.name}
                        </Box>
                    </Link>
                ))}

            </Box>

            <Row className='mb-4'>
                <Col className='mx-auto' md={9}>
                    <AdsSection margin={0} padding={3} />
                </Col>
            </Row>
        </GenericModal>
    );
};

ExploreMoreModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    exploreModalItems: PropTypes.array.isRequired,
};

export default ExploreMoreModal;

