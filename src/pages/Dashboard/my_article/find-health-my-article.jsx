import React from 'react'
import '../css/find-health-my-article.css'
import Findhealthcareallarticlesbar from './find-healthcare-all-articles-bar'
import Findhealthcarearticlebanner from './find-healthcare-article-banner'
import ListingAdsvalue from '../components/find-healthcare-alllisting-ads'


export default function Findhealthmyarticle() {
    return (
        <div className='find-health-my article'>
                <Findhealthcareallarticlesbar/>
                <ListingAdsvalue/>
                <Findhealthcarearticlebanner />
        </div>
    )
}
