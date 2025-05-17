import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';

import SkillTest from '../containers/tests/SkillTest.tsx';
import ExamResult from '../containers/tests/ExamResult';
import AnswerSheet from '../containers/tests/AnswerSheet';


import NavMenu from './NavMenu';

import SkillChallenge from '../containers/SkillChallenge/SkillChallenge';

import SkillChallengeResult from '../containers/SkillChallenge/SkillChallengeResult';
import ScholarshipTest from '../containers/scholarship/ScholarshipTest.tsx';
import ScholarshipTestResult from '../containers/scholarship/ScholarshipTestResult.tsx';
import SkillChallengeDetails from '../containers/SkillChallenge/SkillChallengeDetails.tsx';

export default function TestLayout() {
    return (
        <div>
            <NavMenu />
            <div className="pt-5">
                <div className="container">
                    <Routes>
                        <Route path='/:courseid/:subscriptionid/:testpaperid' element={<SkillTest />}></Route>
                        {/* <Route path='/:courseid/:subscriptionid/:testpaperid/exam/start' element={<ExamDetails />}></Route> */}
                        <Route path='/:courseid/:subscriptionid/:testpaperid/:testattemptedstatusId/exam/result' element={<ExamResult />}></Route>
                        <Route path='/:courseid/:subscriptionid/:testpaperid/:testattemptedstatusId/exam/answersheet' element={<AnswerSheet />}></Route>

                        <Route path='/test/:courseid' element={<ScholarshipTest />}></Route>
                        {/* <Route path='/test/:courseid/:testpaperid/exam/start' element={<ScholarshipTestDetails />}></Route> */}
                        <Route path='/test/:courseid/:testpaperid/exam/result' element={<ScholarshipTestResult />}></Route>
                        
                        <Route path='/challenge/:courseid/' element={<SkillChallenge />}></Route>
                        <Route path='/challenge/:courseid/:testpaperid/skillexam/start' element={<SkillChallengeDetails />}></Route>
                        <Route path='/challenge/:courseid/:testpaperid/skillexam/result' element={<SkillChallengeResult />}></Route>
                    </Routes>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
