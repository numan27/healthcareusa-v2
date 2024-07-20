import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Box, GenericButton, Typography } from '../../components/GenericComponents';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import GenericModal from '../../components/GenericComponents/Modal';

const SignUpModal = ({ show, onHide, title, moveToSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('User Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
    });

    const handleRegister = async (values, { setSubmitting, setFieldError }) => {
        const credentials = btoa('numan27:findhealthcareusa');

        const response = await fetch('https://jsappone.demowp.io/wp-json/custom/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success('User Successfully Registered!', {
                autoClose: 2000,
            });
            moveToSignIn();
        } else {
            setFieldError('general', data.message);
        }
        setSubmitting(false);
    };

    return (
        <GenericModal show={show} onHide={onHide} size="md" title={title}>
            <Box padding="25px 25px" className="w-100 auth-modal">
                <Typography align="center" as="h2" weight="700" color="#06312E" size="28px">
                    Register your account
                </Typography>

                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div className="mb-4">
                                <Typography className="mb-2" as="label" size="16px" color="#344054" lineHeight="16px">
                                    User Name
                                </Typography>
                                <Field
                                    type="text"
                                    name="username"
                                    className={`form-control${errors.username && touched.username ? ' is-invalid' : ''}`}
                                    placeholder="Enter User Name"
                                />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>

                            <div className="mb-4">
                                <Typography className="mb-2" as="label" size="16px" color="#344054" lineHeight="16px">
                                    Email
                                </Typography>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                                    placeholder="Enter Email"
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="mb-4 position-relative">
                                <Typography className="mb-2 d-flex justify-content-between" weight="400" as="label" size="16px" color="#344054" lineHeight="16px">
                                    Password
                                </Typography>
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                    placeholder="Enter Password"
                                />
                                <span onClick={() => setShowPassword(!showPassword)} style={{ right: '10px' }} className='position-absolute top-50 cursor-pointer'>
                                    {showPassword ? (<BsEye size={20} color="#98A2B3" />) : (<BsEyeSlash size={20} color="#98A2B3" />)}
                                </span>
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className='pt-2'>
                                <GenericButton
                                    height='52px'
                                    width='100%'
                                    background='#50D1C9'
                                    weight='700'
                                    size='16px'
                                    type='submit'
                                    disabled={isSubmitting}
                                >
                                    Register
                                </GenericButton>
                            </div>
                            {errors.general && <p className="text-danger">{errors.general}</p>}

                            <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                                <Typography className='mb-0' as='label' size='16px' color='#98A2B3' lineHeight='16px'>
                                    Already have an account?
                                </Typography>
                                <Link onClick={moveToSignIn} className='primary-color text-decoration-none'>
                                    Sign In
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
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
