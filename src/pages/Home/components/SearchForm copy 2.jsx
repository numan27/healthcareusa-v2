import { useState, useRef, useCallback, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { IoSearch } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SquareMenu from "../../../assets/SVGs/SquareMenu";
import { Box, GenericButton } from "../../../components/GenericComponents";

const libraries = ["places"];

const SearchForm = () => {
  const [place, setPlace] = useState(null);
  const [searchKeywords, setSearchKeywords] = useState("");
  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const [loadScriptKey, setLoadScriptKey] = useState(0);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const placeResult = autocompleteRef.current.getPlace();
      if (placeResult.geometry) {
        const lat = placeResult.geometry.location.lat();
        const lng = placeResult.geometry.location.lng();
        const address = placeResult.formatted_address;
        setPlace({ lat, lng, address });
      } else {
        setPlace(null);
      }
    }
  };

  const handleNavigateListingDetail = () => {
    const stateData = searchKeywords || place ? { searchKeywords, place } : {};
    navigate("/navigate-to-listings", { state: stateData });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleNavigateListingDetail();
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setPlace(null);
      setSearchKeywords("");
      setLoadScriptKey((prevKey) => prevKey + 1);
    }
  }, []);

  return (
    <LoadScript
      key={loadScriptKey}
      googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg"
      // googleMapsApiKey="AIzaSyDyTmixiuM073rwv8ADLPl6mqrf8S3DNFQ"
      libraries={libraries}
    >
      <Box width="100" padding="18px" className="bg-white rounded-3 mt-3 pb-3">
        <>
          <Form
            className="h-100 d-flex flex-md-row flex-column align-items-center justify-content-between"
            onSubmit={handleFormSubmit}
          >
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
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
              />
            </InputGroup>

            <div className="d-flex align-items-center ps-md-4 w-100-md w-50 my-md-0 my-3 border-start-lg">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
              </Autocomplete>
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
      </Box>
    </LoadScript>
  );
};

export default SearchForm;
