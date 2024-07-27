import React from 'react'
import '../css/find-healthcare-my-adds.css'
import Findhealthcaredropdownmenu from '../components/find-healthcare-dropdown-menu'
import view_eye from '../svg-icons/view-eye.svg'


export default function Findhealtcareadpageplacementbanner({ borderRadius = "3", border="1px solid #E1E1E1" }) {
    return (
        <div className={`findhealtcare-ad-page-placement-banner rounded-${borderRadius}`}
            style={{ border: border }}
        >
            <div className='ad-page-placement-banner custom-grid'>
                <div className='findhealtcare-ads-number style-headings'>
                    <h3>AD#</h3>
                    <h2>01</h2>
                </div>
                <div className='findhealtcare-page-name style-headings'>
                    <h3>Page</h3>
                    <h2>Home</h2>
                </div>
                <div className='findhealtcare-placment-type style-headings'>
                    <h3>Placement</h3>
                    <h2>Body (Above Footer)</h2>
                </div>
                <div className='findhealtcare-banner-type style-headings'>
                    <h3>Banner</h3>
                    <h2>Super Leaderboard</h2>
                </div>
                <div className='findhealtcare-size-type style-headings'>
                    <h3>Size</h3>
                    <h2>728x90</h2>
                </div>
                <div className='findhealtcare-status-and-view'>
                    <p className='active-status'>ACTIVE</p>
                    <p className='view-status'><img src={view_eye} alt='eye_view' /> View</p>
                </div>
                <div className='page-placement-banner-dropdown-menu'>
                    <Findhealthcaredropdownmenu />
                </div>
            </div>
        </div>
    )
}
