import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "@/store/slices/main";

export function SignIn() {
  const dispatch = useDispatch();
  return (
    <>
      <img
        src="/img/background.png"
        className="absolute inset-0 z-0 h-full w-full bg-gradient-to-tl from-cyan-500 to-blue-500 object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                console.log(values);
                dispatch(setLoading(true));
                setTimeout(() => {
                  dispatch(setLoading(false));
                  dispatch(
                    setAlert({
                      message: "Login Success",
                      type: "success",
                      show: true,
                    })
                  );
                }, 5000);
                return false;
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email Dibutuhkan")
                  .email("Email tidak valid"),
                password: Yup.string().required("Password is required"),
              })}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form className="space-y-3">
                  <Input
                    value={values.email}
                    error={errors.email && touched.email ? true : false}
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={
                      errors.email && touched.email ? errors.email : "Email"
                    }
                    size="lg"
                  />
                  <Input
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={
                      errors.password && touched.password
                        ? errors.password
                        : "Password"
                    }
                    size="lg"
                  />
                  <div className="-ml-2.5">
                    <Checkbox label="Remember Me" />
                  </div>
                  <Button
                    disabled={isSubmitting}
                    variant="gradient"
                    type="submit"
                    fullWidth
                  >
                    Masuk
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
