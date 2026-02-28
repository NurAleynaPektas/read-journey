import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { addBook } from "../api/library";
import s from "./AddBook.module.css";

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  totalPages: Yup.number()
    .typeError("Total pages must be a number")
    .integer("Must be an integer")
    .positive("Must be > 0")
    .required("Total pages is required"),
});

export default function AddBook() {
  const [loading, setLoading] = useState(false);

  const initialValues = { title: "", author: "", totalPages: "" };

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    try {
      await addBook({
        title: values.title.trim(),
        author: values.author.trim(),
        totalPages: Number(values.totalPages),
      });

      iziToast.success({
        title: "Success",
        message: "Book added",
        position: "topRight",
      });

      window.dispatchEvent(new Event("rj:library-updated")); // ✅ listeyi refresh etmek için
      actions.resetForm();
    } catch (err) {
      iziToast.error({
        title: "Error",
        message:
          err?.response?.data?.message || err?.message || "Add book failed",
        position: "topRight",
      });
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={s.box}>
      <h3 className={s.title}>Add book</h3>

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
              <label className={s.label}>Title</label>
              <Field
                name="title"
                className={s.input}
                placeholder="Book title"
              />
              <ErrorMessage name="title" component="p" className={s.error} />
            </div>

            <div className={s.field}>
              <label className={s.label}>Author</label>
              <Field name="author" className={s.input} placeholder="Author" />
              <ErrorMessage name="author" component="p" className={s.error} />
            </div>

            <div className={s.field}>
              <label className={s.label}>Total pages</label>
              <Field name="totalPages" className={s.input} placeholder="304" />
              <ErrorMessage
                name="totalPages"
                component="p"
                className={s.error}
              />
            </div>

            <button
              className={s.btn}
              type="submit"
              disabled={loading || isSubmitting}
            >
              {loading ? "Adding..." : "Add book"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
