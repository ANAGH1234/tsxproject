import { Routes, Route } from 'react-router-dom';
import SessionPlayer from '../containers/trainings/SessionPlayer'
import VideoPlayer from '../containers/videos/VideoPlayer';

export default function VideoLayout() {
    return (
        <div>
            <Routes>
                <Route path='/:cid/:bid/:sid/:tid' element={<SessionPlayer />}></Route>
                <Route path='/selfplaced/:cid/:bid/:sid/:tid/:stid/:ccid' element={<VideoPlayer />}></Route>
                <Route path='/qna/:cid/:bid/:sid/:tid/:stid/:ccid' element={<VideoPlayer />}></Route>
                <Route path='/project/:cid/:bid/:sid/:tid/:stid/:ccid' element={<VideoPlayer />}></Route>
            </Routes>
        </div>
    )
}
