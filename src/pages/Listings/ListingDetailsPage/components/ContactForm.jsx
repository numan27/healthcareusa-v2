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
                    placeholder="Jone Doe"
                />
                <GenericInput
                    className=""
                    type="text"
                    label="In what city"
                    placeholder="City or region"
                />
                <GenericInput
                    className=""
                    type="email"
                    label="Email"
                    placeholder="Jone@email.com"
                />
                <GenericInput
                    className=""
                    type="number"
                    label="Contact number"
                    placeholder="+44"
                />
                <GenericInput
                    className=""
                    as="textarea"
                    rows="6"
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