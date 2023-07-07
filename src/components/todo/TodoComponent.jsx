import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { retrieveTodoByIdApi, updateTodoApi } from "./api/TodoService";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function TodoComponent() {
  const authContext = useAuth();

  const userName = authContext.userName;

  const { id } = useParams();

  useEffect(() => retrieveTodo(), [id]);

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const navigate = useNavigate();

  function retrieveTodo() {
    retrieveTodoByIdApi(userName, id)
      .then((response) => {
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log(values);
    const todo = {
      id: id,
      username: userName,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    updateTodoApi(userName, id, todo)
      .then((response) => {
        navigate("/todos");
      })
      .catch((error) => console.log(error));
  }

  function validate(values) {
    let errors = {
      //description: "Enter a valid description",
    };
    if (values.description.length < 5) {
      errors.description = "Enter atleast 5 characters";
    }
    if (values.targetDate == null) {
      errors.description = "Enter a target date";
    }
    return errors;
  }

  return (
    <div className="container">
      <h1>Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button type="submit" className="btn btn-success m-5">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
