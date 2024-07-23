import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import IMAGES from "../../assets/images";
import {
  Box,
  Typography,
  GenericButton,
} from "../../components/GenericComponents";

const ExternalLinkAdScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const externalLink = location.state?.externalLink || null;
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(10);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  useEffect(() => {
    if (externalLink) {
      timerRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            window.location.href = externalLink;
            clearInterval(timerRef.current);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    } else {
      navigate(-1);
    }
  }, [externalLink, navigate]);

  useEffect(() => {
    if (isNavigatingBack) {
      navigate(-1); // Navigate back to the listingDetailsPage
    }
  }, [isNavigatingBack, navigate]);

  const handleNavigateBack = () => {
    clearInterval(timerRef.current);
    setIsNavigatingBack(true);
  };

  return (
    <div className="w-100" style={{ height: "calc(100vh - 80px)" }}>
      <Container className="d-flex flex-column justify-content-center align-items-center pt-3">
        <img
          className="ads-loading-icon"
          width={230}
          src={IMAGES.ADS_EXTERNAL_LINK}
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
          You will be redirected to an External Link in{" "}
          <span className="text-decoration-underline">{countdown} secs</span>
        </Typography>

        <GenericButton
          size="16px"
          weight="700"
          radius="50px"
          height="50px"
          padding="10px 30px"
          onClick={handleNavigateBack}
        >
          I changed my mind. Let’s go back.
        </GenericButton>

        <Box width="390px" className="ads-square-box d-flex mt-2">
          <img
            style={{ maxWidth: "370px" }}
            className="mt-4 mx-auto img-fluid navigate-ads-img"
            src={IMAGES.ADS_SQUARE_IMG}
            alt="Ad"
          />
        </Box>
      </Container>
    </div>
  );
};

export default ExternalLinkAdScreen;
