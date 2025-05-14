export type SendVerifyLinkResponse = number;

export interface MemberNotificationsDTO {
    NewCourseRelease: TopNotificationsDTO[];
    NewEbookRelease: TopNotificationsDTO[];
    UpcomingWebinars: TopNotificationsDTO[];
    NotificationCount: number;
}

export interface TopNotificationsDTO {
    URL: string;
    Name: string;
    Date: string;
}

export interface ShoppingCartDTO {
    ShoppingCartDataId: number;
    UserId: number;
    TotalCount: number;
    CourseId: number;
    CourseType: number;
    CourseTypeName: string;
    Name: string;
    Price: number;
    DiscountPercentage: number;
    CartsItemId: number;
    NetPrice: number;
    MobileImage: string;
    IsOnSale: boolean;
    SalePercentage: number;
    SaleOffAmount: number;
    AfterSale: number;
    TotalDiscountPercentage: number;
    TotalDiscountPercentageAmount: number;
    DiscountId: number;
    CouponCode: string;
    UserName: string;
    UserEmail: string;
    UserContact: string;
    DateCreated: Date;
    CourseName: string;
    Source: string;
    FinalInWithTax: number;
    FinalUsWithTax: number;
    TotalWithTax: number;
    ServiceTaxTot: number;
    ServiceTax: number;
    TotalSavingTax: number;
    Date: string;
    IsActive: boolean;
    CourseIds: number;
}

export interface CartsItemsDTO {
    CartsItemId: number;
    CourseId: number;
    Quantity: number;
    ShoppingCartDataId: number;
    DateCreated: Date | null;
    DateUpdate: Date | null;
    ShoppingCart?: ShoppingCartDTO;
}

export interface DashboardCoursesCountDTO {
    LiveTrainingCount: number;
    CoursesCount: number;
    CertificatesCount: number;
    LiveSessionsCount: number;
    BatchSchedulesCount: number;
    JobCount: number;
    ArticleCount: number;
    MasterClassesCount: number;
    PointsCount: number;
}

export interface UserPointsDTO {
    CourseId: number;
    CourseName: string;
    Type: number;
    Points: number | null;
    ContentId: number | null;
    TypeName: string;
    LiveSessionPoints: number | null;
    VideoPoints: number | null;
    LabPoints: number | null;
}

export interface DashboardVideoProgressDTO {
    CourseId: number;
    CourseName: string;
    SubscriptionId: number;
    CourseContentId: number;
    VideoProgress: number;
}

export interface SelfPacedVideoDTO {
    CourseContentList: CourseContentDTO[];
    CourseTopics: CourseTopicDTO[];
    CourseUrl: string;
    IsSelfPlacedVideoSubscribed: boolean;
    IsQnASubscribed: boolean;
    IsProjectSubscribed: boolean;
    IsTrialSubscribed: boolean;
    CourseWisePerformance: number;
    TotalLessons: number;
    CompletedLessons: number;
}

export interface CourseContentDTO {
    CourseId: number;
    Name: string;
    Title: string;
    Summary: string;
    Description: string;
    Url: string;
    Sequence: number | null;
    CourseType: number;
    Duration: string;
    CourseCount: number;
    CourseTypeName: string;
    CourseTopics: CourseTopicDTO[];
    CourseWisePerformance: number;
    IsSelfPlacedVideoSubscribed: boolean;
    CourseUrl: string;
    CourseContentId: number;
    TopicCount: number;
    SubTopicCount: number;
    SubscriptionId: number;
    ParentCourseId: number;
    IsSubscribed: boolean;
    ModuleAccess: boolean;
    PlanId: number;
}

export interface CourseTopicDTO {
    TopicId: number;
    CourseId: number;
    TopicName: string;
    IsActive: boolean;
    Sequence: number;
    TopicTypeId: number;
    QuizId: number;
    TotalTime: string;
    AllTimeDuration: string;
    CourseType: number;
    CourseName: string;
    TopicTypeName: string;
    Subtopics: CourseSubTopicDTO[];
    QuizDDL: DropDownDTO[];
}

export interface LabDTO {
    LabId: number;
    Name: string;
    Title: string;
    LabType: number;
    Url: string;
    Summary: string;
    Description: string;
    Problem: string;
    Solution: string;
    SolutionPdf: string;
    SmallBanner: string;
    MobileBanner: string;
    Keywords: string;
    MentorId: number;
    Mentors: string;
    Sequence: number;
    DomainName: string;
    DifficultyTypeId: number;
    LearningPoints: number;
    Duration: string;
    CategoryId: number;
    CategoryName: string;
    Role: number;
    SourceCode: string;
    Skills: string;
    PublishedDate: Date;
    UpdatedDate: Date | null;
    IsActive: boolean;
    IsFree: boolean;
    MentorMasterList: MentorMasterDTO[];
    CategoryDDL: CategoryDTO[];
    SkillsList: SkillMasterDTO[];
    SkillName: string[];
    Small: any;
    Mobile: any;
    IsFreeText: string;
    CourseId: number;
    CourseName: string;
    ModuleName: string;
    CourseLabId: number;
    ContentId: number;
    ContentName: string;
    OldSolutionPath: string;
    DifficultyTypeName: string;
    LabSolutionUrl: string;
    BatchId: number;
    IsLabSubmit: boolean;
    LabTypeName: string;
    MentorName: string;
    IsBookMarked: boolean;
    SubscriptionId: number;
    IsLabCompleted: boolean;
    IsLabStarted: boolean;
    CourseUrl: string;
    IsSubscribed: boolean;
    ParentCourseId: number;
    ParentCourseType: number;
    LabCount: number;
    Performance: number;
    UserId: number;
    CompletedLabCount: number;
    Courses: string;
    PlanId: number;
    Access: boolean;
}

