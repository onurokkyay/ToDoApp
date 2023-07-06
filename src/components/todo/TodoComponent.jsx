import { useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { retrieveTodoByIdApi } from "./api/TodoService";
import { Field, Form, Formik } from "formik";

export default function TodoComponent() {
  const authContext = useAuth();

  const userName = authContext.userName;

  const { id } = useParams();

  useEffect(() => retrieveTodo(), [id]);

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

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
  }

  return (
    <div className="container">
      <h1>Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
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
