import { Col, Container, Row } from "react-bootstrap";
import { FaRegCircleCheck } from "react-icons/fa6";
import {
  Box,
  GenericButton,
  Typography,
} from "../../../../components/GenericComponents";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const FeaturedListings = () => {
  const PRICING_DATA = [
    {
      icon: "",
      planType: "",
      title: "Basic Plan",
      desc: "For Local Businesses/Practices",
      locations: "One Location",
      price: "Free",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
      ],
    },
    {
      icon: <MdOutlineWorkspacePremium size={24} />,
      planType: "Premium",
      title: "Standard Plan",
      desc: "For Local Businesses/Practices",
      locations: "One Location",
      price: "19",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
        { feature: "Fax" },
        { feature: "Email" },
        { feature: "Website" },
        { feature: "Appointment Request Link " },
        { feature: "Facebook" },
        { feature: "Instagram" },
        { feature: "X (Twitter)" },
        { feature: "Google Business Profile" },
        { feature: "YouTube" },
        { feature: "LinkedIn" },
        { feature: "Business Hours " },
        { feature: "Business Description" },
        { feature: "Logo (drop or upload) " },
        { feature: "Images (drop or upload) — Up to 3 images " },
        { feature: "Video Link—Limit of 1 " },
      ],
    },
    {
      icon: <MdOutlineWorkspacePremium size={24} />,
      planType: "Premium",
      title: "Regionally Featured",
      desc: "For business with over 4 locations, please contact us special for pricing options.",
      price: "49",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
        { feature: "Fax" },
        { feature: "Email" },
        { feature: "Website" },
        { feature: "Appointment Request Link" },
        { feature: "Facebook" },
        { feature: "Instagram" },
        { feature: "X (Twitter)" },
        { feature: "Google Business Profile" },
        { feature: "YouTube" },
        { feature: "LinkedIn" },
        { feature: "Business Hours" },
        { feature: "Business Description" },
        { feature: "Logo (drop or upload)" },
        { feature: "Images (drop or upload) — Up to 3 images" },
        { feature: "Video Link—Limit of 1" },
      ],
    },
  ];

  return (
    <>
      <Container className="py-md-5 py-4 mt-3">
        <Row>
          {PRICING_DATA.map((items, index) => (
            <Col md={4} className="">
              <Box
                className="w-100 custom-shadow rounded-2 d-flex flex-column justify-content-between align-items-center"
                border=""
              >
                <Box
                  background="#EAFFFF"
                  className="w-100 rounded-2 position-relative"
                  color="#000"
                >
                  <Box
                    className="rounded-top-2"
                    padding="45px 34px"
                    border="1px solid #00C1B6"
                  >
                    <div
                      style={{ top: "20px", left: "28px" }}
                      className="position-absolute d-flex align-items-center gap-2"
                    >
                      {items?.icon}
                      <Typography
                        className="mb-0"
                        weight="400"
                        size="16px"
                        lineHeight="18px"
                      >
                        {items.planType}
                      </Typography>
                    </div>

                    <div className="">
                      <Typography
                        weight="500"
                        size="30px"
                        lineHeight="38px"
                        className="mt-3"
                      >
                        {items.title}
                      </Typography>

                      {/* Plan Desc */}
                      <div>
                        <Typography
                          weight="400"
                          size="17px"
                          lineHeight="24px"
                          className="mb-0"
                        >
                          {items.desc}
                          <span className="fw-bold"> {items.locations}</span>
                        </Typography>
                      </div>

                      <div className="d-flex align-items-start mt-5">
                        <Typography
                          weight="700"
                          size="80px"
                          as="h1"
                          lineHeight="52px"
                          className="mb-0 text-nowrap price-plan-price"
                        >
                          {index !== 0 && "$"} {items.price}
                        </Typography>
                        {index !== 0 && (
                          <sub
                            style={{
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                            }}
                          >
                            .95 /month¹
                          </sub>
                        )}
                      </div>
                    </div>
                  </Box>
                </Box>
                {/* desc content */}
                <Box
                  border="1px solid #96B1CD"
                  className="w-100 rounded-bottom-2"
                  padding="45px 34px"
                >
                  <Box width="100%" padding="15px 20px">
                    <Typography
                      weight="600"
                      color="#001635"
                      size="20px"
                      lineHeight="24px"
                      className="mb-3"
                    >
                      Includes
                    </Typography>

                    {items.details.map((data) => (
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <FaRegCircleCheck size={20} color="#4F6169" />
                        <Typography
                          size="16px"
                          weight="400"
                          color="#4F6169"
                          lineHeight="24px"
                          className="mb-0"
                        >
                          {data.feature}
                        </Typography>
                      </div>
                    ))}
                  </Box>

                  <div className="w-100 px-4">
                    <GenericButton
                      // onClick={handleSearchButton}
                      width="100%"
                      height="44px"
                      // hoverColor={
                      //   index === 0 || index === 1 ? "#000" : "#00ADA2"
                      // }
                      background={index === 0 ? "#000" : "#00C1B6"}
                      padding="10px 20px"
                      className="mt-5 mb-4"
                    >
                      {index === 0
                        ? "Get Started with Free Plan"
                        : "Get Started"}
                    </GenericButton>
                  </div>
                </Box>
              </Box>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default FeaturedListings;
