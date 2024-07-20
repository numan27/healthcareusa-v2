import { useEffect, useState, useCallback } from "react";
import { GenericSelect } from "../../../components/GenericComponents";

const DropdownFilter = ({ setSelectedOptions, selectedOptions }) => {
  const [dropdownOptions, setDropdownOptions] = useState({});

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch(
          "https://findhealthcare.com/wp-json/cubewp-forms/v1/get_form?post_type=listing&form_type=post_type"
        );
        const data = await response.json();

        console.log("Fetched data:", data);

        if (data && data.groups) {
          const fields = data.groups["112156535"].fields;
          const optionsMap = {};

          const dropdownLabels = [
            "Gender",
            "Languages",
            "Specialization",
          ];

          dropdownLabels.forEach((label) => {
            const field = fields.find((field) => field.label === label);
            if (field && field.options) {
              const options = JSON.parse(field.options);
              const parsedOptions = options.label
                .map((label, index) => ({
                  id: index,
                  label: label,
                  value: options.value[index],
                }))
                .filter((option) => option.label && option.label.trim() !== "");
              optionsMap[label] = parsedOptions;
            }
          });

          console.log("Dropdown Options:", optionsMap);
          setDropdownOptions(optionsMap);
        } else {
          console.error("No groups found in data");
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleDropdownOptions = useCallback(
    (label, selectedOption) => {
      setSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = [...prevSelectedOptions];
        const optionIndex = updatedOptions.findIndex(
          (option) => option.label === label
        );

        const values = selectedOption.map((item) => ({
          id: item.id,
          label: item.label,
          value: item.value,
        }));

        if (optionIndex >= 0) {
          if (values.length > 0) {
            updatedOptions[optionIndex] = { label, values };
          } else {
            updatedOptions.splice(optionIndex, 1); // Remove the option if no values are selected
          }
        } else if (values.length > 0) {
          updatedOptions.push({ label, values });
        }

        console.log("Updated selected options:", updatedOptions);
        return updatedOptions;
      });
    },
    [setSelectedOptions]
  );

  return (
    <div className="my-3 d-flex flex-wrap gap-2">
      {Object.keys(dropdownOptions).length === 0 ? (
        <p>No options available</p>
      ) : (
        Object.keys(dropdownOptions).map((label) => (
          <GenericSelect
            key={label}
            isMulti
            name={label}
            minWidth="120px"
            minHeight="34px"
            height="34px"
            borderColor="#EEF0F5"
            borderRadius="4px"
            bgcolor="#F8F9FC"
            placeholder={`Choose ${label}`}
            placeholderColor="#333333"
            iconColor="#06312E"
            menuPlacement="auto"
            options={dropdownOptions[label]}
            onSelect={(selectedOption) =>
              handleDropdownOptions(label, selectedOption)
            }
            value={
              selectedOptions.find((option) => option.label === label)
                ?.values || []
            }
          />
        ))
      )}
    </div>
  );
};

export default DropdownFilter;
