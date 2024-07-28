import React from 'react'
import '../css/find-healthcare-my-adds.css'
import Findhealtcareadpageplacementbanner from './find-healtcare-ad-page-placement-banner'

export default function Findhealthcareadcampaignoverview() {
    return (

        <div className='find-healthcare-ad-campaign-overview-content'>
            <Findhealtcareadpageplacementbanner border='none' borderRadius='0' />
            <div className='find-healthcare-ad-campaign-overview'>
            <div className='row'>
                <div className='col-lg-3 col-md-3 col-sm-6'>
                    <div className='ad-campaign-overview'>
                        <h3 className='main-heading'>Campaign Overview</h3>
                    </div>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-6 style-border'>
                    <div className='ad-campaign-overview'>
                        <h4>Impressions</h4>
                        <h2>40</h2>
                    </div>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-6 style-border'>
                    <div className='ad-campaign-overview'>
                        <h4>Clicks</h4>
                        <h2>20</h2>
                    </div>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-6 style-border'>
                    <div className='ad-campaign-overview'>
                        <h4>CTR</h4>
                        <h2>20%</h2>
                    </div>
                </div>
            </div> 
            </div>
        </div>

    )
}
