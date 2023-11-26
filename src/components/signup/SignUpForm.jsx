import { useForm } from "react-hook-form";
import {
  Button,
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
} from "./style";
import {
  setToken,
  setTokenLocalStorage,
  useRegisterUserMutation,
} from "../../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import LoadingButton from "../loading/LoadingButton";
import { useNavigate } from "react-router-dom";
import { LoginHeading } from "../login/style";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [registerUser, status] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = status;

  const onSubmit = (data) => {
    registerUser(data);
  };
  useEffect(() => {
    if (data?.token) {
      dispatch(setToken(data.token));
      dispatch(setTokenLocalStorage(data.token));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "you are logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    }

    if (error?.data) {
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

  const password = watch("password", "");
  return (
    <FormContainer>
      <LoginHeading>Sign Up </LoginHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type='password'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Re-enter Password</Label>
          <Input
            type='password'
            {...register("password_confirmation", {
              required: "Please re-enter your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </FormGroup>

        <Button type='submit'>
          {isLoading ? <LoadingButton /> : "Register"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default SignupForm;

/*
status:

{

  requestId: 'nP0HEJzI113h3v-wLrFjE',

  status: 'fulfilled',

  endpointName: 'loginUser',

  startedTimeStamp: 1700824774136,

  data: {

    token: 

      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA1MzY4NWY1NjNmOGE1MzJhZjkwMyIsImlhdCI6MTcwMDgyNDc3NCwiZXhwIjoxNzAzNDE2Nzc0fQ.GkfhGAsQOZ_wBenC2GIpYciH-6Rsd9w83yMfnEgjjSU'

  },

 error: { status: 404, data: { message: 'User Doesn\'t exist' } },

    error: { status: 404, data: { message: 'Password is incorrect' } },

  fulfilledTimeStamp: 1700824774358,

  isUninitialized: false,

  isLoading: false,

  isSuccess: true,

  isError: false,

  originalArgs: { email: 'jeevan@gmail.com', password: 'jeevan123' }

}
*/
