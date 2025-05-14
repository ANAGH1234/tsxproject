import apiClient from "../helpers/apiClient";
import authUser from "../helpers/authUser";
import type { UserProfileDto, ChangePasswordDTO, ChangePasswordResponse, GetAllSkillsResponse, UploadProfileImageResponse, UpdateProfileFormData, ChangePasswordFormData } from "../models/profile/profile";
import type { User } from "../models/user/User";



export const getProfileData = async (memberId: number): Promise<UserProfileDto> => {
    return apiClient.get<UserProfileDto>(`/Profile/GetUserProfile/${memberId}`)
        .then((res) => res.data)
        .catch((err) => { throw err; });
};

export const updateProfileData = async (formData: UpdateProfileFormData): Promise<void> => {
    const updatedData = new FormData();
    const user: User | null = authUser.Get();

    if (!user?.userId) {
        console.error("UserId is missing");
        throw new Error("UserId is missing");
    }

    updatedData.append("UserID", user.userId.toString());

    Object.keys(formData).forEach((key) => {
        if (key === "ResumeFile" && formData.resumeFile instanceof File) {
            updatedData.append(key, formData.resumeFile);
        } else if (key === "SkillNames" && Array.isArray(formData.skillNames)) {
            updatedData.append(key, formData.skillNames.join(", "));
        } else if (formData[key] !== undefined && formData[key] !== null) {
            updatedData.append(key, formData[key]);
        }
    });

    return apiClient.put("/Profile/UpdateUserProfile", updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => res.data)
        .catch((err) => { throw err; });
};

export const changePassword = async (formData: ChangePasswordFormData): Promise<ChangePasswordResponse> => {
    const user: User | null = authUser.Get();

    if (!user?.userId || !user?.email || !user?.token) {
        console.error("User details are missing. Cannot proceed with password change.");
        throw new Error("User details are missing");
    }

    const payload: ChangePasswordDTO = {
        memberId: user.userId,
        email: user.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
        token: user.token,
        action: "changePassword",
    };

    return apiClient.post<ChangePasswordResponse>("/OAuth/ChangePassword", payload)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error changing password:", err.response?.data || err.message);
            throw err;
        });
};

export const uploadProfileImage = async (userId: number, file: File): Promise<UploadProfileImageResponse> => {
    const formData = new FormData();
    formData.append("UserId", userId.toString());
    formData.append("ProfileImage", file);

    return apiClient.post<UploadProfileImageResponse>("/Profile/UploadProfileImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => res.data)
        .catch((err) => { throw err; });
};

export const getAllSkills = async (): Promise<string[]> => {
    return apiClient.get<GetAllSkillsResponse>("/Profile/GetAllSkills")
        .then((res) => res.data.skills)
        .catch((err) => {
            console.error("Error fetching skills:", err);
            return [];
        });
};

export const closeAccount = (): void => {
    const user: User | null = authUser.Get();

    if (!user?.userId) {
        alert("User not logged in");
        return;
    }
    window.location.href = "/User/Home/DeleteUser";
};