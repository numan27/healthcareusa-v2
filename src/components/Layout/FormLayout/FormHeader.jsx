import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/images";
import { GenericButton } from "../../GenericComponents";
import LoginIcon from "../../../assets/SVGs/Login";
import { PATH } from "../../../config";
import { toast } from "react-toastify";
//
const FormHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(PATH.HOME);
    // toast.success("User Logged Out!", {
    //   autoClose: 2000,
    // });
  };

  return (
    <>
      <Navbar className="bg-white nav-bar px-xl-3" expand="xl" fixed="top">
        <Container className="py-0" fluid>
          <Link to={PATH.HOME}>
            <img className="logo" width="230" src={IMAGES.LOGO} alt="logo" />
          </Link>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="ms-auto">
            <GenericButton
              onClick={handleLogout}
              background="transparent"
              borderColor="transparent"
              color="#000"
              hoverColor="#000"
              hoverBgColor="transparent"
              className="me-1 text-uppercase"
            >
              Exit
              <LoginIcon color="#000" flipHorizontal />
            </GenericButton>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
};

export default FormHeader;
