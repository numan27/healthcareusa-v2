import { useEffect, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FiChevronRight } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import { Box, GenericButton, GenericSelect, Typography } from '../../../components/GenericComponents';
import ExploreMoreModal from './ExploreMoreModal';
import { Link } from 'react-router-dom';
import { PATH } from '../../../config';
import { GrLocation } from 'react-icons/gr';
import SquareMenu from '../../../assets/SVGs/SquareMenu';
import axios from 'axios';
import IMAGES from '../../../assets/images';

const Hero = () => {
  const [exploreModalState, setExploreModalState] = useState(false);
  const [listings, setListings] = useState([]);
  const [groupedListings, setGroupedListings] = useState([]);

  const OpenModal = () => {
    setExploreModalState(true);
  };

  const CloseModal = () => {
    setExploreModalState(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let url = 'https://jsappone.demowp.io/wp-json/wp/v2/service?per_page=40';
      try {
        const response = await axios.get(url);
        const data = response.data.map(item => ({
          ...item,
          name: item.name.replace(/&amp;/g, '&')
        }));
        setListings(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      const headings = listings.filter(item => item.parent === 0);
      const grouped = headings.map(heading => ({
        heading,
        items: listings.filter(item => item.parent === heading.id)
      }));
      setGroupedListings(grouped);
    }
  }, [listings]);

  const renderItemsInColumns = (items) => {
    const columns = [[], [], [], []];
    items.forEach((item, index) => {
      columns[index % 4].push(item);
    });
    return columns;
  };

  console.warn("listings data", listings);
  console.warn("grouped listings data", groupedListings);

  return (
    <div className='position-relative'>
      <div className='hero'>
        <Box className="hero-content d-flex flex-column align-items-center h-100 w-100 py-5 px-lg-0 px-3">
          <div className='py-sm-5 mt-md-5'>
            <div className='mx-auto pt-sm-4'>
              <div>
                <Typography lineHeight="55px" align="center" className="mt-3 mb-0" as="h1" weight="800" color="#fff" size="40px">
                  Your One Stop Resource Directory of Healthcare
                </Typography>
                <Typography lineHeight="55px" align="center" className="" as="h1" weight="500" color="#fff" size="40px">
                  Information & Services in The United States
                </Typography>
              </div>

              {/* Search bar */}
              <Box width="100" padding="18px" className="bg-white rounded-3 mt-3">
                <Form className='h-100 d-flex flex-md-row flex-column align-items-center justify-content-between'>
                  <InputGroup className="search-bar border-search-md">
                    <InputGroup.Text className='bg-white border-0 p-2' id="basic-addon1">
                      <SquareMenu />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Key words or company"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      className='py-2'
                    />
                  </InputGroup>

                  <div className='d-flex align-items-center ps-md-4 ps-2 w-100-md my-md-0 my-3 border-start-lg'>
                    <GenericSelect
                      className="w-100-md"
                      minwidth="320px"
                      minheight="50px"
                      borderColor="transparent"
                      bgcolor="transparent"
                      placeholder="city, state or zip"
                      placeholderColor="#333333"
                      imageComponent={<GrLocation color='#06312E' size={24} />}
                      options={[
                        {
                          label: "New York, NY",
                          value: "NY",
                        },
                        {
                          label: "Los Angeles, CA",
                          value: "CA",
                        },
                        {
                          label: "Chicago, IL",
                          value: "IL",
                        },
                      ]}
                    />
                  </div>
                  <div className='ms-1'>
                    <GenericButton width="138px" height="48px" className="d-flex align-items-center justify-content-center gap-2">
                      <IoSearch className='' size={20} /> Search
                    </GenericButton>
                  </div>
                </Form>
              </Box>

              <Row className='mt-3'>
                <Col className='mx-auto' md={6}>
                  <Box padding="12px" className="bg-white rounded-5 w-100">
                    <Typography lineHeight="21px" align="center" className="mb-0" as="p" color="#23262F" size="14px">
                      <span className='fw-bold'>Over 2.5 million</span> healthcare providers and services. . & growing
                    </Typography>
                  </Box>
                </Col>
              </Row>
            </div>
          </div>
        </Box>
      </div>

      <div id="service-section" className='service-section container-xl mt-xl-0 mt-lg-5 mt-0 container-fluid pt-5'>
        <Box width="100" className="custom-shadow-services mobile-padding bg-white position-relative mt-5" padding="30px 25px" radius="24px">
          <div className='service-grid w-100'>
            {groupedListings.map((group, groupIndex) => (
              <Box key={groupIndex} width="100" className="service-box transition-2 rounded-3" border="1px solid #99B8B6" padding="25px 20px 25px 25px">
                <div className='d-flex align-items-center gap-2'>
                  <img width={30} src={IMAGES.PRODUCTS_SERVICES_ICON} alt="icon" />
                  <Typography className="mb-0" align="center" as="h3" weight="700" size="18px" color="#333333">
                    {group.heading.name}
                  </Typography>
                </div>

                <div className="columns-container">
                  {renderItemsInColumns(group.items).map((column, columnIndex) => (
                    <ul className='list-unstyled' key={columnIndex}>
                      {column.map((item, itemIndex) => (
                        <li className='mb-2' key={itemIndex}>
                          <Link className='text-decoration-none service-item transition-2' to={PATH.LISTINGS}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                <Link background="transparent" border="0" color="#50D1C9" onClick={OpenModal} className='service-link'>
                  Explore More <FiChevronRight className='transition-2' size={18} color='#6BE2C4' />
                </Link>
              </Box>
            ))}
          </div>

          <Box
            style={{ top: '-35px' }}
            className='bg-white mx-auto px-3 position-absolute start-0 end-0' radius='16px 16px 0px 0px' height="40px">
            <Typography
              className="mb-0 pt-1"
              align="center"
              as="h2" weight="600"
              size="24px"
              color="#23262F"
              lineHeight="36px"
            >
              Find All Services
            </Typography>
          </Box>
        </Box>
      </div>

      {exploreModalState && (
        <ExploreMoreModal
          show={exploreModalState}
          onHide={CloseModal}
          title="All Doctors"
        />
      )}
    </div>
  );
}

export default Hero;
