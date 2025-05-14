import apiClient from "../helpers/apiClient";
import type { UserRankingDTO, ProblemsDTO, ProblemOfTheDayDTO, UserDTO } from "../models/problems/problems";


interface PagedResponse<T> {
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}

interface RankingsService {
    fetchUserRankings: (page: number, pageSize: number, isCurrentMonth: boolean) => Promise<PagedResponse<UserRankingDTO>>;
    fetchUserRanking: (userId: number) => Promise<UserRankingDTO>;
    fetchUserDetails: (userId: number) => Promise<UserDTO>;
    fetchProblemsList: () => Promise<ProblemsDTO[]>;
    fetchProblemOfTheDay: () => Promise<ProblemOfTheDayDTO>;
}

const RankingsService: RankingsService = {
    fetchUserRankings(page: number, pageSize: number, isCurrentMonth: boolean) {
        return apiClient
            .get<PagedResponse<UserRankingDTO>>("/problems/rankings", {
                params: {
                    page,
                    pageSize,
                    isCurrentMonth,
                },
            })
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },

    fetchUserRanking(userId: number) {
        return apiClient
            .get<UserRankingDTO>(`/problems/rankings/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },

    fetchUserDetails(userId: number) {
        return apiClient
            .get<UserDTO>(`/User/Profile/${userId}`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },

    fetchProblemsList() {
        return apiClient
            .get<ProblemsDTO[]>(`/Problems/ProblemList`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },

    fetchProblemOfTheDay() {
        return apiClient
            .get<ProblemOfTheDayDTO>(`/problems/problem-of-the-day`)
            .then((res) => res.data)
            .catch((err) => { throw err; });
    },
};

export default RankingsService;