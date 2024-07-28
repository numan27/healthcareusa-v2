import React from 'react'
import '../css/find-healthcare-listing..css'
import ListingAdsvalue from '../components/find-healthcare-alllisting-ads'
import Findhealtcarebannerads from './find-healtcare-banner-ad'
import Findhealthcareupgradeplan from './find-healthcare-upgrade-plan.js'

export default function Findhealthcarelisting() {
    return (
        <div className='find-healthcare-listing'>
            <h1 className='listing-ads-main-heading'>All Listings</h1>
            <ListingAdsvalue />
            <Findhealtcarebannerads />
            <Findhealthcareupgradeplan />
        </div>
    )
}
