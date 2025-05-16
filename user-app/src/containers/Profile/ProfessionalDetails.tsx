import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import authUser from "../../helpers/authUser";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { UserProfileDto } from "../../models/profile/profile";
import { getAllSkills, getProfileData, updateProfileData } from "../../services/ProfileService";



// Validation schema
const professionalDetailsSchema = Yup.object().shape({
  Title: Yup.string().required("Designation is required"),
  Biography: Yup.string().required("Biography is required"),
  SkillNames: Yup.array().min(1, "At least one skill is required"),
  LinkedIn: Yup.string().url("Invalid LinkedIn URL"),
  Github: Yup.string().url("Invalid Github URL"),
  HighestQualification: Yup.string().required("Highest Qualification is required"),
  CurrentOrganization: Yup.string().required("Current Organization is required"),
  College: Yup.string().required("College is required"),
  GraduationYear: Yup.string().matches(/^\d{4}$/, "Graduation Year must be a 4-digit number").required("Graduation Year is required"),
  WorkExperience: Yup.string().required("Work Experience is required"),
  CurrentCTC: Yup.string().matches(/^\d+(\.\d+)?$/, "Current CTC must be a number").required("Current CTC is required"),
  ExpectedCTC: Yup.string().matches(/^\d+(\.\d+)?$/, "Expected CTC must be a number").required("Expected CTC is required"),
  NoticePeriod: Yup.string().required("Notice Period is required"),
  WillingToRelocate: Yup.string().oneOf(["true", "false"], "Willing to Relocate must be true or false").required("Willing to Relocate is required"),
});

