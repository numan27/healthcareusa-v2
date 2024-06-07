// import React, { useState, useRef, useCallback } from "react";
import {
  // useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { IoSearch } from "react-icons/io5";
import { Box, GenericButton } from "../../../components/GenericComponents";
import { GrLocation } from "react-icons/gr";
import SquareMenu from "../../../assets/SVGs/SquareMenu";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// const libraries = ["places"];

const SearchForm = () => {
  // const [place, setPlace] = useState(null);
  // const [searchKeywords, setSearchKeywords] = useState("");
  const navigate = useNavigate();
  // const autocompleteRef = useRef(null);

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg",
  //   libraries,
  // });

  // const onLoad = useCallback((autocomplete) => {
  //   autocompleteRef.current = autocomplete;
  // }, []);

  // const onPlaceChanged = () => {
  //   if (autocompleteRef.current) {
  //     const place = autocompleteRef.current.getPlace();
  //     if (place.geometry) {
  //       const lat = place.geometry.location.lat();
  //       const lng = place.geometry.location.lng();
  //       setPlace({ lat, lng });
  //     }
  //   }
  // };

  const handleNavigateListingDetail = () => {
    // navigate("/listings", { state: { searchKeywords, place } });
    navigate("/listings");
  };

  return (
    <Box width="100" padding="18px" className="bg-white rounded-3 mt-3 pb-3">
      {/* {isLoaded && ( */}
      <>
        <Form className="h-100 d-flex flex-md-row flex-column align-items-center justify-content-between">
          <InputGroup className="search-bar border-search-md w-50 w-100-md">
            <InputGroup.Text
              className="bg-white border-0 p-2"
              id="basic-addon1"
            >
              <SquareMenu />
            </InputGroup.Text>
            <Form.Control
              placeholder="Key words or company"
              aria-label="Username"
              aria-describedby="basic-addon1"
              className="py-2"
              // value={searchKeywords}
              // onChange={(e) => setSearchKeywords(e.target.value)}
            />
          </InputGroup>

          <div className="d-flex align-items-center ps-md-4 w-100-md w-50 my-md-0 my-3 border-start-lg">
            {/* <Autocomplete> */}
            {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
            <InputGroup className="search-bar border-search-md w-100">
              <InputGroup.Text
                className="bg-white border-0 p-2"
                id="basic-addon1"
              >
                <GrLocation color="#06312E" size={24} />
              </InputGroup.Text>
              <Form.Control
                placeholder="city, state or zip"
                aria-label="Location"
                aria-describedby="basic-addon1"
                className="py-2"
              />
            </InputGroup>
            {/* </Autocomplete> */}
          </div>
          <div className="ms-1">
            <GenericButton
              onClick={handleNavigateListingDetail}
              width="138px"
              height="48px"
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <IoSearch className="" size={20} /> Search
            </GenericButton>
          </div>
        </Form>
      </>
      {/* )} */}
    </Box>
  );
};

export default SearchForm;
