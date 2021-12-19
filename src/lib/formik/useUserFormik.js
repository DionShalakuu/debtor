import React from "react";
import { useFormik } from "formik";
export const useUserFormik = (options) => {
  return useFormik({
    initialValues: {
      name: "",
      debtAmount: "",
      debtDate: "",
    },
    ...options,
    onSubmit: async (values) => {
      await options.onSubmit(values);
    },
  });
};
