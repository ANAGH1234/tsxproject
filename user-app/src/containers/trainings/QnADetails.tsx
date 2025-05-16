import  { useEffect, useState } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';

import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import type { UserTranningDTO } from '../../models/dashboard/dashboard';

export default function QnADetails() {
    const navigate = useNavigate();
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const [qnAData, setQnAData] = useState<UserTranningDTO | any>();
    const user = authUser.Get();

    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.checkQnAExistForCourse(courseid, user.userId).then(res => {
            setQnAData(res);
            setIsLoading(false);
            if (!res.IsQnAVideoExists && res.IsQnATextExists) {
                navigate(`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/qna/text`);
            }
        })
    }, []);

    return (<div className="mt-4">
        <div className='tab'>
            {
                qnAData != null && qnAData.IsQnAVideoExists && !qnAData.IsQnATextExists &&
                <div>
                    <NavLink end to={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/qna`} className="tablink"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M381.565-307.609 652.63-480 381.565-652.63v345.021Zm98.468 233.587q-83.468 0-157.541-31.878-74.073-31.879-129.393-87.199-55.32-55.32-87.199-129.36-31.878-74.04-31.878-157.508 0-84.468 31.878-158.541 31.879-74.073 87.161-128.906 55.283-54.832 129.341-86.818 74.057-31.986 157.545-31.986 84.488 0 158.589 31.968 74.102 31.967 128.916 86.768 54.815 54.801 86.79 128.883Q886.218-564.516 886.218-480q0 83.501-31.986 157.57-31.986 74.069-86.818 129.36-54.833 55.291-128.873 87.17-74.04 31.878-158.508 31.878Zm-.033-68.13q141.043 0 239.446-98.752Q817.848-339.656 817.848-480q0-141.043-98.402-239.446-98.403-98.402-239.566-98.402-140.163 0-238.945 98.402-98.783 98.403-98.783 239.566 0 140.163 98.752 238.945Q339.656-142.152 480-142.152ZM480-480Z"></path></svg> <span>QnA Video</span></NavLink>
                </div>
            }
            {
                qnAData != null && qnAData.IsQnATextExists && !qnAData.IsQnAVideoExists &&
                <div>
                    <NavLink end to={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/qna/text`} className="tablink"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 0 16 16"><path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path></svg> <span>QnA Text</span></NavLink>
                </div>
            }
            {
                qnAData != null && qnAData.IsQnAVideoExists && qnAData.IsQnATextExists &&
                <div>
                    <NavLink end to={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/qna`} className="tablink"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M381.565-307.609 652.63-480 381.565-652.63v345.021Zm98.468 233.587q-83.468 0-157.541-31.878-74.073-31.879-129.393-87.199-55.32-55.32-87.199-129.36-31.878-74.04-31.878-157.508 0-84.468 31.878-158.541 31.879-74.073 87.161-128.906 55.283-54.832 129.341-86.818 74.057-31.986 157.545-31.986 84.488 0 158.589 31.968 74.102 31.967 128.916 86.768 54.815 54.801 86.79 128.883Q886.218-564.516 886.218-480q0 83.501-31.986 157.57-31.986 74.069-86.818 129.36-54.833 55.291-128.873 87.17-74.04 31.878-158.508 31.878Zm-.033-68.13q141.043 0 239.446-98.752Q817.848-339.656 817.848-480q0-141.043-98.402-239.446-98.403-98.402-239.566-98.402-140.163 0-238.945 98.402-98.783 98.403-98.783 239.566 0 140.163 98.752 238.945Q339.656-142.152 480-142.152ZM480-480Z"></path></svg> <span>QnA Video</span></NavLink>
                    <NavLink end to={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/qna/text`} className="tablink"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 0 16 16"><path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path></svg> <span>QnA Text</span></NavLink>
                </div>
            }
        </div>
        <div className='row pt-4'>
            <Outlet context={[videoData]}></Outlet>
        </div>
    </div>
    )
}