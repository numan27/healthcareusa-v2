import { useState } from "react";
import { Col, Row, ProgressBar } from "react-bootstrap";
import FormSubmission from "./components/FormSubmission";
import FormLayout from "../../components/Layout/FormLayout/FormLayout";
import ProfileCardListingSubmission from "./components/ProfileCardListingSubmission";
import { toast } from "react-toastify";

const ListingSubmission = () => {
  const totalSteps = 9;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    primaryCategory: [],
    // subCategory: [],
    fullName: "",
    email: "",
    phone: "",
    website: "",
    completeAddress: "",
    // weeklySchedule: [],
    languages: [],
    // socialMediaLinks: [],
    descDetail: "",
    // submittingPersonFullName: "",
    // submittingPersonEmail: "",
    // submittingPersonPhone: "",
    updatedGallery: [],
    profilePicture: null,
    qualificationValues: [],
    specializationValues: [],
    package: [],
    // lat: "",
    // lng: "",
    // taxonomies: [],
  });

  const nextStep = () => {
    if (step === totalSteps) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleImageSelect = (index) => {
    setSelectedImage(index);

    // Update isSelected flag for the selected image
    const updatedGallery = formData.gallery.map((item, idx) => ({
      ...item,
      isSelected: idx === index,
    }));

    // Set the selected image index as the profile picture
    setFormData({
      ...formData,
      gallery: updatedGallery,
      profilePicture: index, // Store index as the profile picture
    });
  };

  const uploadFormData = new FormData();
  uploadFormData.append("file", formData.profilePicture);

  const mediaId = uploadFormData.id;

  console.log("mediaId", mediaId);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

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
      formData.updatedGallery.map(async (picture) => {
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

    try {
      const payload = {
        title: {
          raw: formData.fullName,
          rendered: formData.fullName,
        },
        featured_media: mediaId,
        status: "publish",
        cubewp_post_meta: {
          cwp_field_40228862441: formData.designation,
          cwp_field_288766456392: formData.descDetail,
          cwp_field_631649982329: formData.package,
          cwp_field_930729608352: formData.qualificationValues,
          cwp_field_136461069401: formData.specializationValues,
          "fc-google-address": {
            address: formData.completeAddress,
            lat: "",
            lng: "",
          },
          "fc-phone": formData.phone,
          "fc-website": formData.website,
          "fc-languages": formData.languages,
          cwp_field_310681993623: {
            type: "gallery",
            meta_key: "cwp_field_310681993623",
            meta_value: mediaIds.map((id) => id.toString()),
            label: "Gallery",
          },
          cwp_field_69043287672: {
            meta_value: formData.primaryCategory,
          },
        },
      };

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

      setFormData({
        // primaryCategory: [],
        fullName: "",
        email: "",
        phone: "",
        website: "",
        completeAddress: "",
        languages: [],
        qualificationValues: [],
        specializationValues: [],
        descDetail: "",
        updatedGallery: null,
        profilePicture: null,
      });

      toast.success("Doctor added successfully!", {
        autoClose: 1000,
      });
      setStep(9);
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  console.log("formData final: ", formData);

  const progress =
    step > 1 ? Math.round(((step - 1) / (totalSteps - 1)) * 100) : 0;

  return (
    <FormLayout
      nextStep={nextStep}
      prevStep={prevStep}
      step={step}
      loading={loading}
      handleSubmit={handleSubmit}
    >
      <div style={{ flex: "1" }} className="">
        <Row className="h-100">
          <Col className="px-0 d-flex flex-column">
            <div className="form-top-gradient">
              {step > 1 && step < 9 && (
                <ProgressBar
                  className="rounded-0 fw-bold"
                  now={progress}
                  label={`${progress}%`}
                />
              )}
            </div>
            <div className="flex-grow-1 d-flex align-items-start mt-5 pt-5 justify-content-center">
              <Row className="w-100">
                <Col md={8} className="mx-auto">
                  <FormSubmission
                    step={step}
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleSubmit={handleSubmit}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          {step < 9 && (
            <Col
              lg={6}
              className="live-preview-form d-flex align-items-center justify-content-center"
            >
              <Row className="">
                <Col md={10} className="mx-auto">
                  <ProfileCardListingSubmission formData={formData} />
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </FormLayout>
  );
};

export default ListingSubmission;
