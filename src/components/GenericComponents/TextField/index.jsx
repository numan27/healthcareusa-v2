import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import Typography from "../Typography";
import GenericButton from "../Button";

const StyledInput = styled(FormControl)`
  background: ${(props) =>
    props.background ? props.background : "#F4F5F7"} !important;
  border: ${(props) => props.border} !important;
  margin-bottom: 12px;
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "#B2BAC0"};
  min-width: ${(props) => props.minWidth};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.fontWeight};
  padding: ${(props) => props.padding};
  outline: 0px;
  &:focus {
    border-color: #00ada2;
    outline: 1px solid #00ada2;
    box-shadow: none !important;
  }
  &:hover {
    border-color: #b2bac0 !important;
  }
  &::placeholder {
    font-size: ${(props) =>
      props.placeholderTextSize
        ? props.placeholderTextSize
        : "14px"} !important;
    color: ${(props) => props.placeHolderColor} !important;
    font-family: Plus Jakarta Sans;
  }
`;

const StyledLabel = styled(FormLabel)`
  color: #23262f;
  font-size: 14px;
  line-height: 21px;
  font-weight: ${(props) => (props.labelWeight ? props.labelWeight : "400")};
  font-family: Plus Jakarta Sans;
`;

const Tag = styled.span`
  background-color: #00ada2;
  color: white;
  padding: 0.25em 0.5em;
  margin: 8px 5px 0 0;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;

  .selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .selected-item {
    background-color: #e0e0e0 !important;
    color: #23262f !important;
    border-radius: 12px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    border-radius: 4px;
  }

  .selected-item span {
    margin-right: 4px;
    font-size: 14px !important;
  }

  .selected-item svg {
    cursor: pointer;
  }
`;

export default function GenericInput({
  label,
  type,
  labelWeight,
  enableSmallText,
  smallText,
  enableTagInput,
  onFileChange,
  onTagsChange,
  ...props
}) {
  const isFileInput = type === "file";

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (enableTagInput && onTagsChange) {
      onTagsChange(tags); // Call onTagsChange whenever tags change
    }
  }, [tags]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      if (onTagsChange) {
        onTagsChange([...tags, inputValue.trim()]); // Call onTagsChange with updated tags
      }
    }
  };

  const handleAddTag = () => {
    if (inputValue.trim()) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue("");
      if (onTagsChange) {
        onTagsChange(newTags); // Call onTagsChange with updated tags
      }
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    if (onTagsChange) {
      onTagsChange(newTags); // Call onTagsChange with updated tags
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <StyledLabel labelWeight={labelWeight}>{label}</StyledLabel>
        {enableSmallText && (
          <Typography
            color="#111B2B"
            weight="400"
            size="12px"
            as="span"
            lineHeight="16px"
            className="mb-2"
          >
            {smallText}
          </Typography>
        )}
      </div>
      {isFileInput ? (
        <StyledInput
          {...props}
          type="file"
          name={props.name}
          onChange={onFileChange}
          className={props.className}
          ref={props.inputRef}
        />
      ) : (
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {enableTagInput ? (
            <>
              <StyledInput
                {...props}
                type={type}
                defaultValue={props.defaultValue}
                value={inputValue}
                placeholder={props.placeholder}
                name={props.name}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={enableTagInput ? handleKeyDown : null}
                className={props.className}
                ref={props.inputRef}
              />
              <GenericButton
                height="30px"
                width="50px"
                onClick={handleAddTag}
                style={{ position: "absolute", right: 5, top: 5 }}
              >
                Add
              </GenericButton>
            </>
          ) : (
            <StyledInput
              {...props}
              type={type}
              defaultValue={props.defaultValue}
              value={props.value}
              placeholder={props.placeholder}
              name={props.name}
              onChange={props.onChange}
              onKeyDown={enableTagInput ? handleKeyDown : null}
              className={props.className}
              ref={props.inputRef}
            />
          )}
        </div>
      )}
      {enableTagInput && (
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag className="selected-item" key={index}>
              <span>{tag}</span>
              <FaTimes
                color="#23262f"
                size="16px"
                onClick={() => handleRemoveTag(index)}
              />
            </Tag>
          ))}
        </TagContainer>
      )}
    </>
  );
}

GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  placeholder: PropTypes.string,
  placeHolderColor: PropTypes.string,
  className: PropTypes.string,
  labelWeight: PropTypes.string,
  onClick: PropTypes.func,
  enableSmallText: PropTypes.bool,
  enableTagInput: PropTypes.bool,
  smallText: PropTypes.string,
  icon: PropTypes.node,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  onFileChange: PropTypes.func,
  onTagsChange: PropTypes.func,
};

GenericInput.defaultProps = {
  type: "text",
  name: "",
  inputRef: () => {},
  placeholder: "Enter Text Here",
  placeHolderColor: "#64666C",
  borderRadius: "4px",
  padding: "10px",
  labelWeight: "400",
  enableSmallText: false,
  enableTagInput: false,
  smallText: "",
  height: "",
  background: "",
  className: "",
  onClick: () => {},
  icon: null,
  defaultValue: "",
  onChange: () => {},
  value: null,
  onFileChange: () => {},
  onTagsChange: () => {},
};
