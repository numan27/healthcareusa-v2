import { Container } from 'react-bootstrap';
import IMAGES from '../../assets/images';
import PropTypes from "prop-types";

const AdsSection = ({ margin, padding }) => {
    return (
        <div>
            <Container className={`my-${margin} py-${padding}`}>
                <a href="/#">
                    <img className='w-100' src={IMAGES.ADS_IMG} alt="" />
                </a>
            </Container>
        </div>
    );
};

AdsSection.propTypes = {
    margin: PropTypes.string,
    padding: PropTypes.string,
};


AdsSection.defaultProps = {
    margin: "5",
    padding: "4"
};

export default AdsSection;
