import { Col, Container, Row } from "react-bootstrap";
import { FaRegCircleCheck } from "react-icons/fa6";
import AppLayout from "../../components/Layout/AppLayout";
import PricingCharacter from "../../assets/SVGs/PricingCharacter";
import {
  Box,
  GenericButton,
  Typography,
} from "../../components/GenericComponents";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const PricingPlans = () => {
  const PRICING_DATA = [
    {
      icon: "",
      title: "Basic Plan",
      price: "",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
      ],
    },
    {
      icon: <MdOutlineWorkspacePremium size={48} />,
      title: "Standard Plan",
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
      title: "Regionally Featured",
      price: "49",
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
      title: "Nationally Featured",
      price: "",
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
  ];

  return (
    <>
      <Box className="pricing-top-bar w-100 py-md-5 py-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 pt-md-4">
          <Typography weight="800" color="#fff" size="40px" className="mb-0">
            Select Your Plan
          </Typography>
          <PricingCharacter />
        </div>
      </Box>

      <Container className="py-md-5 py-4" fluid>
        <Row>
          <Col sm={11} xs={11} xxl={10} className="mx-sm-auto mx-4 px-0">
            <div className="pricing-grid">
              {PRICING_DATA.map((items, index) => (
                <Box
                  className="w-100 custom-shadow rounded-2 d-flex flex-column justify-content-between align-items-center"
                  border="1px solid #96B1CD"
                >
                  <div>
                    <Box
                      style={{
                        backgroundColor:
                          index === 1 || index === 2 ? "#00C1B6" : "initial",
                      }}
                      padding="45px 20px"
                      className="w-100 position-relative"
                    >
                      <span
                        style={{ top: "20px", left: "10px" }}
                        className="position-absolute"
                      >
                        {items?.icon}
                      </span>
                      <div className="">
                        <Typography
                          weight="600"
                          color={index === 1 || index === 2 ? "#fff" : "#000"}
                          size={index === 0 ? "36px" : "28px"}
                          lineHeight="38px"
                          className={`mb-2 ${index === 1 ? "mt-4 pt-3" : ""}`}
                        >
                          {items.title}
                        </Typography>

                        {/* Plan Desc */}
                        <div>
                          {index === 1 && (
                            <Typography
                              weight="400"
                              color="#fff"
                              size="16px"
                              lineHeight="24px"
                              className="mb-0"
                            >
                              For Local Businesses/Practices with a
                              <span className="fw-bold"> Single Location.</span>
                            </Typography>
                          )}
                          {index === 2 && (
                            <Typography
                              weight="400"
                              color="#fff"
                              size="16px"
                              lineHeight="24px"
                              className="mb-0"
                            >
                              For Businesses/Practices with a
                              <span className="fw-bold">
                                {" "}
                                up to 6 Locations
                              </span>
                            </Typography>
                          )}
                          {index === 3 && (
                            <Typography
                              weight="400"
                              color={index === 3 ? "#000" : "#fff"}
                              size="16px"
                              lineHeight="24px"
                              className="mb-0"
                            >
                              For Businesses/Practices with
                              <span className="fw-bold">
                                {" "}
                                more than 6 Locations
                              </span>
                            </Typography>
                          )}
                        </div>
                        {(index === 1 || index === 2) && (
                          <div className="d-flex align-items-start mt-4">
                            <Typography
                              weight="700"
                              color="#fff"
                              size="80px"
                              as="h1"
                              lineHeight="52px"
                              className="mb-0 text-nowrap price-plan-price"
                            >
                              ${items.price}
                            </Typography>
                            <sup
                              style={{
                                fontWeight: "400",
                                fontSize: "16px",
                                color: "#fff",
                                lineHeight: "24px",
                              }}
                            >
                              .95 /month¹
                            </sup>
                          </div>
                        )}

                        {index === 3 && (
                          <Typography
                            weight="700"
                            color="#000"
                            size="16px"
                            lineHeight="24px"
                            className="mb-0 mt-5"
                            align="center"
                          >
                            Contact us for pricing for bulk listings. Discount
                            available!
                          </Typography>
                        )}
                      </div>
                    </Box>

                    <Box className="w-100">
                      <Box
                        width="100%"
                        padding={index === 1 ? "5px 0 45px 20px" : "15px 20px"}
                        style={{
                          backgroundColor: index === 1 ? "#00C1B6" : "initial",
                        }}
                      >
                        <Typography
                          weight="600"
                          color={index === 1 ? "#fff" : "#001635"}
                          size="20px"
                          lineHeight="24px"
                          className="mb-3"
                        >
                          {index === 0 ? "Free listing include" : "Includes"}
                        </Typography>

                        {items.details.map((data) => (
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <FaRegCircleCheck
                              size={20}
                              color={index === 1 ? "#fff" : "#4F6169"}
                            />
                            <Typography
                              size="16px"
                              weight="400"
                              color={index === 1 ? "#fff" : "#4F6169"}
                              lineHeight="24px"
                              className="mb-0"
                            >
                              {data.feature}
                            </Typography>
                          </div>
                        ))}
                      </Box>
                    </Box>
                  </div>

                  <div className="w-100 px-4">
                    <GenericButton
                      // onClick={handleSearchButton}
                      width="100%"
                      height="44px"
                      // hoverColor={
                      //   index === 0 || index === 1 ? "#000" : "#00ADA2"
                      // }
                      background={
                        index === 0 || index === 1 ? "#000" : "#00C1B6"
                      }
                      padding="10px 20px"
                      className="mt-5 mb-4"
                    >
                      {index === 0
                        ? "Get Started with Free Plan"
                        : "Get Started"}
                    </GenericButton>
                  </div>
                </Box>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PricingPlans;
