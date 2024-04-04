/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const schema = yup
  .object({
    fName: yup.string().required(),
    email: yup.string().email("Invalid email").required("email is required"),
    // dateOfBirth: yup.date().required(),
    studentId: yup.number().required(),
    session: yup.string().required(),
    institute: yup.string().required(),
  })
  .required();
// eslint-disable-next-line react/prop-types
function EditTodo({ state, setState, edit }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [fill, setFill] = useState(0);
  const [loading, setLoading] = useState(false);

  const buttonRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (fill < 100 && loading) {
        setFill((prev) => prev + 2);
      } else if (fill === 100) {
        buttonRef.current.click();
        setIsSubmit(false);
      }
    }, 30);
  }, [loading, fill]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: edit,
  });
  const handleButton = () => {
    console.log("modal is closed");
  };
  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:3003/student/${data.id}`,
        data
      );
      console.log("data post successfully");
      console.log(res)
      setState(state.map((item) => (item.id === data.id ? res.data : item)));
      reset();
      setIsSubmit(true);
      handleButton();
      setLoading(true);
      setFill(0);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    reset(edit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  return (
    <>
      {isSubmit ? (
        <div className="modal fade">
          <div className="modal-dialog mt-5 pt-5">
            <div className="modal-content pt-5 border-0">
              <h4 className="text-center py-3 text-success">
                Edited Data Submitted Successfully!
              </h4>
              <div className="text-center">
                <button
                  className="btn btn-danger px-3 my-5"
                  data-bs-dismiss="modal"
                  ref={buttonRef}
                >
                  close
                </button>
              </div>
              <span className="text-center fw-bold text-danger">{fill}%</span>
              <div
                className="border shadow"
                style={{ height: "10px", width: "100%" }}
              >
                <div
                  className="bg-success shadow rounded-2"
                  style={{
                    height: "9px",
                    width: `${fill}%`,
                    transition: "width 0.4s",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="modal fade"
          id="editTodo"
          tabIndex="-1"
          aria-labelledby="createTodoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content py-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto p-3 pb-5 col-10 row g-3 bg-light shadow"
              >
                <p className="text-center fs-4 fw-bold">
                  Edit Student Information
                </p>
                <Controller
                  control={control}
                  name="fName"
                  // eslint-disable-next-line no-unused-vars
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <input
                      ref={ref}
                      type="text"
                      className={
                        error?.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="First name"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.fName && (
                  <p className="text-danger">This is required.</p>
                )}
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="email"
                      className={
                        error?.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Email"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger">This Email field is required</p>
                )}
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="date"
                      className={
                        error?.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Date of Birth"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-danger">Please provide Date of Birth.</p>
                )}
                <Controller
                  control={control}
                  name="institute"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="text"
                      className={
                        error?.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Name of Institute"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.institute && (
                  <p className="text-danger">
                    Please provide your institution name.
                  </p>
                )}
                <Controller
                  control={control}
                  name="studentId"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="text"
                      className={
                        error?.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Student ID"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.studentId && (
                  <p className="text-danger">This is required field.</p>
                )}
                <Controller
                  control={control}
                  name="session"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="text"
                      className={
                        error?.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Session"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.session && (
                  <p className="text-danger">Please provide session.</p>
                )}

                <button type="submit" className="btn btn-primary mb-2">
                  Submit
                </button>
              </form>
              <button
                type="submit"
                className="btn btn-danger"
                style={{ margin: "-50px 55px 0 55px" }}
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTodo;
