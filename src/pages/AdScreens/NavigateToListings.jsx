import { useState, useEffect } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import IMAGES from "../../assets/images";
import { Box, Typography } from "../../components/GenericComponents";

const NavigateToListings = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(interval);
          return prevProgress;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-100" style={{ height: "calc(100vh - 80px)" }}>
      <Container className="d-flex flex-column justify-content-center align-items-center pt-3">
        <img
          className="ads-loading-icon"
          width={230}
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
            One moment please while we find you the right service provider for
            you...
          </Typography>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            style={{ marginTop: "20px", width: "100%" }}
            className="ad-progress-bar"
          />
        </div>
        <Box width="450px" className="ads-square-box d-flex mt-2">
          <img
            style={{ maxWidth: "420px" }}
            className="mt-4 mx-auto img-fluid"
            src={IMAGES.ADS_SQUARE_IMG}
            alt="Ad"
          />
        </Box>
      </Container>
    </div>
  );
};

export default NavigateToListings;
