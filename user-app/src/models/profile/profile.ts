export interface UserProfileDto {
    UserId?: number; // long
    FirstName?: string;
    LastName?: string;
    Email?: string;
    MobileNo?: string;
    ProfileImage?: string; // Store file path for profile image
    GenderId?: number;
    GenderName?: string; // For frontend display
    Title?: string;
    Biography?: string;
    LinkedIn?: string;
    Twitter?: string;
    Github?: string;
    StackOverflow?: string;
    ResumePath?: string; // Store file path if no new upload
    ResumeFile?: File; // Accept new file upload
    SkillNames?: string[]; // List<string>
    HighestQualification?: string;
    College?: string;
    GraduationYear?: number;
    CurrentOrganization?: string;
    WorkExperience?: number;
    CurrentCTC?: number;
    ExpectedCTC?: number;
    NoticePeriod?: number;
    CurrentLocation?: string;
    WillingToRelocate?: boolean;
  }
  
  export interface ChangePasswordDTO {
    MemberId: number; // Int64
    Email?: string;
    OldPassword: string; // Required, StringLength(50), Display(Name="Password")
    NewPassword: string; // Required, RegularExpression for 8-20 chars with digit, lowercase, uppercase, Display(Name="Password")
    ConfirmPassword: string; // Required, StringLength(50), Compare("NewPassword"), Display(Name="Password")
    Token?: string; // For reCAPTCHA
    Action?: string; // For reCAPTCHA
  }
  
  export interface ChangePasswordResponse {
    Status: "success" | "fail";
    Data: string;
  }
  
  export interface UploadProfileImageResponse {
    Message: string;
  }
  
  export interface GetAllSkillsResponse {
    Skills: string[];
  }
  
  export interface UpdateProfileFormData {
    [key: string]: any;
    ResumeFile?: File;
    SkillNames?: string[];
  }
  
  export interface ChangePasswordFormData {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
  }