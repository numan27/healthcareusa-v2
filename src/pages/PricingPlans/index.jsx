import { Col, Container, Row } from "react-bootstrap";
import { FaRegCircleCheck } from "react-icons/fa6";
import AppLayout from "../../components/Layout/AppLayout";
import PricingCharacter from "../../assets/SVGs/PricingCharacter";
import { Box, Typography } from "../../components/GenericComponents";
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
        { feature: "Lifetime Free " },
      ],
    },
    {
      icon: <MdOutlineWorkspacePremium size={40} />,
      title: "Standard Plan",
      price: "$19",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
        { feature: "Lifetime Free " },
      ],
    },
    {
      title: "Premium Plan",
      price: "",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
        { feature: "Lifetime Free " },
      ],
    },
    {
      title: "Premium Plan",
      price: "",
      details: [
        { feature: "Company / Provider Name" },
        { feature: "Address" },
        { feature: "Phone Number" },
        { feature: "Lifetime Free " },
      ],
    },
  ];

  return (
    <AppLayout>
      <Box className="pricing-top-bar w-100 py-md-5 py-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 pt-md-4">
          <Typography weight="800" color="#fff" size="40px" className="mb-0">
            Select Your Plan
          </Typography>
          <PricingCharacter />
        </div>
      </Box>

      <Container className="py-md-5 py-2" fluid>
        <Row>
          <Col sm={9} md={10} xs={11} className="mx-sm-auto mx-4">
            <div className="pricing-grid">
              {PRICING_DATA.map((items, index) => (
                <Box
                  className="w-100 custom-shadow rounded-2"
                  border="1px solid #96B1CD"
                >
                  <Box
                    style={{
                      backgroundColor:
                        index === 1 || index === 2 ? "#00C1B6" : "initial",
                    }}
                    padding="45px 20px"
                    className="w-100"
                  >
                    <span>{items?.icon}</span>
                    <div className="mb-5">
                      <Typography
                        weight="600"
                        color={index === 1 || index === 2 ? "#fff" : "#000"}
                        size={index === 0 ? "36px" : "28px"}
                        lineHeight="38px"
                        className="mb-0"
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
                            <span className="fw-bold"> up to 6 Locations</span>
                          </Typography>
                        )}
                        {index === 3 && (
                          <Typography
                            weight="400"
                            color="#fff"
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
                      <Typography
                        weight="400"
                        color="#fff"
                        size="16px"
                        lineHeight="24px"
                        className="mb-0"
                      >
                        {items.price}
                        <sup>.95 /month¹</sup>
                      </Typography>
                    </div>
                  </Box>

                  <Box className="w-100">
                    <Box
                      width="100%"
                      padding="45px 20px"
                      style={{
                        backgroundColor: index === 1 ? "#00C1B6" : "initial",
                      }}
                    >
                      <Typography
                        weight="600"
                        color="#001635"
                        size="20px"
                        lineHeight="24px"
                        className="mb-0"
                      >
                        Free listing include
                      </Typography>

                      {items.details.map((data) => (
                        <div className="d-flex align-items-center gap-2 mt-3">
                          <FaRegCircleCheck size={20} color="#4F6169" />
                          <Typography
                            size="16px"
                            weight="400"
                            lineHeight="24px"
                            className="mb-0"
                          >
                            {data.feature}
                          </Typography>
                        </div>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default PricingPlans;