export interface CourseLabDTO {
    LabList: LabDTO[];
    ContentId: number;
    ContentName: string;
    Sequence: number | null;
    LabCount: number;
    CompletedLabCount: number;
    CourseUrl: string;
    ModuleAccess: boolean;
    PlanId: number;
}

export interface UserTranningDTO {
    IsLabSubscribed: boolean;
    Labs: LabDTO[];
    QuickNotes: QuickNotesDTO[];
    CourseUrl: string;
    CourseLabs: CourseLabDTO[];
    CourseQuickNote: CourseQuickNoteDTO[];
    InterviewQuestionList: InterviewQuestionDto[];
    TotalCompletedLabs: number;
    TotalLabs: number;
    TotalCompletedQuickNotes: number;
    TotalQuickNotes: number;
    LabProgress: number;
    QuickNoteProgress: number;
    IsTrialSubscribed: boolean;
    IsQuickNoteSubscribed: boolean;
    IsQnASubscribed: boolean;
    IsBookSubscribed: boolean;
    IsQnAVideoExists: boolean;
    IsQnATextExists: boolean;
}

export interface CourseQuickNoteDTO {
    QuickNoteList: QuickNotesDTO[];
    InterviewQuestionList: InterviewQuestionDto[];
    ContentId: number;
    ContentName: string;
    Sequence: number | null;
    QuickNoteCount: number;
    QnANoteCount: number;
    CompletedQuickNoteCount: number;
    CourseUrl: string;
    PlanId: number;
    Access: boolean;
}

export interface InterviewQuestionDto {
    Id: number | null;
    Title: string;
    Description: string | null;
    Sequence: number;
    DomainName: string;
    Duration: string | null;
    IsFree: boolean | null;
    IsActive: boolean | null;
    Url: string | null;
    MentorId: number | null;
    DifficultyTypeId: number | null;
    CategoryId: number | null;
    CourseId: number | null;
    TotalQuestions: number;
    MentorMasterList: MentorMasterDTO[];
    CategoryDDL: CategoryDTO[];
    DifficultyTypeName: string;
    CategoryName: string;
    MentorName: string;
    CourseName: string;
    IsQnATextCompleted: boolean;
    IsQnATextStarted: boolean;
    IsBookMarked: boolean;
    QnACount: number;
    CompletedQnACount: number;
    Performance: number;
    QnATextPagingList: QnATextPagingDTO[];
    CurrentPageIndex: number;
    TotalQnA: number;
}

export interface TransactionDTO {
    Id: number;
    PaymentId: string;
    TransactionId: string;
    SubscriptionId: string;
    Uid: string;
    CourseId: number;
    CourseName: string;
    CustomerName: string;
    CurrentLocation: string;
    ContactNo: string;
    Email: string;
    ServiceCode: string;
    Price: number;
    Discount: number;
    NetPrice: number;
    ServiceTax: number;
    Total: number;
    Currency: string;
    PaymentGateway: string;
    Status: string;
    CreatedDate: Date;
    UpdatedDate: Date;
    DisUpdatedDate: string;
    MemberId: number;
    TransactionList: TransactionDTO[];
    ModeId: number;
    TotalInrDisp: number;
    TotalUsdDisp: number;
    IsInvoice: boolean;
    CourseType: number;
    StateCode: number | null;
    Country: string;
    Address: string;
    DiscountCoupon: string;
    ParentId: number;
    InstallmentDetails: InstallmentDetails_V1;
    TransactionChildDetailsList: TransactionChildDetails_V1[];
    Igst: number;
    Cgst: number;
    Sgst: number;
    IgstPercent: number;
    CgstPercent: number;
    SgstPercent: number;
    ServiceTaxPercentage: number;
    Igstr: number;
    Cgstr: number;
    Sgstr: number;
    StateTaxId: number;
    RoundOff: number;
    Gst: string;
    Pan: string;
    InvoiceType: number;
    DiscountId: number;
    DiscountApplied: boolean | null;
    TotalDiscountPercentageAmount: number;
    CompanyDetail: string;
    IsInstallment: boolean;
    InstallmentId: number;
    InvoiceNo: string;
    IsGst: boolean;
    IsCancelled: number;
    UrlSource: string;
    StateName: string;
    PathUrl: string;
    CreatedBy: number;
    CreatedFor: number | null;
    InstallmentName: string;
    RazorpayKey: string;
    OrderId: string;
    PaymentSalesLogDetails: PaymentSalesLogDTO;
    PaymentSalesClaimList: PaymentSalesLogDTO[];
    SalesManName: string;
    DomainName: string;
    Refunded: boolean;
}

export interface PaymentSalesLogDTO {
    Id: number;
    InvoiceNo: number;
    CustomerName: string;
    Email: string;
    ContactNo: string;
    Amount: number;
    Currency: string;
    SalesManId: number;
    SalesManName: string;
    Status: number;
    IsCancelled: boolean;
    Remark: string;
    VerifiedBy: number;
    CreatedDate: Date;
    CreatedDateDis: string;
    UpdatedDate: Date | null;
    ProofUrl: string;
    TransactionId: string;
    CourseName: string;
    Courses: string[];
    UrlSource: string;
}

export interface GenerateInvoiceResponse {
    Success: boolean;
}

export interface CourseDisplayDTO {
    Id: number;
    Name: string;
    Title: string;
    H1Tag: string;
    MetaKeyword: string;
    MetaDescription: string;
    Description: string;
    Url: string;
    SmallBanner: string;
    MobileBanner: string;
    Sequence: number;
    Reviews: number;
    FooterDetails: string;
    DemoUrl: string;
    CourseType: number;
    CourseId: number;
    DifficultyTypeId: number;
    Duration: string;
    DomainName: string;
    CategoryList: string;
    PublishedDate: Date;
    UpdatedDate: Date;
    IsFree: number;
    IsActive: boolean | null;
    PriceCollection: PriceCollectionDTO[];
    Price: number;
    Large: any;
    Small: any;
    Mobile: any;
    CourseList: CourseDTO[];
    SelectedCategories: SelectListItemDTO[];
    IsQnASubscribed: boolean;
    QnACount: number;
    IsLabSubscribed: boolean;
    CourseContentList: CourseContentDTO[];
    QnContentList: CourseContentDTO[];
    LabCount: number;
    CourseContents: string;
    Currency: string;
    LabsList: LabDTO[];
    CourseDetailList: CourseDetailDTO[];
    demoList: VideoModelListDTO[];
    isQuickNoteSubscribed: boolean;
    quickNotesList: QuickNotesDTO[];
    quickNotesCount: number;
    isTestPaperSubscribed: boolean;
    testPaperList: AssignedTestDTO[];
    testPaperCount: number;
}

