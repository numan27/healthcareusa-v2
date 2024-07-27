import React from 'react'
import '../css/find-healthcare-my-adds.css'
import ListingAdsvalue from '../components/find-healthcare-alllisting-ads'
import Findhealthcaredetailaboutads from './find-healthcare-detail-about-ads'
import Findhealtcareadpageplacementbanner from './find-healtcare-ad-page-placement-banner'
import Findhealthcaremyaddstwo from './find-healthcare-my-adds-two'


export default function Findhealthcaremyadds() {
    return (
        <div className='find-healthcare-my-adds'>
            <h1 className='my-ads-main-heading'>All Banner Ads</h1>
            <ListingAdsvalue />
            <Findhealthcaredetailaboutads />
            <Findhealtcareadpageplacementbanner />
            <Findhealthcaremyaddstwo />
        </div>
    )
}
