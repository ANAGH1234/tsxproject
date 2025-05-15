import apiClient from "../helpers/apiClient";
import type { CourseDTO, InterviewQuestionDto, LabDTO, Paging, QuickNotesDTO, SelfPacedVideoDTO, TestPapersDTO, UserTranningDTO } from "../models/dashboard/dashboard";
import type { AppliedJobDTO, BatchMasterDTO, CertificateMaster, ContentBookMarksDTO, ContentDownloadHistoryDTO, CourseDetailsDTO, CourseLiveSessionVideo, CoursePlanDetailDTO, LabTrackingDTO, LiveVideoTrackingDTO, PagingBatchMasterDTO, ProgressCardDTO, QuestionBankOptionsDTO, QuickNoteTrackingDTO, SelfPlacedVideoTrackingDTO, SubscribeCourseDetailDTO, SubscriptionDTO, UserProgressReportDTO } from "../models/training/training";


interface TrainingService {
    getLiveSessions: (courseId: number, subscriptionId: number, batchId: number, userId: number, membershipId: number) => Promise<SubscribeCourseDetailDTO>;
    getTestPapers: (courseId: number, subscriptionId: number, batchId: number, userId: number, membershipId: number) => Promise<SubscribeCourseDetailDTO>;
    getBatches: (courseId: number, batchId: number) => Promise<SubscribeCourseDetailDTO>;
    getOverAllPerformance: (courseId: number, subscriptionId: number, userId: number, batchId: number) => Promise<ProgressCardDTO>;
    getLabs: (courseId: number, batchId: number, userId: number) => Promise<UserTranningDTO>;
    getLabsForCoursePlan: (courseId: number, batchId: number, userId: number) => Promise<UserTranningDTO>;
    getQuickNotes: (courseId: number, userId: number) => Promise<UserTranningDTO>;
    getQnATextData: (courseId: number, userId: number) => Promise<UserTranningDTO>;
    membershipDetails: (userId: number) => Promise<Paging<SubscriptionDTO>>;
    getLabDetails: (labId: number, courseId: number, userId: number) => Promise<LabDTO>;
    getQuickNoteDetails: (quickNoteId: number, courseId: number, userId: number) => Promise<QuickNotesDTO>;
    getQnATextDetails: (id: number, courseId: number, userId: number) => Promise<InterviewQuestionDto>;
    getBookDetails: (id: number, courseId: number, userId: number) => Promise<InterviewQuestionDto>;
    submitLabSolution: (labDetailData: LabDTO) => Promise<number>;
    checkQnAExistForCourse: (courseId: number, uid: number) => Promise<UserTranningDTO>;
    setVideoTracking: (liveVideoTrackingDTO: LiveVideoTrackingDTO) => Promise<number>;
    setSelfPlacedVideoTracking: (selfPlacedVideoTrackingDTO: SelfPlacedVideoTrackingDTO) => Promise<number>;
    setContentBookMarked: (contentBookMarksDTO: ContentBookMarksDTO) => Promise<number>;
    saveCertificate: (certificateMaster: CertificateMaster) => Promise<boolean>;
    saveLabTracking: (labTrackingDTO: LabTrackingDTO) => Promise<number>;
    saveQuickNoteTracking: (quickNoteTrackingDTO: QuickNoteTrackingDTO) => Promise<number>;
    saveQnATextTracking: (quickNoteTrackingDTO: QuickNoteTrackingDTO) => Promise<number>;
    saveContentDownloadHistory: (contentDownloadHistoryDTO: ContentDownloadHistoryDTO) => Promise<void>;
    getProjectVideos: (courseId: number, courseType: number, userId: number) => Promise<SelfPacedVideoDTO>;
    getSelfPlacedVideos: (courseId: number, courseType: number, userId: number) => Promise<SelfPacedVideoDTO>;
    getCoursePlanDetails: (courseId: number, userId: number) => Promise<CoursePlanDetailDTO>;
    getSelfPlacedVideosCourseWise: (courseId: number, parentCourseId: number, userId: number) => Promise<CourseDetailsDTO>;
    getSelfPlacedVideosProgress: (userId: number) => Promise<void>;
    getSkillTest: (courseId: number, subscriptionId: number, testPaperId: number, userId: number) => Promise<TestPapersDTO>;
    getScholarshipTest: (courseId: number, userId: number) => Promise<TestPapersDTO>;
    getSkillChallenge: (courseId: number, userId: number) => Promise<TestPapersDTO>;
    getTestDetails: (testPaperId: number, userId: number) => Promise<TestPapersDTO>;
    getFreeCourses: (userId: number, membershipId: number, courseType: number, membershipExpiry: Date | string) => Promise<Paging<SubscriptionDTO>>;
    getSubscribedMasterClasses: (userId: number, membershipId: number, membershipExpiry: Date | string) => Promise<Paging<SubscriptionDTO>>;
    getSubscribedTrainings: (userId: number, membershipId: number, membershipExpiry: Date | string) => Promise<Paging<SubscriptionDTO>>;
    getSubscribedCorporateTrainings: (userId: number, membershipId: number, membershipExpiry: Date | string) => Promise<Paging<SubscriptionDTO>>;
    getCorporateTrainings: (userId: number, subscriptionId: number, subscriptionExpiry: string) => Promise<Paging<SubscriptionDTO>>;
    getBatchesForCorporate: (courseId: number, userId: number) => Promise<SubscribeCourseDetailDTO>;
    getSubscribedCourses: (userId: number, membershipId: number, courseType: number, membershipExpiry: Date | string) => Promise<Paging<SubscriptionDTO>>;
    getSubscribedBooks: (userId: number, membershipId: number, courseType: number, membershipExpiry:Date | string) => Promise<Paging<SubscriptionDTO>>;
    getSubscribedJobOrientedCourses: (userId: number, membershipId: number, membershipExpiry: string) => Promise<Paging<SubscriptionDTO>>;
    getSingleSubscribedCourses: (userId: number, membershipId: number, courseType: number, membershipExpiry: Date) => Promise<Paging<SubscriptionDTO>>;
    getCertificates: (userId: number) => Promise<Paging<CertificateMaster>>;
    getAllTrainings: () => Promise<CourseDTO[]>;
    liveCourseVideo: (cid: number, bid: number, sid: number, userId: number) => Promise<CourseLiveSessionVideo[]>;
    getCourseDetailCourseId: (courseId: number, userId: number, membershipId: number, membershipExpiry: Date) => Promise<CourseDTO>;
    getSchedules: (userId: number, courseId: number, countryZone: string, isMore: boolean) => Promise<PagingBatchMasterDTO<BatchMasterDTO>>;
    getMySchedules: (userId: number, membershipId: number, courseId: number, countryZone: string, isMore: boolean) => Promise<PagingBatchMasterDTO<BatchMasterDTO>>;
    getCourseListBySubscription: (userId: number, membershipId: number) => Promise<CourseDTO[]>;
    getUserSubscriptions: (userId: number) => Promise<number[]>;
    getCourseList: () => Promise<CourseDTO[]>;
    getTimeZonesList: () => Promise<any[]>;
    saveQuestionAns: (testData: QuestionBankOptionsDTO[]) => Promise<number>;
    saveAllQuestionAns: (testData: QuestionBankOptionsDTO[]) => Promise<number>;
    autoSaveAllQuestionAns: (selectedAnsTestData: QuestionBankOptionsDTO[]) => Promise<number>;
    getTestResult: (testPaperId: number, courseId: number, testAttemptedStatusId: number, userId: number) => Promise<QuestionBankOptionsDTO>;
    getScholarshipTestResult: (testPaperId: number, courseId: number, userId: number, name: string, email: string, mobileNo: string) => Promise<QuestionBankOptionsDTO>;
    getSkillChallengeResult: (testPaperId: number, courseId: number, userId: number) => Promise<QuestionBankOptionsDTO>;
    getAnswerSheet: (testPaperId: number, testAttemptedStatusId: number, userId: number) => Promise<QuestionBankOptionsDTO>;
    getJobList: (email: string) => Promise<AppliedJobDTO[]>;
    getUserProgressReport: (userId: number) => Promise<ProgressCardDTO[]>;
    liveSessionsUserProgressReport: (userId: number) => Promise<UserProgressReportDTO>;
}

