import type { AssignedTestDTO, CourseContentDTO, CourseDTO, CourseLabDTO, CourseQuickNoteDTO, CourseSubTopicDTO, CourseTopicDTO, GenderMaster, LabDTO, MentorMasterDTO, Paging, QuickNotesDTO, SelectListItem, SkillMasterDTO, SubscribedCourseTypesDTO } from "../dashboard/dashboard";

export interface SubscribeCourseDetailDTO {
  BatchId: number;
  BatchName?: string;
  MentorName?: string;
  CourseId: number;
  CourseName?: string;
  Curdetails?: string;
  Mode: number;
  Subtopic: number;
  Flag: boolean;
  AssingMockList?: AssignedMockUpTestDTO[];
  AssingTestList?: AssignedTestDTO[];
  CurRecTopiclist?: CourseLiveSessionVideo[];
  CurRecTopiclistMaster?: CourseLiveSessionVideo[];
  CurPreRecTopiclist?: CourseTopicDTO[];
  CourseSubsType: boolean;
  VideoAccess: number;
  Reason?: string;
  CourseType: number;
  SubCourseDetailsList?: MaterCourseCurriculum[];
  BatchIdLive: number;
  BatchLiveList: BatchMasterDTO[];
  BatchWisePerformace: number; 
  IsLiveSessionsSubscribed: boolean;
  IsTrialSubscribed: boolean;
  IsTestPaperSubscribed: boolean;
  CourseURL?: string;
  TotalLessons: number;
  CompletedLessons: number;
  TotalTestCount: number;
  CompletedTestCount: number;
  TestPerformance: number; // decimal
}

export interface AssignedMockUpTestDTO {
  MockupTestAssignedBatchDetailId: number;
  AssessmentId: number;
  MockupTestId: number;
  BatchId: number;
  BatchName?: string;
  CourseId: number;
  CourseName?: string;
  AssignmentUrl?: string;
  MockupTestTitle?: string;
  Duration: number;
  TotalQuestion: number;
  AssignedDate?: string;
  FromDate: Date; // DateTime
  FromDateDisplay?: string;
  ToDate: Date; // DateTime
  ToDateDisplay?: string;
  AssignmentFromDate: Date; // DateTime
  AssignmentFromDateDisplay?: string;
  AssignmentToDate: Date; // DateTime
  AssignmentToDateDisplay?: string;
  MockupTestAlreadyTaken: number;
  Sequence: number; // decimal
}

export interface CourseLiveSessionVideo {
  LiveTopicId: number; // Key
  TopicName: string; // Required
  Description?: string; // AllowHtml
  UrlPath: string; // Required
  CodePath?: string;
  IsLock: boolean;
  Duration: string; // Required
  Sequence: number; // decimal
  IsActive: boolean;
  PdfPath?: string;
  BatchId: number; // Required
  CourseId: number;
  IsMailed: boolean;
  CreatedDate?: Date;
  StrCreatedDate?: string; // NotMapped
  CourseName?: string; // NotMapped
  File?: File; // NotMapped, for file upload
  BatchCode?: string; // NotMapped
  OldCodePath?: string; // NotMapped
  CourseSmallBanner?: string; // NotMapped
  LiveVideoProgress?: number; // NotMapped, decimal
  IsVideoCompleted?: boolean; // NotMapped
  VideoPlayTime?: number; // NotMapped, decimal
  BatchWisePerformace?: number; // NotMapped, decimal
  IsTrialSubscription?: boolean; // NotMapped
  DurationInSeconds: number; // long
}

export interface MaterCourseCurriculum {
  CId: number; // Key
  Title?: string;
  CourseId: number;
  SubCourseId: number;
  Description?: string; // AllowHtml
  Sequence: number;
  Url?: string;
  IsActive?: boolean;
  Mode: number;
  IsElective: number;
  CourseName?: string; // NotMapped
  ModeName?: string; // NotMapped
  Imgurl?: string; // NotMapped
}

export interface TrainingMode {
  TrainingModeId: number;
  Name?: string;
}

