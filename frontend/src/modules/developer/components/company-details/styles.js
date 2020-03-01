import styled from "styled-components";

export const Description = styled.div`
  margin-top: 20px;
  text-align: justify;
  font-size: 15px;
  line-height: 1.65rem;
  font-family: Lato, sans-serif;
  &:after {
    cursor: pointer;
    position: absolute;
    bottom: -16px;
    left: 14px;
    color: white;
  }
  ${props =>
    props.state == "more" && props.length > 20 &&
    `height:95px;
     overflow: hidden;
     &:after {
        content: "...more.";
     }`}

  ${props =>
    props.state == "less" && props.length > 20 &&
    props.length > 20 &&
    `&:after {
        content: "...less.";
     }`}
`;

export const LogoWrapper = styled.div`
  width: 250px;
  text-align: justify-content;
`;
