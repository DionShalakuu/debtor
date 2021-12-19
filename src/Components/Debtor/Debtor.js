import react, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Debtor.scss";
import Data from "../Data/Debtors.json";
import { useUserFormik } from "../../lib/formik/useUserFormik";
import { UserModalForm } from "../UserModalForm/UserModalForm";
const Debtor = (props) => {
  const [debtor, setDebtor] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const formik = useUserFormik({
    initialValues: {
      name: debtor.name,
      debtAmount: debtor.debtAmount,
      debtDate: debtor.debtDate,
    },
    //rerender nese ndrron state forma ish dal e that
    enableReinitialize: true,
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
        console.log("values2", values);
        console.log("id", userid);
        setDebtor({
          name: values.name,
          debtAmount: values.debtAmount,
          debtDate: values.debtDate,
          img: "https://image.pngaaa.com/275/4065275-middle.png",
        });
        setmodalOpen(false);
        formik.resetForm();
      }
    },
  });

  const { id } = useParams();

  const debtorSingle = () => {
    Data.map((e) => {
      if (e.id == id) {
        setDebtor(e);
      } else return null;
    });
  };

  useEffect(() => {
    debtorSingle();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <img src={debtor.img} className="img-fluid" alt="" />
          </div>
          <div className="col-md-6">
            <h1>Name: {debtor.name}</h1>
            <br />
            <h5>DebtAmount: {debtor.debtAmount}</h5>
            <h5>DebtDate: {debtor.debtDate}</h5>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success edit-button"
          onClick={() => setmodalOpen((prev) => !prev)}
        >
          Edit User
        </button>

        {modalOpen && (
          <UserModalForm
            errorName={errorName}
            errorAmount={errorAmount}
            errorDate={errorDate}
            isEdit={true}
            formik={formik}
            isOpen={modalOpen}
            onToggle={() => setmodalOpen(false)}
            onSubmit={formik.handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default Debtor;