export interface BatchMasterDTO {
  BatchId: number;
  BatchName: string; // Required, Display(Name="Batch Name")
  TotalMockUpTest: number;
  AssignedMockupTest: number;
  ModeId: number;
  ModeName?: string;
  StartDate: Date;
  EndDate?: Date;
  DispStartDate?: string;
  DispEndDate?: string;
  IsActive: boolean;
  IsFree: number;
  CourseId: number; // Required, Display(Name="Course")
  CourseName?: string; // Display(Name="Course Name")
  CourseList?: CourseDTO[];
  TrainingModeId: number; // Required, Display(Name="Training Mode")
  TrainingMode?: string; // Display(Name="Training Mode")
  TrainingModeList?: TrainingMode[];
  MentorList?: MentorMasterDTO[];
  TotalMember: number;
  BatchCode: string; // Required
  MentorId: number; // Required
  MentorName?: string;
  BatchType?: string;
  Name?: string;
  Id: number;
  MockUpTitle?: string;
  Url: string; // Required
  FullDetail?: string;
  WhatsAppLink?: string; // Display(Name="WhatsAppLink")
  DiscordLink?: string;
  PostedBy?: string;
  MeetingUrl: string; // Required
  MeetingPassword: string; // Required
  Title?: string;
  OldEventName?: string;
  BatchDays?: string;
  DiscountPercentage: number; // decimal
  TotalINR: number; // decimal
  TotalUSD: number; // decimal
  DiscountINR: number; // decimal
  NetPriceUSD: number; // decimal
  NetPriceINR: number; // decimal
  DiscountUSD: number; // decimal
  IsPaymentGateway: boolean;
  CourseType: number;
  MobileBanner?: string;
  BatchHours: string; // TimeSpan
  BatchTiming: Date; // Required, Display(Name="Batch Timing")
  BatchTimeOnly: string; // TimeSpan
  BatchStartTimingDisplay?: string;
  SessionStatus: number;
  BatchEndTiming: Date;
  BatchEndTimingDisplay?: string;
  TimeZone?: string;
  Listzone?: string;
  BatchDaysSelected?: string[];
  DTypelist?: SelectListItem[];
  Dayslist?: SelectListItem[];
  SubscriptionId: number; // long
  Classes: number; // Range(1, 50)
  IsOnSale: boolean;
  SalePercentage: number; // decimal
  SaleOffAmount: number; // decimal
  AfterSale: number; // decimal
  Price: number; // decimal
  Currency?: string;
  IsSelfPlacedBatch: number;
  IsSubscribed: boolean;
  StartEventDateTime: Date;
  MentorPic?: string;
  IsStarted: boolean;
  ScheduleId: number;
  IsPassed: boolean;
  Remark?: string;
  LiveClasses: number;
  LiveStartUpdate?: Date;
  DomainName?: string;
  IsDisplayMoreButton: boolean;
  SelectedUsers?: SelectListItem[];
}

export interface ProgressCardDTO {
  UserId: number; // long
  UserName?: string;
  LiveSessionProgress: number; // decimal
  VideoCourseProgress: number; // decimal
  LabProgress: number; // decimal
  QnAProgress: number; // decimal
  ProjectProgress: number; // decimal
  QuickNoteProgress: number; // decimal
  TotalLiveLessons: number;
  CompletedLiveLessons: number;
  TotalVideoCourse: number;
  CompletedVideoCourse: number;
  TotalLab: number;
  TotalQnA: number;
  TotalProject: number;
  TotalQuickNote: number;
  CompletedLab: number;
  CourseName?: string;
  CourseId: number;
  IsGenerateCertificate: boolean;
  CertificateId: number; // long
  UserEmail?: string;
  DisplayCourseContent?: SubscribedCourseTypesDTO;
  TotalCompletedVideo: number;
  TotalCompletedLab: number;
  TotalCompletedQnA: number;
  TotalCompletedProject: number;
  TotalCompletedQuickNote: number;
  LiveSessionsProgressCardList?: LiveSessionsProgressCardDTO[];
  IsSessionExist: boolean;
  IsVedioExist: boolean; // Note: Typo 'Vedio' retained from C#
  IsLabExist: boolean;
  IsQuickNoteExist: boolean;
  IsSkillTestExist: boolean;
  TotalSkillTestCount: number;
  CompletedSkillTestCount: number;
  SkillTestProgress: number; // decimal
}

export interface LiveSessionsProgressCardDTO {
  UserId: number; // long
  UserName?: string;
  LiveSessionProgress: number; // decimal
  TotalLiveSessions: number;
  CompletedLiveSessions: number;
  CourseName?: string;
  CourseId: number;
  UserEmail?: string;
  BatchId: number;
  BatchCode?: string;
  StartDate: Date;
  BatchTiming: Date;
}

export interface SubscriptionDTO {
  SubscriptionId: number;
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  MobileNo: string;
  ModeId: number;
  Mode: string;
  CourseId: number;
  Course: string;
  SubscribeDate: Date;
  ExpiryDate: Date;
  StrSubscribeDate: string;
  StrExpiryDate: string;
  IsActive?: boolean;
  MemberDetails?: MemberDTO; // Replace with proper MemberDTO interface if available
  BatchId: number;
  VideoAccess: number;
  CourseShortDescription: string;
  TrainingDuration: string;
  Url: string;
  DocumentId: number;
  DocumentUrl: string;
  LargeBanner: string;
  MobileBanner: string;
  SmallBanner: string;
  Summary: string;
  Reviews: number;
  Learners: string;
  TrainingModeId: number;
  TrainingMode: string;
  TrainingModeList: TrainingMode; // Replace with proper TrainingMode interface if available
  SubscriptionType: boolean;
  CertificateId: string;
  CourseType: number;
  CourseUpdatedDate: string;
  CoursePublishedDate: string;
  IsLiveSessionAccess: boolean;
  SessionAccessExpiry?: Date;
  FirstSubscribedTabName: string;
  IsFree: number;
  Status: string;
  CourseTypeName: string;
  SubscriptionTypeId: number;
  CourseList: CourseDTO[]; // Replace with proper CourseDTO interface if available
  CourseContents: string;
}

