import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { tabletLandScape } from '../../styles/responsive';

export const ContactContainer = styled.div`
  border: 1px solid ${props => props.theme.border};
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:${props => props.theme.component};
  
`;

export const ContactInfoDetails = styled.div`
  flex: 1;
  display: flex;
  align-items:center;
  gap:2rem;
`;

export const ContactName = styled.h3`
  margin: 0;
  font-size:2rem;
  color:${props => props.theme.specialText};
`;

export const ContactField = styled.p`
  margin: .5rem 0;
  font-size:1.6rem;
  color:${props => props.theme.link};
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  font-size:2rem;
`;

export const EditIcon = styled(FaEdit)`
  cursor: pointer;
`;

export const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
`;

export const GenderIcon = styled.div`
  margin-right: .5rem;
  font-size:4rem;
  color:${props => props.theme.active};
`;

export const ContactInfoDiv = styled.div`

`

export const GridViewContainer = styled.div`
display:flex;
flex-direction:column;
 
  border: 1px solid ${props => props.theme.border}; 

  padding:1rem 2rem;
height:22rem;
${tabletLandScape({
  height:"25rem",
})}
`

export const GridContactInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
`

export const GridIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size:2rem;
  margin-top:1rem;
  gap:1rem;
  
`

export const ImageDiv = styled.div`
width:5rem;
height:7rem;
`

export const Image = styled.img`
width:100%;
height:100%;
`