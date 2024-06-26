import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div>
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
};

export default AppLayout;
