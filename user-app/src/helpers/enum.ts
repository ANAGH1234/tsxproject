// import authUser from "./authUser";

// const User= authUser.Get()

const EnumMembershipType = {
    BasicHalfYearly: 100,
    PlusHalfYearly: 101,
    ProHalfYearly: 102,
    Basic: 125,
    Plus: 126,
    Pro: 127,
    Team: 128,
    Trial: 199,
    Premium: 200,
    Diamond: 201
};
export default EnumMembershipType;

//DSAwithJava:51, DSAC#:58, Gen AI:217, DSA:483, DSwithPython:523, AI:521,  DSAwithWeb:419
//DAWithML:510, DSWithPython:523, AzureAI Foundry:940
export const DiamondCourses = [37, 51, 217, 419, 483, 510, 512, 523, 521, 940];

export function ShowEnumMembershipType(membershipId:number) {
    switch (membershipId) {
        case 100:
            return "Basic Half-Yealry Membership";
        case 101:
            return "Plus Half-Yealry Membership";
        case 102:
            return "Pro Half-Yealry Membership";
        case 125:
            return "Basic Membership";
        case 126:
            return "Plus Membership";
        case 127:
            return "Pro Membership";
        case 128:
            return "Team Membership";
        case 199:
            return "Trial Membership";
        case 200:
            return "Premium Membership";
        case 201:
            return "Diamond Membership";
        default:
            return "";
    }
}


export const EnumCourseType = {
    Instructorled: 1,
    SelfPlaced: 2,
    Books: 3,
    Membership: 4,
    FreeCourse: 5,
    JobOriented: 6,
    Project: 7,
    HandsOnLab: 8,
    MasterClass: 9,
    QnA: 10,
    TestPaper: 11,
    Trial: 12,
    QuickNote: 13
};

export const EnumTestPaperType = {
    SkillTest: 1,
    Scholarship: 2,
    SkillChallenge: 3,
    CertificationExam: 4,
};