export interface TestPapersDTO {
    TestPaperId: number;
    Title: string;
    TotalQuestions: number;
    DifficultyType: string;
    DifficultyTypeId: number;
    Duration: number;
    QuestionTypeId: number;
    Url: string;
    Description: string;
    Keyword: string;
    CategoryId: number;
    SubCategoryId: number | null;
    Role: number;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date | null;
    IsActive: boolean;
    TestPaperInstructionId: number;
    IsTestTaken: boolean;
    MobileBanner: string;
    QuestionAdded: number | null;
    CourseId: number;
    Score: number | null;
    Percentage: number | null;
    TotalDurationList: QuestionPaperDuration[];
    TotalQuestionList: QuestionPaperTotalQuestionDTO[];
    CategoryList: CategoryDTO[];
    DifficultyTypeList: [];
    QuestionTypes: QuestionTypes[];
    TestAttemptedStatus: TestAttemptedStatusDTO[];
    CatImage: string;
    TopScore: number;
    CountMemberList: number;
    Mapcat: number;
    Details: string;
    TestPaperType: number | null;
    TestPaperTypeText: string;
}

export interface CourseCategoryDTO {
    CourseCategoryId: number;
    CourseCategoryName: string;
    Description: string;
    CreatedDate: Date | null;
    UpdatedDate: Date | null;
    DomainName: string;
    IsActive: boolean;
    CurType: number;
    CourseCount: number;
    CourseMenu: CourseMenuDTO[];
    Courses: CourseDTO[];
    SelectedAreas: CourseDTO[];
    CoursesList: SelectListItemDTO[];
    Course: CourseDTO;
    ArtcatList: SelectListItemDTO[];
    Categories: CategoryDTO[];
    CategoryList: SelectListItemDTO[];
    Category: CategoryDTO;
    Paths: PathDTO[];
    PathList: SelectListItemDTO[];
}

export interface CourseDTO {
    CourseId: number;
    Name: string;
    Title: string;
    IsActive: boolean | null;
    Summary: string;
    FooterDetails: string;
    LargeBanner: string;
    SmallBanner: string;
    MobileBanner: string;
    Keyword: string;
    Description: string;
    MentorId: number;
    Mentors: string;
    Url: string;
    Sequence: number | null;
    DocumentUrl: string;
    CourseFeatures: string;
    Reviews: number;
    Learners: string;
    Large: any;
    Small: any;
    Mobile: any;
    TagLine: string;
    WhatsAppCommunity: string;
    CourseCategories: CourseCategoryDTO[];
    MentorMasterList: MentorMasterDTO[];
    CourseDetailList: CourseDetailDTO[];
    DisplayCourseContent: SubscribedCourseTypesDTO;
    MentorList: MentorMasterDTO[];
    SelectedMentors: MentorMasterDTO[];
    MentorMaster: SelectListItemDTO[];
    SelectedCategories: SelectListItemDTO[];
    CourseList: CourseDTO[];
    Selected: boolean;
    SkillChallengeURL: string;
    Id: number;
    City: string;
    Type: string;
    EnquiryType: number;
    H1Tag: string;
    H2Tag: string;
    DomainName: string;
    SkillName: string;
    TotalLessons: number;
    CoursesList: string;
    CourseContents: string;
    CategoryList: string;
    CourseType: number;
    Duration: string;
    UrlList: CourseDTO[];
    DemoUrl: string;
    CourselistSales: SelectListItemDTO[];
    SaleId: number;
    CreatedDate: Date | null;
    ExpiryDate: Date | null;
    IsFree: number;
    Points: number;
    IsFreeDis: string;
    WhyUsContents: string;
    SkillsList: SkillMasterDTO[];
    SelectedSkills: SkillMasterDTO[];
    SkillList: SelectListItemDTO[];
    CurList: CourseDTO[];
    CurpriceList: CoursePriceDTO[];
    CoursesContentL: SelectListItemDTO[];
    CourseCount: number;
    LabCount: number;
    VideoCount: number;
    QaCount: number;
    QuickNoteCount: number;
    ProjectCount: number;
    SkillsCount: number;
    TestPapersCount: number;
    LiveSessionCount: number;
    TotalPrice: number;
    DiscountPrice: number;
    Final: number;
    Price: number;
    SaleOffAmount: number;
    AfterSale: number;
    SalePercentage: number;
    CurPreRecTopiclist: CourseTopicDTO[];
    SubCourseDetailsList: MaterCourseCurriculum[];
    SubCourseDetailsListMaster: MaterCourseCurriculum[];
    CoursePricesSelf: CoursePrice;
    CoursePricesSelfDTO: CoursePriceDTO;
    Quizlist: MockUpTestMasterDTO[];
    TestPapersDTOs: TestPapersDTO[];
    ListTestPapers: TestPapersDTO[];
    Currency: string;
    CourseTypeName: string;
    DifficultyLevelId: number;
    DifficultyLevelName: string;
    DifficultyTypeId: number;
    DifficultyTypeName: string;
    CourseNewStatus: string;
    UpdatedDate: Date | null;
    RelatedVideos: CourseDTO[];
    CategoryLst: CategoryDTO[];
    MemberList: MockUpTestAttemptedStatusDTO[];
    UserList: TestAttemptedStatusDTO[];
    DocumentId4Preview: number;
    DocumentURL4Preview: string;
    ArticleIds: string;
    Tutorials: TutorialDTO[];
    QuizCount: number;
    LearntCourses: number;
    PriceCollection: PriceCollectionDTO;
    Citylist: CourseDTO[];
    PublishedDate: Date | null;
    PathType: number;
    ProjectList: string;
    QnaList: string;
    BatchTime: Date | null;
    BatchCode: string;
    LabGuidePdf: string;
    Playlist: VideoModelListDTO[];
    IsParent: boolean;
    CourseTopics: CourseTopicDTO[];
    ParentCourseId: number;
    SubscriptionId: number;
    ParentCourseType: number;
}

