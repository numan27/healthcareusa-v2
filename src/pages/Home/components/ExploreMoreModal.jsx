import React from 'react'
import PropTypes from "prop-types"
import { Col, Row } from 'react-bootstrap';
import GenericModal from '../../../components/GenericComponents/Modal';
import { Box } from '../../../components/GenericComponents';
import AdsSection from "../../../components/Shared/AdsSection"

const ExploreMoreModal = ({ show, onHide, title }) => {

    const boxLinkData = [
        { title: "Doctors", link: "#/" },
        { title: "Urgent Care", link: "#/" },
        { title: "Audiologists", link: "#/" },
        { title: "Cardiology", link: "#/" },
        { title: "Cardiology", link: "#/" },
        { title: "Orthopedic Surgeons", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Doctors", link: "#/" },
        { title: "Urgent Care", link: "#/" },
        { title: "Audiologists", link: "#/" },
        { title: "Cardiology", link: "#/" },
        { title: "Cardiology", link: "#/" },
        { title: "Orthopedic Surgeons", link: "#/" },
        { title: "Doctors", link: "#/" },
        { title: "Urgent Care", link: "#/" },
        { title: "Audiologists", link: "#/" },
        { title: "Cardiology", link: "#/" },
        { title: "Cardiology", link: "#/" },
        { title: "Orthopedic Surgeons", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Neurology", link: "#/" },
        { title: "Doctors", link: "#/" },
        { title: "Urgent Care", link: "#/" },
    ]

    return (
        <GenericModal show={show} onHide={onHide} size="lg" title={title}>
            <Box padding="25px 50px" className="w-100 box-link-grid">
                {boxLinkData.map((items) => (
                    <a className='modal-link transition-2 w-100 ' href={items.link}>
                        <Box
                            background="#F3F3F3"
                            // width="203px"
                            height="40px"
                            padding="8px 16px"
                            radius="4px"
                            className="d-flex align-items-center justify-content-center link-box w-100"
                        >
                            {items.title}
                        </Box>
                    </a>
                ))}
            </Box>

            <Row className='mb-4'>
                <Col className='mx-auto' md={9}>
                    <AdsSection margin={0} padding={3} />
                </Col>
            </Row>

        </GenericModal>
    )
}

ExploreMoreModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
export default ExploreMoreModal;