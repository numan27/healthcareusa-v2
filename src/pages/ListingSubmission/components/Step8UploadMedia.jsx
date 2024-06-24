import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";

const UploadMedia = ({ formData, setFormData }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!formData.gallery) {
      setFormData({ ...formData, gallery: [], profilePicture: null });
    }
  }, [formData, setFormData]);

  const handleGalleryChange = (files) => {
    const fileList = Array.from(files);
    const updatedGallery = [...formData.gallery];

    fileList.forEach((file) => {
      const uniqueId = uuidv4();
      updatedGallery.push({ id: uniqueId, file, isSelected: false });
    });

    if (updatedGallery.length > 4) {
      updatedGallery.splice(4);
    }

    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
    const updatedGallery = formData.gallery.map((item, idx) => ({
      ...item,
      isSelected: idx === index,
    }));

    const profilePicture = formData.gallery[index].file;

    setFormData({
      ...formData,
      gallery: updatedGallery,
      profilePicture: profilePicture,
    });
  };

  const handleRemoveImage = (index) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    const isProfilePicture =
      formData.gallery[index].file === formData.profilePicture;

    setFormData({
      ...formData,
      gallery: updatedGallery,
      profilePicture: isProfilePicture ? null : formData.profilePicture,
    });

    if (index === selectedImage) {
      setSelectedImage(null);
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
              // disabled={formData.gallery.length >= 4}
            />
          </Col>
        </Row>
      </Form>
      <Row>
        {formData.gallery &&
          formData.gallery.map((item, index) => (
            <Col key={item.id} xs={3} className="mb-2">
              <div
                style={{
                  position: "relative",
                  cursor: "pointer",
                  border: item.isSelected ? "2px solid green" : "none",
                }}
                onClick={() => handleImageSelect(index)}
              >
                <img
                  src={URL.createObjectURL(item.file)}
                  alt={`preview-${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
                {item.isSelected && (
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
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="remove-icon"
                />
                {formData.profilePicture === item.file && (
                  <FaUserCircle
                    size={24}
                    color="blue"
                    style={{ position: "absolute", bottom: 10, right: 10 }}
                  />
                )}
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
};

export default UploadMedia;