export interface CategoryDTO {
    CategoryId: number;
    CategoryName: string;
    Total: number;
    Title: string;
    MetaTitle: string;
    Url: string;
    MetaKeywords: string;
    MetaDescription: string;
    CreatedDate: Date;
    IsActive: boolean;
    Skills: string;
    Books: string;
    Courses: string;
    Videos: string;
    Beginners: string;
    Intermediate: string;
    Advanced: string;
    Questions: string;
    CourseDescription: string;
    SkillPath: string;
    CompilerUrl: string;
    CategoryType: number;
    ImageUrl: string;
    DisplayName: string;
    SelfPacedCourseUrl: string;
    InterviewQnAUrl: string;
    LabsUrl: string;
    NotesUrl: string;
    ProjectUrl: string;
    BatchHeading: string;
    File: any;
    CategoryCourses: CourseDTO[];
    BookMaster: SelectListItemDTO[];
    CoursesMaster: SelectListItemDTO[];
    SkillMaster: SelectListItemDTO[];
    Paths: PathDTO[];
    Count: number;
    DomainName: string;
    Course: string;
    TotalArticles: number;
}

export interface PathDTO {
    PathId: number;
    CourseType: number;
    Name: string;
    Title: string;
    IsActive: boolean | null;
    Summary: string;
    FooterDetails: string;
    SmallBanner: string;
    MobileBanner: string;
    Keyword: string;
    Description: string;
    Url: string;
    Sequence: number;
    DocumentUrl: string;
    PathFeatures: string;
    Reviews: number;
    Learners: string;
    Small: any;
    Mobile: any;
    TagLine: string;
    WhatsAppCommunity: string;
    SelectedCategories: SelectListItemDTO[];
    CourseList: CourseDTO[];
    SkillChallengeURL: string;
    H1Tag: string;
    H2Tag: string;
    DomainName: string;
    SkillName: string;
    TotalLessons: number;
    CategoryList: string;
    PathType: number;
    Duration: string;
    DemoUrl: string;
    PriceCollection: PriceCollectionDTO;
    CourselistSales: SelectListItemDTO[];
    SaleId: number;
    CreatedDate: Date;
    IsFree: number;
    IsFreeDis: string;
    WhyUsContents: string;
    SkillsList: SkillMasterDTO[];
    SelectedSkills: SkillMasterDTO[];
    SkillList: SelectListItemDTO[];
    PathCount: number;
    SkillsCount: number;
    Price: number;
    SaleOffAmount: number;
    AfterSale: number;
    SalePercentage: number;
    Final: number;
    CoursePricesSelfDTO: CoursePriceDTO;
    Currency: string;
    DifficultyTypeId: number;
    CategoryDDL: CategoryDTO[];
    CourseNewStatus: string;
    UpdatedDate: Date;
    QuizCount: number;
    PathCourseCount: number;
    ProjectList: string;
    QnaList: string;
    PList: CourseDTO[];
    QList: CourseDTO[];
    CoursesP: SelectListItemDTO[];
    CoursesQ: SelectListItemDTO[];
    SelectPList: CourseDTO[];
    SelectQList: CourseDTO[];
}

export interface PriceCollectionDTO {
    TotalPriceIN: number;
    DiscountPriceIN: number;
    FinalIN: number;
    TotalPriceUS: number;
    DiscountPriceUS: number;
    FinalUS: number;
    FinalINWithTax: number;
    FinalUSWithTax: number;
    TaxOnPrice: number;
    TotalWithTax: number;
    Currency: string;
    Type: string;
    CourseType: number;
}

export interface VideoModelListDTO {
    Title: string;
    Url: string;
}

export interface CourseDetailDTO {
    CourseDetailId: number;
    KeyName: string;
    KeyLabel: string;
    Value: string;
    Type?: string;
    Sequence?: string;
    IsActive: boolean;
    CourseId: number;
    Course?: CourseDTO;
    CourseName?: string;
}

export interface AssignedTestDTO {
    TestPaperId: number;
    Title: string;
    AssignedDate: string;
    FromDate: Date;
    FromDateDisplay: string;
    ToDate: Date;
    ToDateDisplay: string;
    TotalQuestion: number;
    Duration: number;
    BatchId: number;
    TestAlreadyTaken: number;
    Percentage: number;
    TestAttemptedStatusId: number;
    TestAttemptedStatusList: TestAttemptedStatusDTO[];
}

export interface TestAttemptedStatusDTO {
    TestAttemptedStatusId: number;
    TestPaperId: number;
    BatchId: number;
    UserId: number;
    TimeTaken: number;
    Score: number;
    Scores: number;
    Percentage: number;
    TestTakenDate: Date;
    CorrectQuestions: number;
    WrongQuestions: number;
    LeftQuestions: number;
    AttemptedQuestions: number;
    AttemptedStatus: boolean;
    BatchCode: string;
    Marks: number;
    Status: string;
    IsPass: boolean;
    UserName: string;
    TotalCorrectQuestions: number;
    TotalWrongQuestions: number;
    TotalScore: number;
    TScore: number;
    TPercentage: string;
}

