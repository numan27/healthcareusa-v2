import React from 'react'
import { Box, Typography } from '../GenericComponents'
import IMAGES from '../../assets/images'
import { Container } from 'react-bootstrap'

const PartnersSection = () => {

    const partnersImages = [
        { img: IMAGES.PARTNER_LOGO_1 },
        { img: IMAGES.PARTNER_LOGO_2 },
        { img: IMAGES.PARTNER_LOGO_3 },
        { img: IMAGES.PARTNER_LOGO_4 },
        { img: IMAGES.PARTNER_LOGO_5 },
        { img: IMAGES.PARTNER_LOGO_6 },
    ]

    return (
        <div>
            <Box background="#50D1C9" className="w-100" padding="35px 0px" >
                <Container>
                    <Typography align="center" as="h3" color="#fff" size="20px" weight="700" lineHeight="28px">
                        Partners & Sponsors
                    </Typography>

                    <div className='mt-sm-3 mt-4 d-flex flex-sm-row flex-column align-items-center justify-content-md-between justify-content-center flex-wrap'>
                        {partnersImages.map((item) => (
                            <img className='mb-lg-0 mb-3' src={item.img} alt="" />
                        ))}
                    </div>
                </Container>
            </Box>
        </div>
    )
}

export default PartnersSection