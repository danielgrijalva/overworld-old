import React, { useState } from "react";
import CompanyLogo from "./";
import { Description, LogoWrapper } from "./styles";
import { CoverLoader } from "../../../app/components";

const CompanyDetails = ({company}) => {
  const [descToggle, setDescToggle] = useState("more");

  const descToggleClick = e => {
    const span = document.querySelector("#desctest");

    if (e.nativeEvent.offsetY > span.offsetHeight) {
      descToggle == "more" ? setDescToggle("less") : setDescToggle("more");
    }
  };

  const getDate = date => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const d = new Date(date * 1000);
    return monthNames[d.getMonth()] + " " + d.getFullYear();
  };

  return Object.keys(company).length > 0 ? (
    <LogoWrapper>
      {/* <CompanyLogo imageId={"hcbqwbhbmrabsfk600zs"} /> */}
      {company.start_date && <h3>Founded: {getDate(company.start_date)}</h3>}
      <Description
        id="desctest"
        state={descToggle}
        length={company.description ? company.description.length : 0}
        onClick={descToggleClick}
      >
        {company.description}
      </Description>
    </LogoWrapper>
  ) : (
    <CoverLoader
      rows={2}
      columns={1}
      coverHeight={10}
      coverWidth={10}
      padding={3}
    />
  );
};

export default CompanyDetails;
