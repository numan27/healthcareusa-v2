import PropTypes from "prop-types";
import Public from "../../components/Layout/PageStructure/Public";

function PublicRoute({ element }) {

  return  (
    <Public>
      {element}
    </Public>
  );
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
