import React from "react";
import {
  GenericButton,
  LinkButton,
  Typography,
} from "../../../../components/GenericComponents";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

const ClaimListing = () => {
  const claimListingData = [
    { title: "Get Verified Badge" },
    { title: "Access to Dashboard" },
    { title: "Upload Profile" },
    { title: "Promote your Lisitng" },
  ];

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
        Why Claim Your Lisiting?
      </Typography>

      <div className="mt-3">
        <ul className="list-unstyled">
          {claimListingData.map((items) => (
            <li className="d-flex align-items-center gap-2 mb-3">
              <HiOutlineChevronDoubleRight color="#14A077" />
              <Typography
                as="h5"
                className="mb-0"
                color="#23262F"
                size="14px"
                lineHeight="21px"
                weight="500"
              >
                {items.title}
              </Typography>
            </li>
          ))}
        </ul>
      </div>

      <div className="d-flex flex-column align-items-center gap-2">
        <GenericButton width="100%" height="44px">
          Claim this Listing
        </GenericButton>
        <LinkButton text="Find another listing" />
      </div>
    </div>
  );
};

export default ClaimListing;
