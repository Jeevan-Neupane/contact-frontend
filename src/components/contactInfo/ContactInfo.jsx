import { useDispatch, useSelector } from "react-redux";
import {
  addEditContact,
  removeContact,
  searchProducts,
  setSearchQuery,
  useDeleteContactsMutation,
} from "../../store/store";
import {
  ContactContainer,
  ContactField,
  ContactInfoDetails,
  ContactInfoDiv,
  ContactName,
  DeleteIcon,
  EditIcon,
  GenderIcon,
  GridContactInfoDetails,
  GridIconContainer,
  GridViewContainer,
  IconsContainer,
} from "./style";


import { useEffect } from "react";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import BoyPhoto from "./boyPhoto";
import GirlPhoto from "./GirlPhoto";

const ContactInfo = ({ user }) => {
  const token = useSelector((state) => state.user.token);
  const view = useSelector((state) => state.contacts.view);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteContacts, status] = useDeleteContactsMutation();

  const {
    isLoading: deleteLoading,
    error: DeleteError,
    data: deleteData,
  } = status;
  const onEdit = () => {
    dispatch(addEditContact(user));
    navigate(`edit/${user._id}`);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3498db",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#001e2b",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContacts({ token, id: user._id });
      }
    });
  };

  useEffect(() => {
    if (DeleteError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: DeleteError.data.message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });
    }

    if (deleteData) {
      dispatch(removeContact(user._id));
      dispatch(setSearchQuery(""));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });
    }
  }, [DeleteError, deleteData]);
  

  return (
    <>
      {view === "list" ? (
        <ContactContainer>
          <ContactInfoDetails>
            <GenderIcon>
              {user.gender === "male" ? <BoyPhoto /> : <GirlPhoto />}
            </GenderIcon>
            <ContactInfoDiv>
              <ContactName>{`${user.firstName} ${
                user.middleName ? user.middleName + " " : ""
              }${user.lastName}`}</ContactName>
              <ContactField>{` ${user.gender}`}</ContactField>
              <ContactField>{`${user.phone}`}</ContactField>
            </ContactInfoDiv>
          </ContactInfoDetails>

          <IconsContainer>
            <EditIcon onClick={onEdit} />
            {deleteLoading ? <Loading /> : <DeleteIcon onClick={onDelete} />}
          </IconsContainer>
        </ContactContainer>
      ) : (
        <GridViewContainer>
          <GridContactInfoDetails>
            <GenderIcon>
              {user.gender === "male" ? <BoyPhoto /> : <GirlPhoto />}
            </GenderIcon>
            <ContactInfoDiv>
              <ContactName>{`${user.firstName} ${
                user.middleName ? user.middleName + " " : ""
              }${user.lastName}`}</ContactName>
              <ContactField>{` ${user.gender}`}</ContactField>
              <ContactField>{`${user.phone}`}</ContactField>
            </ContactInfoDiv>
          </GridContactInfoDetails>

          <GridIconContainer>
            <EditIcon onClick={onEdit} />
            {deleteLoading ? <Loading /> : <DeleteIcon onClick={onDelete} />}
          </GridIconContainer>
        </GridViewContainer>
      )}
    </>
  );
};

export default ContactInfo;
