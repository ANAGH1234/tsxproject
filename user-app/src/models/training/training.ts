import type { AssignedTestDTO, CourseContentDTO, CourseDTO, CourseLabDTO, CourseQuickNoteDTO, CourseSubTopicDTO, CourseTopicDTO, GenderMaster, LabDTO, MentorMasterDTO, Paging, QuickNotesDTO, SelectListItem, SkillMasterDTO, SubscribedCourseTypesDTO } from "../dashboard/dashboard";

    export interface SubscribeCourseDetailDTO {
      batchId: number;
      batchName?: string;
      mentorName?: string;
      courseId: number;
      courseName?: string;
      curdetails?: string;
      mode: number;
      subtopic: number;
      flag: boolean;
      assingMockList?: AssignedMockUpTestDTO[];
      assingTestList?: AssignedTestDTO[];
      curRecTopiclist?: CourseLiveSessionVideo[];
      curRecTopiclistMaster?: CourseLiveSessionVideo[];
      curPreRecTopiclist?: CourseTopicDTO[];
      courseSubsType: boolean;
      videoAccess: number;
      reason?: string;
      courseType: number;
      subCourseDetailsList?: MaterCourseCurriculum[];
      batchIdLive: number;
      batchLiveList: BatchMasterDTO[];
      batchWisePerformace: number; 
      isLiveSessionsSubscribed: boolean;
      isTrialSubscribed: boolean;
      isTestPaperSubscribed: boolean;
      courseURL?: string;
      totalLessons: number;
      completedLessons: number;
      totalTestCount: number;
      completedTestCount: number;
      testPerformance: number; // decimal
    }



    export interface AssignedMockUpTestDTO {
        mockupTestAssignedBatchDetailId: number;
        assessmentId: number;
        mockupTestId: number;
        batchId: number;
        batchName?: string;
        courseId: number;
        courseName?: string;
        assignmentUrl?: string;
        mockupTestTitle?: string;
        duration: number;
        totalQuestion: number;
        assignedDate?: string;
        fromDate: Date; // DateTime
        fromDateDisplay?: string;
        toDate: Date; // DateTime
        toDateDisplay?: string;
        assignmentFromDate: Date; // DateTime
        assignmentFromDateDisplay?: string;
        assignmentToDate: Date; // DateTime
        assignmentToDateDisplay?: string;
        mockupTestAlreadyTaken: number;
        sequence: number; // decimal
      }




        export interface CourseLiveSessionVideo {
          liveTopicId: number; // Key
          topicName: string; // Required
          description?: string; // AllowHtml
          urlPath: string; // Required
          codePath?: string;
          isLock: boolean;
          duration: string; // Required
          sequence: number; // decimal
          isActive: boolean;
          pdfPath?: string;
          batchId: number; // Required
          courseId: number;
          isMailed: boolean;
          createdDate?: Date;
          strCreatedDate?: string; // NotMapped
          courseName?: string; // NotMapped
          file?: File; // NotMapped, for file upload
          batchCode?: string; // NotMapped
          oldCodePath?: string; // NotMapped
          courseSmallBanner?: string; // NotMapped
          liveVideoProgress?: number; // NotMapped, decimal
          isVideoCompleted?: boolean; // NotMapped
          videoPlayTime?: number; // NotMapped, decimal
          batchWisePerformace?: number; // NotMapped, decimal
          isTrialSubscription?: boolean; // NotMapped
          durationInSeconds: number; // long
        }

        export interface MaterCourseCurriculum {
          cId: number; // Key
          title?: string;
          courseId: number;
          subCourseId: number;
          description?: string; // AllowHtml
          sequence: number;
          url?: string;
          isActive?: boolean;
          mode: number;
          isElective: number;
          courseName?: string; // NotMapped
          modeName?: string; // NotMapped
          imgurl?: string; // NotMapped
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
    userId: number; // long
    userName?: string;
    liveSessionProgress: number; // decimal
    videoCourseProgress: number; // decimal
    labProgress: number; // decimal
    qnAProgress: number; // decimal
    projectProgress: number; // decimal
    quickNoteProgress: number; // decimal
    totalLiveLessons: number;
    completedLiveLessons: number;
    totalVideoCourse: number;
    completedVideoCourse: number;
    totalLab: number;
    totalQnA: number;
    totalProject: number;
    totalQuickNote: number;
    completedLab: number;
    courseName?: string;
    courseId: number;
    isGenerateCertificate: boolean;
    certificateId: number; // long
    userEmail?: string;
    displayCourseContent?: SubscribedCourseTypesDTO;
    totalCompletedVideo: number;
    totalCompletedLab: number;
    totalCompletedQnA: number;
    totalCompletedProject: number;
    totalCompletedQuickNote: number;
    liveSessionsProgressCardList?: LiveSessionsProgressCardDTO[];
    isSessionExist: boolean;
    isVedioExist: boolean; // Note: Typo 'Vedio' retained from C#
    isLabExist: boolean;
    isQuickNoteExist: boolean;
    isSkillTestExist: boolean;
    totalSkillTestCount: number;
    completedSkillTestCount: number;
    skillTestProgress: number; // decimal
  }


  export interface LiveSessionsProgressCardDTO {
    userId: number; // long
    userName?: string;
    liveSessionProgress: number; // decimal
    totalLiveSessions: number;
    completedLiveSessions: number;
    courseName?: string;
    courseId: number;
    userEmail?: string;
    batchId: number;
    batchCode?: string;
    startDate: Date;
    batchTiming: Date;
  }
  export interface SubscriptionDTO {
    subscriptionId: number;
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    modeId: number;
    mode: string;
    courseId: number;
    course: string;
    subscribeDate: Date;
    expiryDate: Date;
    strSubscribeDate: string;
    strExpiryDate: string;
    isActive?: boolean;
    // Assuming MemberDTO is another interface/type
    memberDetails?:MemberDTO; // Replace with proper MemberDTO interface if available
    batchId: number;
    videoAccess: number;
    courseShortDescription: string;
    trainingDuration: string;
    url: string;
    documentId: number;
    documentUrl: string;
    largeBanner: string;
    mobileBanner: string;
    smallBanner: string;
    summary: string;
    reviews: number;
    learners: string;
    // Required field with error message: "Please select training mode"
    // Display name: "Training Mode"
    trainingModeId: number;
    // Display name: "Training Mode"
    trainingMode: string;
    // Assuming TrainingMode is another interface/type
    trainingModeList: TrainingMode; // Replace with proper TrainingMode interface if available
    subscriptionType: boolean;
    certificateId: string;
    courseType: number;
    courseUpdatedDate: string;
    coursePublishedDate: string;
    isLiveSessionAccess: boolean;
    sessionAccessExpiry?: Date;
    firstSubscribedTabName: string;
    isFree: number;
    status: string;
    courseTypeName: string;
    subscriptionTypeId: number;
    // Assuming CourseDTO is another interface/type
    courseList: CourseDTO[]; // Replace with proper CourseDTO interface if available
    courseContents: string;
}



