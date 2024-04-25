import React from 'react'
import { Box, Typography } from '../../../components/GenericComponents'
import { Col, Row } from 'react-bootstrap'
import IMAGES from '../../../assets/images';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Hero = () => {

  const boxData = [
    {
      title: "Products & Services",
      linkPath: "",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies", singleServiceLink: "" },
        { service: "Supplements & Herbs", singleServiceLink: "" },
        { service: "Equipment & Supplies", singleServiceLink: "" },
        { service: "Medical Transportation", singleServiceLink: "" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
    {
      title: "Products & Services",
      linkPath: "/explore-services",
      imgSrc: IMAGES.PRODUCTS_SERVICES_ICON,
      serviceList: [
        { service: "Pharmacies" },
        { service: "Supplements & Herbs" },
        { service: "Equipment & Supplies" },
        { service: "Medical Transportation" }
      ]
    },
  ];


  return (
    <div className='position-relative'>
      <div className='hero'>
        <Box className="hero-content d-flex flex-column align-items-center h-100 w-100 py-5">
          <Row className='py-5 mt-5'>
            <Col className='mx-auto'>
              <Typography lineHeight="52px" align="center" className="mt-3" as="h1" weight="700" color="#fff" size="40px">
                Your One Stop Resource Directory of Healthcare
              </Typography>
              <Typography lineHeight="52px" align="center" className="mt-3" as="h1" weight="500" color="#fff" size="40px">
               Information & Services in The United States
              </Typography>
            </Col>
          </Row>

          <div className="search-bar">
            <h1>SEARCH BAR</h1>
          </div>
        </Box>
      </div>

      <div id="service-section" className='service-section container-xl container-fluid mt-lg-0 mt-5'>
        <Box width="100" className="custom-shadow mobile-padding bg-white" padding="40px 65px 65px 65px" radius="24px">
          <Typography align="center" as="h2" weight="700" size="24px" color="#333333">
            Find All Services
          </Typography>

          <div className='service-grid w-100'>
            {boxData.map((data) => (
              <Box width="100" className="service-box transition-2 rounded-3" border="1px solid #99B8B6" padding="25px 40px 25px 25px">
                <div className='d-flex align-items-center gap-2'>
                  <img width={30} src={data.imgSrc} alt="" />
                  <Typography className="mb-0" align="center" as="h3" weight="700" size="18px" color="#333333">
                    {data.title}
                  </Typography>
                </div>

                <ul className='list-unstyled'>
                  {data.serviceList.map((item, index) => (
                    <li key={index}>
                      <Link className='text-decoration-none service-item' to={data.serviceList.singleServiceLink}>
                        {item.service}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link to={data.linkPath} className='service-link'>
                  Explore More <FiChevronRight className='transition-2' size={18} color='#6BE2C4' />
                </Link>
              </Box>
            ))}
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Hero