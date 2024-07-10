import { useRef, useCallback } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Form, InputGroup } from "react-bootstrap";
import { FaLocationCrosshairs } from "react-icons/fa6";

const AutoComplete = ({ location, setLocation, setPlace }) => {
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
      } else {
        setPlace(null);
        setLocation("");
      }
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <InputGroup className="search-bar border-search-md w-100">
        <InputGroup.Text className="bg-white border-0 p-2" id="basic-addon1">
          <FaLocationCrosshairs color="#06312E" size={20} />
        </InputGroup.Text>
        <Form.Control
          placeholder="city, state or zip"
          aria-label="Location"
          aria-describedby="basic-addon1"
          className="py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </InputGroup>
    </Autocomplete>
  );
};

export default AutoComplete;
