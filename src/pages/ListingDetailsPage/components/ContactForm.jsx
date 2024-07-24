import React from "react";
import {
  Box,
  GenericButton,
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";

const ContactForm = ({ profileTitle, googleAddress }) => {
  const parseAddress = (address) => {
    const parts = address.split(", ");
    return {
      city: parts.length > 1 ? parts[1] : "",
      state: parts.length > 2 ? parts[2] : "",
    };
  };

  const { city, state } = parseAddress(googleAddress?.address || "");

  return (
    <div>
      <Typography
        as="h3"
        className="mb-0"
        color="#23262F"
        size="18px"
        lineHeight="27px"
        weight="600"
      >
        Contact Us
      </Typography>

      <Box
        background="#EAFFFF"
        color="#070026"
        // height="44px"
        minHeight="44px"
        className="w-100 text-center d-flex align-items-center justify-content-center mt-2 py-2"
      >
        <Typography
          color="#070026"
          weight="400"
          size="16px"
          lineHeight="24px"
          as="h5"
          align="center"
          className="mb-0"
        >
          For
          <span className="fw-semibold"> {profileTitle} </span>
          located in
          <span className="fw-semibold">
            {" "}
            {city}, {state}{" "}
          </span>
        </Typography>
      </Box>

      <div className="mt-4">
        <GenericInput
          className=""
          type="text"
          label="Full Name"
          height="44px"
          placeholder="Jone Doe"
        />
        <GenericInput
          className=""
          type="text"
          label="In what city"
          height="44px"
          placeholder="City or region"
        />
        <GenericInput
          className=""
          type="email"
          label="Email"
          height="44px"
          placeholder="Jone@email.com"
        />
        <GenericInput
          className=""
          type="number"
          label="Contact number"
          height="44px"
          placeholder="+44"
        />
        <GenericInput
          className=""
          as="textarea"
          rows="4"
          label="Message (optional)"
          placeholder="Type message here"
        />

        <GenericButton width="100%" height="44px">
          Send a request
        </GenericButton>
      </div>
    </div>
  );
};

export default ContactForm;
