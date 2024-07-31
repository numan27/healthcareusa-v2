import { useContext, useState, useMemo } from "react";
import { Col, Row, ProgressBar } from "react-bootstrap";
import FormSubmission from "./components/FormSubmission";
import FormLayout from "../../components/Layout/FormLayout/FormLayout";
import ProfileCardListingSubmission from "./components/ProfileCardListingSubmission";
import { PlanContext } from "../../components/api/PlanContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListingSubmission = () => {
  const { selectedPlan, selectedPlanName } = useContext(PlanContext);
  const choosenPlan = useMemo(() => Number(selectedPlan), [selectedPlan]);
  const choosenPlanName = useMemo(() => selectedPlanName, [selectedPlanName]);
  const navigate = useNavigate();
  let totalSteps = 4;
  if (["standard", "regional"].includes(choosenPlanName)) {
    totalSteps = 9;
  }
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    primaryCategory: [],
    fullName: "",
    email: "",
    phone: "",
    website: "",
    streetAddress: "",
    languages: [],
    descDetail: "",
    updatedGallery: [],
    profilePicture: null,
    qualificationValues: [],
    specializationValues: [],
    package: choosenPlan,
    lat: "",
    lng: "",
  });

  const nextStep = () => {
    if (step === totalSteps) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    if (!formData.profilePicture) {
      throw new Error("Please select a profile picture");
    }

    const credentials = btoa("numankhalil27@gmail.com:findhealthcareusa");
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
            address: formData.streetAddress,
          },
          "fc-google-address_lat": formData.lat,
          "fc-google-address_lng": formData.lng,
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
          plan_id: choosenPlan,
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

      const responseData = await response.json();
      localStorage.setItem("listingId", responseData.id);

      // Fetch the redirection URL based on the listing ID
      try {
        const listingId = responseData.id;
        const redirectResponse = await fetch(
          `https://jsappone.demowp.io/wp-json/banner-ad/v1/listing-plan?post_id=${listingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${credentials}`,
            },
          }
        );

        const redirectData = await redirectResponse.json();

        if (redirectData.type === "success") {
          localStorage.setItem("redirectURL", redirectData.redirectURL);
        }
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation for redirection:",
          error
        );
      }

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        website: "",
        streetAddress: "",
        languages: [],
        qualificationValues: [],
        specializationValues: [],
        descDetail: "",
        updatedGallery: null,
        profilePicture: null,
        lat: "",
        lng: "",
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
        <Row className="h-100 mt-5">
          <Col className="px-0 d-flex flex-column">
            <div
              className="form-top-gradient position-sticky"
              style={{ top: "50px", zIndex: "999" }}
            >
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
                <Col md={8} className="mx-auto px-md-0 px-4">
                  <FormSubmission
                    plan={choosenPlan}
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
              className="live-preview-form d-flex align-items-center justify-content-center pb-md-0 pb-5 h-100"
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
