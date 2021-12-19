import react, { useState, useReducer } from "react";
import "./User.scss";
import Data from "../Data/Debtors.json";
import { Link } from "react-router-dom";

import { useUserFormik } from "../../lib/formik/useUserFormik";
import { UserModalForm } from "../UserModalForm/UserModalForm";

const User = () => {
  function useLocalState(localitem) {
    const [loc, setState] = useState(localStorage.getItem(localitem));

    function setLoc(newItem) {
      localStorage.setItem(localitem, newItem);
      setState(newItem);
    }
    return [loc, setLoc];
  }

  const [modalOpen, setmodalOpen] = useState(false);

  const [users, setUsers] = useState(() => Data.slice(0, 5));
  const [errorName, setErrorName] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorDate, setErrorDate] = useState("");

  const formik = useUserFormik({
    onSubmit: (values) => {
      let error = 0;

      if (!(values.name = values.name.replace(/[^A-Za-z]/gi, ""))) {
        setErrorName("Please put words");
        error = 1;
      } else if (values.name == "") {
        setErrorName("Dont leave it Empty");
        error = 1;
      } else {
        setErrorName("");
      }
      if (values.debtAmount == "") {
        setErrorAmount("error Amount");
        error = 1;
      } else if (values.debtAmount > 1000) {
        setErrorAmount("Please not bigger than 1000");
        error = 1;
      } else {
        setErrorAmount("");
      }
      if (values.debtDate == "") {
        setErrorDate("error Date");
        error = 1;
      } else {
        setErrorDate("");
      }
      if (error == 0) {
        const userid = Math.floor(Math.random() * 90000) + 10000;

        setUsers((prev) => {
          return [
            ...prev,
            {
              id: userid,
              name: values.name,
              debtAmount: values.debtAmount,
              debtDate: values.debtDate,
              img: "https://image.pngaaa.com/275/4065275-middle.png",
            },
          ];
        });
        setmodalOpen(false);
        formik.resetForm();
      }
    },
  });

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    const confirmBox = window.confirm(
      "Are u sure u want to Delete this Debtor"
    );
    if (confirmBox === true) {
      setUsers(users.filter((item) => item.name !== name));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="test">
          <div className="row mt-5">
            {users.map((e) => {
              return (
                <>
                  <div className="col-md-3">
                    <div class="card">
                      <img src={e.img} class="card-img-top" alt="..." />
                      <div class="card-body d-flex justify-content-between">
                        <Link to={{ pathname: "/debtor/" + e.id }}>
                          <h5 className="text-center">{e.name}</h5>
                        </Link>
                        <button
                          className="btn-danger"
                          name={e.name}
                          onClick={handleRemoveItem}
                        >
                          Delete User
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-success edit-button"
            onClick={() => setmodalOpen((prev) => !prev)}
          >
            Add User
          </button>

          {modalOpen && (
            <UserModalForm
              errorName={errorName}
              errorAmount={errorAmount}
              errorDate={errorDate}
              formik={formik}
              isOpen={modalOpen}
              onToggle={() => setmodalOpen(false)}
              onSubmit={formik.handleSubmit}
              Onclear={formik.resetForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
