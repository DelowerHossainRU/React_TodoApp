import { useEffect, useState } from "react";
import CreateTodo from "./components/createTodo";
import axios from "axios";
import EditTodo from "./components/EditTodo";
import View from "./components/View";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faEye,
  faHandPointRight,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
export default function App() {
  const [state, setState] = useState([]);
  const [view, setView] = useState({});
  const [edit, setEdit] = useState({});
  useEffect(() => {
    const UserInfo = async () => {
      const fetchData = await axios.get("http://localhost:3003/student");
      const data = await fetchData.data;
      setState(data);
    };
    UserInfo();
  }, []);
  const handleView = async (id) => {
    const fetchData = await axios.get(`http://localhost:3003/student/${id}`);
    setView(fetchData.data);
  };
  const handleEdit = (item) => {
    setEdit(item);
  };

  const handleDelete = (id) => {
    const deletedData = async () => {
      await axios.delete(`http://localhost:3003/student/${id}`);
      const afterDelete = state.filter((item) => item.id !== id);
      setState(afterDelete);
    };
    deletedData();
  };

  return (
    <>
      {state.length > 0 ? (
        <div className="container-fluid px-5 pt-3">
          <div className="row fw-bold justify-content-between">
            <p className="col-7 text-end fs-3 pt-3">Student Information</p>
            <div className="col-4 row pt-3 text-end ps-5">
              <span className="fs-3 text-danger col-7 ps-4">
                Click Here <FontAwesomeIcon icon={faHandPointRight} />
              </span>
              <div className="col-5 mb-3 fs-4 fw-bold">
                <button
                  type="button"
                  className="bg-primary text-light"
                  style={{
                    border: "none",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#createTodo"
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Add Info
                </button>
              </div>
            </div>
          </div>
          <table className="table table-striped border custom-table">
            <thead className="border">
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center pe-5 border">Email</th>
                <th className="">Date of Birth</th>
                <th className="text-center border">Institute</th>
                <th className="text-center">ID</th>
                <th className="text-center border">Session</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {state.map((item, key) => (
                <tr key={key}>
                  <td>{item.fName}</td>
                  <td className="border">{item.email}</td>
                  <td className="border">{item.dateOfBirth}</td>
                  <td>{item.institute}</td>
                  <td className="text-center border">{item.studentId}</td>
                  <td className="text-center border">{item.session}</td>
                  <td className="d-flex justify-content-between">
                    <button
                      className="border-0 btn btn-success col-4"
                      data-bs-toggle="modal"
                      data-bs-target="#viewModal"
                      onClick={() => handleView(item.id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> View
                    </button>
                    <button
                      className="border-0 btn btn-warning col-3"
                      type="button"
                      onClick={() => handleEdit(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#editTodo"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                    <button
                      type="button"
                      className="border-0 btn btn-danger col-4"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container mt-5 text-center">
          <img
            src="../public/image/add_airport_pic.svg"
            alt="nothing here"
            className="col-6 mx-auto img-fluid"
          />
          <div className="col-12 text-center my-3">
            <button
              type="button"
              className="btn btn-primary p-2 mx-auto fs-4 fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#createTodo"
            >
              Add Student Information
            </button>
          </div>
        </div>
      )}
      <CreateTodo setState={setState} state={state} />
      <EditTodo state={state} setState={setState} edit={edit} />
      <View info={view} handleDelete={handleDelete} handleEdit={handleEdit} />
    </>
  );
}
