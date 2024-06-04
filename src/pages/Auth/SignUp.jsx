import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import GenericModal from '../../components/GenericComponents/Modal';
import { Box, GenericButton, Typography } from '../../components/GenericComponents';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';

const SignUpModal = ({ show, onHide, title, moveToSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const credentials = btoa('numan27:findhealthcareusa');

        const response = await fetch('https://jsappone.demowp.io//wp-json/custom/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('');
            toast.success('User Successfully Registered!', {
                autoClose: 2000,
            });
            moveToSignIn();
        } else {
            setMessage(`Error: ${data.message}`);
        }
    };

    return (
        <GenericModal show={show} onHide={onHide} size="md" title={title}>
            <Box padding="25px 25px" className="w-100 auth-modal">
                <Typography align="center" as="h2" weight="700" color="#06312E" size="28px">
                    Register your account
                </Typography>

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-4" controlId="formBasicUsername">
                        <Typography className="mb-2" as="label" size="16px" color="#344054" lineHeight="16px">
                            User Name
                        </Typography>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter User Name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Typography className="mb-2" as="label" size="16px" color="#344054" lineHeight="16px">
                            Email
                        </Typography>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4 position-relative" controlId="formBasicPassword">
                        <Typography className="mb-2 d-flex justify-content-between" weight="400" as="label" size="16px" color="#344054" lineHeight="16px">
                            Password
                        </Typography>
                        <Form.Control
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                        />

                        <span onClick={() => setShowPassword(!showPassword)} style={{ right: '10px' }} className='position-absolute top-50 cursor-pointer'>
                            {showPassword ? (<BsEye size={20} color="#98A2B3" />) : (<BsEyeSlash size={20} color="#98A2B3" />)}
                        </span>
                    </Form.Group>
                    <div className='pt-2'>
                        <GenericButton
                            height='52px'
                            width='100%'
                            background='#50D1C9'
                            weight='700'
                            size='16px'
                            type='submit'
                        >
                            Register
                        </GenericButton>
                    </div>
                    {message && <p>{message}</p>}

                    <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                        <Typography className='mb-0' as='label' size='16px' color='#98A2B3' lineHeight='16px'>
                            Already have an account?
                        </Typography>
                        <Link onClick={moveToSignIn} className='primary-color text-decoration-none'>
                            Sign In
                        </Link>
                    </div>
                </Form>
            </Box>
        </GenericModal>
    );
};

SignUpModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    moveToSignIn: PropTypes.func.isRequired,
};

export default SignUpModal;
