import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import IMAGES from "../../../../assets/images"
import PATH from "../../../../utils/path"
import LanguageToggle from "./LanguageToggle"
import { Box, GenericButton, Typography } from '../../../../components/GenericComponents';
// import { FiPlusCircle } from 'react-icons/fi';
import { HiOutlinePlusCircle } from 'react-icons/hi';

const Header = () => {
  const location = useLocation();

  return (
    <>
      <Box
        className="top-bar px-xl-3"
        background="#EFEFEF"
        width="100"
        padding="7px 0px"
      >
        <Container fluid
          className='d-flex justify-content-between'
        >

          <div className='d-flex align-items-center'>
            <LanguageToggle />
          </div>

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

      <Navbar className='bg-white nav-bar px-xl-3 py-lg-3 py-1' expand="lg">
        <Container className="py-md-4 py-sm-3 py-2" fluid>
          <Link to="/"><img className='logo' width="250" src={IMAGES.LOGO} alt="logo" /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href={PATH.HOME} className={`nav-link navLink ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
              <Nav.Link href={PATH.ABOUT} className={`nav-link navLink ${location.pathname === PATH.ABOUT ? 'active' : ''}`}>About Us</Nav.Link>
              <Nav.Link href={PATH.BLOG} className={`nav-link navLink ${location.pathname === PATH.BLOG ? 'active' : ''}`}>Blog</Nav.Link>
              <Nav.Link href={PATH.RESOURCES} className={`nav-link navLink ${location.pathname === PATH.RESOURCES ? 'active' : ''}`}>Resources</Nav.Link>
              <Nav.Link href={PATH.CONTACT} className={`nav-link navLink ${location.pathname === PATH.CONTACT ? 'active' : ''}`}>Contact Us</Nav.Link>
            </Nav>
            <Nav className="ms-lg-4">
              <div className='d-sm-block d-grid'>
                <Button className='secondaryButton'>
                  <img className='me-1' src={IMAGES.LOGIN_ICON} alt="" />
                  Sign In
                </Button>
                <GenericButton className="mx-sm-2 my-sm-0 my-2">
                  <HiOutlinePlusCircle className='mb-1' size={20} /> Add Listing
                </GenericButton>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
