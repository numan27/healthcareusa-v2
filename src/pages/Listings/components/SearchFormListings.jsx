import { Form, InputGroup, Row, Col } from "react-bootstrap";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";
import RangeSlider from "./RangeSlider";
import { LoaderCenter } from "../../../assets/Loader";
import SearchIcon from "../../../assets/SVGs/Search";
import SquareMenu from "../../../assets/SVGs/SquareMenu";
import {
  GenericButton,
  Typography,
} from "../../../components/GenericComponents";

const SearchFormListings = ({
  handleFormSubmit,
  searchKeywordsState,
  setSearchKeywordsState,
  handleResetSearch,
  locationState,
  setLocationState,
  handleResetLocation,
  isLoadingLocation,
  areaRange,
  setAreaRange,
  onLoad,
  onPlaceChanged,
}) => {
  return (
    <Form className="h-100 p-1" autoComplete="off" onSubmit={handleFormSubmit}>
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
            onChange={(value) => setAreaRange(value)}
            disabled={!locationState || locationState.length === 0}
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
              className=""
              value={searchKeywordsState}
              onChange={(e) => setSearchKeywordsState(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleFormSubmit(e);
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
                  className="py-2"
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
          </div>
          <div className="ms-1">
            <GenericButton type="submit" width="50px" height="50px" padding="0">
              <SearchIcon />
            </GenericButton>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFormListings;