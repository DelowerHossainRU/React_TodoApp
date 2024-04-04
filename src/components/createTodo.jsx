import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const defaultValues = {
  fName: "",
  email: "",
  dateOfBirth: "",
  studentId: "",
  session: "",
  institute: "",
};
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
function CreateTodo({ setState, state }) {
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
        setIsSubmit(false)
      }
    }, 30);
    
  }, [loading, fill]);
  const {
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmit = async (data) => {
    console.log(data)
    const res = await axios.post("http://localhost:3003/student", data);
    console.log("data post successfully");
    setState([...state, res.data]);
    reset();
    setIsSubmit(true);
    setLoading(true);
    setFill(0);
  };

  return (
    <>
    {
      isSubmit ? (
        <div className="modal fadef">
          <div className="modal-dialog mt-5 pt-5">
            <div className="modal-content pt-5 border-0">
              <h4 className="text-center py-3 text-success">New Data Submitted Successfully!</h4>
              <div className="text-center">
                <button
                  className="btn btn-danger px-3 mb-5"
                  data-bs-dismiss="modal"
                  ref={buttonRef}
                >
                  close
                </button>
              </div>
              <span className="text-center fw-bold text-danger">{fill}%</span>
              <div className="border shadow" style={{height: "15px", width:"100%",}}>
                <div className="bg-success shadow rounded-2" style={{height: "14px", width:`${fill}%`, transition:"width 0.4s"}}></div>
              </div>
            </div>
          </div>
        </div>
      ):(<div
        className="modal fade"
        id="createTodo"
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
              <div className="input-group">
                <label
                  htmlFor="fName"
                  className="input-group-text bg-success-subtle fw-bold"
                >
                  Name:
                </label>
                <Controller
                  control={control}
                  name="fName"
                  render={({ field }) => (
                    <input
                      type="text"
                      className={
                        errors.fName
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Write your name..."
                      {...field}
                    />
                  )}
                />
                {errors.fName && (
                  <p className="text-danger col-12">This is required.</p>
                )}
              </div>
              <div className="input-group">
                <label
                  htmlFor="fName"
                  className="input-group-text bg-success-subtle fw-bold"
                >
                  Email:
                </label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <input
                      type="email"
                      className={
                        errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger col-12">
                    This Email field is required
                  </p>
                )}
              </div>
              <div className="input-group">
                <label
                  htmlFor="fName"
                  className="input-group-text bg-success-subtle fw-bold"
                >
                  Date of Birth:
                </label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <input
                      type="date"
                      className={
                        errors.dateOfBirth
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Date of Birth"
                      {...field}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-danger col-12">
                    Please provide Date of Birth.
                  </p>
                )}
              </div>
              <div className="input-group">
                <label
                  htmlFor="fName"
                  className="input-group-text bg-success-subtle fw-bold"
                >
                  Institute:
                </label>
                <Controller
                  control={control}
                  name="institute"
                  render={({ field }) => (
                    <input
                      type="text"
                      className={
                        errors.institute
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Name of institute"
                      {...field}
                    />
                  )}
                />
                {errors.institute && (
                  <p className="text-danger col-12">
                    Please provide your institution name.
                  </p>
                )}
              </div>
              <div className="input-group">
                <label
                  htmlFor="fName"
                  className="input-group-text bg-success-subtle fw-bold"
                >
                  ID:
                </label>
                <Controller
                  control={control}
                  name="studentId"
                  render={({ field }) => (
                    <input
                      type="text"
                      className={
                        errors.studentId
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Student ID"
                      {...field}
                    />
                  )}
                />
                {errors.studentId && (
                  <p className="text-danger col-12">This is required field.</p>
                )}
              </div>
              <div className="input-group">
                <label
                  htmlFor="fName"
                  className="input-group-text bg-success-subtle fw-bold"
                >
                  Session:
                </label>
                <Controller
                  control={control}
                  name="session"
                  render={({ field }) => (
                    <input
                      type="text"
                      className={
                        errors.session
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="session"
                      {...field}
                    />
                  )}
                />
                {errors.session && (
                  <p className="text-danger col-12">Please provide session.</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                submit
              </button>
            </form>
            <button
              type="button"
              className="btn btn-danger"
              style={{ margin: "-50px 55px 0 55px" }}
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>)
    }
    </>
  );
}

export default CreateTodo;
