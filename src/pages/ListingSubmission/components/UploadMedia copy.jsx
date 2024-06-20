import PropTypes from "prop-types";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UploadMedia = ({ formData, setFormData }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!formData.gallery) {
    setFormData({ ...formData, gallery: [] });
  }

  const handleGalleryChange = (files) => {
    const fileList = Array.from(files);
    const updatedGallery = [...formData.gallery, ...fileList].slice(0, 4);
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
    setFormData({ ...formData, profileImage: formData.gallery[index] });
  };

  const handleRemoveImage = (index) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updatedGallery });
    if (index === selectedImage) {
      setSelectedImage(null);
      setFormData({ ...formData, profileImage: null });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleGalleryChange(files);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      <Typography
        weight="600"
        align="center"
        color="#070026"
        size="24px"
        font="Inter"
        lineHeight="36px"
      >
        Upload featured and gallery images
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Upload multiple high-quality photos. (Max 4 images)
      </Typography>
      <Form className="mt-5">
        <Row>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="file"
              name="gallery"
              label="Gallery"
              multiple
              onFileChange={(e) => handleGalleryChange(e.target.files)}
              disabled={formData.gallery.length >= 4}
            />
          </Col>
        </Row>
      </Form>
      <Row>
        {formData.gallery &&
          formData.gallery.map((file, index) => (
            <Col key={index} xs={3} className="mb-2">
              <div
                style={{
                  position: "relative",
                  cursor: "pointer",
                  border: selectedImage === index ? "2px solid green" : "none",
                }}
                onClick={() => handleImageSelect(index)}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
                {selectedImage === index && (
                  <FaCheckCircle
                    size={24}
                    color="green"
                    style={{ position: "absolute", top: 10, right: 10 }}
                  />
                )}
                <FaTimesCircle
                  size={24}
                  color="red"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    // display: "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="remove-icon"
                />
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

UploadMedia.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UploadMedia;
