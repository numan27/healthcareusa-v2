import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import IMAGES from "../../assets/images";
import { Box, Typography } from "../../components/GenericComponents";

const ExternalLinkAdScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const externalLink = location.state?.externalLink || null;

  useEffect(() => {
    if (externalLink) {
      const timer = setTimeout(() => {
        window.location.href = externalLink;
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    } else {
      // No externalLink, navigate back to the previous page
      navigate(-1);
    }
  }, [externalLink, navigate]);

  return (
    <div className="w-100" style={{ height: "calc(100vh - 80px)" }}>
      <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
        <img
          className="ads-loading-icon"
          width={260}
          src={IMAGES.ADS_LOADING_ICON}
          alt="icon"
        />

        <Typography
          className="mt-2"
          as="p"
          align="center"
          color="#23262F"
          weight="600"
          size="15px"
          lineHeight="27px"
          font="Plus Jakarta Sans"
        >
          You are being redirected to an external link. Please wait...
        </Typography>

        <Box width="450px" className="ads-square-box">
          <img
            className="mt-5 img-fluid"
            src={IMAGES.ADS_SQUARE_IMG}
            alt="Ad"
          />
        </Box>
      </Container>
    </div>
  );
};

export default ExternalLinkAdScreen;
