import PropTypes from "prop-types";
import { styled } from "styled-components";
import { Modal } from "react-bootstrap";

import Typography from "../Typography";

const StyledModal = styled(Modal)`
  padding: 0px;
  .modal-body {
    padding: 0;
  }
  .modal-header {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    border-bottom: 0 !important;
  }
  .custom-border {
    border-bottom: 1.5px solid #b9b9b9 !important;
    margin: 0 20px;
  }

  .modal-content {
    // border-radius: 10px;
    border-radius: ${(props) => props.radius};
    border: none;
  }
  .modal-title h2 {
    font-weight: 600;
  }
  .close {
    opacity: 1;
    color: #000;
  }

  .modal-dialog {
    margin: 0 auto;
    max-width: ${(props) => props.maxWidth};
    padding: 20px 20px;

  }
`;
function GenericModal({ children, maxWidth, radius, ...props }) {
  return (
    <StyledModal
      maxWidth={maxWidth}
      radius={radius}
      size={props.size || "lg"}
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal"
      dialogClassName=""
      centered={props.centered}
      className={props.className}
    >
      {props.title && (
        <>
          <Modal.Header closeButton>
            <Modal.Title className="h6">
              <span className="text-black">
                <Typography
                  color="#524E4E"
                  size="20px"
                  lineHeight="15px"
                  weight="600"
                >
                  {props.title}{" "}
                </Typography>
              </span>
            </Modal.Title>
          </Modal.Header>
          {/* <div className="custom-border" /> */}
        </>
      )}
      <Modal.Body className="align-self-center w-100">{children}</Modal.Body>
    </StyledModal>
  );
}

GenericModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  centered: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  radius: PropTypes.string,
};

GenericModal.defaultProps = {
  centered: true,
  size: "md",
  className: "",
  title: "",
  children: null,
  maxWidth: "",
  radius: ""
};

export default GenericModal;