export interface QuestionPaperDuration {
    QuestionPaperDurationId: number;
    DurationValue: string;
    DurationValueText?: string;
}

export interface QuestionPaperDTO {
    QuestionPaperId: number;
    QuestionPaperTitle: string;
    DifficultyLevelList?: QuestionDifficultyLevel[];
    QuestionPaperInstructionList?: AssessmentInstruction[];
    QuestionPaperTypeList?: QuestionPaperTypeDTO[];
    TotalDurationList?: QuestionPaperDuration[];
    TotalQuestionList?: QuestionPaperTotalQuestionDTO[];
    QuestionPaperDetails?: MockupTestMasterQuestionMappingDTO[];
    SubjectList?: QuestionSubjectsDTO[];
    CourseList?: CourseDTO[];
}

export interface QuestionPaperTotalQuestionDTO {
    QuestionPaperTotalQuestionId: number;
    Value: number;
}

export interface QuestionDifficultyLevel {
    DifficultyLevelId: number;
    DifficultyLevelName: string;
    IsActive: boolean;
    QuestionPaper?: QuestionPaperDTO;
}

export interface AssessmentInstruction {
    InstructionId: number;
    InstructionText: string;
    Description?: string;
    AddedDate: Date;
    UpdatedDate?: Date;
    IsActive: boolean;
}

export interface QuestionPaperTypeDTO {
    QuestionPaperTypeId: number;
    QuestionPaperTypeName: string;
    IsActive: boolean;
}

export interface MockupTestMasterQuestionMappingDTO {
    MockupTestId: number;
    QuestionId: number;
    QuestionTitle: string;
    MockupTestTitle: string;
    PageSize: number;
    Page: number;
    MockUpTestMasterList: MockUpTestMasterDTO[];
    TotalRows: number;
}

export interface MockUpTestMasterDTO {
    MockupTestId: number;
    MockupTestName: string;
    DifficultyType: number;
    DifficultyTypeName: string;
    CategoryID: number;
    CategoryName: string;
    CourseId: number;
    CourseName: string;
    QuestionPaperTypeName: string;
    QuestionPaperTotalQuestionValue: number;
    QuestionPaperDurationValue: number;
    QuestionAdded?: number;
    Duration: number;
    TotalQuestion: number;
    CreatedDate: Date;
    UpdatedDate?: Date;
    IsActive: boolean;
    CreatedBy: string;
    UpdatedBy: string;
    TestType: number;
    Url: string;
    Description: string;
    Keyword: string;
    DifficultyLevelList?: QuestionDifficultyLevel[];
    QuestionPaperTypeList?: QuestionPaperTypeDTO[];
    TotalDurationList?: QuestionPaperDuration[];
    TotalQuestionList?: QuestionPaperTotalQuestionDTO[];
    QuestionPaperDetails?: MockupTestMasterQuestionMappingDTO[];
    CategoryList?: CategoryDTO[];
    CourseList?: DropDownDTO[];
    Score: number;
    TopScore: number;
    CountMemberList: number;
    CatImage: string;
    MemberId: number;
    MemberList?: MockUpTestAttemptedStatusDTO[];
    Mapcat: number;
    Details: string;
}

export interface QuestionSubjectsDTO {
    CategoryID: number;
    CategoryName: string;
    IsActive: boolean;
}

export interface DifficultyType {
    DifficultyTypeId: number;
    DifficultyTypeName: string;
}

export interface SelectListItemDTO {
    Disabled?: boolean;
    Group?: SelectListGroup;
    Selected?: boolean;
    Text?: string;
    Value?: string;
}

export interface SelectListGroup {
    Disabled?: boolean;
    Name?: string;
}

export interface QuestionTypes {
    QuestionTypeId: number;
    QuestionType: string;
}

export interface CourseMenuDTO {
    Id: number;
    Name: string;
    CourseCount: number;
    Url: string;
    Paths: MenuPathsDTO[];
}

export interface MenuPathsDTO {
    Id: number;
    Name: string;
    Url: string;
}

export interface SubscribedCourseTypesDTO {
    IsLabSubscribed: boolean;
    IsLiveSessionsSubscribed: boolean;
    IsSelfPlacedVideoSubscribed: boolean;
    IsTestPaperSubscribed: boolean;
    IsQnASubscribed: boolean;
    IsProjectSubscribed: boolean;
    IsQuickNoteSubscribed: boolean;
    IsTrialSubscribed: boolean;
    IsMembershipSubscribed: boolean;
    IsJobOrientedSubscribed: boolean;
    IsMembershipLabSubscribed: boolean;
    IsMembershipLiveSessionsSubscribed: boolean;
    IsMembershipSelfPlacedVideoSubscribed: boolean;
    IsMembershipTestPaperSubscribed: boolean;
    IsMembershipQnASubscribed: boolean;
    IsMembershipProjectSubscribed: boolean;
    IsMembershipQuickNoteSubscribed: boolean;
    IsBookSubscribed: boolean;
    IsMembershipBookSubscribed: boolean;
}

export interface CoursePriceDTO {
    CourseId: number;
    Name: string;
    Title: string;
    Price: number;
    IsOnSale: boolean;
    SalePercentage: number;
    SaleOffAmount: number;
    AfterSale: number;
    IsPaymentGateway: boolean;
    OfferType: number;
    PaymentType: number;
    CourseType: number;
    Currency: string;
    PlanId: string;
    Sequence: number;
    CourseSellingPoints: string;
    IsCourseSubscription: boolean;
    FinalINWithTax: number;
    FinalUSWithTax: number;
    TotalWithTax: number;
    ServiceTaxTot: number;
    ServiceTax: number;
    TotalSavingTax: number;
}

export interface MaterCourseCurriculum {
    CId: number;
    Title: string;
    CourseId: number;
    SubCourseId: number;
    Description: string;
    Sequence: number;
    Url: string;
    IsActive?: boolean;
    Mode: number;
    IsElective: number;
    CourseName?: string;
    ModeName?: string;
    Imgurl?: string;
}

