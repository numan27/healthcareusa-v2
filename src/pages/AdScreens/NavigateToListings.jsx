import { useEffect, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import IMAGES from "../../assets/images";
import { Box, Typography } from "../../components/GenericComponents";

const NavigateToListings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          navigate("/listings", {
            state: { ...location.state, adShown: true },
            replace: true,
          });
          return 100;
        }
        return prevProgress + 1;
      });
    }, 60); // milliseconds

    return () => clearInterval(timer);
  }, [navigate, location.state]);

  return (
    <div ClassName="w-100" style={{ height: "calc(100vh - 80px)" }}>
      <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
        <img
          className="ads-loading-icon"
          width={260}
          src={IMAGES.ADS_LOADING_ICON}
          alt="icon"
        />

        <div>
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
            One moment please while we find you the right service provider
            you...{" "}
          </Typography>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            // striped
            // variant="success"
            style={{ marginTop: "20px", width: "100%" }}
            className="ad-progress-bar"
          />
        </div>
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

export default NavigateToListings;
