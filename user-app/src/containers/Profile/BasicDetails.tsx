import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getProfileData, updateProfileData, uploadProfileImage } from "../../services/ProfileService";
import authUser from "../../helpers/authUser";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { UploadProfileImageResponse, UserProfileDto } from "../../models/profile/profile";



const BasicDetails: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfileDto>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = authUser.Get();
  const memberId: number | undefined = user?.userId;

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await getProfileData(memberId);
      setProfileData(response);
      setProfileImage(response.ProfileImage);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    

    fetchProfileData();
  }, [memberId]);

  const formik = useFormik<Partial<UserProfileDto>>({
    initialValues: {
      FirstName: profileData.FirstName || "",
      Email: profileData.Email || "",
      MobileNo: profileData.MobileNo || "",
      GenderId: profileData.GenderId || 0,
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("Full Name is required").min(2, "Full Name must be at least 2 characters"),
      Email: Yup.string().email("Invalid email address").required("Email is required"),
      MobileNo: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
      GenderId: Yup.number().required("Gender is required").min(1, "Please select a valid gender"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSaveBasicDetails(values);
      setIsEditing(false);
      window.location.reload();
    },
  });

  const handleSaveBasicDetails = async (values: Partial<UserProfileDto>) => {
    try {
       await updateProfileData({ ...profileData, ...values });
      fetchProfileData()
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2e6) {
        // Assuming swal is globally available; ideally, use a typed alternative
        (window as any).swal.fire('', 'Please upload a profile image smaller than 2MB', 'error');
        return;
      }
      if (file) {
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.png') && !fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg') && !fileName.endsWith('.webp')) {
          (window as any).swal.fire('', 'Only images with extensions (.png, .jpg, .jpeg, .webp) are allowed!', 'error');
          return;
        }
        setUploadedImage(URL.createObjectURL(file));
      }
      const user = authUser.Get();
      if (!user?.userId) return;

      try {
        const response: UploadProfileImageResponse = await uploadProfileImage(user.userId, file);
        if (response.Message && response.Message.includes("success")) {
          // Assuming the API returns the new image URL in the message or a similar field
          const newImageUrl = response.Message.split("url:")[1]?.trim() || "";
          setProfileImage(newImageUrl);
        }
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="row">
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <>
          <div className="col-md-6">
            {!isEditing ? (
              <div>
                <p><strong>Full Name:</strong> {profileData.FirstName || "N/A"}</p>
                <p><strong>Email:</strong> {profileData.Email || "N/A"}</p>
                <p><strong>Phone:</strong> {profileData.MobileNo || "N/A"}</p>
                <p><strong>Gender:</strong> {profileData.GenderName || "N/A"}</p>
                <button className="btn btn-primary mt-2" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formik.values.FirstName}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  {formik.errors.FirstName && <div className="text-danger">{formik.errors.FirstName}</div>}
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="Email"
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  {formik.errors.Email && <div className="text-danger">{formik.errors.Email}</div>}
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="MobileNo"
                    value={formik.values.MobileNo}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  {formik.errors.MobileNo && <div className="text-danger">{formik.errors.MobileNo}</div>}
                </div>
                <div className="mb-3">
                  <label>Gender</label>
                  <select
                    name="GenderId"
                    value={formik.values.GenderId}
                    onChange={formik.handleChange}
                    className="form-select"
                  >
                    <option value={0}>Select Gender</option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                    <option value={3}>Other</option>
                  </select>
                  {formik.errors.GenderId && <div className="text-danger">{formik.errors.GenderId}</div>}
                </div>
                <div>
                  <button type="submit" className="btn btn-primary me-2">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            )}
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <div className="text-center">
              <div className="mb-3" style={{ position: "relative" }}>
                {(uploadedImage || profileImage) ? (
                  <img
                    src={uploadedImage || profileImage}
                    alt="Profile"
                    className="rounded-circle border"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover", border: "4px solid #ddd" }}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    width="150"
                    height="150"
                    fill="#3a75d8"
                  >
                    <path d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"/>
                  </svg>
                )}
              </div>
              <div
                className="input--file d-flex align-items-center justify-content-center py-2 px-3 rounded btn btn-outline-primary btn-sm"
                onClick={handleIconClick}
              >
                <span style={{ fontWeight: "500" }}>Change Photo</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BasicDetails;