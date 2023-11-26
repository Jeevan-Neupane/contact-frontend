import { useForm } from "react-hook-form";
import {
  Button,
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
  RadioButton,
  RadioButtonGroup,
  RadioButtonLabel,
} from "./style";
import {
  useEditContactMutation,
  usePostContactMutation,
} from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { addContact, saveEditContact } from "../../store/slice/contactSlice";
import LoadingButton from "../loading/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";

const ContactAddForm = ({ editContact }) => {
  const { pathname } = useLocation();
  const editPathname = pathname.slice(1);
  const editPath = editPathname.split("/");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: editContact?.firstName || "",
      middleName: editContact?.middleName || "",
      lastName: editContact?.lastName || "",
      gender: editContact?.gender || "",
      phone: editContact?.phone || "",
    },
  });
  const navigate = useNavigate();

  const [postContact, status] = usePostContactMutation();
  const [editContactApi, editStatus] = useEditContactMutation();
  const dispatch = useDispatch();
  const { data, isLoading, error } = status;
  const {
    data: editData,
    isLoading: editLoading,
    error: editError,
  } = editStatus;

  const token = useSelector((state) => state.user.token);

  const onSubmit = (data) => {
    if (editContact) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,

        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        background: "#001e2b",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          editContactApi({ token, id: editContact._id, editInfo: data });
        }
      });
    } else {
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not logged in",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: "#001e2b",
          color: "#fff",
        });
      } else {
        postContact({ contactData: data, token });
      }
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(addContact(data.person));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contact is added successfully",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });

      reset();

      const element = document.getElementById("allContacts");

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data.message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });
    }
  }, [data, error]);
  useEffect(() => {
    if (editData) {
      dispatch(saveEditContact(editData.person));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contact is edited successfully",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });
      navigate("/");
    }

    if (editError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: editError.data.message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });
    }
  }, [editData, editError]);
  console.log(editPath);
  return (
    <FormContainer>
      {editPath[0] === "edit" ? null : <h1>Add Contact</h1>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Middle Name</Label>
          <Input {...register("middleName", { required: false })} />
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Gender</Label>
          <RadioButtonGroup>
            <RadioButtonLabel>
              <RadioButton
                type='radio'
                value='male'
                {...register("gender", { required: "Gender is required" })}
              />
              Male
            </RadioButtonLabel>
            <RadioButtonLabel>
              <RadioButton
                type='radio'
                value='female'
                {...register("gender", { required: "Gender is required" })}
              />
              Female
            </RadioButtonLabel>
            <RadioButtonLabel>
              <RadioButton
                type='radio'
                value='other'
                {...register("gender", { required: "Gender is required" })}
              />
              Other
            </RadioButtonLabel>
          </RadioButtonGroup>
          {errors.gender && (
            <ErrorMessage>{errors.gender.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </FormGroup>

        <Button type='submit'>
          {isLoading || editLoading ? (
            <LoadingButton />
          ) : editContact ? (
            "Edit"
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ContactAddForm;
