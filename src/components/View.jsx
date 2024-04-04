/* eslint-disable react/prop-types */

import { faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
function View({ info, handleDelete, handleEdit }) {
  return (
    <div
      className="modal fade"
      id="viewModal"
      tabIndex="-1"
      aria-labelledby="viewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content mt-5 p-3 bg-light rounded-4 shadow">
          <div className="row text-end mx-2">
            <p className="col fw-bold fs-4 text-center">Details Information</p>
            <button
              type="button"
              className="col-1 border-0 bg-light"
              data-bs-dismiss="modal"
            >
              <FontAwesomeIcon className="text-danger fw-bold fs-3 bg-primary-subtle rounded-circle px-1" icon={faXmark}/>
            </button>
          </div>
          <div className="row border-bottom border-top border-2 pt-3 px-3">
            <p className="col fw-bold">Name:</p>
            <p className="col-8">{info.fName}</p>
          </div>
          <div className="row border-bottom border-2 pt-3 px-3">
            <p className="col fw-bold">Email:</p>
            <p className="col-8">{info.email}</p>
          </div>
          <div className="row border-bottom border-2 pt-3 px-3">
            <p className="col fw-bold">Date of Birth:</p>
            <p className="col-8">{info.dateOfBirth}</p>
          </div>
          <div className="row border-bottom border-2 pt-3 px-3">
            <p className="col fw-bold">Institute:</p>
            <p className="col-8">{info.institute}</p>
          </div>
          <div className="row border-bottom border-2 pt-3 px-3">
            <p className="col fw-bold">Student ID:</p>
            <p className="col-8">{info.studentId}</p>
          </div>
          <div className="row border-bottom border-2 pt-3 px-3">
            <p className="col fw-bold">Session:</p>
            <p className="col-8">{info.session}</p>
          </div>
          <div className="row pt-3 px-2 justify-content-around">
            <button
              type="button"
              className="border-0 btn btn-danger col-3"
              data-bs-dismiss="modal"
              onClick={() => handleDelete(info.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} /> Delete
            </button>
            <button
              className="border-0 btn btn-warning col-3"
              type="button"
              onClick={() => handleEdit(info)}
              data-bs-toggle="modal"
              data-bs-target="#editTodo"
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
            <button type="button" className="btn btn-secondary col-3" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
