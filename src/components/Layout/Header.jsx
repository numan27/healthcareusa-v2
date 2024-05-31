import { Suspense, useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import IMAGES from "../../assets/images";
import { Box, GenericButton, Typography } from '../GenericComponents';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import SignInModal from '../../pages/Auth/SignIn';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import SignUpModal from '../../pages/Auth/SignUp';
import LanguageSelect from '../Shared/LanguageSelect';
import LoginIcon from '../../assets/SVGs/Login';
import { PATH } from '../../config';
import { LoaderCenter } from "../../assets/Loader";
import axios from 'axios';

const Header = () => {
  const location = useLocation();
  const [forgetPassModalShow, setForgetPassModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://jsappone.demowp.io/wp-json/wp/v2/menu-items?menus=144', {
          auth: {
            username: 'numankhalil27@gmail.com',
            password: 'ugyzaq3R2uODAxA8B0NQ2Q18'
          }
        });
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const CloseModal = () => {
    setSignInModalShow(false);
    setForgetPassModalShow(false);
    setSignUpModalShow(false);
  };

  const openSignInModal = () => {
    setSignUpModalShow(false);
    setSignInModalShow(true);
  };

  const SITE_DOMAIN = 'https://jsappone.demowp.io';

  return (
    <>
      <Box
        className="top-bar px-xl-3"
        background="#EFEFEF"
        width="100"
        padding="7px 0px"
      >
        <Container fluid className='d-flex justify-content-end'>
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
      <Suspense fallback={<LoaderCenter />}>
        {loading ? (
          <LoaderCenter />
        ) : (
          <Navbar className='bg-white nav-bar px-xl-3 py-lg-3 py-1 custom-shadow' expand="xl">
            <Container className="py-md-4 py-sm-3 py-2" fluid>
              <Link to={PATH.HOME}><img className='logo' width="250" src={IMAGES.LOGO} alt="logo" /></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {/* {menus.map((menu, index) => {
                    const isActive = location.pathname === '/' && menu.title.rendered === 'Home' || (menu.url && location.pathname === `/${menu.slug}`);
                    return (
                      <Link key={index} to={menu.title.rendered === "Home" ? '/' : `/${menu.url}`} className={`nav-link navLink ${isActive ? 'active' : ''}`}>
                        {menu.title.rendered}
                      </Link>
                    );
                  })} */}

                  {menus.map((menu, index) => {
                    const linkTo = menu.title.rendered === "Home" ? `${PATH.HOME}` : `${SITE_DOMAIN}${menu.url}`;
                    const isActive = location.pathname === '/' && menu.title.rendered === 'Home' || (menu.url && location.pathname === `/${menu.slug}`);
                    return (
                      <Link key={index} to={linkTo} className={`nav-link navLink ${isActive ? 'active' : ''}`}>
                        {menu.title.rendered}
                      </Link>
                    );
                  })}
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
                moveToFSignUp={() => {
                  setSignInModalShow(false);
                  setSignUpModalShow(true);
                }}
              />
            )}

            {forgetPassModalShow && (
              <ForgotPassword
                show={forgetPassModalShow}
                onHide={CloseModal}
                title=""
                moveToSignIn={() => {
                  setForgetPassModalShow(false);
                  setSignInModalShow(true);
                }}
              />
            )}
            {signUpModalShow && (
              <SignUpModal
                show={signUpModalShow}
                onHide={CloseModal}
                title=""
                moveToSignIn={() => {
                  setSignUpModalShow(false);
                  setSignInModalShow(true);
                }}
              />
            )}
          </Navbar>
        )}
      </Suspense>
    </>
  );
}

export default Header;
