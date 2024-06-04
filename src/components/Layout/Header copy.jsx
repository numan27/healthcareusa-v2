
import { Suspense, useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import IMAGES from "../../assets/images"
import { Box, GenericButton, Typography } from '../GenericComponents';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import SignInModal from '../../pages/Auth/SignIn';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import SignUpModal from '../../pages/Auth/SignUp';
import LanguageSelect from '../Shared/LanguageSelect';
import LoginIcon from '../../assets/SVGs/Login';
import { PATH } from '../../config';
// import axios from "../../assets/axios"
import { LoaderCenter } from "../../assets/Loader";
import axios from 'axios';

const Header = () => {
  const location = useLocation();
  const [forgetPassModalShow, setForgetPassModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async (perPage) => {
  //     let url = `https://jsappone.demowp.io/wp-json/wp/v2/nav-menu?per_page=${perPage}`;
  //     try {
  //       const response = await axios.get(url);
  //       const data = response.data.map(item => ({
  //         ...item,
  //         name: item.name.replace(/&amp;/g, '&')
  //       }));
  //       setMenus(data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts(10);
  // }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('https://jsappone.demowp.io/wp-json/wp/v2/menus/', {
          auth: {
            username: 'numankhalil27@gmail.com',
            password: 'ugyzaq3R2uODAxA8B0NQ2Q18'
          }
        });
        setMenus(response.data.items);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  console.log("menus", menus)

  const staticMenuNames = ["Home", "About Us", "Blog", "Resources", "Contact Us"];

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
                  {staticMenuNames.map((menuName, index) => {
                    const menuItem = menus.find(menu => menu.name === menuName);
                    const isActive = location.pathname === '/' && menuName === 'Home' || (menuItem && menuItem.slug && location.pathname === `/${menuItem.slug}`);
                    return menuItem && (
                      <Link key={index} to={menuItem.name === "Home" ? '/' : `/${menuItem.slug}`} className={`nav-link navLink ${isActive ? 'active' : ''}`}>
                        {menuItem.name}
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
