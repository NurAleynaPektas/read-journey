import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

import { signIn } from "../api/auth";
import s from "./LoginPage.module.css";

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Email format is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    try {
      const data = await signIn(values);

      const token = data?.token;
      const refreshToken = data?.refreshToken;

      if (!token) throw new Error("Token missing from response");

      localStorage.setItem("rj_token", token);
      if (refreshToken) localStorage.setItem("rj_refreshToken", refreshToken);

      dispatch(
        setAuth({
          token,
          user: {
            name: data?.name || "",
            email: data?.email || values.email,
          },
        }),
      );

      iziToast.success({
        title: "Success",
        message: "Logged in successfully",
        position: "topRight",
      });

      actions.resetForm();
      navigate("/recommended", { replace: true });
    } catch (err) {
      iziToast.error({
        title: "Error",
        message: err?.response?.data?.message || err?.message || "Login failed",
        position: "topRight",
      });
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.card}>
        <h2 className={s.title}>Log In</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form className={s.form} noValidate>
              <div className={s.field}>
                <label className={s.label}>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@mail.com"
                  className={s.input}
                />
                <ErrorMessage name="email" component="p" className={s.error} />
              </div>

              <div className={s.field}>
                <label className={s.label}>Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="******"
                  className={s.input}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className={s.error}
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={s.primaryBtn}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>

        <p className={s.registerText}>
          Don’t have an account?{" "}
          <Link to="/register" className={s.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