export interface MemberDTO {
  memberId: number;

  
  name: string;

 
  password: string;

  confirmPassword: string;

  
  email: string;

  contactNo: string;

  mobileNo: string;
  profilePic: string;
  profilePicDomain: string;

  
  file?: any; 

  mailSentCounter?: number;
  encriptedKey: string;
  verificationUrl: string;
  isActive?: boolean;
  isArchived: boolean;
  createdDate: Date;
  updatedDate?: Date;
  lockoutDate?: Date;
  loginFailedCount: number;
  isLockedOut: boolean;
  isVerified?: boolean;
  verificationDate?: Date;

  
  designation: string;

  company: string;

  biography: string;

  currentLocation: string;

  roles: string[];
  genderId?: number;

  genderList: GenderMaster[];

  genderName: string;

  // Required: "Please select course", Display: "Course"
  courseId: number;

  // Display: "Course Name"
  courseName: string;

  // Assuming CourseDTO is another interface/type
  courseList:CourseDTO[]; // Replace with proper CourseDTO interface if available

  // Required: "Please select training mode", Display: "Training Mode"
  trainingModeId: number;

  // Display: "Training Mode"
  trainingMode: string;

  // Assuming TrainingMode is another interface/type
  trainingModeList: TrainingMode[]; // Replace with proper TrainingMode interface if available

