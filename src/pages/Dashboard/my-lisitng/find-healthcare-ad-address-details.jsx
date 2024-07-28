import React from 'react'
import '../css/find-healthcare-listing..css'
import location_svg from '../svg-icons/ad_location.svg'
import Findhealthcaredropdownmenu from '../components/find-healthcare-dropdown-menu'


export default function Findhealthcareadaddressdetails() {
    return (
        <div className='find-helathcare-ad-address-details'>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='ad-location-address'>
                        <div className='banner-ad-heading-and-address'>
                            <div className='banner-ad-heading'>
                                <h3>LOC# 01</h3>
                                <img src={location_svg} alt='location_svg' />
                            </div>
                            <div className='banner-ad-address'>
                                <p>Address</p>
                                <h2>156 William St, <br />New York, NY10036</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='banner-ad-details-status'>
                        <div className='details-text-style'>
                            <p>Phone</p>
                            <h3>(919) 333-4455</h3>
                        </div>
                        <div className='details-text-style'>
                            <p>Fax</p>
                            <h3>(919) 333-4455</h3>
                        </div>
                        <div className='details-text-style'>
                            <p>Email</p>
                            <h3>john@do.com</h3>
                        </div>
                        <Findhealthcaredropdownmenu />
                    </div>
                </div>
            </div>
        </div>
    )
}
