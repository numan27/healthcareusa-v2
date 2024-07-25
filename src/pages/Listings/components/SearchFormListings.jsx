import { useEffect } from "react";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
import {
  Box,
  GenericButton,
  Typography,
} from "../../../components/GenericComponents";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import SearchIcon from "../../../assets/SVGs/Search";
import { Autocomplete } from "@react-google-maps/api";
import RangeSlider from "./RangeSlider";
import DropdownFilter from "./DropdownFilters";
import { LoaderCenter } from "../../../assets/Loader";
import SquareMenu from "../../../assets/SVGs/SquareMenu";

const SearchFormListings = ({
  areaRange,
  setAreaRange,
  searchKeywordsState,
  setSearchKeywordsState,
  locationState,
  setLocationState,
  placeState,
  handleFormSubmit,
  setPlaceState,
  selectedOptions,
  setSelectedOptions,
  handleSearch,
  loading,
  isLoadingLocation,
  onLoad,
  onPlaceChanged,
  handleResetLocation,
  handleResetSearch,
}) => {
  const debouncedHandleSearch = (keywords) => {
    handleSearch({
      searchKeywordsState: keywords,
      areaRange,
      place: placeState,
      currentPage: 0,
    });
  };

  const handleSearchKeywordsChange = (e) => {
    console.log(e.target.value);
    setSearchKeywordsState(e.target.value);
  };

  useEffect(() => {
    handleSearch({
      searchKeywordsState: searchKeywordsState,
      areaRange,
      place: placeState,
      currentPage: 0,
    });
  }, [areaRange, placeState]);

  return (
    <>
      <Box
        border="1px solid #E4E4E4"
        radius="8px"
        className="custom-shadow-2 py-3 px-3 w-100"
      >
        <Form
          className="h-100 p-1"
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <Row className="d-flex align-items-center pt-3">
            <Col
              md={4}
              className="d-flex align-items-center gap-2 pe-4 mb-md-0 mb-2"
            >
              <Typography
                className="text-nowrap mt-2"
                as="span"
                color="#00C1B6"
                weight="700"
                lineHeight="18px"
              >
                Near Me
              </Typography>
              <RangeSlider
                className="mt-3"
                defaultValue={areaRange}
                min={0}
                max={500}
                step={1}
                value={areaRange}
                onChange={setAreaRange}
              />
            </Col>
            <Col
              md={4}
              className="d-flex align-items-center section-responsive-border h-100 mb-md-3 mb-2"
            >
              <InputGroup className="search-bar">
                <InputGroup.Text
                  className="bg-white border-0 p-2"
                  id="basic-addon1"
                >
                  <SquareMenu />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Key words or company"
                  aria-label="Search Keywords"
                  aria-describedby="basic-addon1"
                  value={searchKeywordsState}
                  onChange={handleSearchKeywordsChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
                {searchKeywordsState && (
                  <InputGroup.Text
                    onClick={handleResetSearch}
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <FaTimes />
                  </InputGroup.Text>
                )}
              </InputGroup>
            </Col>
            <Col md={4} className="d-flex align-items-center mb-md-3 mb-2">
              <div className="d-flex align-items-center w-100">
                {window.google && (
                  <Autocomplete
                    className="w-100"
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <InputGroup className="search-bar w-100">
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
                        value={locationState}
                        onChange={(e) => setLocationState(e.target.value)}
                      />
                      {locationState && (
                        <InputGroup.Text
                          onClick={handleResetLocation}
                          style={{
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                          }}
                        >
                          <FaTimes />
                        </InputGroup.Text>
                      )}
                      {isLoadingLocation && <LoaderCenter />}
                    </InputGroup>
                  </Autocomplete>
                )}
              </div>
              <div className="ms-1">
                <GenericButton
                  type="submit"
                  width="50px"
                  height="50px"
                  padding="0"
                >
                  <SearchIcon />
                </GenericButton>
              </div>
            </Col>
          </Row>
        </Form>
      </Box>
      <DropdownFilter
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
      />
    </>
  );
};

export default SearchFormListings;
