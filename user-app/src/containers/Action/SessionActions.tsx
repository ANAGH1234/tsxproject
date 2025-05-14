
import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import { EnumCourseType } from '../../helpers/enum';
import type { CourseLiveSessionVideo, SubscribeCourseDetailDTO, ContentDownloadHistoryDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';



interface SessionActionsProps {
  item: CourseLiveSessionVideo; 
  sessionData: SubscribeCourseDetailDTO; 
  courseid: string;
  subscriptionid: string;
  cloudPdfPath?: string;
  cloudCodePath?: string;
}

const SessionActions: React.FC<SessionActionsProps> = ({ item, sessionData, courseid, subscriptionid, cloudPdfPath, cloudCodePath }) => {
  const navigate = useNavigate();
  const user: User | null = authUser.Get();

  const goToPage = (url: string): void => {
    navigate(url, { replace: true });
  };

  const saveAndDownloadContent = (item: CourseLiveSessionVideo, downloadPath: string, type: 'PDF' | 'Code'): void => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const contentDownloadHistoryDTO: ContentDownloadHistoryDTO = {
      memberId: user.userId,
      membershipId: user.membershipId,
      courseId: item.courseId,
      contentType: `LiveSession(${type})`,
      contentName: item.topicName,
      courseType: EnumCourseType.Instructorled,
      downloadDate: new Date(),
    };

    TrainingService.saveContentDownloadHistory(contentDownloadHistoryDTO)
      .then(() => {
        window.location.href = downloadPath;
      })
      .catch((err) => {
        console.error('Error saving content download history:', err);
      });
  };

  if (!user) {
    return <div className="text-danger">Please log in to access this content</div>;
  }

  return (
    <div className="col-sm-7 col-xs-12" style={{ textAlign: 'right' }}>
      <span>
        {item.pdfPath && item.pdfPath.includes(IMAGE_ADDRESS) && sessionData.isLiveSessionsSubscribed && !sessionData.isTrialSubscribed && (
          <a
            onClick={() => saveAndDownloadContent(item, item.pdfPath || '', 'PDF')}
            className="ms-2 btn btn-outline-danger"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', padding: '2px 8px' }}
            aria-label="Download PDF"
          >
            <i className="fa-solid fa-file-arrow-down" aria-hidden="true" title="Download PDF"></i> PDF
          </a>
        )}
        {item.pdfPath && !item.pdfPath.includes(IMAGE_ADDRESS) && sessionData.isLiveSessionsSubscribed && !sessionData.isTrialSubscribed && cloudPdfPath && (
          <a
            onClick={() => saveAndDownloadContent(item, cloudPdfPath, 'PDF')}
            className="ms-2 btn btn-outline-danger"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', padding: '3px 7px' }}
            aria-label="Download PDF"
          >
            <i className="fa-solid fa-file-arrow-down" aria-hidden="true" title="Download PDF"></i> PDF
          </a>
        )}
        {item.codePath && item.codePath.includes(IMAGE_ADDRESS) && sessionData.isLiveSessionsSubscribed && !sessionData.isTrialSubscribed && (
          <a
            onClick={() => saveAndDownloadContent(item, item.codePath || '', 'Code')}
            className="ms-2 btn btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', padding: '4px 6px', height: '26px' }}
            aria-label="Download Code"
          >
            <i className="fa-solid fa-code" aria-hidden="true" style={{ paddingRight: '2px' }} title="Download Code"></i> Code
          </a>
        )}
        {item.codePath && !item.codePath.includes(IMAGE_ADDRESS) && sessionData.isLiveSessionsSubscribed && !sessionData.isTrialSubscribed && cloudCodePath && (
          <a
            onClick={() => saveAndDownloadContent(item, cloudCodePath, 'Code')}
            className="ms-2 btn btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', padding: '4px 6px', height: '26px' }}
            aria-label="Download Code"
          >
            <i className="fa-solid fa-code" aria-hidden="true" style={{ paddingRight: '2px' }} title="Download Code"></i> Code
          </a>
        )}
      </span>
      <span className="ms-2" style={{ fontSize: '12px', paddingRight: '5px' }}>
        <i className="fa-regular fa-calendar-check"></i> {item.createdDate ? moment(item.createdDate).format('ll') : 'N/A'}
      </span>
      <span className="ms-2" style={{ fontSize: '12px' }}>
        <i className="far fa-clock" aria-hidden="true" title="Play Video"></i> {item.duration}
      </span>
      {item.liveVideoProgress && item.liveVideoProgress > 0 && item.isVideoCompleted ? (
        <span style={{ fontSize: '12px' }}>
          <span style={{ cursor: 'pointer', color: '#009688' }} className="ps-2">
            <i style={{ color: '#009688' }} className="fa fa-check-circle" aria-hidden="true" aria-label="Completed"></i> Completed
          </span>
        </span>
      ) : item.liveVideoProgress && item.liveVideoProgress > 0 && !item.isVideoCompleted ? (
        <span className="ms-2">
          <div className="progress" style={{ height: '10px', display: 'inline-block', width: '100px' }}>
            <div className="progress-bar" style={{ width: `${item.liveVideoProgress}%`, height: '10px' }}></div>
          </div>
          <span style={{ fontSize: '12px' }}>{item.liveVideoProgress}%</span>
        </span>
      ) : (
        <span style={{ fontSize: '12px' }}>
          <span style={{ cursor: 'pointer' }} className="ps-2">
            Not Started
          </span>
        </span>
      )}
      {sessionData.isLiveSessionsSubscribed ? (
        item.liveVideoProgress && item.liveVideoProgress > 0 && !item.isVideoCompleted ? (
          <button
            type="button"
            onClick={() => goToPage(`/user/app/videos/${courseid}/${item.batchId}/${subscriptionid}/${item.liveTopicId}`)}
            className="btn btn-info ms-2"
            style={{ lineHeight: '1', width: '70px', padding: '6px' }}
            aria-label="Resume Video"
          >
            Resume
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goToPage(`/user/app/videos/${courseid}/${item.batchId}/${subscriptionid}/${item.liveTopicId}`)}
            className="btn btn-primary ms-2"
            style={{ lineHeight: '1', width: '70px', padding: '6px' }}
            aria-label="Start Video"
          >
            Start
          </button>
        )
      ) : (
        <button
          type="button"
          className="btn-sm ms-2"
          style={{ lineHeight: '1.3', backgroundColor: 'dimgrey', color: 'Linen', opacity: '1' }}
          disabled
          aria-label="Start Video (Disabled)"
        >
          Start Now
        </button>
      )}
    </div>
  );
};

export default SessionActions;
