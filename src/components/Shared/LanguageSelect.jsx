import React from 'react'
import { GenericSelect } from '../GenericComponents'
import FlagSVG from "../../assets/SVGs/Flag"

const LanguageSelect = () => {
  return (
    <div>
      <GenericSelect
        minWidth="120px"
        borderColor="transparent"
        bgcolor="transparent"
        placeholder="English"
        placeholderColor="#333333"
        iconColor="#06312E"
        menuPlacement="auto"
        imageComponent={<FlagSVG />}
        options={[
          {
            label: "English",
            value: "EN",
          },
          {
            label: "Spanish",
            value: "Es",
          },
          {
            label: "French",
            value: "Fr",
          },
        ]}
      />
    </div>
  )
}

export default LanguageSelect