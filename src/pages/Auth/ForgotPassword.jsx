import PropTypes from "prop-types"
import { Form } from 'react-bootstrap';
import GenericModal from '../../components/GenericComponents/Modal';
import { Box, GenericButton, Typography } from '../../components/GenericComponents';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ show, onHide, title, moveToSignIn }) => {

    return (
        <GenericModal show={show} onHide={onHide} size="md" title={title}>
            <Box padding="25px 25px" className="w-100 auth-modal">
                <Typography align="center" as="h2" weight="700" color="#06312E" size="28px">
                    Verify your email
                </Typography>

                <Form>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Typography className="mb-2" as="label" size="16px" color="#344054" lineHeight="16px">
                            Email
                        </Typography>
                        <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>

                    <div className='pt-2'>
                        <GenericButton height="52px" width="100%" background="#50D1C9" weight="700" size="16px" type="submit">
                            Confirm
                        </GenericButton>
                    </div>

                    <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                        <Typography className="mb-0" as="label" size="16px" color="#98A2B3" lineHeight="16px">
                            Go Back to
                        </Typography>
                        <Link onClick={moveToSignIn} className='primary-color text-decoration-none'>
                            Sign In
                        </Link>
                    </div>
                </Form>
            </Box>
        </GenericModal>
    )
}

ForgotPassword.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    moveToSignIn: PropTypes.func.isRequired,
};
export default ForgotPassword;