export interface MemberDTO {
  MemberId: number;
  Name: string;
  Password: string;
  ConfirmPassword: string;
  Email: string;
  ContactNo: string;
  MobileNo: string;
  ProfilePic: string;
  ProfilePicDomain: string;
  File?: any;
  MailSentCounter?: number;
  EncriptedKey: string;
  VerificationUrl: string;
  IsActive?: boolean;
  IsArchived: boolean;
  CreatedDate: Date;
  UpdatedDate?: Date;
  LockoutDate?: Date;
  LoginFailedCount: number;
  IsLockedOut: boolean;
  IsVerified?: boolean;
  VerificationDate?: Date;
  Designation: string;
  Company: string;
  Biography: string;
  CurrentLocation: string;
  Roles: string[];
  GenderId?: number;
  GenderList: GenderMaster[];
  GenderName: string;
  CourseId: number;
  CourseName: string;
  CourseList: CourseDTO[]; // Replace with proper CourseDTO interface if available
  TrainingModeId: number;
  TrainingMode: string;
  TrainingModeList: TrainingMode[]; // Replace with proper TrainingMode interface if available
  ExpiryDate: Date;
  LinkedIn: string;
  Twitter: string;
  Facebook: string;
  Skype: string;
  Code: string;
  DomainName: string;
  Skills: string;
  InterestedSkills: string;
  MembershipIdLive: number;
  MembershipExpiryLive: Date;
  MembershipId: number;
  Plan: string;
  ProviderName: string;
  MembershipExpiry: Date;
  SelectedSkills: SkillMasterDTO[]; // Replace with proper SkillMaster interface if available
  SelectedInterestSkills: SkillMasterDTO[]; // Replace with proper SkillMaster interface if available
  SkillList: SelectListItem[]; // Replace with proper SelectListItem interface if available
  SkillInterestList: SelectListItem[]; // Replace with proper SelectListItem interface if available
}

export interface Notes {
  Notes_key_1?: string;
  Notes_key_2?: string;
}

export interface LiveVideoTrackingDTO {
  Id: number;
  CourseId: number;
  BatchId: number;
  TopicId: number;
  VideoTotalTime?: string;
  VideoPlayTime: number; // decimal
  VideoPlayDate: Date;
  UserId: number; // long
  IsVideoEnded: boolean;
}

export interface SelfPlacedVideoTrackingDTO {
  Id: number;
  CourseId: number;
  SubTopicId: number;
  TopicId: number;
  VideoTotalTime?: string;
  VideoPlayTime: number; // decimal
  VideoPlayDate: Date;
  UserId: number; // long
  IsVideoEnded: boolean;
}

export interface ContentBookMarksDTO {
  BookMarkId: number;
  UserId: number; // long
  CourseId: number;
  ContentId: number;
  CourseType: number;
  CreatedOn: Date;
}

export interface CertificateMaster {
  Id: number; // long, Key
  CertificateId?: string;
  MemberId: number; // long
  Name?: string;
  CourseId: number;
  CourseName?: string;
  DomainName?: string;
  IssueDate: Date;
  CreatedDate: Date;
  Grade?: string;
  IsActive?: boolean;
  CertificateType: number;
  Duration?: string;
  Medal: number;
  PathUrl?: string;
  ContactNo?: string;
  EmailID?: string;
  DisIssueDate?: string; // NotMapped
  AuthorsId?: string; // NotMapped
  CertificateTypeName?: string; // NotMapped
  CertificateImage?: string;
}

export interface LabTrackingDTO {
  Id: number;
  CourseId: number;
  BatchId: number;
  LabId: number;
  UserId: number; // long
  IsComplete: boolean;
  StartDate: Date;
  CompletedDate: Date;
}

export interface QuickNoteTrackingDTO {
  Id: number;
  CourseId: number;
  BatchId: number;
  QuickNoteId: number;
  UserId: number; // long
  IsComplete: boolean;
  StartDate: Date;
  CompletedDate?: Date; // Nullable DateTime
}

