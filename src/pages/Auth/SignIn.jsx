import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  Box,
  GenericButton,
  Typography,
} from "../../components/GenericComponents";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import SignUpModal from "./SignUp";
import { PATH } from "../../config";
import GenericModal from "../../components/GenericComponents/Modal";

const SignInModal = ({
  show,
  onHide,
  title,
  moveToForgetPassword,
  moveToFSignUp,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  console.log(message);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = async (values, { setSubmitting, setFieldError }) => {
    try {
      // First, perform login using Basic Auth
      const loginResponse = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/users/me",
        {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(`${values.email}:${values.password}`),
          },
        }
      );

      if (!loginResponse.ok) {
        // const errorData = await loginResponse.json();
        setFieldError("general", `Invalid credentials`);
        // setFieldError('general', `Error: ${errorData.message}`);
        return;
      }

      const loginData = await loginResponse.json();
      setMessage("Sign in successful!");
      console.log("User Data:", loginData);
      toast.success("User Logged In!", {
        autoClose: 2000,
      });

      // After successful login, fetch the JWT token
      const tokenResponse = await fetch(
        "https://jsappone.demowp.io/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.email,
            password: values.password,
          }),
        }
      );

      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        localStorage.setItem("token", tokenData.token);
        console.log("JWT Token:", tokenData.token);
        navigate(PATH.ADD_LISTING);
      } else {
        const errorData = await tokenResponse.json();
        setFieldError("general", `${errorData.message}`);
      }
    } catch (error) {
      setFieldError("general", "An unexpected error occurred.");
      console.error("Error:", error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <GenericModal show={show} onHide={onHide} size="md" title={title}>
        <Box padding="25px 25px" className="w-100 auth-modal">
          <Typography
            align="center"
            as="h2"
            weight="700"
            color="#06312E"
            size="28px"
          >
            Login to your account
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Typography
                    className="mb-2"
                    as="label"
                    size="16px"
                    color="#344054"
                    lineHeight="16px"
                  >
                    Email
                  </Typography>
                  <Field
                    type="email"
                    name="email"
                    className={`form-control${
                      errors.email && touched.email ? " is-invalid" : ""
                    }`}
                    placeholder="Enter Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-4 position-relative">
                  <Typography
                    className="mb-2 d-flex justify-content-between"
                    weight="400"
                    as="label"
                    size="16px"
                    color="#344054"
                    lineHeight="16px"
                  >
                    Password
                    {/* <Link onClick={moveToForgetPassword} className='primary-color text-decoration-none'>
                                            Forgot？
                                        </Link> */}
                  </Typography>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`form-control${
                      errors.password && touched.password ? " is-invalid" : ""
                    }`}
                    placeholder="Enter Password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ right: "10px" }}
                    className="position-absolute top-50 cursor-pointer"
                  >
                    {showPassword ? (
                      <BsEye size={20} color="#98A2B3" />
                    ) : (
                      <BsEyeSlash size={20} color="#98A2B3" />
                    )}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="pt-2">
                  <GenericButton
                    height="52px"
                    width="100%"
                    background="#50D1C9"
                    weight="700"
                    size="16px"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login now
                  </GenericButton>
                </div>
                {errors.general && (
                  <small className="text-danger mt-1">{errors.general}</small>
                )}

                <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                  <Typography
                    className="mb-0"
                    as="label"
                    size="16px"
                    color="#98A2B3"
                    lineHeight="16px"
                  >
                    Don't have an account ?
                  </Typography>
                  <Link
                    onClick={moveToFSignUp}
                    className="primary-color text-decoration-none"
                  >
                    Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </GenericModal>

      <SignUpModal
        show={signUpModalShow}
        onHide={() => setSignUpModalShow(false)}
        title="Sign Up"
      />
    </>
  );
};

SignInModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  moveToForgetPassword: PropTypes.func.isRequired,
  moveToFSignUp: PropTypes.func.isRequired,
};

export default SignInModal;
