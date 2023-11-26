import styled from "styled-components"
export const NoContactsDiv = styled.div`

height:40rem;
width:100%;
display: flex;
align-items:center;
justify-content:center;
background-color:${props => props.theme.component};
`

export const NoContactsText = styled.h2`
font-size:3rem;
color:${props => props.theme.otherText};
`