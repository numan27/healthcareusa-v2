import React from "react";
import PropTypes from "prop-types";

const Review = ({ formData }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    languages,
    weeklySchedule,
    descDetail,
    serviceDetail,
    insuranceDetail,
    socialMediaLinks,
    gallery,
  } = formData;

  return (
    <div>
      <h2>Review & Submit</h2>
      <h3>Personal Information</h3>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>

      {languages && languages.length > 0 && (
        <div>
          <h3>Languages</h3>
          <ul>
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Operational Hours</h3>
      <ul>
        {weeklySchedule &&
          weeklySchedule.map((schedule, index) => (
            <li key={index}>
              <strong>{schedule.day}</strong>: {schedule.openingTime} -{" "}
              {schedule.closingTime}
            </li>
          ))}
      </ul>

      <h3>Additional Details</h3>
      <p>Business Description: {descDetail}</p>
      <p>Business Services: {serviceDetail}</p>
      <p>Insurances Accepted: {insuranceDetail}</p>

      <h3>Social Media</h3>
      <ul>
        {socialMediaLinks &&
          socialMediaLinks.map((link, index) => (
            <li key={index}>
              <strong>{link.platform}</strong>: {link.url}
            </li>
          ))}
      </ul>

      <h3>Gallery</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {gallery &&
          gallery.map((item, index) => (
            <div key={item.id} style={{ marginRight: 20, marginBottom: 20 }}>
              <img
                src={URL.createObjectURL(item.file)}
                alt={`preview-${index}`}
                style={{ width: 150, height: "auto" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

Review.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default Review;
