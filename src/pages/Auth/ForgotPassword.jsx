import PropTypes from 'prop-types';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, GenericButton, Typography } from '../../components/GenericComponents';
import { Link } from 'react-router-dom';
import GenericModal from '../../components/GenericComponents/Modal';

const ForgotPassword = ({ show, onHide, title, moveToSignIn }) => {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const handleForgotPassword = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axios.post('https://jsappone.demowp.io/wp-json/wp/v2/users/lostpassword', {
                email: values.email
            });

            if (response.status === 200) {
                toast.success('Password reset email sent!', {
                    autoClose: 2000,
                });
                moveToSignIn();
            } else {
                setFieldError('general', 'Error sending password reset email.');
            }
        } catch (error) {
            setFieldError('general', error.response?.data?.message || 'An unexpected error occurred.');
        }
        setSubmitting(false);
    };

    return (
        <GenericModal show={show} onHide={onHide} size="md" title={title}>
            <Box padding="25px 25px" className="w-100 auth-modal">
                <Typography align="center" as="h2" weight="700" color="#06312E" size="28px">
                    Verify your email
                </Typography>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleForgotPassword}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <div className="mb-4">
                                <Typography className="mb-2" as="label" size="16px" color="#344054" lineHeight="16px">
                                    Email
                                </Typography>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`form-control${errors.email ? ' is-invalid' : ''}`}
                                    placeholder="Enter Email"
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className='pt-2'>
                                <GenericButton height="52px" width="100%" background="#50D1C9" weight="700" size="16px" type="submit" disabled={isSubmitting}>
                                    Confirm
                                </GenericButton>
                            </div>
                            {errors.general && <p className="text-danger">{errors.general}</p>}

                            <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                                <Typography className="mb-0" as="label" size="16px" color="#98A2B3" lineHeight="16px">
                                    Go Back to
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
    )
}

ForgotPassword.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    moveToSignIn: PropTypes.func.isRequired,
};
export default ForgotPassword;