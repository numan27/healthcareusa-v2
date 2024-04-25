import PropTypes from "prop-types";

function Public({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
Public.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Public;
