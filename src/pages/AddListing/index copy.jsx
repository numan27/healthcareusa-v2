import { useState } from "react";
import {
  CheckboxDropdown,
  GenericButton,
  GenericInput,
  GenericSelect,
  Typography,
} from "../../components/GenericComponents";
import AppLayout from "../../components/Layout/AppLayout";
import { Col, Container, Form, Row } from "react-bootstrap";
import { LoaderCenter } from "../../assets/Loader";
import { toast } from "react-toastify";

const AddListing = () => {
  const initialFormState = {
    doctorName: "",
    designation: "",
    address: "",
    phone: "",
    website: "",
    languages: [],
    qualifications: [],
    specializations: [],
    // taxonomies: [],
    description: "",
    profilePicture: null,
    gallery: [],
    package: [],
    // gender: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formKey, setFormKey] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
    setProfilePictureUploaded(true);
  };

  const handleGalleryChange = (files) => {
    const fileList = Array.from(files);
    setFormData({ ...formData, gallery: fileList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload profile picture
      if (!formData.profilePicture) {
        throw new Error("Please select a profile picture");
      }

      const credentials = btoa("numan27:findhealthcareusa");
      const uploadFormData = new FormData();
      uploadFormData.append("file", formData.profilePicture);

      const uploadResponse = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/media",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
          body: uploadFormData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload profile picture to WordPress");
      }

      const uploadData = await uploadResponse.json();
      const mediaId = uploadData.id;

      // Upload gallery images
      const mediaIds = await Promise.all(
        formData.gallery.map(async (picture) => {
          const uploadFormData = new FormData();
          uploadFormData.append("file", picture);

          const uploadResponse = await fetch(
            "https://jsappone.demowp.io/wp-json/wp/v2/media",
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${credentials}`,
              },
              body: uploadFormData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload media file to WordPress");
          }

          const uploadData = await uploadResponse.json();
          return uploadData.id;
        })
      );

      // Prepare payload for listing creation
      const payload = {
        title: formData.doctorName,
        featured_media: mediaId,
        cubewp_post_meta: {
          cwp_field_40228862441: formData.designation,
          cwp_field_288766456392: { meta_value: formData.description },
          cwp_field_631649982329: { meta_value: formData.package },
          // cwp_field_224925973684: { meta_value: formData.gender },
          cwp_field_310681993623: {
            type: "gallery",
            meta_key: "cwp_field_310681993623",
            meta_value: mediaIds.map((id) => id.toString()),
            label: "Gallery",
          },
          cwp_field_930729608352: { meta_value: formData.qualifications },
          cwp_field_136461069401: { meta_value: formData.specializations },
          "fc-phone": { meta_value: formData.phone },
          "fc-website": { meta_value: formData.website },
          "fc-languages": { meta_value: formData.languages },
          "fc-google-address": {
            meta_value: {
              address: formData.address,
              lat: "",
              lng: "",
            },
          },
        },
        status: "publish",
        // taxonomies: formData.taxonomies.map((taxonomy) => taxonomy.value),
      };

      // Submit payload to create listing
      const response = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/listing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create listing on WordPress");
      }

      // Reset form on successful submission
      setFormData(initialFormState);
      setFormKey(Date.now());
      setProfilePictureUploaded(false);

      toast.success("Doctor added successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to add doctor");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Form Data Old: ", formData);

  const languagesData = [
    { id: "1", label: "English", value: "english" },
    { id: "2", label: "French", value: "french" },
    { id: "3", label: "Spanish", value: "spanish" },
    { id: "4", label: "German", value: "german" },
  ];

  const qualificationsData = [
    { id: "1", label: "M.B.B.S", value: "mbbs" },
    { id: "2", label: "M.R.C.P", value: "mrcp" },
    { id: "3", label: "D.M.R.D", value: "dmrd" },
    { id: "4", label: "F.C.P.S", value: "fcps" },
  ];
  const specializationsData = [
    { id: "1", label: "Neurologist", value: "neurologist" },
    { id: "2", label: "Psychologist", value: "psychologist" },
    { id: "3", label: "Dermatologist", value: "dermatologist" },
    { id: "4", label: "Oncologist", value: "oncologist" },
    { id: "5", label: "Cardiologist", value: "cardiologist" },
  ];

  console.log("formData", formData);

  return (
    <>
      <Container className="my-5 py-4">
        <Typography
          as="h3"
          className="mb-0"
          color="#23262F"
          size="18px"
          lineHeight="27px"
          weight="600"
        >
          Add New Doctor
        </Typography>

        <Row className="mt-4">
          <Col md={6}>
            <GenericInput
              type="text"
              name="doctorName"
              label="Doctor Name"
              height="44px"
              value={formData.doctorName}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              name="designation"
              label="Designation"
              height="44px"
              value={formData.designation}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <GenericInput
              type="tel"
              name="phone"
              label="Phone"
              height="44px"
              value={formData.phone}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              name="website"
              label="Website"
              height="44px"
              value={formData.website}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              height="44px"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </Col>

          <Col md={6} className="mb-2 pb-1">
            <CheckboxDropdown
              key={`${formKey}-languages`}
              title="Languages"
              height="44px"
              width="100%"
              items={languagesData}
              haveLabel
              labelValue="Choose Language(s)"
              border
              onChange={(selectedLanguages) => {
                const languageValues = selectedLanguages.map(
                  (language) => language.value
                );
                setFormData({ ...formData, languages: languageValues });
              }}
            />
          </Col>

          <Col md={6} className="mb-2 pb-1">
            <CheckboxDropdown
              key={`${formKey}-qualifications`}
              title="Qualifications"
              height="44px"
              width="100%"
              items={qualificationsData}
              haveLabel
              labelValue="Choose Qualification(s)"
              border
              onChange={(selectedQualifications) => {
                const qualificationValues = selectedQualifications.map(
                  (qualification) => qualification.value
                );
                setFormData({
                  ...formData,
                  qualifications: qualificationValues,
                });
              }}
            />
          </Col>
          <Col md={6} className="mb-2 pb-1">
            <CheckboxDropdown
              key={`${formKey}-specializations`}
              title="Specializations"
              height="44px"
              width="100%"
              background="#F4F5F7"
              items={specializationsData}
              haveLabel
              labelValue="Choose Specialization(s)"
              border
              onChange={(selectedSpecializations) => {
                const specializationValues = selectedSpecializations.map(
                  (specialization) => specialization.value
                );
                setFormData({
                  ...formData,
                  specializations: specializationValues,
                });
              }}
            />
          </Col>

          <Col className="mt-2 pt-1" md={6}>
            <Form.Label className="form_label">
              Choose Doctor Package
            </Form.Label>
            <GenericSelect
              key={`${formKey}-package`}
              minWidth="120px"
              minheight="44px"
              borderColor="#B2BAC0"
              borderRadius="4px"
              bgcolor="#F4F5F7"
              placeholder="Select Package"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={[
                {
                  id: "1",
                  label: "Gold",
                  value: "gold",
                },
                { id: "2", label: "Platinum", value: "platinum" },
                {
                  id: "3",
                  label: "Silver",
                  value: "silver",
                },
              ]}
              onChange={(selectedPackage) => {
                setFormData({ ...formData, package: [selectedPackage.value] });
              }}
            />
          </Col>
          <Col className="my-2 pt-1" md={6}>
            <GenericInput
              type="file"
              name="profilePicture"
              label="Profile Picture"
              onFileChange={handleProfilePictureChange}
              key={`${formKey}-profilePicture`}
            />
            {!profilePictureUploaded && (
              <small className="text-danger" size="14px">
                Profile picture required
              </small>
            )}
          </Col>
          <Col className="mt-2 pt-1" md={6}>
            <GenericInput
              type="file"
              name="gallery"
              label="Gallery"
              multiple
              onFileChange={(e) => handleGalleryChange(e.target.files)}
              key={`${formKey}-gallery`}
            />
          </Col>

          <Col md={12}>
            <GenericInput
              as="textarea"
              rows="4"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </Col>

          <Col xs={12} className="mt-3">
            <Col xs={12} className="mt-3">
              <GenericButton
                width="100%"
                height="44px"
                onClick={handleSubmit}
                disabled={!profilePictureUploaded || isSubmitting}
              >
                {isSubmitting ? <LoaderCenter /> : "Submit Listing"}
              </GenericButton>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddListing;
