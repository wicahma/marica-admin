import { authLogin } from "@/store/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Typography
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function SignIn() {
  const dispatch = useDispatch(),
    { adminData, adminToken } = useSelector((state) => state.auth),
    [saveLogin, seaveLogin] = useState(false),
    navigate = useNavigate(),
    [seePassword, setSeePassword] = useState(false);

  useEffect(() => {
    if (adminToken && adminData) {
      navigate("/dashboard/home");
    }
  }, [adminData, adminToken]);

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
                identifier: "",
                password: "",
              }}
              onSubmit={(values) => {
                dispatch(authLogin(values, saveLogin));
                return false;
              }}
              validationSchema={Yup.object().shape({
                identifier: Yup.string()
                  .required("Email dibutuhkan!")
                  .email("Email tidak valid!"),
                password: Yup.string()
                  .required("Password dibutuhkan!")
                  .min(8, "Password minimal 8 karakter!"),
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
                    value={values.identifier}
                    error={
                      errors.identifier && touched.identifier ? true : false
                    }
                    type="text"
                    name="identifier"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={
                      errors.identifier && touched.identifier
                        ? errors.identifier
                        : "Email / Username"
                    }
                    size="lg"
                  />
                  <Input
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                    type={seePassword ? "text" : "password"}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    icon={
                      <Button
                        className="w-full rounded-full p-0 text-blue-gray-500"
                        color="white"
                        onClick={() => setSeePassword(!seePassword)}
                      >
                        {seePassword ? <EyeIcon /> : <EyeSlashIcon />}
                      </Button>
                    }
                    label={
                      errors.password && touched.password
                        ? errors.password
                        : "Password"
                    }
                    size="lg"
                  />
                  <div className="-ml-2.5">
                    <Checkbox
                      checked={saveLogin}
                      onChange={() => seaveLogin(!saveLogin)}
                      label="Remember Me"
                    />
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
