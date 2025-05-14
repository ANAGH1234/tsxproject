import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import type { CourseSubTopicDTO, CourseContentDTO } from '../../models/dashboard/dashboard';
import type { ContentDownloadHistoryDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';


// Define the props interface
interface VideoActionsProps {
  subTopic: CourseSubTopicDTO & {
    SelfPlacedVideoProgress?: number;
    IsVideoCompleted?: boolean;
    Access?: boolean;
  };
  course: CourseContentDTO;
  topic: { TopicId: number };
  selfplaced: string;
  courseid: number;
  batchid: number;
  subscriptionid: number;
  cloudPdfPath?: string;
  cloudCodePath?: string;
  IsSubscribed: boolean;
  isFreeTrial: boolean;
}

const VideoActions: React.FC<VideoActionsProps> = (props) => {
  const navigate = useNavigate();
  const user: User | null = authUser.Get();

  const goToPage = (url: string) => {
    navigate(url, { replace: true });
  };

  const saveAndDownloadContent = (
    item: VideoActionsProps['subTopic'],
    downloadPath: string,
    type: 'PDF' | 'Code',
    courseid: number,
    topicid: number,
    coursetype: string
  ) => {
    if (!user) return;
    let cType = 2;
    let contentType = 'VideoCourse';
    if (coursetype === 'selfplaced') {
      cType = 2;
      contentType = 'VideoCourse';
    } else if (coursetype === 'qna') {
      cType = 10;
      contentType = 'Interview Q&A';
    } else if (coursetype === 'project') {
      cType = 7;
      contentType = 'Project';
    }
    const contentDownloadHistoryDTO: ContentDownloadHistoryDTO = {
      courseId: courseid,
      topicId: topicid,
      subTopicId: item.subTopicId,
      contentType: `${contentType}(${type})`,
      contentName: item.subTopicName,
      courseType: cType,
      memberId: user.userId,
      membershipId: user.membershipId,
      memberName: user.getFullName(),
      email: user.email,
      downloadDate: new Date(),
    };
    TrainingService.saveContentDownloadHistory(contentDownloadHistoryDTO)
      .then(() => {
        window.location.href = downloadPath;
      })
      .catch((err) => console.error(err));
  };

  return (
    <span>
      <span style={{ fontSize: '12px', paddingTop: '8px', display: 'inline-block' }}>
        {props.subTopic.pdfPath &&
          props.subTopic.pdfPath.length > 0 &&
          props.subTopic.pdfPath.includes(IMAGE_ADDRESS) &&
          props.IsSubscribed &&
          !props.isFreeTrial &&
          props.subTopic.Access && (
            <a
              onClick={() =>
                saveAndDownloadContent(
                  props.subTopic,
                  props.subTopic.pdfPath || '',
                  'PDF',
                  props.course.courseContentId,
                  props.topic.TopicId,
                  props.selfplaced
                )
              }
              target="_blank"
              style={{ color: '#d21507', padding: '0 10px 0 0', cursor: 'pointer' }}
            >
              <i className="fas fa-file-pdf" aria-hidden="true" style={{ paddingRight: '2px', color: '#d21507' }}></i>
               Pdf  
            </a>
          )}
        {props.subTopic.pdfPath &&
          props.subTopic.pdfPath.length > 0 &&
          !props.subTopic.pdfPath.includes(IMAGE_ADDRESS) &&
          props.IsSubscribed &&
          !props.isFreeTrial &&
          props.subTopic.Access && (
            <a
              onClick={() =>
                saveAndDownloadContent(
                  props.subTopic,
                  props.cloudPdfPath || '',
                  'PDF',
                  props.course.courseContentId,
                  props.topic.TopicId,
                  props.selfplaced
                )
              }
              target="_blank"
              style={{ color: '#d21507', padding: '0 10px 0 0', cursor: 'pointer' }}
            >
              <i className="fas fa-file-pdf" aria-hidden="true" style={{ paddingRight: '2px', color: '#d21507' }}></i>
               Pdf  
            </a>
          )}
        {props.subTopic.codePath &&
          props.subTopic.codePath.length > 0 &&
          props.subTopic.codePath.includes(IMAGE_ADDRESS) &&
          props.IsSubscribed &&
          !props.isFreeTrial &&
          props.subTopic.Access && (
            <a
              onClick={() =>
                saveAndDownloadContent(
                  props.subTopic,
                  props.subTopic.codePath || '',
                  'Code',
                  props.course.courseContentId,
                  props.topic.TopicId,
                  props.selfplaced
                )
              }
              target="_blank"
              style={{ fontSize: '12px', padding: '0 10px 0 0', cursor: 'pointer' }}
            >
              <i className="fa fa-file-code" aria-hidden="true" style={{ paddingRight: '2px' }}></i>
               Code
            </a>
          )}
        {props.subTopic.codePath &&
          props.subTopic.codePath.length > 0 &&
          !props.subTopic.codePath.includes(IMAGE_ADDRESS) &&
          props.IsSubscribed &&
          !props.isFreeTrial &&
          props.subTopic.Access && (
            <a
              onClick={() =>
                saveAndDownloadContent(
                  props.subTopic,
                  props.cloudCodePath || '',
                  'Code',
                  props.course.courseContentId,
                  props.topic.TopicId,
                  props.selfplaced
                )
              }
              target="_blank"
              style={{ fontSize: '12px', padding: '0 10px 0 0', cursor: 'pointer' }}
            >
              <i className="fa fa-file-code" aria-hidden="true" style={{ paddingRight: '2px' }}></i>
               Code
            </a>
          )}
      </span>
      <span className="ms-2" style={{ fontSize: '12px' }}>
        <i className="far fa-clock" aria-hidden="true"></i>
         {props.subTopic.duration}
      </span>
      {props.subTopic.SelfPlacedVideoProgress != null &&
      props.subTopic.SelfPlacedVideoProgress > 0 &&
      props.subTopic.IsVideoCompleted ? (
        <span style={{ fontSize: '12px' }}>
          <span style={{ cursor: 'pointer', color: 'green' }} className="ps-2">
            <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
          </span>
        </span>
      ) : props.subTopic.SelfPlacedVideoProgress != null &&
        props.subTopic.SelfPlacedVideoProgress > 0 &&
        !props.subTopic.IsVideoCompleted ? (
        <span className="ms-2">
          <div className="progress" style={{ height: '10px', display: 'inline-block', width: '100px' }}>
            <div className="progress-bar" style={{ width: `${props.subTopic.SelfPlacedVideoProgress}%`, height: '10px' }}></div>
          </div>
          <span style={{ fontSize: '12px' }}>{props.subTopic.SelfPlacedVideoProgress}%</span>
        </span>
      ) : (
        <span style={{ fontSize: '12px' }}>
          <span style={{ cursor: 'pointer' }} className="ps-2">Not Started</span>
        </span>
      )}
      {props.IsSubscribed && props.subTopic.Access ? (
        props.subTopic.SelfPlacedVideoProgress != null &&
        props.subTopic.SelfPlacedVideoProgress > 0 &&
        !props.subTopic.IsVideoCompleted ? (
          <button
            type="button"
            onClick={() =>
              goToPage(
                `/user/app/videos/${props.selfplaced}/${props.courseid}/${props.batchid}/${props.subscriptionid}/${props.topic.TopicId}/${props.subTopic.subTopicId}/${props.course.courseContentId}`
              )
            }
            className="btn btn-info ms-2"
            style={{ lineHeight: '1', width: '70px', padding: '6px' }}
          >
            Resume
          </button>
        ) : props.subTopic.IsVideoCompleted ? (
          <button
            type="button"
            onClick={() =>
              goToPage(
                `/user/app/videos/${props.selfplaced}/${props.courseid}/${props.batchid}/${props.subscriptionid}/${props.topic.TopicId}/${props.subTopic.subTopicId}/${props.course.courseContentId}`
              )
            }
            className="btn-sm btn-success ms-2"
            style={{ lineHeight: '1', width: '70px', padding: '6px 10px' }}
          >
            Rewatch
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              goToPage(
                `/user/app/videos/${props.selfplaced}/${props.courseid}/${props.batchid}/${props.subscriptionid}/${props.topic.TopicId}/${props.subTopic.subTopicId}/${props.course.courseContentId}`
              )
            }
            className="btn-sm btn-primary ms-2"
            style={{ lineHeight: '1', width: '70px', padding: '6px 20px' }}
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
        >
          Start Now
        </button>
      )}
    </span>
  );
};

export default VideoActions;