export interface CoursePrice {
    CoursePriceId: number;
    PriceINR: number;
    DiscountPercentage: number;
    PriceUSD: number;
    DiscountINR: number;
    NetPriceINR: number;
    ServiceTaxINR: number;
    STaxNameINR: string;
    TotalINR: number;
    DiscountUSD: number;
    NetPriceUSD: number;
    TotalUSD: number;
    CourseType: number;
    CourseId: number;
    IsPaymentGateway: boolean;
    CreatedDate: Date;
    UpdatedDate?: Date;
    Course?: CourseDTO;
    CourseIsActive?: boolean;
    CourseList?: CourseDTO[];
    CourseName?: string;
    SalesText?: string;
    CourseTypeText?: string;
    Sequence: number;
    IsMaster: number;
}

export interface TutorialDTO {
    TutorialID: number;
    Id: string;
    Priority: number;
    SchemaSEO: string;
    ShortTitle: string;
    Title: string;
    Version: string;
    ShortDescription: string;
    Description: string;
    Tags: string;
    MetaKeywords: string;
    PublishedBy?: number;
    PostedDate: Date;
    StrPostedDate: string;
    UpdatedDate?: Date;
    StrUpdatedDate: string;
    CategoryID: number;
    CategoryName: string;
    IsActive: boolean;
    TotalViews?: number;
    TViews: string;
    Url: string;
    MetaDescription: string;
    PostUrl: string;
    ArticleUrl: string;
    CategoryList: CategoryDTO[];
    SourceCodeUrl: string;
    DomainName: string;
    MentorId: number;
    Authors: string;
    AuthorMasterList: MentorMasterDTO[];
    AuthorList: MentorMasterDTO[];
    SelectedAuthors: MentorMasterDTO[];
    AuthorMaster: SelectListItem[];
    TImage: File | null;
    TutorialImage: string;
    ArticleLevel: number;
    ArticleType: number;
    ArticleKind: number;
    Sequence: number;
    IsMailed: boolean;
    WordCount: number;
    WordPrice: number;
    VideoUrl: string;
    Status: string;
    DraftDescription: string;
    DraftTitle: string;
    DraftShortDescription: string;
    Editor?: number;
    EditorName?: string;
    IsNewArticle: boolean;
    NewWordCount: string;
    DeleteWordCount: string;
    SbImage: File | null;
    SmallBannerImage: string;
    ReadTime?: number;
    Catimg?: string;
    SubCategoryId: number;
}

export interface TutorialListForExcel {
    AuthorId: number;
    Date: string;
    Textsrch: string;
    CategoryId: number;
    IsSourceCode: boolean;
}

export interface TutorialDraftPublishData {
    Id: string;
    NewWordCount: string;
    DeleteWordCount: string;
}

export interface TutorialSubCategoryDTO {
    TutorialID: number;
    SubCategoryId: number;
}

export interface MockUpTestAttemptedStatusDTO {
    Test: number;
    CourseSubscriptionId: number;
    Percentage: number;
    Score: number;
    Mins: number;
    Secs: number;
    User: number;
    Answers: string[];
    CorrectQuestions: number;
    WrongQuestions: number;
    LeftQuestions: number;
    AttemptedQuestions: number;
    TotalQuestions: number;
    Duration: number;
    TimeTaken: number;
    LeftTime: number;
    AttemptedStatus?: boolean;
    MockupTestTitle: string;
    TotalScore: number;
    TotalCorrectQuestions: number;
    TotalWrongQuestions: number;
    MemberId: number;
    Name: string;
    MockUpTestAttemptedStatusId: number;
    MockupTestMasterId: number;
    CategoryID: number;
    MemberName: string;
    Scores: number;
    Designation: string;
    MockupTestName: string;
    MobileNo: string;
    Email: string;
    TestTakenDate: Date;
    Courses: CourseDTO[];
    TScore: number;
    TPercentage: string;
    BatchId: number;
    DomainName: string;
}

export interface SelectListItem {
    Disabled?: boolean;
    Group?: SelectListGroup;
    Selected?: boolean;
    Text?: string;
    Value?: string;
}

export interface CourseSubTopicDTO {
    SubTopicId: number;
    TopicId: number;
    SubTopicName: string;
    Description?: string;
    PdfPath?: string;
    UrlPath?: string;
    CodePath?: string;
    IsLock: boolean;
    Duration: string;
    Sequence: number;
    IsActive: boolean;
    OptionalHeader?: string;
    TopicType: number;
    IdeLanguage?: string;
    Hint?: string;
    Solution?: string;
    MentorId: number;
    CourseTopic?: CourseTopicDTO;
    TopicName?: string;
    BatchId: number;
    CourseId: number;
    CourseName?: string;
    CreatedDate?: Date;
    StrCreatedDate?: string;
    DurationInSeconds: number;
}

export interface DropDownDTO {
    Value: number;
    Text: string;
}

export interface AutoCompleteItemDTO {
    Label: string;
    Val: string;
}

export interface DropDownCountDTO {
    Value: string;
    Text: string;
    Count: number;
    TotalINR: number;
    TotalUSD: number;
    Currency: string;
}

export interface SkillMasterDTO {
    SkillId: number;
    Name: string;
    IsActive?: boolean;
}

export interface MentorMasterDTO {
    MentorId: number;
    Biography?: string;
    Name: string;
    Designation: string;
    Skills?: string;
    ImageUrl?: string;
    IsActive?: boolean;
    GenderId?: number;
    Url?: string;
    EmailID?: string;
    ShortDescription?: string;
    IsMember?: boolean;
    HaveAuthorRole?: boolean;
    File?: File | null;
    GenderList?: GenderMaster[];
    SkillsList?: SkillMasterDTO[];
    SelectedSkills?: SkillMasterDTO[];
    SkillList?: SelectListItem[];
    MobileNo?: string;
    LinkedIn?: string;
    Twitter?: string;
    Github?: string;
}

