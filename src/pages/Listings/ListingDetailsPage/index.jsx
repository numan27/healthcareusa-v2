import { useEffect, useState } from 'react';
import { Container, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaFacebookF, FaLinkedin, FaPinterest, FaReddit, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { MdShield } from 'react-icons/md';
import { toast } from 'react-toastify';
import AppLayout from '../../../components/Layout/AppLayout';
import { Box, GenericBadge, GenericButton, Typography } from '../../../components/GenericComponents';
import IMAGES from '../../../assets/images';
import AdsSection from '../../../components/Shared/AdsSection';
import RelatedArticles from './components/RelatedArticles';
import CopyIcon from '../../../assets/SVGs/Copy';
import BookmarkIcon from "../../../assets/SVGs/Bookmark";
import ShareIcon from "../../../assets/SVGs/Share";
import ContactForm from './components/ContactForm';
import Schedule from './components/Schedule';
import ClaimListing from './components/ClaimListing';
import axios from 'axios';
import styled from 'styled-components';

const StyledPopover = styled(Popover)`
  max-width: 200px;
  width: 100%;
  box-shadow: 0px 0px 14px 0px #00000040;
  border-radius: 11px;
  z-index: 99999 !important;
  .popover-body {
    padding: 10px !important;
  }
  .popover-arrow {
    display: none !important;
  }
  .fade.show {
    z-index: 999 !important;
  }
`;

const ListingDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [jsonData, setJsonData] = useState(location.state?.jsonData || {});
  const [showMore, setShowMore] = useState(false);
  const [copyIconVisible, setCopyIconVisible] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let url = 'https://jsappone.demowp.io/wp-json/wp/v2/specialties?per_page=19';
      try {
        const response = await axios.get(url);
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchListingData = async () => {
      const url = `https://jsappone.demowp.io/wp-json/wp/v2/listing/${id}`;
      try {
        const response = await axios.get(url);
        const listingData = response.data;

        if (listingData.featured_media) {
          const mediaResponse = await axios.get(`https://jsappone.demowp.io/wp-json/wp/v2/media/${listingData.featured_media}`);
          listingData.mediaUrl = mediaResponse.data.source_url;
        }

        setJsonData(listingData);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    };

    if (!jsonData.id) {
      fetchListingData();
    }
  }, [id, jsonData.id]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jsonDataString = params.get('profile');
    if (jsonDataString) {
      const parsedData = JSON.parse(decodeURIComponent(jsonDataString));
      setJsonData(parsedData);
    }
  }, [location.search]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const description = jsonData.cubewp_post_meta?.['cwp_field_288766456392']?.meta_value || 'Description not available';
  const truncatedText = truncateText(description, 500);

  const qualificationsData = [
    { degree: "M.B.B.S" },
    { degree: "M.C.P.S" },
    { degree: "D-Derm" },
    { degree: "F.C.P.S" },
  ];

  const listingDetailSocial = [
    { icon: <FaFacebookF size={18} color='#23262F' />, link: jsonData.cubewp_post_meta?.['fc-facebook']?.meta_value || "#" },
    { icon: <FaTwitter size={18} color='#23262F' />, link: jsonData.cubewp_post_meta?.['fc-x']?.meta_value || "#" },
    { icon: <RiInstagramFill size={18} color='#23262F' />, link: jsonData.cubewp_post_meta?.['fc-instagram']?.meta_value || "#" },
    { icon: <FaYoutube size={18} color='#23262F' />, link: jsonData.cubewp_post_meta?.['fc-youtube']?.meta_value || "#" },
  ];

  const listingDetailSocialShare = [
    {
      icon: <FaFacebookF size={14} color='#23262F' />,
      link: "https://www.facebook.com/shareProfile?mini=true&url=https://jsappone.demowp.io/"
    },
    {
      icon: <FaLinkedin size={14} color='#23262F' />,
      link: "https://www.linkedin.com/shareProfile?mini=true&url=https://jsappone.demowp.io/"
    },
    {
      icon: <FaTwitter size={14} color='#23262F' />,
      link: "https://www.twitter.com/shareProfile?mini=true&url=https://jsappone.demowp.io/"
    },
    {
      icon: <RiInstagramFill size={14} color='#23262F' />,
      link: "https://www.instagarm.com/shareProfile?mini=true&url=https://jsappone.demowp.io/"
    },
    {
      icon: <FaPinterest size={14} color='#23262F' />,
      link: "https://www.pinterest.com/shareProfile?mini=true&url=https://jsappone.demowp.io/"
    },
  ];

  const cubewpPostMeta = jsonData.cubewp_post_meta || [];
  const googleAddress = cubewpPostMeta["fc-google-address"]?.meta_value || [];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(googleAddress.address)
      .then(() => {
        toast.success('Address copied to clipboard!', {
          autoClose: 1000,
        });
      })
      .catch(err => {
        console.error('Failed to copy address to clipboard:', err);
        toast.error('Failed to copy address to clipboard. Please try again later.');
      });
  };

  const popover = (
    <StyledPopover className="border-0 me-2" id="popover-basic">
      <Popover.Body>
        <Box className="w-100 d-flex justify-content-evenly gap-1">
          {listingDetailSocialShare.map((items) => (
            <Box
              width="30px"
              height="30px"
              className="border rounded-2 listing-detail-social">
              <a className='w-100 h-100 d-flex align-items-center justify-content-center' href={items.link}>
                {items.icon}
              </a>
            </Box>
          ))}
        </Box>
      </Popover.Body>
    </StyledPopover>
  );

  return (
    <AppLayout>
      <Container className='min-vh-100 pt-4 pb-5'>
        <Row>
          {/* Left Content */}
          <Col lg={9}>
            {/* Profile Media */}
            <Row className='profile-gallery px-2'>
              <Col className='px-md-1' md={4} sm={6}>
                <img className='img-fluid first-img blog-shadow profile-media-img-1' src={IMAGES.DETAILS_IMAGE_2} alt="" />
              </Col>
              <Col className='px-md-1 mt-sm-0 mt-4' md={4} sm={6}>
                <img className='img-fluid last-img blog-shadow profile-media-img-2' src={IMAGES.DETAILS_IMAGE_2} alt="" />
              </Col>
              <Col className='px-md-1 mt-md-0 mt-4' md={4} sm={6}>
                <img className='img-fluid profile-media-img-3 blog-shadow' src={IMAGES.DETAILS_IMAGE_1} alt="" />
              </Col>
            </Row>

            {jsonData && (
              <>
                {/* Detailed Profile Card */}
                <Box
                  width="100%"
                  padding="16px 23px"
                  className="rounded-2 custom-border mt-4 d-flex align-items-center flex-md-row flex-column gap-4 position-relative ">

                  <Box className="rounded-5 position-relative">
                    <img width={132} height={132} className='rounded-circle' src={jsonData.mediaUrl} alt="" />

                    <span style={{ top: '12px', right: '-2px', height: '30px', width: '30px' }} className='rounded-5 p-1 position-absolute border bg-white d-flex align-items-center justify-content-center'>
                      <MdShield size={18} color='#ef9b00' />
                    </span>

                    <div style={{ bottom: '6px', right: '2px' }} className='position-absolute'>
                      <div className='position-relative'>
                        <img width={130} height={22} src={IMAGES.PROFILE_BADGE} alt="" />
                        <span style={{ left: '20px', top: '-1px' }} className='position-absolute'>
                          <Typography as="span" size="12px" weight="700" color="#fff">
                            Platinum Doctor
                          </Typography>
                        </span>
                      </div>
                    </div>
                  </Box>

                  <div className='w-100'>
                    <div className='d-flex flex-column align-items-md-start align-items-center'>
                      <Typography as="h3" size="20px" fontFamily="Inter" weight="600" color="#23262F" lineHeight="30px">
                        {jsonData.title?.rendered}
                      </Typography>

                      <div className='d-flex align-items-center gap-2'>
                        <Typography className="mb-0 text-uppercase" as="h4" size="14px" weight="700" color="#23262F" lineHeight="21px">
                          {jsonData.cubewp_post_meta?.['cwp_field_40228862441']?.meta_value}
                        </Typography>

                        <span className='border-start border-2 ps-2'>
                          <Typography className="text-uppercase mb-0" as="h4" size="14px" weight="700" color="#64666C" lineHeight="21px">
                            {jsonData.cubewp_post_meta?.['fc-languages']?.meta_value}
                          </Typography>
                        </span>
                      </div>
                      <div className='mt-2'>
                        <Typography className="mb-0" as="h4" size="14px" weight="600" color="#14A077" lineHeight="21px">
                          Dermatologist, Cosmetologist
                        </Typography>
                      </div>

                      <div className='mt-2 d-flex gap-2 flex-wrap justify-content-center'>
                        {qualificationsData.map((item) => (
                          <GenericBadge
                            text={item.degree}
                            borderRadius="6px"
                            background="#EBEBEB"
                            borderColor="#EBEBEB"
                            color="#23262F"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Status & Icons */}
                    <div
                      style={{ top: '10px', right: '20px' }}
                      className='pt-2 position-absolute d-flex flex-sm-row flex-column-reverse  align-items-center gap-2'>

                      <div className='d-flex gap-2'>
                        <BookmarkIcon />

                        <OverlayTrigger
                          bsClass="custom-overlay"
                          trigger="click"
                          placement="bottom"
                          rootClose
                          overlay={popover}
                        >
                          <span className='d-flex align-items-center cursor-pointer'>
                            <ShareIcon />
                          </span>
                        </OverlayTrigger>


                      </div>
                      <GenericBadge
                        statusText={jsonData.comment_status}
                        text={jsonData.comment_status}
                        background="#F4F4F4"
                        color="#23262Fs"
                        border="0px"
                        padding="8px 10px"
                        className="text-capitalize"
                      />
                    </div>
                  </div>
                </Box>

                <Box className="mt-4">
                  <Typography as='h2' className='mb-0' color='#070026' size='18px' lineHeight='27px' weight='600'>
                    Specialties
                  </Typography>

                  <div className='mt-4 d-flex gap-2 flex-wrap'>
                    {specialties.map((item) => (
                      <GenericBadge
                        text={item.name}
                        borderRadius="51px"
                        background="#EBEBEB"
                        borderColor="transparent"
                        color="#23262F"
                        fontSize="14px"
                        className="text-capitalize"
                      />
                    ))}
                  </div>
                </Box>


                <Box className="mt-4">
                  <Typography as='h2' className='mb-0' color='#070026' size='18px' lineHeight='27px' weight='600'>
                    About us
                  </Typography>

                  <div className='mt-4 d-flex gap-2 flex-wrap'>
                    <p className="small-text-black pt-2">
                      {showMore ? description : truncatedText}
                      <GenericButton size="14px" border="0" hoverBgColor="transparent" hoverColor="#14A077" padding="0" weight="500" color="#14A077" background="transparent" onClick={toggleShowMore} className="">
                        {showMore ?
                          <span>
                            Read less <LuChevronUp size={18} color='#14A077' />
                          </span>
                          :
                          <span>
                            Read more <LuChevronDown size={18} color='#14A077' />
                          </span>}
                      </GenericButton>
                    </p>
                  </div>
                </Box>

                {/* Contact Information */}
                {/* <div className='d-flex gap-4 mt-4'>
                  <div className='d-flex flex-column'>
                    <Typography className="mb-2" as="h5" size="16px" weight="600" color="#23262F">
                      Contact
                    </Typography>
                    <Typography className="mb-1" as="p" size="14px" weight="500" color="#777E90">
                      Phone: {jsonData.cubewp_post_meta?.['fc-phone']?.meta_value}
                    </Typography>
                    <Typography className="mb-1" as="p" size="14px" weight="500" color="#777E90">
                      Email: {jsonData.cubewp_post_meta?.['fc-email']?.meta_value}
                    </Typography>
                    <Typography className="mb-1" as="p" size="14px" weight="500" color="#777E90">
                      Address: {jsonData.cubewp_post_meta?.['fc-address']?.meta_value}
                    </Typography>
                  </div>
                </div> */}
                <AdsSection margin={1} padding={0} />
              </>
            )}

            <RelatedArticles />
          </Col>

          {/* Right Content */}
          <Col
            style={{
              position: 'sticky',
              top: '50px',
              height: 'fit-content',
            }}
            lg={3}
            className='pb-4'>

            <Box className='w-100 rounded-3'>
              <img src={IMAGES.MAP_IMG_2} className='img-fluid' alt='map' />
            </Box>
            <Box className="border py-3 rounded-bottom-3 w-100 mb-4">
              <div
                className='px-3 border-bottom pb-3'
                onMouseEnter={() => setCopyIconVisible(true)}
                onMouseLeave={() => setCopyIconVisible(false)}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className='d-flex align-items-start gap-3'>
                    <img width={18} src={IMAGES.LOCATION_ICON_2} alt="" />
                    <div>
                      <div>
                        <Typography as='p' className='mb-0' color='#23262F' size='12px' lineHeight='18px' weight='400'>
                          {googleAddress.address}
                        </Typography>
                      </div>
                      <GenericButton
                        background="transparent"
                        color="#00C1B6"
                        size="11px"
                        weight="500"
                        radius="51px"
                        height="25px"
                        width="90px"
                        padding="0px"
                        className="mt-2"
                      >
                        Get Directions
                      </GenericButton>
                    </div>
                  </div>
                  {copyIconVisible && (
                    <span onClick={copyToClipboard} className='cursor-pointer'>
                      <CopyIcon />
                    </span>
                  )}
                </div>
              </div>

              <div className="px-3 border-bottom py-3">
                <Row>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                      Cell #:
                    </Typography>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                      {jsonData.cubewp_post_meta?.['fc-phone']?.meta_value}
                    </Typography>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                      Fax #:
                    </Typography>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                      {jsonData.cubewp_post_meta?.['fc-phone']?.meta_value}
                    </Typography>
                  </Col>
                </Row>
              </div>
              <div className="px-3 border-bottom py-3">
                <Row>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                      Websites:
                    </Typography>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                      <span className='gap-2 listing-detail-link'>
                        <Link to="">Website</Link>,
                        <Link className='ms-1' to="">LinkedIn</Link>
                      </span>
                    </Typography>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                      Languages:
                    </Typography>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                      {jsonData.cubewp_post_meta?.['fc-languages']?.meta_value}
                    </Typography>
                  </Col>
                </Row>
              </div>

              <Box
                className='pt-3 px-3 d-flex justify-content-sm-start justify-content-center gap-2 w-100'>
                {listingDetailSocial.map((items) => (
                  <Box
                    width="44px"
                    height="44px"
                    className="border rounded-5 listing-detail-social">
                    <a className='w-100 h-100 rounded-5 d-flex align-items-center justify-content-center' href={items.link}>
                      {items.icon}
                    </a>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className='w-100 mb-4 rounded-3 border pt-4'>
              <Schedule jsonData={jsonData} />
            </Box>


            <Box className='w-100 mb-4 rounded-3 border py-4 px-3'>
              <ContactForm />
            </Box>

            <Box className='w-100 mb-4 rounded-3 border pt-4 pb-3 px-3 position-relative'>
              <ClaimListing />
              <img
                width={120}
                src={IMAGES.CLAIM_LISTING_IMG} alt=""
                className='position-absolute end-0'
                style={{ top: '60px' }}
              />
            </Box>
          </Col>
        </Row>
      </Container>
    </AppLayout >
  );
};

export default ListingDetailsPage;
