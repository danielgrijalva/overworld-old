import styled from "styled-components";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

export const StyledCoverImage = styled(Image)`
  &&& {
    box-shadow: 0 0 0 1px rgb(48, 56, 64);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImageLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
  transition: background-color, border-color 0.2s linear;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    transition: border 0.1s linear;
    border-radius: 0.3125rem;
  }

  &:hover:after,
  &:focus:after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid #40bcf4;
  }
`;

export const CoverWrapper = styled.div`
  width: ${props => wrapperSizes[props.size].default.width};
  height: ${props => wrapperSizes[props.size].default.height};

  /* if the covers are small (e.g. for the profile page), 
  add the following styles as well */
  ${props =>
    props.size === "small" &&
    `
    text-align: center;
    display: inline-block;
    margin: 0 1.25rem 0 0;
    &:last-child {
      margin: 0;
    }
  `}

  @media only screen and (max-width: 991px) and (min-width: 320px) {
    width: ${props => wrapperSizes[props.size].smallScreen.width};
    height: ${props => wrapperSizes[props.size].smallScreen.height};
  }

  @media only screen and (max-width: 1199px) and (min-width: 992px) {
    width: ${props => wrapperSizes[props.size].mediumScreen.width};
    height: ${props => wrapperSizes[props.size].mediumScreen.height};
  }
`;

const wrapperSizes = {
  tiny: {
    default: {
      width: "100px",
      height: "142.2px"
    }
  },
  small: {
    default: {
      width: "135px",
      height: "192px"
    },
    smallScreen: {
      width: "79px",
      height: "112.35px"
    },
    mediumScreen: {
      width: "108px",
      height: "153.6px"
    }
  },
  big: {
    default: {
      width: "245px",
      height: "347.05px"
    },
    smallScreen: {
      width: "165px",
      height: "233.75px"
    },
    mediumScreen: {
      width: "212px",
      height: "300.3px"
    }
  }
};
