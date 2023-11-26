import styled from "styled-components";
import { mobileLandScape, tablet } from "../../styles/responsive";

export const BarContainer = styled.div`
display: flex;
align-items:center;
background-color:${props => props.theme.component};
padding:1rem;



`


export const SearchBarDiv = styled.form`
width:60%;

${tablet({
  width:"50%"
})}

${mobileLandScape({
  width:"45%"
})}
`

export const Search = styled.input`
width:100%;
outline:none;
background-color:${props => props.theme.background};
outline:none;
padding:.8rem 1rem;
font-size:1.6rem;
color:${props => props.theme.text};
border:1px solid ${props => props.theme.border};
`

export const FilterDiv = styled.div`

display: flex;
width:40%;
justify-content:space-between;
align-items:center;
`


export const ViewDiv = styled.div`
margin-left:2rem;
display: flex;
gap:1rem;
${tablet({
  gap:".3rem"
})}

`

export const SelectDiv = styled.div``


export const Select = styled.select`

outline:none;
background-color:${props => props.theme.background};
border:1px solid ${props => props.theme.border};
font-size:1.6rem;
padding:.8rem 1rem;
color:${props => props.theme.text};
${tablet({
  fontSize:"1.2rem"
})}


`


export const Options = styled.option`


`



export const IconButton = styled.div`

  background: ${props => props.theme.background};
  padding:.5rem 1rem;
  display: flex;
  align-items:center;
  justify-content:center;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color:${props => props.highlight === 'yes' ? `${props.theme.specialText}` : null};
  
`;
