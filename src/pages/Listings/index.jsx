import { useState } from 'react'
import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap'
import { Box, CheckboxDropdown, GenericIconButton, Typography } from '../../components/GenericComponents'
import AppLayout from '../../components/Layout/AppLayout'
import AdsSection from "../../components/Shared/AdsSection"
import RangeSlider from './components/RangeSlider'
import IMAGES from '../../assets/images'
import ProfileCard from './components/ProfileCard'
import { FaCircleInfo } from 'react-icons/fa6'
import SearchIcon from '../../assets/SVGs/Search';

const Listings = () => {

  const [temperatureRange, setTemperatureRange] = useState([20, 67]);
  const [profileLength, setProfileLength] = useState(0);

  const handleTemperatureChange = (newValue) => {
    setTemperatureRange(newValue);
  };

  const genderOptions = [
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
    { id: "3", label: "Not to say" },
  ];
  const languageOptions = [
    { id: "1", label: "English" },
    { id: "2", label: "Chinese" },
    { id: "3", label: "French" },
  ];
  const conditionOptions = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];
  const hospitalAffiliationOptions = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];
  const timingOptions = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];
  const discountOptions = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];

  return (
    <AppLayout>
      <Container className='min-vh-100 '>
        <div>
          <AdsSection margin={4} />
        </div>

        <Row>
          {/* Left Content */}
          <Col lg={9}>

            {/* Public Announcement */}
            <Box
              radius="4px"
              border="1px solid #EF2929"
              width="100%"
              // height="34px"
              background="#FEEAE9"
              padding="8px 16px"
              className="d-flex align-items-center gap-2 mb-3"
            >
              <FaCircleInfo className='' size={16} color='#EF2929' />
              <Typography className="mb-0" as="span" size="12px" color="#EF2929" weight="500" lineHeight="15px">
                Public Service Announcements (PSA)   FDA Approves Wegovy for Heart Attack Prevention. (FDA)
              </Typography>

            </Box>

            {/* Search */}
            <Box border="1px solid #E4E4E4" radius="8px" className='custom-shadow-2 py-3 px-4 w-100'>
              <Form className='h-100 p-1'>
                <Row className='d-flex align-items-center '>
                  <Col md={6} className='d-flex align-items-center gap-2 section-responsive-border pe-4 pt-4'>
                    <Typography className="text-nowrap mt-2" as="span" color="#00C1B6" weight="700" lineHeight="18px">
                      Near Me
                    </Typography>

                    <RangeSlider
                      className="mt-3"
                      defaultValue={temperatureRange}
                      min={0}
                      max={100}
                      step={1}
                      onChange={handleTemperatureChange}
                    />
                  </Col>

                  <Col md={6} className='d-flex align-items-center'>
                    <InputGroup className="search-bar">
                      <Form.Control
                        placeholder="Key words or company"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className='py-3'
                      />
                    </InputGroup>

                    <div className='ms-1'>
                      <GenericIconButton
                        icon={<SearchIcon />}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Box>

            {/* Filters */}
            <div className='my-3 d-flex flex-wrap gap-2'>
              <CheckboxDropdown title="Gender" items={genderOptions} />
              <CheckboxDropdown title="Languages" items={languageOptions} />
              <CheckboxDropdown title="Condition" items={conditionOptions} />
              <CheckboxDropdown title="Hospital Affiliation" items={hospitalAffiliationOptions} />
              <CheckboxDropdown title="Timing" items={timingOptions} />
              <CheckboxDropdown title="Discounts" items={discountOptions} />
            </div>

            <div className='pt-3 mb-3'>
              <Typography as="p" color="#7B7B7B" weight="400" size="16px" lineHeight="26px">
                <span className='text-dark'>{profileLength}</span> search result for Chiropractors in Los Angeles
              </Typography>

              <div className='d-flex align-items-center gap-2'>
                <Typography as="h3" className="mb-1" color="#23262F" weight="700" size="18px" lineHeight="27px">
                  Sponsored
                </Typography>
                <FaCircleInfo className='cursor-pointer' color='#B1B1B1' />
              </div>
            </div>

            <div>
              <ProfileCard
                enableSponsoredProfile
                columnPadding
                setProfileLength={setProfileLength}
              />
            </div>


            <AdsSection margin={3} padding={0} />

            <div className='my-4 pt-2'>
              <Typography as="h2" className="mb-0" color="#23262F" size="24px" lineHeight="36px" weight="700">
                All Results
              </Typography>

              <div className='mt-3'>
                <ProfileCard setProfileLength={setProfileLength}  />
              </div>
            </div>

          </Col>

          {/* Sidebar */}
          <Col
            style={{
              position: 'sticky',
              top: '50px',
              height: 'fit-content'
            }}
            lg={3} md={6} className='pb-4'>
            <Box className="w-100 mb-3">
              <img src={IMAGES.MAP_IMG} className='img-fluid' alt="map" />
            </Box>

            <div>
              <img src={IMAGES.ADS_VERTICAL_IMG} className='img-fluid' alt="ads" />
            </div>

          </Col>
        </Row>
      </Container>
    </AppLayout>
  )
}

export default Listings