const ProfessionalDetails: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfileDto>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newResumeName, setNewResumeName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = authUser.Get();
  const memberId: number | undefined = user?.userId

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const skillData = await getAllSkills();
      setSkills(Array.isArray(skillData) ? skillData : []);
      const profileResponse = await getProfileData(memberId);
      setProfileData(profileResponse);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load professional details");
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, [memberId]);

  const formik = useFormik<UserProfileDto>({
    initialValues: {
      Title: profileData?.Title || "",
      Biography: profileData?.Biography || "",
      SkillNames: profileData?.SkillNames || [],
      LinkedIn: profileData?.LinkedIn || "",
      Github: profileData?.Github || "",
      HighestQualification: profileData?.HighestQualification || "",
      College: profileData?.College || "",
      GraduationYear: profileData?.GraduationYear || 0,
      WorkExperience: profileData?.WorkExperience || 0,
      CurrentCTC: profileData?.CurrentCTC || 0,
      CurrentOrganization: profileData?.CurrentOrganization || "",
      ExpectedCTC: profileData?.ExpectedCTC || 0,
      NoticePeriod: profileData?.NoticePeriod || 0,
      WillingToRelocate: profileData?.WillingToRelocate || false,
      GenderId: profileData?.GenderId || 0,
      GenderName: profileData?.GenderName || "",
      FirstName: profileData?.FirstName || "",
      Email: profileData?.Email || "",
      MobileNo: profileData?.MobileNo || "",
      ProfileImage: profileData?.ProfileImage || "",
      ResumeFile: profileData?.ResumeFile || undefined,
      ResumePath: profileData?.ResumePath || "",
      LastName: profileData?.LastName || "",
    },
    validationSchema: professionalDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const requiredFields: (keyof UserProfileDto)[] = [
        "Title", "Biography", "SkillNames", "HighestQualification", "CurrentOrganization",
        "College", "GraduationYear", "WorkExperience", "CurrentCTC", "ExpectedCTC",
        "NoticePeriod", "WillingToRelocate"
      ];
      const isAnyFieldEmpty = requiredFields.some(field =>
        !values[field] || 
        (Array.isArray(values[field]) && values[field].length === 0)
      );
      
      if (isAnyFieldEmpty) {
        setSubmitError("All fields are required");
        return;
      }

      try {
        setSubmitError(null);
        await updateProfileData({
          ...values,
          CurrentCTC: values.CurrentCTC,
          ExpectedCTC: values.ExpectedCTC,
          NoticePeriod: values.NoticePeriod,
        });
        handleSaveProfessionalDetails(values);
        setIsEditing(false);
        setNewResumeName(null);
        window.location.reload();
      } catch (error) {
        console.error("Error updating profile:", error);
        setSubmitError("Failed to save profile");
      }
    },
  });

  const handleSaveProfessionalDetails = async (values: UserProfileDto) => {
    try {
       await updateProfileData({ ...profileData, ...values });
      fetchData()
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = profileData?.ResumePath || "#";
    link.download = "resume.pdf";
    link.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file && file.size > 2e6) {
      (window as any).Swal.fire('', 'Please upload a resume smaller than 2MB', 'error');
      return;
    }
    if (file) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.doc') && !fileName.endsWith('.docx')) {
        (window as any).Swal.fire('', 'Only word files with extensions (.doc, .docx) are allowed!', 'error');
        return;
      }
      formik.setFieldValue("ResumeFile", file);
      setNewResumeName(file.name);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const formatCTC = (value: number | undefined): string => 
    (value !== undefined && value !== null && value !== 0) ? `${String(value)} LPA` : "";
  
  const formatNoticePeriod = (value: number | undefined): string => 
    (value !== undefined && value !== null && value !== 0) ? `${String(value)} days` : "";

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

  return (
    <div className="row" style={{ position: "relative" }}>
      <div className="col-md-6">
        {!isEditing ? (
          <div>
            <p><strong>Designation:</strong> {profileData?.Title || "N/A"}</p>
            <p><strong>Biography:</strong> {profileData?.Biography || "N/A"}</p>
            <p><strong>Skills:</strong> {profileData?.SkillNames?.join(", ") || "N/A"}</p>
            <p><strong>LinkedIn:</strong> <a href={profileData?.LinkedIn || "#"} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            <p><strong>Github:</strong> <a href={profileData?.Github || "#"} target="_blank" rel="noopener noreferrer">Github</a></p>
            <p><strong>Highest Qualification:</strong> {profileData?.HighestQualification || "N/A"}</p>
            <p><strong>College:</strong> {profileData?.College || "N/A"}</p>
            <p><strong>Graduation Year:</strong> {profileData?.GraduationYear || "N/A"}</p>
            <p><strong>Work Experience:</strong> {profileData?.WorkExperience ? `${profileData.WorkExperience} years` : "N/A"}</p>
            <p><strong>Current Organization:</strong> {profileData?.CurrentOrganization || "N/A"}</p>
            <p><strong>Current CTC:</strong> {formatCTC(profileData?.CurrentCTC) || "N/A"}</p>
            <p><strong>Expected CTC:</strong> {formatCTC(profileData?.ExpectedCTC) || "N/A"}</p>
            <p><strong>Notice Period:</strong> {formatNoticePeriod(profileData?.NoticePeriod) || "N/A"}</p>
            <p><strong>Willing to Relocate:</strong> {profileData?.WillingToRelocate ? "Yes" : "No"}</p>
            <button className="btn btn-primary mt-2" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="Title">Designation</label>
                <input type="text" name="Title" value={formik.values.Title} onChange={formik.handleChange} className="form-control" />
                {formik.errors.Title && <div className="text-danger">{formik.errors.Title}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="Biography">Biography</label>
                <textarea name="Biography" value={formik.values.Biography} onChange={formik.handleChange} className="form-control" rows={3} />
                {formik.errors.Biography && <div className="text-danger">{formik.errors.Biography}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="SkillNames">Skills</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select name="SkillNames" multiple value={formik.values.SkillNames} onChange={formik.handleChange} className="form-select">
                  {skills.length > 0 ? (
                    skills
                      .filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))
                  ) : (
                    <option disabled>No skills available</option>
                  )}
                </select>
                {formik.errors.SkillNames && <div className="text-danger">{formik.errors.SkillNames}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="LinkedIn">LinkedIn</label>
                <input type="url" name="LinkedIn" value={formik.values.LinkedIn} onChange={formik.handleChange} className="form-control" />
                {formik.errors.LinkedIn && <div className="text-danger">{formik.errors.LinkedIn}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="Github">Github</label>
                <input type="url" name="Github" value={formik.values.Github} onChange={formik.handleChange} className="form-control" />
                {formik.errors.Github && <div className="text-danger">{formik.errors.Github}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="HighestQualification">Highest Qualification</label>
                <input type="text" name="HighestQualification" value={formik.values.HighestQualification} onChange={formik.handleChange} className="form-control" />
                {formik.errors.HighestQualification && <div className="text-danger">{formik.errors.HighestQualification}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="College">College</label>
                <input type="text" name="College" value={formik.values.College} onChange={formik.handleChange} className="form-control" />
                {formik.errors.College && <div className="text-danger">{formik.errors.College}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="GraduationYear">Graduation Year</label>
                <input type="text" name="GraduationYear" value={formik.values.GraduationYear} onChange={formik.handleChange} className="form-control" />
                {formik.errors.GraduationYear && <div className="text-danger">{formik.errors.GraduationYear}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="WorkExperience">Work Experience</label>
                <select name="WorkExperience" value={formik.values.WorkExperience} onChange={formik.handleChange} className="form-select">
                  {[...Array(21).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num} years
                    </option>
                  ))}
                </select>
                {formik.errors.WorkExperience && <div className="text-danger">{formik.errors.WorkExperience}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="CurrentOrganization">Current Organization</label>
                <input type="text" name="CurrentOrganization" value={formik.values.CurrentOrganization} onChange={formik.handleChange} className="form-control" />
                {formik.errors.CurrentOrganization && <div className="text-danger">{formik.errors.CurrentOrganization}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="CurrentCTC">Current CTC (LPA)</label>
                <input
                  type="text"
                  name="CurrentCTC"
                  value={formik.values.CurrentCTC}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.CurrentCTC && <div className="text-danger">{formik.errors.CurrentCTC}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="ExpectedCTC">Expected CTC (LPA)</label>
                <input
                  type="text"
                  name="ExpectedCTC"
                  value={formik.values.ExpectedCTC}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.ExpectedCTC && <div className="text-danger">{formik.errors.ExpectedCTC}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="NoticePeriod">Notice Period (days)</label>
                <input
                  type="text"
                  name="NoticePeriod"
                  value={formik.values.NoticePeriod}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.NoticePeriod && <div className="text-danger">{formik.errors.NoticePeriod}</div>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="WillingToRelocate">Willing to Relocate</label>
                <select
                  name="WillingToRelocate"
                  value={formik.values.WillingToRelocate}
                  onChange={formik.handleChange}
                  className="form-select"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {formik.errors.WillingToRelocate && <div className="text-danger">{formik.errors.WillingToRelocate}</div>}
              </div>
              <div className="col-12">
                {submitError && <div className="text-danger mb-2">{submitError}</div>}
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div
        className="col-md-6"
        style={{
          position: "sticky",
          top: "50px",
          alignSelf: "flex-start",
          textAlign: "center",
          padding: "20px",
          maxWidth: "250px",
          marginLeft: "150px",
        }}
      >
        <div>
          <div className="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="currentColor">
              <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
            </svg>
            {isEditing && newResumeName ? (
              <div>
                <p><strong>Resume:</strong> <span className="text-primary">{newResumeName}</span></p>
              </div>
            ) : profileData?.ResumePath ? (
              <div>
                <p><strong>Resume:</strong> <span className="text-success">Yes</span></p>
                <button className="btn btn-success btn-sm mb-3" onClick={handleResumeDownload}>
                  Download Resume
                </button>
              </div>
            ) : (
              <p><strong>Resume:</strong> <span className="text-danger">Not Available</span></p>
            )}
          </div>
          {isEditing && (
            <div
              className="input--file d-flex align-items-center justify-content-center py-2 px-3 rounded btn btn-outline-primary btn-sm"
              onClick={handleIconClick}
            >
              <span style={{ fontWeight: "500" }}>{profileData?.ResumePath || newResumeName ? "Replace Resume" : "Upload Resume"}</span>
              <input
                type="file"
                ref={fileInputRef}
                name="ResumeFile"
                onChange={handleFileChange}
                className="form-control"
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;