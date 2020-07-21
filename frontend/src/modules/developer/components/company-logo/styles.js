import styled from "styled-components";
import { Image } from "semantic-ui-react";

export const StyledCoverImage = styled(Image)`
  &&& {
    box-shadow: 0 0 0 1px darkgrey;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
