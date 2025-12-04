import { CSSValues } from "@/lib/styles/globalStyles";
import styled from "styled-components";

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'bg', 'noMobile', 'onlyMobile'].includes(prop),
})<CSSValues>`
  display: grid;
`;
