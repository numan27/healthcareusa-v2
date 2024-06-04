import { Col, Row, Container, Form, InputGroup, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedin, FaPinterest, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { Link } from 'react-router-dom';
import IMAGES from "../../assets/images";
import { Typography } from '../GenericComponents';
import LanguageSelect from '../Shared/LanguageSelect';
import SendIcon from '../../assets/SVGs/Send';
import PhoneIcon from '../../assets/SVGs/Phone';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { LoaderCenter } from '../../assets/Loader';

const Footer = () => {
  const [groupedListings, setGroupedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('https://jsappone.demowp.io/wp-json/wp/v2/widgets/', {
          auth: {
            username: 'numan27',
            password: 'findhealthcareusa'
            // password: 'ugyzaq3R2uODAxA8B0NQ2Q18'
          }
        });

        const widgets = response.data;
        const extractedLinks = widgets.map(widget => {
          if (widget.rendered) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(widget.rendered, 'text/html');
            const heading = doc.querySelector('.widget-title')?.textContent || widget.id;
            const links = Array.from(doc.querySelectorAll('a')).map(link => ({
              name: link.textContent,
              link: link.href
            }));
            return { heading, items: links };
          }
          return null;
        }).filter(Boolean);
        setGroupedListings(extractedLinks);

      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  console.log("groupedListings", groupedListings);

  const socialIcons = [
    { icon: FaFacebookF, link: "" },
    { icon: FaLinkedin, link: "" },
    { icon: FaTwitter, link: "" },
    { icon: FaPinterest, link: "" },
    { icon: RiInstagramFill, link: "" },
    { icon: FaYoutube, link: "" },
  ];

  return (
    <div className='footer pt-2'>
      <Container className="pt-md-4 pt-2" fluid>
        <Row>
          <Col sm={9} md={10} xs={11} className='mx-sm-auto mx-4'>

            <Row className='py-4 border-bottom'>
              <Col lg={6} className='px-lg-0 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0' >
                <img width={250} src={IMAGES.LOGO} alt="" />
              </Col>

              <Col lg={6} className='d-flex flex-lg-row flex-column gap-4 justify-content-lg-end justify-content-center align-items-center px-lg-0'>
                <p className='mb-0 fw-medium text-nowrap'>Follow us: </p>
                <div className="d-flex gap-2 flex-wrap justify-content-center ">
                  {socialIcons.map((items, index) => (
                    <Link to={items.link} key={index}
                      className='social-link rounded-5 d-flex align-items-center justify-content-center'>
                      <items.icon size={18} color='#fff' />
                    </Link>
                  ))}
                </div>
              </Col>
            </Row>

            <Row className='mt-4 py-3 border-bottom'>
              <Col className='ps-0' lg={3}>
                <div className='d-flex align-items-center gap-3 mb-3'>
                  <PhoneIcon />
                  <div className='d-flex flex-column'>
                    <Typography className="mb-1" as="span" lineHeight="16px" size="12px" weight="500" color="#1D1D1D">Need help? 24/7 </Typography>
                    <Typography as="span" lineHeight="26px" size="16px" weight="700" color="#1D1D1D">001-1234-88888</Typography>
                  </div>
                </div>
                <Typography className="mb-2" as="label" lineHeight="22px" size="14px" weight="400" color="#333333">
                  Lorem ipsum dolor sit amet consectetur. Elit netus neque faucibus pharetra ut. At sit lobortis ni
                </Typography>

                <div className='d-flex align-items-center gap-2 mt-2'>
                  <GrLocation color="#06312E" size="20" />
                  <Typography className="mb-0" as="label" lineHeight="22px" size="14px" weight="400" color="#23262F">
                    101 E 129th St, East Chicago, IN 46312, US
                  </Typography>
                </div>

                <Form className='mt-3 pt-1'>
                  <InputGroup className="mb-3 form-widget-footer bg-white">
                    <Form.Control
                      placeholder="Your email address"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      className=''
                    />
                    <Button className='' id="button-addon2">
                      <SendIcon />
                    </Button>
                  </InputGroup>
                </Form>
              </Col>

              <Suspense fallback={<LoaderCenter />}>
                {loading ? (
                  <LoaderCenter />
                ) : (
                  <Col className='ms-auto' lg={8}>
                    <div className='d-flex flex-sm-row flex-column justify-content-lg-between justify-content-between flex-wrap'>
                      {groupedListings.map((group, index) => (
                        <div key={index} className='mb-sm-0 mb-3'>
                          <Typography className="mb-3" as="h3" color="#23262F" size="14px" weight="800" lineHeight="24px">
                            {group.heading}
                          </Typography>
                          <ul className='list-unstyled footer-list'>
                            {group.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link className='transition-2' to={item.link}>{item.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Col>
                )}
              </Suspense>
            </Row>

            <Row className='my-3 d-flex flex-lg-row flex-column-reverse justify-content-between'>
              <Col xl={4} lg={6} className='d-flex align-items-center justify-content-lg-start justify-content-center gap-4 px-0 mt-lg-0 mt-4'>
                <Typography className="mb-0" as="p" color="#23262F" size="14px" weight="400" lineHeight="22px">
                  &copy;2024 Find Healthcare USA. All Rights Reserved.
                </Typography>

                <div className='d-none d-lg-block'>
                  <LanguageSelect />
                </div>
              </Col>

              <Col xl={4} lg={6} className='d-flex justify-content-lg-end justify-content-center px-0'>
                <ul className='list-unstyled footer-list d-flex align-items-center mb-0'>
                  <li className='border-end px-2 mb-0'>
                    <Link to="">Terms Of Services</Link>
                  </li>
                  <li className='px-2 border-end mb-0'>
                    <Link to="">Privacy Policy</Link>
                  </li>
                  <li className='ps-2 mb-0'>
                    <Link to="">Cookie Policy</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
