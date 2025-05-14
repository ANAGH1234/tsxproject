// Add these to the existing src/types/index.ts file

import type { CourseDTO, GenderMaster, SelectListItem, SkillMasterDTO } from "../dashboard/dashboard";

// UserRankingDTO
export interface UserRankingDTO {
    UserRankingId: number;
    UserId: number | null;
    FirstName: string | null;
    TotalPoints: number | null;
    TotalTime: number | null;
    ProblemsSolved: number | null;
    TotalAttempts: number | null;
    Ranking: number | null;
}

export interface ProblemsDTO {
    ProblemId: number;
    Title: string;
    Description: string;
    Examples: string;
    Difficulty: string;
    Constraints: string;
    Hints: string;
    Accessibility: string;
    Acceptance: number | null;
    CreatedDate: Date;
    UpdatedDate: Date;
    CategoryId: number;
    Topics: string;
    Url: string;
    IsActive: boolean;
    Points: number | null;
    Companies: string;
    CategoryName: string;
    ProblemSampleTests: ProblemSampleTestDTO[];
}
export interface ProblemSampleTestDTO {
    SampleTestId: number;
    ProblemId: number | null;
    SampleCode: string;
    TestCode: string;
    Language: string;
    CreatedDate: Date;
    Problem: ProblemsEntityDTO;
}


// Problems (Entity)
export interface ProblemsEntityDTO {
    ProblemId: number;
    Title: string;
    Description: string;
    Examples: string;
    Difficulty: string;
    Constraints: string;
    Hints: string;
    Accessibility: string;
    Acceptance: number | null;
    CreatedDate: Date;
    UpdatedDate: Date;
    Topics: string;
    Url: string;
    IsActive: boolean;
    CategoryId: number;
    Companies: string;
    Points: number;
}

// ProblemOfTheDay
export interface ProblemOfTheDayDTO {
    id: number;
    problemId: number;
    dateAssigned: string; // DateOnly in C# maps to string in TypeScript (e.g., "2025-05-10")
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    Problem: ProblemsEntityDTO;
}

export interface UserDTO {
    userId: number;
    firstName: string; 
    lastName: string; // Required, StringLength(50), Display(Name="Last Name")
    password: string; // Required, RegularExpression for 8-20 chars with digit, lowercase, uppercase
    confirmPassword: string; // Required, StringLength(50), Compare("Password")
    email: string; // Required, StringLength(50), RegularExpression for valid email
    mobileCountryCode: string; // Required, StringLength(5)
    mobileNo: string; // Required, StringLength(20), CustomValidation(MobileValidator.ValidateMobileNumber)
    file?: File; // Display(Name="Profile Image"), for file upload
    profileImage?: string;
    mailSentCounter?: number;
    encryptedKey?: string;
    verificationUrl?: string;
    isActive?: boolean;
    isArchived: boolean;
    createdDate: Date;
    updatedDate?: Date;
    loginFailedCount: number;
    isLockedOut: boolean;
    isVerified?: boolean;
    verificationDate?: Date;
    roles?: string[];
    genderId?: number;
    genderName?: string;
    userDetails?: UserDetailsDTO;
    userProfessionalInformation?: UserProfessionalInformationDTO;
    genderList: GenderMaster[];
    selectedSkills: SkillMasterDTO[];
    selectedInterestSkills: SkillMasterDTO[];
    skillList: SelectListItem[];
    skillInterestList: SelectListItem[];
    jobId: number;
    membershipId: number;
    membershipExpiry: Date;
    membershipSubscribeDate?: Date;
    providerName?: string;
    token?: string; 
    getFullName(): string;
  }

  export interface UserDetailsDTO {
    userId: number; // Int64
    title?: string;
    biography?: string;
    country: number;
    city: number;
    linkedIn?: string;
    twitter?: string;
    github?: string;
    stackOverflow?: string;
    skills?: string;
    resume?: string;
  }

  export interface UserProfessionalInformationDTO {
    userId: number; // Int64
    highestQualification: string; // Required
    college: string; // Required
    graduationYear: number; // Required
    currentOrganization: string; // Required
    workExperience: number; // Required
    currentCTC: number; // Required
    expectedCTC: number; // Required
    noticePeriod: number; // Required
    country: number; // Required
    currentLocation: string; // Required
    state: string; // Required
    willingToRelocate: string; // Required
    resumeURL?: string;
    resumePath?: string;
    resumeOldPath?: string;
    appliedSkills?: string;
    city?: string;
  }


  export interface Subscription {
    // Primary key
    Id: number;

    course:CourseDTO

    userId: number;
    modeId: number;
    courseId: number;
    courseType: number; // live/course/free
    videoAccess: number;
    subscribeDate?: Date;
    expiryDate: Date;
    renewDate?: Date;
    isActive?: boolean;
    isLiveSessionAccess: boolean;
    // Assuming User is another interface/type
    user?: any; // Replace 'any' with proper User interface/type if available
    sessionAccessExpiry?: Date;
    subscriptionTypeId?: number;

    // Not mapped to database
    isFree: number;
}