export interface GenderMaster {
    GenderId: number;
    GenderName: string;
}

export interface QuickNotesDTO {
    QuickNoteId: number;
    Title: string;
    MetaTitle: string;
    MetaKeywords: string;
    Name?: string;
    CourseName?: string;
    Summary?: string;
    Description?: string;
    MetaDescription?: string;
    Sequence: number;
    DomainName?: string;
    Duration: string;
    MentorId: number;
    DifficultyTypeId: number;
    ContentName?: string;
    CategoryId: number;
    CourseId: number;
    CreatedDate: Date;
    UpdatedDate?: Date;
    IsFree: boolean;
    IsActive: boolean;
    DifficultyTypeName?: string;
    CategoryName?: string;
    MentorName?: string;
    MentorMasterList?: MentorMasterDTO[];
    CategoryDDL?: CategoryDTO[];
    IsQuickNoteCompleted: boolean;
    IsQuickNoteStarted: boolean;
    IsFreeText?: string;
    IsBookMarked: boolean;
    Url: string;
    ParentCourseId: number;
    ParentCourseType: number;
    SubscriptionId: number;
    QuickNoteCount: number;
    Performance: number;
    QuickNotePagingList?: QuickNotePagingDTO[];
    CurrentPageIndex: number;
    TotalQuickNote: number;
    CompletedQuickNoteCount: number;
    PlanId: number;
    ContentId: number;
    Access: boolean;
    ModuleName?: string;
    CourseQuickNoteId: number;
}

export interface QuickNotePagingDTO {
    QuickNoteId: number;
    PageIndex: number;
}

export interface QnATextPagingDTO {
    Id: number;
    PageIndex: number;
}

export interface InstallmentDetails_V1 {
    Id: number;
    ParentId: number;
    Uid?: string;
    InstallmentName?: string;
    PaymentId?: string;
    InvoiceNo?: string;
    NetPrice: number;
    ServiceTaxPercentage?: number;
    ServiceTax?: number;
    RoundOff: number;
    Total: number;
    Status?: string;
    CreatedDate: Date;
    UpdatedDate?: Date;
    Url?: string;
    ExpiryDate?: Date;
    IsPaymentDone: boolean;
    CreatedBy: number;
    CreatedFor?: number;
    UpdatedBy: number;
    IsCancelled: number;
}

export interface TransactionChildDetails_V1 {
    Id: number;
    ParentId: number;
    PaymentId?: string;
    TransactionId?: string;
    CourseId?: number;
    Name?: string;
    Title?: string;
    Price?: number;
    IsOnSale: boolean;
    SalePercentage?: number;
    SaleOffAmount?: number;
    AfterSale?: number;
    DiscountApplied: boolean;
    TotalDiscountPercentage?: number;
    TotalDiscountPercentageAmount?: number;
    NetPrice?: number;
    DiscountId?: number;
    CouponCode?: string;
    Currency?: string;
    CourseType: number;
    TransactionDetailsV1?: TransactionDetails_V1;
    CourseName?: string;
    CourseTypeName?: string;
}

export interface TransactionDetails_V1 {
    Id: number;
    PaymentId?: string;
    TransactionId?: string;
    ServiceCode?: string;
    Price?: number;
    NetPrice: number;
    Igst: number;
    Cgst: number;
    Sgst: number;
    IgstPercent: number;
    CgstPercent: number;
    SgstPercent: number;
    ServiceTaxPercentage?: number;
    ServiceTax?: number;
    RoundOff: number;
    Total: number;
    Status?: string;
    TransactionStatus?: string;
    PaymentGateway?: string;
    Currency?: string;
    CustomerName?: string;
    Email?: string;
    ContactNo?: string;
    CreatedDate: Date;
    UpdatedDate: Date;
    StateCode?: number;
    Address?: string;
    Country?: string;
    ShoppingCartDataId?: number;
    IsCancelled: number;
    UrlSource?: string;
    ReferralCode?: string;
    IsInstallment?: boolean;
    InstallmentName?: string;
    CreatedBy?: number;
    InstallmentUrl?: string;
    ExpiryDate?: Date;
    UpdatedBy?: number;
    CreatedFor?: number;
    IsApproved: boolean;
    UtmSource?: string;
    UtmMedium?: string;
    UtmCampaign?: string;
    UtmTerm?: string;
    DomainName?: string;
    TransactionChildDetailsV1: TransactionChildDetails_V1[];
    InvoiceNo?: string;
}

export interface Paging<T> {
    Data: T[];
    TotalRows: number;
    TotalCounts?: number | null;
    PageSize?: number;
    Page?: number;
    TotalPages?: number;
    TViews?: string | null;
    TotalAmount?: number;
    CourseId?: number | null;
    Courses?: CourseDTO;
    Labs?: LabDTO;
    InterviewQuestionList?: InterviewQuestionDto;
    JobOrientedDisplayList?: JobOrientedDisplayDto;
    CategoryTopicList?: CategoryTopicDTO;
    QuickNotes?: QuickNotesDTO;
    CategoryList?: CategoryDTO;
    AdminId?: number;
    AdminUsers?: AdminUserDTO;
    UpcomingEvents?: EventDTO;
    AllJobListActive?: Job;
    MentorDetails?: MentorMasterDTO;
    Paths?: PathDTO;
    PathCourseData?: PathCourses;
    CourseContentData?: CourseContentDTO;
    NotesContentData?: CourseQuickNoteDTO;
    CourseLabData?: CourseLabDTO;
    IsDisplayMoreButton?: boolean;
}

