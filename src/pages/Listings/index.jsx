import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Card, Form, InputGroup, Container, Row, Col } from 'react-bootstrap'
import { Box, CheckboxDropdown, GenericBadge, GenericButton, GenericIconButton, Typography } from '../../components/GenericComponents'
import AppLayout from '../../components/Layout/AppLayout/AppLayout'
import AdsSection from "../../components/Shared/AdsSection"
import RangeSlider from './components/RangeSlider'
import IMAGES from '../../assets/images'
// import { useNavigate } from 'react-router-dom'

const Listings = () => {

  const [temperatureRange, setTemperatureRange] = useState([20, 67]);

  const handleTemperatureChange = (newValue) => {
    setTemperatureRange(newValue);
  };

  // const navigate = useNavigate();

  const items = [
    { id: "1", label: "Pending hello" },
    { id: "2", label: "Approved" },
    { id: "3", label: "Previous Posts" },
    { id: "4", label: "Under Pro-Review" },
    { id: "5", label: "Scheduled" },
  ];

  return (
    <AppLayout>
      <Container className='min-vh-100 '>
        <div>
          <AdsSection />
        </div>

        <Row>
          {/* Left Content */}
          <Col md={9}>
            <Card className='border-0 shadow p-3'>
              <Form className='h-100'>
                <Row className='d-flex align-items-center '>
                  <Col md={6} className='border-end pe-4'>
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
                        className='py-2'
                      />
                    </InputGroup>

                    <div className='ms-1'>
                      <GenericButton width="138px" height="48px" className="d-flex align-items-center justify-content-center gap-2">
                        <IoSearch className='' size={20} /> Search
                      </GenericButton>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>

            <div className='my-5'>
              <CheckboxDropdown title="Gender" items={items} />
            </div>

            <div>
              <Box
                padding="16px"
                className="custom-border">
                <Row>
                  <Col md={3}>
                    <img className='img-fluid' src={IMAGES.DOCTOR_LIST_PROFILE} alt="" />
                  </Col>
                  <Col md={9} className='d-flex justify-content-between '>
                    <div>
                      <Typography as="h2" color="#23262F" weight="700" size="24px" lineHeight="36px">
                        Dr. Kimberly Douglas, MD
                      </Typography>

                      <div>
                        <GenericBadge
                          text="CHIROPRACTORS"
                          fontSize="12px"
                          weight="700"
                          color="#64666C"
                        />

                        <GenericBadge
                          text="French, Spanish"
                          fontSize="12px"
                          weight="500"
                          color="#64666C"
                          borderColor="#E4E4E4"
                          // border={true}

                          background="#fff"
                        />

                      </div>

                    </div>

                    <div className='d-flex gap-3'>
                      <GenericIconButton
                        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 14L16.5 16.5" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                          <path d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                          <path d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>}
                      // color="#969696"
                      // background="#F1F5F8"
                      />

                    </div>
                  </Col>
                </Row>

              </Box>
            </div>



          </Col>

          {/* Sidebar */}
          <Col md={3} className='bg-dark min-vh-100 '>
            <Box width="400" height="400" className="w-100 bg-dark">
              <h1 className='text-white'>Location Map</h1>
            </Box>

          </Col>
        </Row>
      </Container>
    </AppLayout>
  )
}

export default Listings
