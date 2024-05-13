import React from 'react'
import { GenericButton, GenericInput, Typography } from '../../../../components/GenericComponents'

const ContactForm = () => {

    return (
        <div>
            <Typography as='h3' className='mb-0' color='#23262F' size='18px' lineHeight='27px' weight='600'>
                Contact Us
            </Typography>

            <div className='mt-4'>
                <GenericInput
                    className=""
                    type="text"
                    label="Full Name"
                    height="44px"
                    placeholder="Jone Doe"
                />
                <GenericInput
                    className=""
                    type="text"
                    label="In what city"
                    height="44px"
                    placeholder="City or region"
                />
                <GenericInput
                    className=""
                    type="email"
                    label="Email"
                    height="44px"
                    placeholder="Jone@email.com"
                />
                <GenericInput
                    className=""
                    type="number"
                    label="Contact number"
                    height="44px"
                    placeholder="+44"
                />
                <GenericInput
                    className=""
                    as="textarea"
                    rows="4"
                    label="Message (optional)"
                    placeholder="Type message here"
                />

                <GenericButton width="100%" height="44px">
                    Send a request
                </GenericButton>
            </div>
        </div>
    )
}

export default ContactForm