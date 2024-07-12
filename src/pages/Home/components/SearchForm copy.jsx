import { useState, useRef, useCallback, useEffect } from "react";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import { IoSearch } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SquareMenu from "../../../assets/SVGs/SquareMenu";
import { Box, GenericButton } from "../../../components/GenericComponents";
import { LoaderCenter } from "../../../assets/Loader";

const libraries = ["places"];

const SearchForm = () => {
  const [place, setPlace] = useState(null);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const navigate = useNavigate();
  const locationPath = useLocation();
  const autocompleteRef = useRef(null);

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
        setLocation(address);
        setInputLocation(address);
      } else {
        setPlace(null);
        setLocation("");
        setInputLocation("");
      }
    }
  };

  const handleNavigateListingDetail = () => {
    const stateData = searchKeywords || place ? { searchKeywords, place } : {};
    navigate("/listings", { state: stateData });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!place && inputLocation) {
      setPlace({ address: inputLocation });
    }
    handleNavigateListingDetail();
  };

  const handleLocationKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onPlaceChanged();
      handleFormSubmit(e);
    }
  };

  useEffect(() => {
    if (locationPath.pathname === "/") {
      setPlace(null);
      setSearchKeywords("");
    }

    // Fetch current location
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setPlace({ lat: latitude, lng: longitude, address });
          setLocation(address);
          setInputLocation(address);
        } else {
          setLocation("Current Location");
          setInputLocation("Current Location");
        }
        setIsLoadingLocation(false);
      });
    }
  }, [locationPath.pathname]);

  return (
    <LoadScriptNext
      googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg"
      libraries={libraries}
    >
      <Box width="100" padding="18px" className="bg-white rounded-3 mt-3 pb-3">
        <Form
          className="h-100 d-flex flex-md-row flex-column align-items-center justify-content-between w-100"
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
            <Autocomplete
              className="w-100"
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <InputGroup className="search-bar border-search-md w-100">
                <InputGroup.Text
                  className="bg-white border-0 p-2"
                  id="basic-addon1"
                >
                  <FaLocationCrosshairs color="#06312E" size={20} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="city, state or zip"
                  aria-label="Location"
                  aria-describedby="basic-addon1"
                  className="py-2"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                  onKeyPress={handleLocationKeyPress}
                />
                {isLoadingLocation && <LoaderCenter />}
              </InputGroup>
            </Autocomplete>
          </div>
          <div className="ms-1">
            <GenericButton
              type="submit"
              width="138px"
              height="48px"
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <IoSearch size={20} />
              Search
            </GenericButton>
          </div>
        </Form>
      </Box>
    </LoadScriptNext>
  );
};

export default SearchForm;
