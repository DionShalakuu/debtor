import * as yup from "yup";
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Label,
  FormGroup,
  Input,
} from "reactstrap";

export const UserModalForm = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.onToggle}>
      <ModalHeader toggle={props.onToggle}>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup className="mb-2 mr-sm-2 ">
            <Label for="name" className="mr-sm-2">
              Name
            </Label>
            <Input
              type="text"
              onChange={props.formik.handleChange}
              value={props.formik.values.name}
              id="name"
              name="name"
            />
            <p className="text-danger">{props.errorName}</p>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 ">
            <Label for="debtAmount" className="mr-sm-2">
              Debt Amount
            </Label>
            <Input
              type="number"
              id="debtAmount"
              onChange={props.formik.handleChange}
              value={props.formik.values.debtAmount}
              name="debtAmount"
            />
            <p className="text-danger">{props.errorAmount}</p>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 ">
            <Label for="debtDate" className="mr-sm-2">
              Debt Date
            </Label>
            <Input
              type="date"
              id="debtDate"
              onChange={props.formik.handleChange}
              value={props.formik.values.debtDate}
              name="debtDate"
            />
            <p className="text-danger">{props.errorDate}</p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.onSubmit}>
          {props.isEdit ? "Edit User" : "Add User"}
        </Button>{" "}
        <Button onClick={props.Onclear}>Reset Inputs</Button>
        <Button onClick={props.onToggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};
