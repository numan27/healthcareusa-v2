
import { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import IMAGES from "../../../../assets/images"
import PATH from "../../../../utils/path"
import { Box, GenericButton, Typography } from '../../../../components/GenericComponents';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import SignInModal from '../../../../pages/Auth/SignIn';
import ForgotPassword from '../../../../pages/Auth/ForgotPassword';
import SignUpModal from '../../../../pages/Auth/SignUp';
import LanguageSelect from '../../../Shared/LanguageSelect';
import LoginIcon from '../../../../assets/SVGs/Login';

const Header = () => {
  const location = useLocation();
  const [forgetPassModalShow, setForgetPassModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const CloseModal = () => {
    setSignInModalShow(false);
    setForgetPassModalShow(false);
    setSignUpModalShow(false);
  };

  const openSignInModal = () => {
    setSignUpModalShow(false);
    setSignInModalShow(true);
  };

  return (
    <>
      <Box
        className="top-bar px-xl-3"
        background="#EFEFEF"
        width="100"
        padding="7px 0px"
      >
        <Container fluid
          className='d-flex justify-content-end'
        >
          <Box
            background="#EAFFFF"
            border="1px solid #50D1C9"
            padding="3.5px 4px 3.5px 12px"
            className="rounded-5 d-flex align-items-center gap-2 getStartedBtn-container"
          >
            <Typography className="mb-0 d-sm-block d-none" as="p" color="#06312E" size="14px" lineHeight="21px">
              Looking to Promote Your Practice?
            </Typography>
            <Button className='getStartedBtn rounded-5 text-white border-0 py-1'>
              Click here to get started!
            </Button>
          </Box>
        </Container>
      </Box>

      <Navbar className='bg-white nav-bar px-xl-3 py-lg-3 py-1 custom-shadow' expand="xl">
        <Container className="py-md-4 py-sm-3 py-2" fluid>
          <Link to={PATH.HOME}><img className='logo' width="250" src={IMAGES.LOGO} alt="logo" /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to={PATH.HOME} className={`nav-link navLink ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link to={PATH.ABOUT} className={`nav-link navLink ${location.pathname === PATH.ABOUT ? 'active' : ''}`}>About Us</Link>
              <Link to={PATH.BLOG} className={`nav-link navLink ${location.pathname === PATH.BLOG ? 'active' : ''}`}>Blog</Link>
              <Link to={PATH.RESOURCES} className={`nav-link navLink ${location.pathname === PATH.RESOURCES ? 'active' : ''}`}>Resources</Link>
              <Link to={PATH.CONTACT} className={`nav-link navLink ${location.pathname === PATH.CONTACT ? 'active' : ''}`}>Contact Us</Link>

              <div className='d-flex align-items-center ms-xl-4 mb-xl-0 mb-sm-3 mb-1'>
                <LanguageSelect />
              </div>
            </Nav>
            <Nav className="ms-xl-4">
              <div className='d-flex align-items-center justify-content-xl-end flex-wrap gap-2'>
                <GenericButton
                  onClick={openSignInModal}
                  background="#EFEFEF"
                  borderColor="#EFEFEF"
                  color="#06312E"
                  hoverColor="#06312E"
                  hoverBgColor="#dbdbdb"
                  className="me-1">
                  <LoginIcon /> Sign In
                </GenericButton>

                <GenericButton className="my-sm-0 my-2">
                  <HiOutlinePlusCircle className='' size={20} /> Add Listing
                </GenericButton>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {signInModalShow && (
          <SignInModal
            show={signInModalShow}
            onHide={CloseModal}
            moveToForgetPassword={() => {
              setSignInModalShow(false);
              setForgetPassModalShow(true);
            }}
          />
        )}

        {forgetPassModalShow && (
          <ForgotPassword
            show={forgetPassModalShow}
            onHide={CloseModal}
            title=""
          />
        )}
        {signUpModalShow && (
          <SignUpModal
            show={signUpModalShow}
            onHide={CloseModal}
            title=""
          />
        )}
      </Navbar>
    </>
  );
}

export default Header;
