import { useState } from 'react'
import { Card, Form, InputGroup, Container, Row, Col } from 'react-bootstrap'
import { Box, CheckboxDropdown, GenericIconButton, Typography } from '../../components/GenericComponents'
import AppLayout from '../../components/Layout/AppLayout/AppLayout'
import AdsSection from "../../components/Shared/AdsSection"
import RangeSlider from './components/RangeSlider'
import IMAGES from '../../assets/images'
import { FaCircleInfo } from 'react-icons/fa6'
import ProfileCard from './components/ProfileCard'
// import { useNavigate } from 'react-router-dom'

const Listings = () => {

  const [temperatureRange, setTemperatureRange] = useState([20, 67]);

  const handleTemperatureChange = (newValue) => {
    setTemperatureRange(newValue);
  };

  // const navigate = useNavigate();

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

  const sponsoredProfileData = [
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      profileCompanyLogoImg: IMAGES.PROFILE_COMPANY_LOGO,
      phone: "(702) 852-1390",
      status: "Open"
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      profileCompanyLogoImg: IMAGES.PROFILE_COMPANY_LOGO,
      phone: "(702) 852-1390",
      status: "Close"
    },
  ]

  const allResultsData = [
    {
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
    {
      img: IMAGES.DOCTOR_LIST_PROFILE,
      doctorName: "Dr. Kimberly Douglas, MD",
      speciality: "CHIROPRACTORS",
      languages: "French, Spanish",
      doctorLogoImg: IMAGES.DOCTOR_LOGO,
      distance: "0.3",
      address: "156 William St Fl 6 New York, NY 10038",
      phone: "(702) 852-1390",
    },
  ]

  return (
    <AppLayout>
      <Container className='min-vh-100 '>
        <div>
          <AdsSection margin={4} />
        </div>

        <Row>
          {/* Left Content */}
          <Col lg={9}>
            {/* Search */}
            <Card className='border-0 custom-shadow-2 p-4'>
              <Form className='h-100'>
                <Row className='d-flex align-items-center '>
                  <Col md={6} className='d-flex align-items-center gap-2 section-responsive-border pe-4'>
                    <Typography className="text-nowrap" as="span" color="#00C1B6" weight="700" lineHeight="18px">
                      Near Me
                    </Typography>
                    <RangeSlider
                      defaultValue={temperatureRange}
                      min={0}
                      max={100}
                      step={1}
                      onChange={handleTemperatureChange}
                    />
                  </Col>

                  <Col md={6} className='d-flex align-items-center '>
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
                        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 14L16.5 16.5" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                          <path d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                          <path d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>

            {/* Filters */}
            <div className='my-3 d-flex flex-wrap gap-2'>
              <CheckboxDropdown title="Gender" items={genderOptions} />
              <CheckboxDropdown title="Languages" items={languageOptions} />
              <CheckboxDropdown title="Condition" items={conditionOptions} />
              <CheckboxDropdown title="Hospital Affiliation" items={conditionOptions} />
              <CheckboxDropdown title="Timing" items={conditionOptions} />
              <CheckboxDropdown title="Discounts" items={conditionOptions} />
            </div>

            <div className='pt-3 mb-3'>
              <Typography as="p" color="#7B7B7B" weight="400" size="16px" lineHeight="26px">
                <span className='text-dark'>1249</span> search result for Chiropractors in Los Angeles
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
                jsonData={sponsoredProfileData} />
            </div>


            <AdsSection margin={3} padding={0} />

            <div className='my-4 pt-2'>
              <Typography as="h2" className="mb-0" color="#23262F" size="24px" lineHeight="36px" weight="700">
                All Results
              </Typography>

              <div className='mt-3'>
                <ProfileCard jsonData={allResultsData} />
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
