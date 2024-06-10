import PropTypes from "prop-types";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FiChevronDown, FiX } from "react-icons/fi";

function CustomMultiSelect({
  options,
  errors,
  // register,
  setValue,
  registerName,
  // triggerValue,
  selectedValue,
  setSelectedValue,
  placeholder,
  // registerRequire
}) {
  const [openOptions, setOpenOptions] = useState(false);

  // Function to clear the selected value
  const clearSelection = () => {
    setSelectedValue([]);
    // triggerValue(registerName);
  };

  const handleDelete = (chipToDelete) => {
    setSelectedValue((chips) =>
      chips.filter((chip) => chip.value !== chipToDelete.value),
    );
  };

  return (
    <>
      <div
        className={`mui-select-search ${
          selectedValue?.length !== 0 && "multi-selected-value"
        }`}
      >
        <Autocomplete
          multiple
          id="multiSelectError"
          options={options}
          value={selectedValue}
          open={openOptions} // Set open state to control the dropdown
          onOpen={() => setOpenOptions(true)} // Handle dropdown opening
          onClose={() => setOpenOptions(false)} // Handle dropdown closing
          onChange={(event, newValue) => {
            if (newValue) {
              setSelectedValue(newValue);
              setValue(registerName, newValue);
              // triggerValue(registerName);
            }
          }}
          onInput={(e) => {
            if (e.target.value.charAt(0) === " ") {
              e.target.value = e.target.value.trimStart();
            }
          }}
          renderTags={(value, getTagProps) => (
            <Tags value={value} {...getTagProps} handleDelete={handleDelete} />
          )}
          style={{
            borderColor: selectedValue?.length === 0 && errors && "#E93535",
            border:
              selectedValue?.length === 0 && errors && "1px solid #E93535",
            borderRadius: selectedValue?.length === 0 && errors && "4px",
          }}
          sx={{ width: "100%" }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
              className="mui-multi-select"
              InputLabelProps={{
                shrink: false,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {selectedValue?.length !== 0 && ( // Show the clear icon if a value is selected
                      <FiX
                        style={{ color: "#343a40", cursor: "pointer" }}
                        onClick={clearSelection}
                      />
                    )}
                    <FiChevronDown
                      style={{ color: "#343a40", cursor: "pointer" }}
                      onClick={() => setOpenOptions(!openOptions)} // Handle click to toggle dropdown
                    />
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} style={{ listStyle: "none" }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    !selectedValue.some((test) => test.value === option.value)
                  ) {
                    setSelectedValue([...selectedValue, option?.value]);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Space") {
                    if (
                      !selectedValue.some((test) => test.value === option.value)
                    ) {
                      setSelectedValue([...selectedValue, option?.value]);
                    }
                  }
                }}
                tabIndex={0}
                role="button"
              >
                {option?.label}
              </span>
            </li>
          )}
        />
      </div>
      <input
        hidden
        value={selectedValue}
        name={registerName}
        // {...register(registerName, {
        //   required: registerRequire,
        // })}
      />
    </>
  );
}

export default CustomMultiSelect;

CustomMultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
  // triggerValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object,
  selectedValue: PropTypes.string.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  registerName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  registerRequire: PropTypes.bool,
};

CustomMultiSelect.defaultProps = {
  errors: "",
  placeholder: "Select",
  registerRequire: true,
};

function Tags({ value, handleDelete, ...rest }) {
  const [val1] = value;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getLabel = useMemo(() => {
    if (val1.label.length > 15) {
      return `${val1.label.slice(0, 15)}...`;
    }
    return val1.label;
  }, [val1]);

  return (
    <div className="d-flex gap-2 flex-wrap" style={{ margin: "3px" }}>
      {val1 && (
        <Chip {...rest} label={getLabel} onDelete={() => handleDelete(val1)} />
      )}
      {value.length > 1 && (
        <>
          <Button aria-describedby={id} onClick={handleClick}>
            <Typography variant="body2">+{value.length - 1}</Typography>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {/* <div className="d-flex flex-wrap p-4 gap-3 multiSelect-popover">
              {other.map((option) => (
                <Chip
                  {...rest}
                  label={option.label}
                  onDelete={() => handleDelete(option)}
                />
              ))}
            </div> */}
          </Popover>
        </>
      )}
    </div>
  );
}

Tags.propTypes = {
  value: PropTypes.array.isRequired,
  rest: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
};

Tags.defaultProps = {
  rest: {},
};
