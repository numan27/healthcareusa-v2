import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

import {
  GenericSelect,
  Typography,
} from "../../../components/GenericComponents";

const OperationalHours = ({ formData, setFormData }) => {
  const { weeklySchedule = [] } = formData;

  const days = [
    { id: "1", label: "Monday", value: "monday" },
    { id: "2", label: "Tuesday", value: "tuesday" },
    { id: "3", label: "Wednesday", value: "wednesday" },
    { id: "4", label: "Thursday", value: "thursday" },
    { id: "5", label: "Friday", value: "friday" },
    { id: "6", label: "Saturday", value: "saturday" },
    { id: "7", label: "Sunday", value: "sunday" },
  ];

  const timeSlots = [
    { id: "1", label: "9:00 AM", value: "9:00 AM" },
    { id: "2", label: "10:00 AM", value: "10:00 AM" },
    { id: "3", label: "11:00 AM", value: "11:00 AM" },
    { id: "4", label: "12:00 PM", value: "12:00 PM" },
    { id: "5", label: "1:00 PM", value: "1:00 PM" },
    { id: "6", label: "2:00 PM", value: "2:00 PM" },
    { id: "7", label: "3:00 PM", value: "3:00 PM" },
    { id: "8", label: "4:00 PM", value: "4:00 PM" },
    { id: "9", label: "5:00 PM", value: "5:00 PM" },
  ];

  const addRow = () => {
    const newSchedule = [
      ...weeklySchedule,
      { day: "", openingTime: "", closingTime: "" },
    ];
    setFormData({ ...formData, weeklySchedule: newSchedule });
  };

  const removeRow = (index) => {
    const newSchedule = [...weeklySchedule];
    newSchedule.splice(index, 1);
    setFormData({ ...formData, weeklySchedule: newSchedule });
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData({ ...formData, weeklySchedule: newSchedule });
  };

  return (
    <div className="">
      <Typography
        weight="600"
        align="center"
        color="#070026"
        size="24px"
        font="Inter"
        lineHeight="36px"
      >
        Operational Hours
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Provide the details about the property's operational hours
      </Typography>
      <Form className="mt-5">
        {weeklySchedule.map((schedule, index) => (
          <Row key={index} className="mb-4 d-flex align-items-end">
            <Col md={4} className="pe-md-0 mb-md-0 mb-3">
              {index === 0 && <Form.Label className="fw-bold">Day</Form.Label>}
              <GenericSelect
                minWidth="120px"
                minheight="34px"
                borderColor="#EEF0F5"
                borderRadius="4px"
                bgcolor="#F8F9FC"
                placeholder="Select Day"
                placeholderColor="#333333"
                iconColor="#06312E"
                menuPlacement="auto"
                value={days.find((day) => day.value === schedule.day) || null}
                onChange={(option) =>
                  handleScheduleChange(index, "day", option.value)
                }
                options={days}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </Col>
            <Col md={3} className="pe-md-0 mb-md-0 mb-3">
              {index === 0 && (
                <Form.Label className="fw-bold">Opening Time</Form.Label>
              )}
              <GenericSelect
                minWidth="120px"
                minheight="34px"
                borderColor="#EEF0F5"
                borderRadius="4px"
                bgcolor="#F8F9FC"
                placeholder="9:00 AM"
                placeholderColor="#333333"
                iconColor="#06312E"
                menuPlacement="auto"
                value={
                  timeSlots.find(
                    (slot) => slot.value === schedule.openingTime
                  ) || null
                }
                onChange={(option) =>
                  handleScheduleChange(index, "openingTime", option.value)
                }
                options={timeSlots}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </Col>
            <Col md={3} className="pe-md-0 mb-md-0 mb-3">
              {index === 0 && (
                <Form.Label className="fw-bold">Closing Time</Form.Label>
              )}
              <GenericSelect
                minWidth="120px"
                minheight="34px"
                borderColor="#EEF0F5"
                borderRadius="4px"
                bgcolor="#F8F9FC"
                placeholder="5:00 PM"
                placeholderColor="#333333"
                iconColor="#06312E"
                menuPlacement="auto"
                value={
                  timeSlots.find(
                    (slot) => slot.value === schedule.closingTime
                  ) || null
                }
                onChange={(option) =>
                  handleScheduleChange(index, "closingTime", option.value)
                }
                options={timeSlots}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </Col>
            {index === weeklySchedule.length - 1 && (
              <Col
                xs={2}
                className="d-flex align-items-center justify-content-start"
              >
                <CiSquareMinus
                  className="cursor-pointer"
                  size={30}
                  color="#CFCFCF"
                  onClick={() => removeRow(index)}
                />
                <CiSquarePlus
                  className="cursor-pointer"
                  size={30}
                  color="#00C1B6"
                  onClick={() => addRow()}
                />
              </Col>
            )}
          </Row>
        ))}

        {weeklySchedule.length === 0 && (
          <Row className="mb-4 align-items-center">
            <Col md={3} className="text-center">
              <CiSquarePlus
                className="cursor-pointer"
                size={30}
                color="#00C1B6"
                onClick={() => addRow()}
              />
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

OperationalHours.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default OperationalHours;
