import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  GenericInput,
  Typography,
  Checkbox,
} from "../../../components/GenericComponents";
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";

const UploadMedia = ({ formData, setFormData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfilePictureSelected, setIsProfilePictureSelected] = useState(
    false
  );
  const [businessLogoSelected, setBusinessLogoSelected] = useState(false);

  useEffect(() => {
    if (!formData.gallery) {
      setFormData({ ...formData, gallery: [], profilePicture: null });
    }
  }, [formData, setFormData]);

  useEffect(() => {
    setIsProfilePictureSelected(!!formData.profilePicture);
  }, [formData.profilePicture]);

  const handleBusinessLogo = (e) => {
    setBusinessLogoSelected(!businessLogoSelected);
  };

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

    setIsProfilePictureSelected(true);
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
      setIsProfilePictureSelected(false);
    }

    setIsProfilePictureSelected(false); // Update profile picture selection state
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

  const handleCustomUploadClick = () => {
    document.getElementById("custom-file-upload").click();
  };

  const handleCustomLogoUploadClick = () => {
    document.getElementById("custom-logo-upload").click();
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className="media-uploader-wrapper">
      <Typography
        weight="700"
        align="center"
        color="#070026"
        size="24px"
        lineHeight="36px"
        className="section-title"
      >
        Upload featured and gallery images
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        lineHeight="24px"
        className="section-sub-title"
      >
        Upload multiple high-quality photos. (Max 4 images)
      </Typography>
      <div className="custom-upload-section">
        <svg
          className="uploadIcon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 15.2461V18.1231C4 19.7121 4.9 21.0001 6 21.0001H18C19.1 21.0001 20 19.7121 20 18.1231V15.2461"
            stroke="#151E42"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 9L12 4L17 9"
            stroke="#151E42"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 4.125V16.125"
            stroke="#151E42"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <button
          onClick={handleCustomUploadClick}
          className="custom-upload-button"
        >
          Drag Here or <span>Upload photos</span>
        </button>
        <input
          type="file"
          id="custom-file-upload"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleGalleryChange(e.target.files)}
        />
        <Typography
          weight="400"
          align="center"
          color="#676767"
          size="14px"
          font="Inter"
          lineHeight="24px"
        >
          Supported formates: JPG or PNG
        </Typography>
      </div>
      <Typography
          weight="500"
          align="center"
          color="#3D3C3C"
          size="13px"
          lineHeight="20px"
          className="description"
          >
        Select an image from below to be set as the featured image.
      </Typography>
      <Row>
        {formData.gallery &&
          formData.gallery.map((item, index) => (
            <Col key={item.id} xs={3} className="mb-2">
              <div
                  className="image-wrapper"
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
                   className="set-featured-image"
                    size={24}
                    color="white"
                    style={{ position: "absolute", top: 2, right: 6 }}
                  />
                )}
                <FaTimesCircle
                  className="remove-image"
                  size={24}
                  color="white"
                  style={{
                    position: "absolute",
                    top: 2,
                    left: 6,
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
                    color="white"
                    style={{ position: "absolute", bottom: 2, right: 6 }}
                  />
                )}
              </div>
            </Col>
          ))}
      </Row>
      {/*<Typography*/}
      {/*  weight="400"*/}
      {/*  align="center"*/}
      {/*  color="#73777D"*/}
      {/*  size="16px"*/}
      {/*  font="Inter"*/}
      {/*  lineHeight="24px"*/}
      {/*>*/}
      {/*  Please upload a profile picture to proceed.*/}
      {/*</Typography>*/}
      <Checkbox
        name="businesslogo"
        label="Check this box to upload a business logo."
        onChange={(e) => handleBusinessLogo(e)}
      ></Checkbox>
      {businessLogoSelected && (
        <>
          <Typography
            className="logo-section-description"
            weight="500"
            color="#3D3C3C"
            size="13px"
            lineHeight="20px"
          >
            Recommended logo dimensions: 100px (W) x 65px (H)
          </Typography>
          <div className="custom-upload-section">
            <svg
              className="uploadIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 15.2461V18.1231C4 19.7121 4.9 21.0001 6 21.0001H18C19.1 21.0001 20 19.7121 20 18.1231V15.2461"
                stroke="#151E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 9L12 4L17 9"
                stroke="#151E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4.125V16.125"
                stroke="#151E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <button
              onClick={handleCustomLogoUploadClick}
              className="custom-upload-button"
            >
              Drag Here or <span>Upload Logo</span>
            </button>
            <input
              type="file"
              id="custom-logo-upload"
              style={{ display: "none" }}
              onChange={(e) => handleGalleryChange(e.target.files)}
            />
            <Typography
              weight="400"
              align="center"
              color="#676767"
              size="12px"
              font="Inter"
              lineHeight="24px"
            >
              Supported formates: JPG or PNG
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

UploadMedia.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default UploadMedia;
