const Review = ({ formData }) => {
  return (
    <div>
      <h2>Review & Submit</h2>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
    </div>
  );
};

export default Review;
