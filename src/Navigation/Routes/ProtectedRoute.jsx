import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import FullScreenLoader from "../../components/Layout/Loader/FullScreenLoader";
import PATH from "../../utils/path";
import Private from "../../components/Layout/PageStructure/Private";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate(PATH.LOGIN);
    }
  }, [user, navigate]);

  if (!user) return <FullScreenLoader />;

  return (
    <Private>{element}</Private>
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default ProtectedRoute;
