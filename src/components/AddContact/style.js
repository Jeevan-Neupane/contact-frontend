import styled from "styled-components";
import { tabletLandScape } from "../../styles/responsive";

export const AddContactDiv = styled.div`
position:fixed;
bottom:1rem;
right:1rem;
z-index:1000;
background-color:${props => props.theme.background};
border:1px solid ${props => props.theme.border};
padding:1rem;
cursor: pointer;

display:none;

${tabletLandScape({
    display: "block"
})}
`

export const AddIconDiv = styled.div`
font-size:3rem;

`