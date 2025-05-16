import { Routes, Route } from 'react-router-dom';
import Meeting from '../containers/meetings/Meeting';

export default function MeetingLayout() {
    return (
        <div>
            <Routes>
                <Route path='' element={<Meeting />}></Route>
            </Routes>
        </div>
    )
}
