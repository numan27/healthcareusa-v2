import React from 'react';
import '../css/find-healthcare-addnewlisting.css';
import addnewlisting_image from '../images/add-new-listing.png'
import Findhealthcarelisting from './find-healthcare-listing'
import Findhealthcarelistingtwo from './find-healthcare-lisitng-two'
import Findhealthcarelistingthree from './find-healthcare-listing-three'

export default function Findhealthcareaddnewlisting() {
    return (
        <div>
        <div className='find-healthcare-addnewlisting-content'>
            <div className='find-healthcare-addnewlisting-img'>
                <img src={addnewlisting_image} alt='date' />
            </div>
            <div className='find-healthcare-addnewlisting-text'>
                <h1>READY TO GET STARTED?</h1>
                <p>Start by creating a new listing.</p>
            </div>
            <button className='find-healthcare-addnewlisting-button'>New Listing</button>
        </div>
        
        <Findhealthcarelisting />
        <Findhealthcarelistingtwo />
        <Findhealthcarelistingthree />
        </div>
    )
}