export interface ContentDownloadHistoryDTO {
  MemberId: number; // long
  MemberName?: string;
  Email?: string;
  MembershipId?: number; // long, nullable
  MembershipName?: string;
  CourseId?: number; // nullable
  CourseName?: string;
  TopicId?: number; // nullable
  TopicName?: string;
  SubTopicId?: number; // nullable
  SubTopicName?: string;
  ContentType?: string;
  ContentName?: string;
  DownloadDate: Date;
  CourseType: number;
}

export interface CourseDetailsDTO {
  CourseId: number;
  Name?: string;
  Title?: string;
  Summary?: string;
  Description?: string;
  MentorId: number;
  Mentors?: string;
  Url?: string;
  Sequence?: number; // decimal, nullable
  TagLine?: string;
  Id: number;
  H1Tag?: string;
  CourseType: number;
  Duration?: string;
  CreatedDate: Date;
  UpdatedDate: Date;
  WhyUsContents?: string;
  DifficultyLevelId: number;
  DifficultyTypeId: number;
  DifficultyTypeName?: string;
  CourseTopics?: CourseTopicDTO[];
  MentorList?: MentorMasterDTO[];
  MobileBanner?: string;
  SmallBanner?: string;
  TotalLessons: number;
  LearntCount: number;
  Learners?: string;
  CourseWisePerformance: number; // decimal
  IsSelfPlacedVideoSubscribed: boolean;
  IsTrialSubscribed: boolean;
  CourseURL?: string;
  ParentCourseId: number;
  CompletedVideoCount: number;
}

export interface CoursePlanDetailDTO {
  CourseContentList?: CourseSubTopicDTO[];
  CourseURL?: string;
  IsSelfPlacedVideoSubscribed: boolean;
  IsQnASubscribed: boolean;
  IsProjectSubscribed: boolean;
  IsTrialSubscribed: boolean;
  CourseWisePerformance: number;
  TotalLessons: number;
  CompletedLessons: number;
  IsLabSubscribed: boolean;
  Labs?: LabDTO[];
  QuickNotes?: QuickNotesDTO[];
  CourseLabs?: CourseLabDTO[];
  CourseQuickNote?: CourseQuickNoteDTO[];
  TotalCompletedLabs: number;
  TotalLabs: number;
  TotalCompletedQuickNotes: number;
  TotalQuickNotes: number;
  LabProgress: number; // decimal
  QuickNoteProgress: number; // decimal
  IsQuickNoteSubscribed: boolean;
  CoursePlansList?: CoursePlanDTO[];
}

export interface CoursePlanDTO {
  PlanId: number;
  CourseId: number;
  CourseName?: string;
  ModuleId: string;
  PlanName: string;
  Sequence: number;
  CreatedDate: Date;
  ModuleNames?: string;
  VideoList?: CourseContentDTO[];
  LabList?: CourseLabDTO[];
  QuicknoteList?: CourseQuickNoteDTO[];
  StartDate: Date;
  EndDate: Date;
  BatchId: number;
  BatchCode?: string;
}

export interface PagingBatchMasterDTO<T> extends Paging<T> {
  TotalAmount: number;
}

export interface QuestionOptionsDTO {
  QuestionOptionId: number;
  QuestionId: number;
  OptionChar?: string;
  OptionTitle?: string;
  IsActive: boolean;
}

export interface QuestionBankOptionsDTO {
  QuestionId: number;
  Title?: string;
  QuestionOptions?: QuestionOptionsDTO[];
  CorrectOption?: string;
  QuestionTypeId: number;
  DifficultyType: number;
  DifficultyLevel: number;
  CategoryId: number;
  CategoryName?: string;
  SubCategoryId: number;
  SubCategoryName?: string;
  TestPaperTitle?: string;
  UsersSelectedAnswer?: string;
  TestPaperId: number;
  Sequence?: number; // decimal, nullable
  Duration: number;
  TotalQuestions: number;
  BatchId: number;
  UserId: number; // long
  Mins: number;
  Secs: number;
  AttemptedQuestionCount: number;
  CorrectQuestions: number;
  WrongQuestions: number;
  LeftQuestions: number;
  Score: number;
  Percentage: number; // decimal
  IsPass: boolean;
  DifficultyTypeName?: string;
  IsCorrectAns: boolean;
  AnswerExplanation?: string;
  MobileBanner?: string;
  QuestionN: number;
}

export interface AppliedJobDTO {
  Id: number;
  JobId: number;
  JobTitle?: string;
  RequiredSkills?: string;
  JobLocation?: string;
  Experience?: string;
  CompanyName?: string;
  UserName?: string;
  UserEmail?: string;
  UserMobile?: string;
  SubmitedDate: Date;
  IsActive: boolean;
  Resume?: string;
}

export interface UserProgressReportDTO {
  CourseName?: string;
  CourseId: number;
  LiveSessionsProgressCard?: LiveSessionsProgressCardDTO[];
  ProgressCards?: ProgressCardDTO[];
  UserName?: string;
  UserEmail?: string;
}