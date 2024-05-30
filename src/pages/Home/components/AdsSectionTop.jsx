import { Container } from 'react-bootstrap';
import AdsSection from "../../../components/Shared/AdsSection"

const AdsSectionTop = () => {

    return (
        <div className='mt-lg-5 mt-0 pt-lg-5 pt-0 pb-md-4 pb-sm-3 pb-0'>
            <Container className='pt-lg-5 pt-sm-2 pt-0 AdsSectionTop'
                style={{ marginTop: "220px" }}
            >
                <AdsSection margin="4" />
            </Container>
        </div>
    );
};

export default AdsSectionTop;
