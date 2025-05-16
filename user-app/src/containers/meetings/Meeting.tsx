import React, { useEffect } from 'react';
import apiClient from "../../helpers/apiClient";
import authUser from '../../helpers/authUser';

import { ZoomMtg } from '@zoom/meetingsdk';

//custom css
import '../../assets/css/meeting.css';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const Meeting: React.FC = ()=> {
    const signatureEndpoint = window.location.origin + '/api/zoom/getmeetingdetail';
    const user = authUser.Get();
    useEffect(() => {
        if(!user) return
        let meetingNo = localStorage.getItem('id');
        let name = user.firstName + " " + user.lastName;
        let email = user.email;
        const authEndpoint = signatureEndpoint + '/' + meetingNo + '/' + name + '/' + email;
        joinMeeting(authEndpoint);
    }, [])

    function joinMeeting(authEndpoint:any) {
        apiClient.get(authEndpoint).then(res => res.data)
            .then(response => {
                if (response != null)
                    startMeeting(response)
            }).catch(error => {
                console.log(error)
            });
    }

    function startMeeting(meetingInfo :any) {
        const zmmtgRoot = document.getElementById('zmmtg-root');
        if (zmmtgRoot) {
            zmmtgRoot.style.display = 'block';
        } else {
            console.warn("Element with ID 'zmmtg-root' not found.");
        }
           ZoomMtg.init({
            leaveUrl: meetingInfo.leaveUrl,
            patchJsMedia: true,
            //isSupportAV: true,
            disableInvite: true,
            meetingInfo: [],
            success: (success:any) => {
                ZoomMtg.join({
                    sdkKey: meetingInfo.sdkKey,
                    signature: meetingInfo.signature,
                    meetingNumber: meetingInfo.meetingNumber,
                    userName: meetingInfo.userName,
                    userEmail: meetingInfo.userEmail,
                    passWord: meetingInfo.passWord,
                    success: (success:any) => {
                        //console.log(success);
                        //save join history
                        let shId = localStorage.getItem('shId');
                        let batchId = localStorage.getItem('batchId');
                        var url = window.location.origin + '/api/zoom/savejoinhistory/' + shId + "/" + batchId + "/" + user?.userId;
                        apiClient.get(url).then(res => res.data)
                            .then(response => {
                                //console.log('saved history');
                            }).catch(error => {
                                console.log(error)
                            });
                    },
                    error: (error:any) => {
                        console.log(error)
                    }
                })
            },
            error: (error:any) => {
                console.log(error)
            }
        })
    }
    return (
        <div>
          {/* Required container for Zoom Meeting SDK */}
          <div id="zmmtg-root" style={{ display: 'none' }} />
          {/* Optional: Add a loading or placeholder UI */}
          <div className="meeting-container">
            {user ? (
              <p>Joining meeting as {user.firstName} {user.lastName}...</p>
            ) : (
              <p>Please log in to join the meeting.</p>
            )}
          </div>
        </div>
      );
}

export default Meeting;