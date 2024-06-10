import PropTypes from 'prop-types';
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
