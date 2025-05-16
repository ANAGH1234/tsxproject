import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../services/ProfileService";

const ChangePassword = ({ onChangePassword }:any) => {
  const formik = useFormik({
    initialValues: {
      OldPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      OldPassword: Yup.string().required("Old Password is required"),
      NewPassword: Yup.string()
        .required("New Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
        ),
      ConfirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("NewPassword")], "Passwords must match"),
    }),
    onSubmit: (values:any) => {
      console.log("Submitting form with values:", values);
      handleChangePassword(values);

    },
  });
  const handleChangePassword = async (values:any) => {
    console.log("Attempting password change with:", values);

    try {
      await changePassword(values);
      alert("Password changed successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Failed to change password:", err);
      alert("Error changing password. Please try again.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="col-12 mb-3">
            <label htmlFor="OldPassword">Old Password</label>
            <input
              type="password"
              name="OldPassword"
              onChange={formik.handleChange}
              value={formik.values.OldPassword}
              className="form-control"
            />
           {formik.errors.OldPassword && (
  <div className="text-danger">{String(formik.errors.OldPassword)}</div>
)}

          </div>
          <div className="col-12 mb-3">
            <label htmlFor="NewPassword">New Password</label>
            <input
              type="password"
              name="NewPassword"
              onChange={formik.handleChange}
              value={formik.values.NewPassword}
              className="form-control"
            />
            {formik.errors.NewPassword && <div className="text-danger">{String(formik.errors.NewPassword)}</div>}
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="ConfirmPassword">Confirm New Password</label>
            <input
              type="password"
              name="ConfirmPassword"
              onChange={formik.handleChange}
              value={formik.values.ConfirmPassword}
              className="form-control"
            />
            {formik.errors.ConfirmPassword && <div className="text-danger">{String(formik.errors.ConfirmPassword)}</div>}
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;