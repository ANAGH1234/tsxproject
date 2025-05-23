import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Batches from "../containers/batches/Batches";
import LiveSchedules from "../containers/batches/LiveSchedules";
import MySchedules from "../containers/batches/MySchedules";
import ScheduleDetails from "../containers/batches/ScheduleDetails";
import Schedules from "../containers/batches/Schedules";
import Bookmarked from "../containers/bookmarked/Bookmarked";
import BookMarkedLessons from "../containers/bookmarked/BookMarkedLessons";
import CourseBookMarkedLabs from "../containers/bookmarked/CourseBookMarkedLabs";
import FreeCourses from "../containers/courses/FreeCourses";
import FreeResources from "../containers/courses/FreeResources";
import JobOrientedCourses from "../containers/courses/JobOrientedCourses";
import MyBooks from "../containers/courses/MyBooks";

import Dashboard from "../containers/dashboard/Dashboard";
import Footer from "./Footer";
import LeftMenu from "./LeftMenu";
import NavMenu from "./NavMenu";
import BookMarkedLabs from "../containers/bookmarked/BookMarkedLabs";
import MyCorporateTraining from "../containers/livecourses/MyCorporateTraining";
import MyLiveTraining from "../containers/livecourses/MyLiveTraining";
import MyMasterClasses from "../containers/livecourses/MyMasterClasses";
import SubscribedTraining from "../containers/livecourses/SubscribedTraining";
import MySkillChallenge from "../containers/courses/MySkillChallenge";
import MyCourses from "../containers/courses/MyCourses";
import MyLabs from "../containers/courses/MyLabs";
import MyProjects from "../containers/courses/MyProjects";
import MyQna from "../containers/courses/MyQna";
import MyQuickNotes from "../containers/courses/MyQuickNotes";

import SubscribedCourses from "../containers/courses/SubscribedCourses";
import MySkillTests from "../containers/courses/MySkillTests";
import MyCertificates from "../containers/Resources/MyCertificates";
import UserPoints from "../containers/Resources/UserPoints";
import PaymentDetails from "../containers/Payment/PaymentDetails";
import Project from "../containers/trainings/Project";
import TrainingDetails from "../containers/trainings/TrainingDetails";
import QnA from "../containers/trainings/QnA";
import QnADetails from "../containers/trainings/QnADetails";
import QnAText from "../containers/trainings/QnAText";
import Sessions from "../containers/trainings/Sessions";
import Tests from "../containers/tests/Tests";
import Videos from "../containers/videos/Videos";
import UserProgressReport from "../containers/progress/UserProgressReport";
import LiveSessionsUserProgressReport from "../containers/progress/LiveSessionsUserProgressReport";
import CoursePlanDetails from "../containers/courses/CoursePlanDetails";
import Books from "../containers/Books/Books";
import BookDetails from "../containers/Books/BookDetails";
import QnATextDetails from "../containers/trainings/QnATextDetails";
import Labs from "../containers/Labs/Labs";
import QuickNotes from "../containers/notes/QuickNotes";
import QuickNoteDetails from "../containers/notes/QuickNoteDetails";
import Problem from "../containers/Labs/Problem";
import Solution from "../containers/Labs/Solution";
import LabDetails from "../containers/Labs/LabDetails";
import AppliedJobs from "../containers/Jobs/AppliedJobs";
import MeetingEnd from "../containers/meetings/MeetingEnd";
import ChangePassword from "../containers/Profile/ChangePassword";
import CloseMyAccount from "../containers/Profile/CloseMyAccount";
import ProfessionalDetails from "../containers/Profile/ProfessionalDetails";
import ProfileDetails from "../containers/Profile/ProfileDetails";
import BasicDetails from "../containers/Profile/BasicDetails";
import NotFound from "../containers/NotFound";
import SubscriptionDetails from "../containers/subscription/SubscriptionDetails";
import Certificate from "../containers/trainings/Certificate";

