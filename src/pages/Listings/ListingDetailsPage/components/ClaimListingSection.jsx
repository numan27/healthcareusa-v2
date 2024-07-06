import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  GenericButton,
  LinkButton,
  Typography,
} from "../../../../components/GenericComponents";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
// import { PATH } from "../../../../config";
import ExploreMoreModal from "./ExploreMoreModal";

const ClaimListingSection = ({ profileTitle, googleAddress }) => {
  const [exploreModalState, setExploreModalState] = useState(false);

  const OpenModal = () => {
    setExploreModalState(true);
    // setExploreModalItems({ heading, items });
  };

  const CloseModal = () => {
    setExploreModalState(false);
  };

  const claimListingData = [
    { title: "Get Verified Badge" },
    { title: "Access to Dashboard" },
    { title: "Upload Profile" },
    { title: "Promote your Lisitng" },
  ];

  // const navigate = useNavigate();

  // const handleNavigate = () => {
  //   navigate(PATH.CLAIM_LISTING);
  // };

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
        <GenericButton onClick={OpenModal} width="100%" height="44px">
          Claim this Listing
        </GenericButton>
        {/* <LinkButton text="Find another listing" /> */}
      </div>

      {exploreModalState && (
        <ExploreMoreModal
          show={exploreModalState}
          onHide={CloseModal}
          title="All Doctors"
          profileTitle={profileTitle}
          googleAddress={googleAddress}
          // exploreModalItems={exploreModalItems}
        />
      )}
    </div>
  );
};

export default ClaimListingSection;
