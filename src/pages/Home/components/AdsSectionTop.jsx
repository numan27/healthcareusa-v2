import { Container } from 'react-bootstrap';
import IMAGES from '../../../assets/images';

const AdsSectionTop = () => {

    return (
        <div className='py-md-5 py-3 mb-4'>
            <Container className='pt-lg-5 pt-4 AdsSectionTop'
                style={{ marginTop: "250px" }}
            >
                <a href="/#">
                    <img className='w-100' src={IMAGES.ADS_IMG} alt="" />
                </a>
            </Container>
        </div>
    );
};

export default AdsSectionTop;
