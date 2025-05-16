import React from 'react'
import { NavLink } from "react-router-dom";

export default function MeetingEnd() {
    return (
        <div className='pt-5'>
            <div className="block-header">
                <h2>Thanks for joining the session!</h2>
            </div>
            <div className="row">
                <div className="col-sm-12 mt-4">
                    <ul>
                        <li>To Be Successful - Keep Learning. Keep Practicing. Keep Empowering.</li>
                        <li>We'll meet again in the next session.</li>
                        <li>If you have any questions about today session, feel free to ask on Discord.</li>
                        <li>The session recording of today's session will be shared within 24 Hrs.</li>
                        <li>Don't forget to do practice to build hands-on experience.</li>
                        <li>Happy Coding <span style={{ fontWeight: 500 }}>{'{'} ; {'}'}</span></li>
                    </ul>
                </div>
                <div className="col-sm-12 mt-4">
                    <p>
                        <NavLink to="/user/app/schedules" className="btn btn-primary">Browse More Schedules</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}