  expiryDate: Date;
  linkedIn: string;
  twitter: string;
  facebook: string;
  skype: string;
  code: string;
  domainName: string;
  skills: string;
  interestedSkills: string;
  membershipIdLive: number;
  membershipExpiryLive: Date;
  membershipId: number;
  plan: string;
  providerName: string;
  membershipExpiry: Date;

  // Assuming SkillMaster is another interface/type
  selectedSkills: SkillMasterDTO[]; // Replace with proper SkillMaster interface if available
  selectedInterestSkills: SkillMasterDTO[]; // Replace with proper SkillMaster interface if available

  // Assuming SelectListItem is another interface/type
  skillList: SelectListItem[]; // Replace with proper SelectListItem interface if available
  skillInterestList: SelectListItem[]; // Replace with proper SelectListItem interface if available
}

    export interface Notes {
      notes_key_1?: string;
      notes_key_2?: string;
    }



        export interface LiveVideoTrackingDTO {
          id: number;
          courseId: number;
          batchId: number;
          topicId: number;
          videoTotalTime?: string;
          videoPlayTime: number; // decimal
          videoPlayDate: Date;
          userId: number; // long
          isVideoEnded: boolean;
        }

        export interface SelfPlacedVideoTrackingDTO {
          id: number;
          courseId: number;
          subTopicId: number;
          topicId: number;
          videoTotalTime?: string;
          videoPlayTime: number; // decimal
          videoPlayDate: Date;
          userId: number; // long
          isVideoEnded: boolean;
        }

        export interface ContentBookMarksDTO {
          bookMarkId: number;
          userId: number; // long
          courseId: number;
          contentId: number;
          courseType: number;
          createdOn: Date;
        }

        export interface CertificateMaster {
          id: number; // long, Key
          certificateId?: string;
          memberId: number; // long
          name?: string;
          courseId: number;
          courseName?: string;
          domainName?: string;
          issueDate: Date;
          createdDate: Date;
          grade?: string;
          isActive?: boolean;
          certificateType: number;
          duration?: string;
          medal: number;
          pathUrl?: string;
          contactNo?: string;
          emailID?: string;
          disIssueDate?: string; // NotMapped
          authorsId?: string; // NotMapped
          certificateTypeName?: string; // NotMapped
          certificateImage?: string;
        }

        export interface LabTrackingDTO {
          id: number;
          courseId: number;
          batchId: number;
          labId: number;
          userId: number; // long
          isComplete: boolean;
          startDate: Date;
          completedDate: Date;
        }

        export interface QuickNoteTrackingDTO {
          id: number;
          courseId: number;
          batchId: number;
          quickNoteId: number;
          userId: number; // long
          isComplete: boolean;
          startDate: Date;
          completedDate?: Date; // Nullable DateTime
        }

        export interface ContentDownloadHistoryDTO {
          memberId: number; // long
          memberName?: string;
          email?: string;
          membershipId?: number; // long, nullable
          membershipName?: string;
          courseId?: number; // nullable
          courseName?: string;
          topicId?: number; // nullable
          topicName?: string;
          subTopicId?: number; // nullable
          subTopicName?: string;
          contentType?: string;
          contentName?: string;
          downloadDate: Date;
          courseType: number;
        }
        export interface CourseDetailsDTO {
            courseId: number;
            name?: string;
            title?: string;
            summary?: string;
            description?: string;
            mentorId: number;
            mentors?: string;
            url?: string;
            sequence?: number; // decimal, nullable
            tagLine?: string;
            id: number;
            h1Tag?: string;
            courseType: number;
            duration?: string;
            createdDate: Date;
            updatedDate: Date;
            whyUsContents?: string;
            difficultyLevelId: number;
            difficultyTypeId: number;
            difficultyTypeName?: string;
            courseTopics?: CourseTopicDTO[];
            mentorList?: MentorMasterDTO[];
            mobileBanner?: string;
            smallBanner?: string;
            totalLessons: number;
            learntCount: number;
            learners?: string;
            courseWisePerformance: number; // decimal
            isSelfPlacedVideoSubscribed: boolean;
            isTrialSubscribed: boolean;
            courseURL?: string;
            parentCourseId: number;
            completedVideoCount: number;
        }


            export interface CoursePlanDetailDTO {
              courseContentList?: CourseSubTopicDTO[];
              courseURL?: string;
              isSelfPlacedVideoSubscribed: boolean;
              isQnASubscribed: boolean;
              isProjectSubscribed: boolean;
              isTrialSubscribed: boolean;
              courseWisePerformance: number;
              totalLessons: number;
              completedLessons: number;
              isLabSubscribed: boolean;
              labs?: LabDTO[];
              quickNotes?: QuickNotesDTO[];
              courseLabs?: CourseLabDTO[];
              courseQuickNote?: CourseQuickNoteDTO[];
              totalCompletedLabs: number;
              totalLabs: number;
              totalCompletedQuickNotes: number;
              totalQuickNotes: number;
              labProgress: number; // decimal
              quickNoteProgress: number; // decimal
              isQuickNoteSubscribed: boolean;
              coursePlansList?: CoursePlanDTO[];
            }

            export interface CoursePlanDTO {
              planId: number;
              courseId: number;
              courseName?: string;
              moduleId: string;
              planName: string;
              sequence: number;
              createdDate: Date;
              moduleNames?: string;
              videoList?: CourseContentDTO[];
              labList?: CourseLabDTO[];
              quicknoteList?: CourseQuickNoteDTO[];
              startDate: Date;
              endDate: Date;
              batchId: number;
              batchCode?: string;
            }


            export interface PagingBatchMasterDTO<T> extends Paging<T> {
              TotalAmount: number;
            }

                export interface QuestionOptionsDTO {
                  questionOptionId: number;
                  questionId: number;
                  optionChar?: string;
                  optionTitle?: string;
                  isActive: boolean;
                }

                export interface QuestionBankOptionsDTO {
                  questionId: number;
                  title?: string;
                  questionOptions?: QuestionOptionsDTO[];
                  correctOption?: string;
                  questionTypeId: number;
                  difficultyType: number;
                  difficultyLevel: number;
                  categoryId: number;
                  categoryName?: string;
                  subCategoryId: number;
                  subCategoryName?: string;
                  testPaperTitle?: string;
                  usersSelectedAnswer?: string;
                  testPaperId: number;
                  sequence?: number; // decimal, nullable
                  duration: number;
                  totalQuestions: number;
                  batchId: number;
                  userId: number; // long
                  mins: number;
                  secs: number;
                  attemptedQuestionCount: number;
                  correctQuestions: number;
                  wrongQuestions: number;
                  leftQuestions: number;
                  score: number;
                  percentage: number; // decimal
                  isPass: boolean;
                  difficultyTypeName?: string;
                  isCorrectAns: boolean;
                  answerExplanation?: string;
                  mobileBanner?: string;
                  questionN: number;
                }

                export interface AppliedJobDTO {
                    id: number;
                    jobId: number;
                    jobTitle?: string;
                    requiredSkills?: string;
                    jobLocation?: string;
                    experience?: string;
                    companyName?: string;
                    userName?: string;
                    userEmail?: string;
                    userMobile?: string;
                    submitedDate: Date;
                    isActive: boolean;
                    resume?: string;
                }

                export interface UserProgressReportDTO {
                    courseName?: string;
                    courseId: number;
                    liveSessionsProgressCard?: LiveSessionsProgressCardDTO[];
                    progressCards?: ProgressCardDTO[];
                    userName?: string;
                    userEmail?: string;
                  }




