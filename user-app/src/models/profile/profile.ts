
    export interface UserProfileDto {
      userId: number; // long
      firstName?: string;
      lastName?: string;
      email?: string;
      mobileNo?: string;
      profileImage?: string; // Store file path for profile image
      genderId?: number;
      genderName?: string; // For frontend display
      title?: string;
      biography?: string;
      linkedIn?: string;
      twitter?: string;
      github?: string;
      stackOverflow?: string;
      resumePath?: string; // Store file path if no new upload
      resumeFile?: File; // Accept new file upload
      skillNames?: string[]; // List<string>
      highestQualification?: string;
      college?: string;
      graduationYear: number;
      currentOrganization?: string;
      workExperience: number;
      currentCTC: number;
      expectedCTC: number;
      noticePeriod: number;
      currentLocation?: string;
      willingToRelocate: boolean;
    }
  

    export interface ChangePasswordDTO {
        memberId: number; // Int64
        email?: string;
        oldPassword: string; // Required, StringLength(50), Display(Name="Password")
        newPassword: string; // Required, RegularExpression for 8-20 chars with digit, lowercase, uppercase, Display(Name="Password")
        confirmPassword: string; // Required, StringLength(50), Compare("NewPassword"), Display(Name="Password")
        token?: string; // For reCAPTCHA
        action?: string; // For reCAPTCHA
      }

      export interface ChangePasswordResponse {
        status: "success" | "fail";
        data: string;
    }

    export interface UploadProfileImageResponse {
        message: string;
    }
    
    // Response type for getAllSkills
    export interface GetAllSkillsResponse {
        skills: string[];
    }
    

    export interface UpdateProfileFormData {
        [key: string]: any;
        resumeFile?: File;
        skillNames?: string[];
    }
    
    export interface ChangePasswordFormData {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }