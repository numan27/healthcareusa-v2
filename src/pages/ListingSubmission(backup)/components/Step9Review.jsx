import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

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
      <h3 className="text-center fw-bold">Review & Submit</h3>
      <h5 className="fw-semibold">Basic Information</h5>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
          </tr>

          <tr>
            <th>Languages: </th>
            {languages && languages.length > 0 && (
              <>
                {languages.map((language, index) => (
                  <td key={index}>{language}</td>
                ))}
              </>
            )}
          </tr>
        </tbody>
      </Table>

      {/* {languages && languages.length > 0 && (
        <div>
          <h3>Languages</h3>
          <ul>
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      )} */}
      <h5 className="fw-semibold">Operational Hours</h5>
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