const TrainingService: TrainingService = {
    getLiveSessions(courseId, subscriptionId, batchId, userId, membershipId) {
        return apiClient.get<SubscribeCourseDetailDTO>(`/training/GetLiveSessions/${courseId}/${subscriptionId}/${userId}/${membershipId}/${batchId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getTestPapers(courseId, subscriptionId, batchId, userId, membershipId) {
        return apiClient.get<SubscribeCourseDetailDTO>(`/training/GetTestPapers/${courseId}/${subscriptionId}/${userId}/${membershipId}/${batchId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getBatches(courseId, batchId) {
        return apiClient.get<SubscribeCourseDetailDTO>(`/training/GetBatches/${courseId}/${batchId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getOverAllPerformance(courseId, subscriptionId, userId, batchId) {
        return apiClient.get<ProgressCardDTO>(`/training/GetOverAllPerformance/${courseId}/${subscriptionId}/${userId}/${batchId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getLabs(courseId, batchId, userId) {
        return apiClient.get<UserTranningDTO>(`/training/GetLabs/${courseId}/${userId}/${batchId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getLabsForCoursePlan(courseId, batchId, userId) {
        return apiClient.get<UserTranningDTO>(`/training/GetLabsForCoursePlan/${courseId}/${userId}/${batchId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getQuickNotes(courseId, userId) {
        return apiClient.get<UserTranningDTO>(`/training/GetQuickNotes/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getQnATextData(courseId, userId) {
        return apiClient.get<UserTranningDTO>(`/training/GetQnATextData/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    membershipDetails(userId) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/MembershipDetails/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getLabDetails(labId, courseId, userId) {
        return apiClient.get<LabDTO>(`/training/GetLabDetails/${labId}/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getQuickNoteDetails(quickNoteId, courseId, userId) {
        return apiClient.get<QuickNotesDTO>(`/training/GetQuickNoteDetails/${quickNoteId}/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getQnATextDetails(id, courseId, userId) {
        return apiClient.get<InterviewQuestionDto>(`/training/GetQnATextDetails/${id}/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getBookDetails(id, courseId, userId) {
        return apiClient.get<InterviewQuestionDto>(`/training/GetBookDetails/${id}/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    submitLabSolution(labDetailData) {
        return apiClient.post<number>('/training/SubmitLabSolution', labDetailData)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    checkQnAExistForCourse(courseId, uid) {
        return apiClient.get<UserTranningDTO>(`/training/CheckQnAExistForCourse/${courseId}/${uid}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    setVideoTracking(liveVideoTrackingDTO) {
        return apiClient.post<number>('/training/SaveVideoTracking', liveVideoTrackingDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    setSelfPlacedVideoTracking(selfPlacedVideoTrackingDTO) {
        return apiClient.post<number>('/training/SaveSelfPlacedVideoTracking', selfPlacedVideoTrackingDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    setContentBookMarked(contentBookMarksDTO) {
        return apiClient.post<number>('/training/SaveContentBookMarked', contentBookMarksDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveCertificate(certificateMaster) {
        return apiClient.post<boolean>('/training/SaveCertificate', certificateMaster)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveLabTracking(labTrackingDTO) {
        return apiClient.post<number>('/training/SaveLabTracking', labTrackingDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveQuickNoteTracking(quickNoteTrackingDTO) {
        return apiClient.post<number>('/training/SaveQuickNoteTracking', quickNoteTrackingDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveQnATextTracking(quickNoteTrackingDTO) {
        return apiClient.post<number>('/training/SaveQnATextTracking', quickNoteTrackingDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveContentDownloadHistory(contentDownloadHistoryDTO) {
        return apiClient.post<void>('/training/SaveContentDownloadHistory', contentDownloadHistoryDTO)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getProjectVideos(courseId, courseType, userId) {
        return apiClient.get<SelfPacedVideoDTO>(`/training/GetProjectVideos/${courseId}/${userId}/${courseType}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSelfPlacedVideos(courseId, courseType, userId) {
        return apiClient.get<SelfPacedVideoDTO>(`/training/GetSelfPlacedVideos/${courseId}/${userId}/${courseType}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getCoursePlanDetails(courseId, userId) {
        return apiClient.get<CoursePlanDetailDTO>(`/training/GetCoursePlanDetails/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSelfPlacedVideosCourseWise(courseId, parentCourseId, userId) {
        return apiClient.get<CourseDetailsDTO>(`/training/GetSelfPlacedVideosCourseWise/${courseId}/${parentCourseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSelfPlacedVideosProgress(userId) {
        return apiClient.get<void>(`/training/GetSelfPlacedVideosProgress/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSkillTest(courseId, subscriptionId, testPaperId, userId) {
        return apiClient.get<TestPapersDTO>(`/training/GetSkillTest/${courseId}/${subscriptionId}/${testPaperId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getScholarshipTest(courseId, userId) {
        return apiClient.get<TestPapersDTO>(`/training/GetScholarshipTest/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSkillChallenge(courseId, userId) {
        return apiClient.get<TestPapersDTO>(`/training/GetSkillChallenge/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getTestDetails(testPaperId, userId) {
        return apiClient.get<TestPapersDTO>(`/training/GetTestDetails/${testPaperId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getFreeCourses(userId, membershipId, courseType, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetFreeCourses/${userId}/${membershipId}/${courseType}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSubscribedMasterClasses(userId, membershipId, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSubscribedMasterClasses/${userId}/${membershipId}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSubscribedTrainings(userId, membershipId, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSubscribedTrainings/${userId}/${membershipId}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSubscribedCorporateTrainings(userId, membershipId, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSubscribedCorporateTrainings/${userId}/${membershipId}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getCorporateTrainings(userId, subscriptionId, subscriptionExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetCorporateTrainings/${userId}/${subscriptionId}/${subscriptionExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getBatchesForCorporate(courseId, userId) {
        return apiClient.get<SubscribeCourseDetailDTO>(`/training/GetBatchesForCorporate/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSubscribedCourses(userId, membershipId, courseType, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSubscribedCourses/${userId}/${membershipId}/${courseType}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSubscribedBooks(userId, membershipId, courseType, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSubscribedBooks/${userId}/${membershipId}/${courseType}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSubscribedJobOrientedCourses(userId, membershipId, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSubscribedJobOrientedCourses/${userId}/${membershipId}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSingleSubscribedCourses(userId, membershipId, courseType, membershipExpiry) {
        return apiClient.get<Paging<SubscriptionDTO>>(`/training/GetSingleSubscribedCourses/${userId}/${membershipId}/${courseType}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getCertificates(userId) {
        return apiClient.get<Paging<CertificateMaster>>(`/training/GetCertificates/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getAllTrainings() {
        return apiClient.get<CourseDTO[]>('/training/GetAllTrainings')
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    liveCourseVideo(cid, bid, sid, userId) {
        return apiClient.get<CourseLiveSessionVideo[]>(`/training/LiveCourseVideo/${cid}/${bid}/${sid}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getCourseDetailCourseId(courseId, userId, membershipId, membershipExpiry) {
        return apiClient.get<CourseDTO>(`/training/GetCourseDetailCourseId/${courseId}/${userId}/${membershipId}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSchedules(userId, courseId, countryZone, isMore) {
        return apiClient.get<PagingBatchMasterDTO<BatchMasterDTO>>(`/training/GetSchedules/${userId}/${courseId}/${countryZone}/${isMore}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getMySchedules(userId, membershipId, courseId, countryZone, isMore) {
        return apiClient.get<PagingBatchMasterDTO<BatchMasterDTO>>(`/training/GetMySchedules/${userId}/${membershipId}/${courseId}/${countryZone}/${isMore}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getCourseListBySubscription(userId, membershipId) {
        return apiClient.get<CourseDTO[]>(`/training/GetCourseListBySubscription/${userId}/${membershipId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getUserSubscriptions(userId) {
        return apiClient.get<number[]>(`/training/GetUserSubscriptions/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getCourseList() {
        return apiClient.get<CourseDTO[]>('/training/GetCourseList')
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getTimeZonesList() {
        return apiClient.get<any[]>('/training/GetTimeZonesList')
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveQuestionAns(testData) {
        return apiClient.post<number>('/training/SaveQuestionAns', testData)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    saveAllQuestionAns(testData) {
        return apiClient.post<number>('/training/SaveAllQuestionAns', testData)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    autoSaveAllQuestionAns(selectedAnsTestData) {
        return apiClient.post<number>('/training/AutoSaveAllQuestionAns', selectedAnsTestData)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getTestResult(testPaperId, courseId, testAttemptedStatusId, userId) {
        return apiClient.get<QuestionBankOptionsDTO>(`/training/GetTestResult/${testPaperId}/${courseId}/${testAttemptedStatusId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getScholarshipTestResult(testPaperId, courseId, userId, name, email, mobileNo) {
        return apiClient.get<QuestionBankOptionsDTO>(`/training/GetScholarshipTestResult/${testPaperId}/${courseId}/${userId}/${name}/${email}/${mobileNo}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getSkillChallengeResult(testPaperId, courseId, userId) {
        return apiClient.get<QuestionBankOptionsDTO>(`/training/GetSkillChallengeResult/${testPaperId}/${courseId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getAnswerSheet(testPaperId, testAttemptedStatusId, userId) {
        return apiClient.get<QuestionBankOptionsDTO>(`/training/GetAnswerSheet/${testPaperId}/${testAttemptedStatusId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getJobList(email) {
        return apiClient.get<AppliedJobDTO[]>(`/training/GetJobList/${email}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    getUserProgressReport(userId) {
        return apiClient.get<ProgressCardDTO[]>(`/training/GetUserProgressReport/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    liveSessionsUserProgressReport(userId) {
        return apiClient.get<UserProgressReportDTO>(`/training/LiveSessionsUserProgressReport/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
};

export default TrainingService;