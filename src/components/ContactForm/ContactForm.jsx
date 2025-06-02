import css from "./ContactForm.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const initialValues = {
  name: "",
  number: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, "Short").max(50, "Long").required("Required"),
  number: Yup.string()
    .phone("UA", "Please enter a valid phone number")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formWrap}>
        <div className={css.formFieldWrap}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={css.fieldwrap}
          />
          <ErrorMessage name="name" component="span" className={css.error} />

          <label htmlFor={numberFieldId}>Number</label>
          <Field
            type="text"
            name="number"
            id={numberFieldId}
            className={css.fieldwrap}
          />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
