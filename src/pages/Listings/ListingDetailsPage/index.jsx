import { useEffect, useState } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { useLocation } from 'react-router-dom';
import AppLayout from '../../../components/Layout/AppLayout/AppLayout';
import { Box, GenericBadge, GenericButton, Typography } from '../../../components/GenericComponents';
import IMAGES from '../../../assets/images';
import AdsSection from '../../../components/Shared/AdsSection';
import RelatedArticles from './components/RelatedArticles';

const ListingDetailsPage = () => {
  const location = useLocation();
  const [jsonData, setJsonData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const commonText = (
    <div>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sstandard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>
      <p className='mb-0'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sstandard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>
    </div>
  );

  const extractTextContent = (jsxElement) => {
    if (typeof jsxElement === 'string') {
      return jsxElement;
    }

    if (Array.isArray(jsxElement)) {
      return jsxElement.map(extractTextContent).join('');
    }

    if (typeof jsxElement === 'object' && jsxElement.props && jsxElement.props.children) {
      return extractTextContent(jsxElement.props.children);
    }

    return '';
  };

  const truncatedText = `${extractTextContent(commonText).substring(0, 500)}...`;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jsonDataString = params.get('jsonData');
    if (jsonDataString) {
      const parsedData = JSON.parse(decodeURIComponent(jsonDataString));
      setJsonData(parsedData);
    }
  }, [location.search]);

  const qualificationsData = [
    { degree: "M.B.B.S" },
    { degree: "M.C.P.S" },
    { degree: "D-Derm" },
    { degree: "F.C.P.S" },
  ]

  const specialitiesData = [
    { label: "Dysphagia" },
    { label: "Endoscopy" },
    { label: "Liver Cancer" },
    { label: "Hepatitis A?B/C " },
    { label: "Chronic Diarrhea" },
    { label: "Diabetes" },
    { label: "Gallbladder disease" },
    { label: "Irritable bowel syndrome (IBS)" },
    { label: "Colonoscopy (Lower GI Endoscopy)" },
    { label: "Gastroesophageal Reflux Disease (GERD)" },
    { label: "Diagnostic Colonoscopy" },
    { label: "Stroke" },
    { label: "Anemia" },
    { label: "Blood Pressure" },
    { label: "Diverticulosis" },
    { label: "Cholecystitis" },
    { label: "Atrial Fibrillation" },
    { label: "Bile Duct Cancer" },
    { label: "Liner" },
  ]

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
                  className="rounded-2 custom-border mt-5 d-flex align-items-center flex-md-row flex-column gap-4 position-relative ">

                  <Box className="rounded-5 position-relative">
                    <img width={132} height={132} className='rounded-5 ' src={IMAGES.DETAILED_PROFILE_IMG} alt="" />

                    <span style={{ top: '12px', right: '-2px' }} className='rounded-5 p-1 position-absolute border bg-white'>
                      <img width={24} src={IMAGES.PREMIUM_ICON} alt="" />
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
                        {jsonData.doctorName}
                      </Typography>

                      <div className='d-flex align-items-center  gap-2'>
                        <Typography className="mb-0" as="h4" size="14px" weight="700" color="#23262F" lineHeight="21px">
                          {jsonData.designation}
                        </Typography>

                        <span className='border-start border-2 ps-2'>
                          <Typography className="text-uppercase mb-0" as="h4" size="14px" weight="700" color="#64666C" lineHeight="21px">
                            {jsonData.languages}
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
                        <img className='cursor-pointer' width={16} src={IMAGES.BOOKMARK_ICON} alt="" />
                        <img className='cursor-pointer' width={16} src={IMAGES.SHARE_ICON} alt="" />
                      </div>
                      <GenericBadge
                        statusText='Open'
                        text="Open"
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
                    {specialitiesData.map((item) => (
                      <GenericBadge
                        text={item.label}
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
                      {showMore ? commonText : truncatedText}
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

                <AdsSection margin={1} padding={0} />
              </>
            )}

            <RelatedArticles />

          </Col>
          {/* Sidebar */}
          <Col
            style={{
              position: 'sticky',
              top: '50px',
              height: 'fit-content',
            }}
            lg={3}
            md={6}
            className='pb-4'>
            <Box className='w-100 mb-3 rounded-3'>
              <img src={IMAGES.MAP_IMG_2} className='img-fluid' alt='map' />

              <Box className="border py-3 rounded-bottom-3">

                <div className='px-3 border-bottom pb-3'>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className='d-flex align-items-start gap-3'>
                      <img width={18} src={IMAGES.LOCATION_ICON_2} alt="" />
                      <div>
                        <div>
                          <Typography as='p' className='mb-0' color='#23262F' size='12px' lineHeight='18px' weight='400'>
                            156 William St f16 100 wall street
                            new York, NY 10036
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
                    <img className='cursor-pointer' width={20} src={IMAGES.COPY_ICON} alt="" />
                  </div>
                </div>

                <div className="px-3 border-bottom py-3">
                  <Row>
                    <Col sm={6} className='d-flex flex-column'>
                      <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                        Cell #:
                      </Typography>
                      <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                        Fax #:
                      </Typography>
                    </Col>
                    <Col sm={6}>
                      <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                        (402) 847-2789
                      </Typography>
                      <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                        (402) 847-2789
                      </Typography>

                    </Col>
                  </Row>
                </div>
                <div className="px-3 border-bottom py-3">
                  <Row>
                    <Col sm={6} className='d-flex flex-column'>
                      <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                        Websites:
                      </Typography>
                      <Typography as='label' className='mb-0' color='#64666C' size='14px' lineHeight='24px' weight='400'>
                        Languages:
                      </Typography>
                    </Col>
                    <Col sm={6}>
                      <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                        Website, LinkedIn
                      </Typography>
                      <Typography as='label' className='mb-0' color='#23262F' size='14px' lineHeight='24px' weight='700'>
                        English, Spanish
                      </Typography>
                    </Col>
                  </Row>
                </div>

                <div className='pt-3 px-3'>
                  <Box
                    width="40px"
                    height="40px"
                    className="border rounded-5">


                  </Box>
                </div>

              </Box>
            </Box>
            <div>
              <img src={IMAGES.ADS_VERTICAL_IMG} className='img-fluid' alt='ads' />
            </div>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default ListingDetailsPage;
