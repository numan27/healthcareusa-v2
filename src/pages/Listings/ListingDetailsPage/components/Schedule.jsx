import React from 'react'
import { Box, GenericBadge, Typography } from '../../../../components/GenericComponents'

const Schedule = () => {
    const scheduleData = [
        { day: "Mo" },
        { day: "Tu" },
        { day: "We" },
        { day: "Th" },
        { day: "Fr" },
        { day: "Sa" },
        { day: "Su" },
    ]

    return (
        <>
            <div className='d-flex justify-content-between px-3 mb-3'>
                <Typography as='h3' className='mb-0' color='#23262F' size='17px' lineHeight='27px' weight='600'>
                    Opening Times
                </Typography>
                <GenericBadge
                    background="#D0FFF1"
                    color="#14A077"
                    borderColor="transparent"
                    text="Open"
                    padding="6px 10px"
                    className="text-capitalize"
                />
            </div>

            {scheduleData.map((items, index) => (
                <Box
                    key={index}
                    background={(items.day === 'Mo' && '#E4E4E4') || '#fff'}
                    width="100%"
                    className={`py-3 ${index !== scheduleData.length - 1 ? 'border-bottom' : 'rounded-bottom-3'}`}
                >
                    {items.day === 'Mo' ? (
                        <div className="d-flex align-items-center justify-content-between ps-3 pe-4">
                            <Typography as='h5' className='mb-0' color='#23262F' size='16px' lineHeight='24px' weight='600'>
                                {items.day}
                            </Typography>
                            <Typography as='h5' className='mb-0' color='#23262F' size='16px' lineHeight='24px' weight='600'>
                                09:00 am - 05:30 pm
                            </Typography>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center justify-content-between ps-3 pe-4">
                            <Typography as='h5' className='mb-0' color='#64666C' size='16px' lineHeight='24px' weight='400'>
                                {items.day}
                            </Typography>
                            <Typography as='h5' className='mb-0' color='#64666C' size='16px' lineHeight='24px' weight='400'>
                                09:00 am - 05:30 pm
                            </Typography>
                        </div>
                    )}
                </Box>
            ))}
        </>
    )
}

export default Schedule