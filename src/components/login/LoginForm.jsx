import { useForm } from "react-hook-form";
import {
  Button,
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
  LoginHeading,
} from "./style";
import { setToken, setTokenLocalStorage, useGetUserQuery, useLoginUserMutation } from "../../store/store";
import { useEffect } from "react";
import Swal from "sweetalert2";
import LoadingButton from "../loading/LoadingButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userLogin, status] = useLoginUserMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { data, error, isLoading } = status;

  const onSubmit = (data) => {
    userLogin(data);
  };
  useEffect(() => {
    if (data?.token) {
      dispatch(setToken(data.token));
      dispatch(setTokenLocalStorage(data.token));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are logged in successfully",
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

  return (
    <FormContainer>
      <LoginHeading>Login </LoginHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type='submit'>{isLoading ? <LoadingButton /> : "Login"}</Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
