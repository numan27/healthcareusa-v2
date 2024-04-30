/* eslint-disable */
import { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import IMAGES from "../../../../assets/images"
import PATH from "../../../../utils/path"
// import LanguageToggle from "./LanguageToggle"
import { Box, GenericButton, GenericSelect, Typography } from '../../../../components/GenericComponents';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import LoginModal from '../../../../pages/Auth/LoginModal';

const Header = () => {
  const location = useLocation();
  const [loginModalState, setLoginModalState] = useState(false);

  const OpenModal = () => {
    setLoginModalState(true);
  };

  const CloseModal = () => {
    setLoginModalState(false);
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

      <Navbar className='bg-white nav-bar px-xl-3 py-lg-3 py-1 custom-shadow' expand="lg">
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

              <div className='d-flex align-items-center ms-lg-4 mb-lg-0 mb-3'>
                <GenericSelect
                  className="w-100-md"
                  width="130px"
                  minWidth="94px"
                  borderColor="transparent"
                  bgcolor="transparent"
                  placeholder="English"
                  placeholderColor="#333333"
                  imageComponent={IMAGES.FLAG_ICON}
                  options={[
                    {
                      label: "English",
                      value: "EN",
                    },
                    {
                      label: "Spanish",
                      value: "Es",
                    },
                    {
                      label: "French",
                      value: "Fr",
                    },
                  ]}
                />
              </div>
            </Nav>
            <Nav className="ms-lg-4">
              <div className='d-flex align-items-center justify-content-lg-end flex-wrap gap-2'>
                <Button onClick={OpenModal} className='secondaryButton'>
                  <img className='me-1' src={IMAGES.LOGIN_ICON} alt="" />
                  Sign In
                </Button>
                <GenericButton className="my-sm-0 my-2">
                  <HiOutlinePlusCircle className='' size={20} /> Add Listing
                </GenericButton>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {loginModalState && (
          <LoginModal
            show={loginModalState}
            onHide={CloseModal}
            title=""
          />
        )}
      </Navbar>
    </>
  );
}

export default Header;
