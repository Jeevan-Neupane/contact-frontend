import styled from "styled-components";

export const AllContactsContainerDiv = styled.div`


`

export const AllContactsDiv = styled.div`
margin-top:2rem;


display:${props => props.view !== "list" ? "grid" : ""};

gap:2rem;
grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

`


export const TopHeader = styled.div`
position:sticky;
top:60px;
border:1px solid ${props => props.theme.border};

`