import type { AxiosResponse } from "axios";
import apiClient from "../helpers/apiClient";
import type { DashboardCoursesCountDTO, MemberNotificationsDTO, ShoppingCartDTO, DashboardVideoProgressDTO, SelfPacedVideoDTO, LabDTO, UserTranningDTO, UserPointsDTO, TestPapersDTO, CourseDisplayDTO, CourseCategoryDTO, SendVerifyLinkResponse, CourseDTO } from "../models/dashboard/dashboard";



interface DashboardService {
    CoursesCount: (userId: number, membershipId: number, membershipExpiry: Date) => Promise<DashboardCoursesCountDTO>;
    GetNotification: (userId: number) => Promise<MemberNotificationsDTO>;
    SendVerifyLink: (email: string | any) => Promise<AxiosResponse<SendVerifyLinkResponse>>;
    GetCart: (userId: number) => Promise<ShoppingCartDTO[]>;
    VideoProgress: (userId: number) => Promise<DashboardVideoProgressDTO[]>;
    LiveSessionProgress: (userId: number) => Promise<DashboardVideoProgressDTO[]>;
    PopularCourses: (userId: number) => Promise<SelfPacedVideoDTO>;
    PopularLabs: (userId: number) => Promise<LabDTO[]>;
    InterviewQA: () => Promise<CourseDTO[]>;
    VideoCourses: (userId: number) => Promise<DashboardVideoProgressDTO[]>;
    LiveCourses: (userId: number) => Promise<DashboardVideoProgressDTO[]>;
    GetTrainingBookMarkedLabs: (userId: number) => Promise<UserTranningDTO>;
    GetBookMarkedLessons: (userId: number) => Promise<SelfPacedVideoDTO>;
    GetCourseBookMarkedLabs: (userId: number) => Promise<UserTranningDTO>;
    GetCourseBookMarkedLessons: (userId: number) => Promise<SelfPacedVideoDTO>;
    GetUserPoints: (userId: number) => Promise<UserPointsDTO>;
    GetUserPointsDetails: (userId: number) => Promise<UserPointsDTO[]>;
    // Updated to handle both CourseDisplayDTO and CourseCategoryDTO based on CourseType
    GetSkillChallengeByCategory: (courseType: number, categoryId: number, userId: number) => Promise<TestPapersDTO[]>;
    GetDisplayCoursesByCategory: (courseType: number, categoryId: number) => Promise<CourseDisplayDTO[] | CourseCategoryDTO[]>;
  
}

const DashboardService: DashboardService = {
    CoursesCount(userId: number, membershipId: number, membershipExpiry: Date|string) {
        return apiClient.get(`/dashboard/UserCoursesCount/${userId}/${membershipId}/${membershipExpiry}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetNotification(userId: number) {
        return apiClient.get(`/dashboard/GetNotification/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    SendVerifyLink(email: string) {
        return apiClient.get<SendVerifyLinkResponse>(`/api/Dashboard/SendVerifyLink/${email}`)
            .catch((err) => { throw err; });
    },
    
    GetCart(userId: number) {
        return apiClient.get(`/dashboard/GetCart/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    VideoProgress(userId: number) {
        return apiClient.get(`/dashboard/VideoProgress/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    LiveSessionProgress(userId: number) {
        return apiClient.get(`/dashboard/LiveSessionProgress/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    PopularCourses(userId: number) {
        return apiClient.get(`/dashboard/PopularCourses/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    PopularLabs(userId: number) {
        return apiClient.get(`/dashboard/PopularLabs/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    InterviewQA() {
        return apiClient.get('/dashboard/InterviewQA')
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    VideoCourses(userId: number) {
        return apiClient.get(`/dashboard/VideoCourses/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    LiveCourses(userId: number) {
        return apiClient.get(`/dashboard/LiveCourses/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetTrainingBookMarkedLabs(userId: number) {
        return apiClient.get(`/dashboard/GetTrainingBookMarkedLabs/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetBookMarkedLessons(userId: number) {
        return apiClient.get(`/dashboard/GetBookMarkedLessons/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetCourseBookMarkedLabs(userId: number) {
        return apiClient.get(`/dashboard/GetCourseBookMarkedLabs/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetCourseBookMarkedLessons(userId: number) {
        return apiClient.get(`/dashboard/GetCourseBookMarkedLessons/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetUserPoints(userId: number) {
        return apiClient.get(`/dashboard/GetUserPoints/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetUserPointsDetails(userId: number) {
        return apiClient.get(`/dashboard/GetUserPointsDetails/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetSkillChallengeByCategory(courseType: number, categoryId: number, userId: number) {
        return apiClient.get(`/library/GetSkillChallengeCourses/${courseType}/${categoryId}/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
    GetDisplayCoursesByCategory(courseType: number, categoryId: number) {
        return apiClient.get(`/library/GetDisplayCoursesByCategory/${courseType}/${categoryId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    }
};

export default DashboardService;