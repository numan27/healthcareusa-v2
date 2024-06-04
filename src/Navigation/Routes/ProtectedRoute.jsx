import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Private from "../../components/Layout/PageStructure/Private";
import { PATH } from "../../config";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate(PATH.HOME);
    }
  }, [token, navigate]);

  return token ? <Private>{element}</Private> : null;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default ProtectedRoute;