// Define the component
const Layout: React.FC = () => {
  return (
    <>
      <NavMenu />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            id="leftSidebar"
            className="col col-md-3 col-xl-2 p-0 bg-light pe-4"
            data-bs-backdrop="false"
          >
            <LeftMenu />
          </div>
          <div className="col pt-5">
            <div className="container-fluid">
              <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="/schedules" element={<LiveSchedules />}>
                  <Route path="" element={<ScheduleDetails />}>
                    <Route path="" element={<MySchedules />} />
                    <Route path="all" element={<Schedules />} />
                  </Route>
                  <Route path="batches" element={<Batches />} />
                </Route>
                <Route path="/resources" element={<FreeResources />}>
                  <Route index element={<Navigate to="free" replace />} />
                  <Route path="free" element={<FreeCourses />} />
                  <Route
                    path="skill-challenges"
                    element={<MySkillChallenge />}
                  />
                  <Route path="books" element={<MyBooks />} />
                </Route>
                <Route
                  path="/subscribed-courses"
                  element={<SubscribedCourses />}
                >
                  <Route path="" element={<MyCourses />} />
                  <Route path="labs" element={<MyLabs />} />
                  <Route path="qna" element={<MyQna />} />
                  <Route path="quicknotes" element={<MyQuickNotes />} />
                  <Route path="tests" element={<MySkillTests />} />
                  <Route path="projects" element={<MyProjects />} />
                  <Route path="free" element={<FreeCourses />} />
                  <Route
                    path="progressreport"
                    element={<UserProgressReport />}
                  />
                  <Route
                    path="JobOrientedCourses"
                    element={<JobOrientedCourses />}
                  />
                </Route>
                <Route path="/bookmarked" element={<Bookmarked />}>
                  <Route path="" element={<BookMarkedLessons />} />
                  <Route path="labs" element={<CourseBookMarkedLabs />} />
                </Route>
                <Route
                  path="/subscribed-training"
                  element={<SubscribedTraining />}
                >
                  <Route path="" element={<MyLiveTraining />} />
                  <Route path="masterclasses" element={<MyMasterClasses />} />
                  <Route
                    path="corporatetraining"
                    element={<MyCorporateTraining />}
                  />
                  <Route path="bmlessons" element={<BookMarkedLessons />} />
                  <Route path="bmlabs" element={<BookMarkedLabs />} />
                  <Route
                    path="liveprogressreport"
                    element={<LiveSessionsUserProgressReport />}
                  />
                </Route>
                <Route
                  path="/courseplan/details"
                  element={<JobOrientedCourses />}
                >
                  <Route path="" element={<CoursePlanDetails />} />
                  <Route path="livesession" element={<Sessions />} />
                </Route>
                <Route path="/books" element={<MyBooks />} />
                <Route path="/resources" element={<FreeResources />} />
                <Route
                  path="/books/:courseid/:subscriptionid/:batchid"
                  element={<TrainingDetails />}
                >
                  <Route path="" element={<Books />} />
                </Route>
                <Route
                  path="/books/:courseid/:subscriptionid/details/:id"
                  element={<BookDetails />}
                />
                <Route path="certificates" element={<MyCertificates />} />
                <Route path="points" element={<UserPoints />} />
                <Route path="/payment-details" element={<PaymentDetails />} />
                <Route
                  path="/training/details/:courseid/:subscriptionid/:batchid"
                  element={<TrainingDetails />}
                >
                  <Route path="" element={<Sessions />} />
                  <Route path="selfplaced" element={<Videos />} />
                  <Route path="labs" element={<Labs />} />
                  <Route path="tests" element={<Tests />} />
                  <Route path="qna" element={<QnADetails />}>
                    <Route path="" element={<QnA />} />
                    <Route path="text" element={<QnAText />} />
                  </Route>
                  <Route path="project" element={<Project />} />
                  <Route path="quicknotes" element={<QuickNotes />} />
                  <Route path="certificate" element={<Certificate />} />
                </Route>
                <Route path="/points" element={<UserPoints />} />
                <Route path="/meeting-end" element={<MeetingEnd />} />
                <Route path="/certificates" element={<MyCertificates />} />
                <Route path="/payment-details" element={<PaymentDetails />} />
                <Route path="/profile" element={<ProfileDetails />}>
                  <Route path="" element={<BasicDetails />} />
                  <Route
                    path="professional"
                    element={<ProfessionalDetails />}
                  />
                  <Route path="password" element={<ChangePassword />} />
                  <Route path="closeaccount" element={<CloseMyAccount />} />
                </Route>
                <Route path="/applied-jobs" element={<AppliedJobs />} />
                <Route
                  path="/training/details/:courseid/:subscriptionid/lab/details/:labid"
                  element={<LabDetails />}
                >
                  <Route path="" element={<Problem />} />
                  <Route path="solution" element={<Solution />} />
                </Route>
                <Route
                  path="/training/details/:courseid/:subscriptionid/quicknote/details/:quicknoteid"
                  element={<QuickNoteDetails />}
                />
                <Route
                  path="/training/details/:courseid/:subscriptionid/qnatext/details/:id"
                  element={<QnATextDetails />}
                />
                <Route
                  path="/subscriptions"
                  element={<SubscriptionDetails />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
