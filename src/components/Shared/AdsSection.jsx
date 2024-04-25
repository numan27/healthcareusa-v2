import { Container } from 'react-bootstrap'
import IMAGES from '../../assets/images'

const AdsSection = () => {
    return (
        <div>
            <Container className='py-5 my-4'>
                <a href="/#">
                    <img className='w-100' src={IMAGES.ADS_IMG} alt="" />
                </a>
            </Container>
        </div>
    )
}

export default AdsSection