export interface Job {
    JobId: number;
    Name: string;
    Skills: string;
    Location?: string | null;
    CompanyId: number;
    Description: string;
    LongDescription: string;
    MinExperience?: string | null;
    MaxExperience?: string | null;
    IsActive: boolean;
    ExpiryDate: Date;
    MinSalary?: string | null;
    MaxSalary?: string | null;
    NoticePeriod?: string | null;
    JobUrl?: string | null;
    ResumeCount?: string | null;
    CountryId: number;
    CityId: number;
    City?: string | null;
    JobMode?: string | null;
    CompanyName?: string | null;
}

export interface JobOrientedDisplayDto {
    Id?: number | null;
    Title: string | null;
    SubTitle: string | null;
    Description: string | null;
    Url: string | null;
    JobType?: number | null;
    ImageType?: number | null;
    Image?: string | null;
    JobImage: File | null;
    IsActive?: boolean | null;
}

export interface CategoryTopicDTO {
    Id?: number | null;
    TopicName: string;
    IsActive?: boolean | null;
}

export interface AdminUserDTO {
    AdminId: number;
    Name: string;
}

export interface EventDTO {
    EventID: number;
    Id: string;
    EventTitle: string;
    ShortDescription: string;
    EventAddress?: string | null;
    EventTypeId: number;
    EventTypeName?: string | null;
    EventDescription: string;
    MetaKeywords: string;
    EventJoiningLink: string;
    InviteLink: string;
    VideoLink?: string | null;
    WhatsAppCommunity?: string | null;
    PostedBy?: string | null;
    EventDate: Date;
    StrEventDate?: string | null;
    EventDisplayDateTime?: string | null;
    PostedDate: Date;
    StrPostedDate?: string | null;
    UpdatedDate?: Date | null;
    StrUpdatedDate?: string | null;
    Url?: string | null;
    MetaDescription?: string | null;
    TotalViews?: number | null;
    EventImage?: string | null;
    EventMobileImage?: string | null;
    File?: File | null;
    Mobile?: File | null;
    IsActive?: boolean | null;
    IsRegistrationClosed: boolean;
    TotalCounts: number;
    TotalAttendees: number;
    EventTypes?: EventType | null;
    EventRegistrations?: EventRegistrationDTO[];
    MentorId: number;
    EventSpeakers?: string | null;
    DomainName?: string | null;
    CourseId?: number | null;
    BatchId?: number | null;
    IsPaid: boolean;
    SpeakersMasterList?: MentorMasterDTO[];
    SpeakersList?: MentorMasterDTO[];
    SelectedSpeakers?: MentorMasterDTO[];
    SpeakersMaster?: SelectListItem[];
    TrainingFor?: string | null;
    Reviews?: string | null;
}

export interface EventType {
    EventTypeId: number;
    EventTypeName: string;
    EventTypeDescription?: string | null;
    AddDate?: Date | null;
    UpdateDate?: Date | null;
    IsActive?: boolean | null;
    Events?: Event[];
}

export interface Event {
    EventID: number;
    Id: string;
    EventTitle: string;
    ShortDescription: string;
    EventAddress?: string | null;
    EventTypeId: number;
    EventDescription: string;
    EventSpeakers?: string | null;
    MetaKeywords: string;
    PostedBy?: string | null;
    EventDisplayDateTime?: string | null;
    EventDate: Date;
    PostedDate: Date;
    UpdatedDate?: Date | null;
    Url?: string | null;
    EventJoiningLink: string;
    InviteLink: string;
    VideoLink?: string | null;
    CourseSellingPoints?: string | null;
    MetaDescription?: string | null;
    TotalViews?: number | null;
    EventImage?: string | null;
    EventMobileImage?: string | null;
    IsActive?: boolean | null;
    IsRegistrationClosed: boolean;
    EventType?: EventType | null;
    DomainName?: string | null;
    CourseId: number;
    BatchId: number;
    Reviews?: string | null;
    IsPaid: boolean;
    TrainingFor?: string | null;
    EventRegistrations?: EventRegistration[];
}

export interface EventRegistration {
    EventRegistrationId: number;
    EventId: number;
    MemberId: number;
    Name: string;
    EmailId: string;
    MobileNo: string;
    RegistrationDate: Date;
    VerificationDate?: Date | null;
    IsVerified?: boolean | null;
    Event?: Event | null;
    UtmSource?: string | null;
    UtmMedium?: string | null;
    UtmCampaign?: string | null;
    UtmTerm?: string | null;
    City?: string | null;
    Experience?: string | null;
}

export interface EventRegistrationDTO {
    EventRegistrationId: number;
    EventId: number;
    MemberId: number;
    Name: string;
    EmailId: string;
    MobileNo: string;
    ProfilePic?: string | null;
    RegistrationDate?: Date | null;
    VerificationDate?: Date | null;
    IsVerified: boolean;
    EventTitle?: string | null;
    EventDisplayDateTime?: string | null;
    EventDate: Date;
    Url?: string | null;
    EventSpeakers?: string | null;
    Event?: EventDTO | null;
    IsAlreadyRegister?: boolean | null;
    UtmSource?: string | null;
    UtmMedium?: string | null;
    UtmCampaign?: string | null;
    UtmTerm?: string | null;
    Utm?: UtmDTO | null;
    IsPaid: boolean;
    EventJoiningLink?: string | null;
    DomainName?: string | null;
    City?: string | null;
    Experience?: string | null;
}

export interface EventRegistrationExcelDTO {
    EventId?: number | null;
    EventTypeId?: number | null;
    Textsrch?: string | null;
    Date?: string | null;
}

export interface UtmDTO {
    UtmSource?: string | null;
    UtmMedium?: string | null;
    UtmCampaign?: string | null;
    UtmTerm?: string | null;
}

export interface PathCourses {
    PathCourseId: number;
    CourseId: number;
    PathId: number;
    Sequence: number;
    IsActive: boolean;
    CourseName?: string | null;
}

export interface TimeZone {
    Id: string;
    DisplayName: string;
}