import PropTypes from "prop-types";

function Private({ children }) {
  return (
    <div>
        {children}
   </div>
  );
}
Private.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Private;
