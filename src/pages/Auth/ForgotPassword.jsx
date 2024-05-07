// import { useState } from 'react'
import PropTypes from "prop-types"
import { Form } from 'react-bootstrap';
import GenericModal from '../../components/GenericComponents/Modal';
import { Box, GenericButton, Typography } from '../../components/GenericComponents';
import { Link } from 'react-router-dom';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';

const ForgotPassword = ({ show, onHide, title }) => {
    // const [showPassword, setShowPassword] = useState(false);

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

                    {/* <Form.Group className="mb-4 position-relative" controlId="formBasicPassword">
                        <Typography className="mb-2 d-flex justify-content-between" weight="400" as="label" size="16px" color="#344054" lineHeight="16px">
                            Password
                            <Link className='primary-color text-decoration-none'>
                                Forgot？
                            </Link>
                        </Typography>
                        <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter Password" />

                        <span onClick={() => setShowPassword(!showPassword)} style={{ right: '10px' }} className='position-absolute top-50 cursor-pointer'>
                            {showPassword ? (<BsEye size={20} color="#98A2B3" />) : (<BsEyeSlash size={20} color="#98A2B3" />)}
                        </span>
                    </Form.Group> */}
                    <div className='pt-2'>
                        <GenericButton height="52px" width="100%" background="#50D1C9" weight="700" size="16px" type="submit">
                            Login now
                        </GenericButton>
                    </div>

                    <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                        <Typography className="mb-0" as="label" size="16px" color="#98A2B3" lineHeight="16px">
                            Don't have an account ?
                        </Typography>
                        <Link className='primary-color text-decoration-none'>
                            Sign Up
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
};
export default ForgotPassword;