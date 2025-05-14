import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js'; 
import { useParams, useNavigate } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import '../../assets/css/quicknote.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { InterviewQuestionDto } from '../../models/dashboard/dashboard';
import Swal from 'sweetalert2';
import type { QuickNoteTrackingDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';


const BookDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id, subscriptionid, courseid } = useParams<{
    id?: string;
    subscriptionid?: string;
    courseid?: string;
  }>();
  const user: User | null = authUser.Get();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [qnATextDetailData, setQnATextDetailData] = useState<InterviewQuestionDto>({
    id: null,
    title: '',
    description: null,
    sequence: 0,
    domainName: '',
    duration: null,
    isFree: null,
    isActive: null,
    url: null,
    mentorId: null,
    difficultyTypeId: null,
    categoryId: null,
    courseId: null,
    totalQuestions: 0,
    mentorMasterList: [],
    categoryDDL: [],
    difficultyTypeName: '',
    categoryName: '',
    mentorName: '',
    courseName: '',
    isQnATextCompleted: false,
    isQnATextStarted: false,
    isBookMarked: false,
    qnACount: 0,
    completedQnACount: 0,
    performance: 0,
    qnATextPagingList: [],
    currentPageIndex: 0,
    totalQnA: 0,
  });
  const [pIndex, setPIndex] = useState<number>(0);
  const [totalQN, setTotalQN] = useState<number>(0);

  const highlightCode = () => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  };

  useEffect(() => {
    if (!user || !id || !courseid) {
      console.error('Missing user, id, or courseid');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError(null);
    document.title = 'QnA Text: Loading...';
    TrainingService.getQnATextDetails(parseInt(id, 10), parseInt(courseid, 10), user.userId)
      .then((res) => {
        const data: InterviewQuestionDto = res;
        setQnATextDetailData(data);
        document.title = `QnA Text: ${data.title}`;
        highlightCode();
        setPIndex(data.currentPageIndex);
        setTotalQN(data.totalQnA);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching QnA text details:', error);
        setError('Failed to load QnA details');
        Swal.fire('', 'Failed to load QnA details', 'error');
        setIsLoading(false);
      });
  }, [id, courseid, user, navigate]);

  const saveTracking = () => {
    if (!user || !id || !courseid || !subscriptionid) return;

    Swal.fire({
      title: '',
      text: 'Have you completed this QnA Text?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: 'No, cancel it!',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        const quickNoteTrackingDTO: QuickNoteTrackingDTO = {
          id: 0, // New record, typically 0
          courseId: qnATextDetailData.courseId || 0,
          batchId: 0, // Adjust based on API requirements
          quickNoteId: parseInt(id, 10),
          userId: user.userId,
          isComplete: true,
          startDate: new Date(), // Set to current date
          completedDate: new Date(), // Set when marking as complete
        };
        TrainingService.saveQnATextTracking(quickNoteTrackingDTO)
          .then((res) => {
            // Assuming res is a number (status code). Verify API response structure.
            if (res === 200) {
              Swal.fire('', "You've successfully marked it completed", 'success');
              TrainingService.getQnATextDetails(
                parseInt(id, 10),
                parseInt(courseid, 10),
                user.userId
              ).then((res) => {
                const data: InterviewQuestionDto = res;
                setQnATextDetailData(data);
              });
            } else {
              Swal.fire('', 'Failed to mark as completed', 'error');
            }
          })
          .catch((error) => {
            console.error('Error saving QnA text tracking:', error);
            Swal.fire('', 'Failed to mark as completed', 'error');
          });
      }
    });
  };

  const prevQN = () => {
    if (!id || !courseid || !subscriptionid) return;

    const currentQn = qnATextDetailData.qnATextPagingList.filter(
      (qn) => qn.id === parseInt(id, 10)
    );
    if (currentQn.length === 0) return;

    const newPIndex = currentQn[0].pageIndex - 1;
    const updatedList = qnATextDetailData.qnATextPagingList.filter(
      (qn) => qn.pageIndex === newPIndex
    );
    if (updatedList.length === 0) {
      console.warn('No QnA found for page index:', newPIndex);
      return;
    }
    setPIndex(newPIndex);
    navigate(`/user/app/books/${courseid}/${subscriptionid}/details/${updatedList[0].id}`);
  };

  const nextQN = () => {
    if (!id || !courseid || !subscriptionid) return;

    const currentQn = qnATextDetailData.qnATextPagingList.filter(
      (qn) => qn.id === parseInt(id, 10)
    );
    if (currentQn.length === 0) return;

    const newPIndex = currentQn[0].pageIndex + 1;
    const updatedList = qnATextDetailData.qnATextPagingList.filter(
      (qn) => qn.pageIndex === newPIndex
    );
    if (updatedList.length === 0) {
      console.warn('No QnA found for page index:', newPIndex);
      return;
    }
    setPIndex(newPIndex);
    navigate(`/user/app/books/${courseid}/${subscriptionid}/details/${updatedList[0].id}`);
  };

  if (!user || !id || !courseid || !subscriptionid) {
    return null;
  }

  const backHref = document.referrer.includes('/courseplan/details')
    ? `/user/app/courseplan/details/${courseid}/${subscriptionid}/0`
    : `/user/app/books/${courseid}/${subscriptionid}/0`;

  const prev = '< Prev';
  const next = 'Next >';

  return (
    <div className="mt-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="catinfo mt-4 mb-4">
            <div className="p-3">
              <div className="row">
                <div className="col-sm-9 pt-3">
                  <h1 className="h2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      aria-label="QnA Icon"
                    >
                      <path d="M480-240q21 0 35.5-14.5T530-290q0-21-14.5-35.5T480-340q-21 0-35.5 14.5T430-290q0 21 14.5 35.5T480-240Zm-36-154h74q0-36 8-53t34-43q35-35 49.5-58.5T624-602q0-53-36-85.5T491-720q-55 0-93.5 27T344-618l66 26q7-27 28-43.5t49-16.5q27 0 45 14.5t18 38.5q0 17-11 36t-37 42q-33 29-45.5 55.5T444-394ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"></path>
                    </svg>{' '}
                    {qnATextDetailData.title}
                  </h1>
                </div>
                <div className="col-sm-3 d-none d-sm-block" style={{ paddingTop: '5px' }}>
                  <a className="gobackicon btn btn-outline-primary" href={backHref}>
                    <i className="fa fa-arrow-circle-left" aria-label="Go Back"></i>{' '}
                    <span className="gobacktext">Go Back</span>
                  </a>
                  {qnATextDetailData.isQnATextCompleted ? (
                    <span style={{ color: 'green', fontSize: '14px' }} className="ps-2">
                      <i
                        style={{ color: 'green' }}
                        className="fa fa-check-circle"
                        aria-hidden="true"
                        aria-label="Completed"
                      ></i>{' '}
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={saveTracking}
                      className="btn-sm btn-primary ms-2"
                      style={{ padding: '11px', cursor: 'pointer' }}
                    >
                      I've Finished
                    </button>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <div className="row">
                  <div className="col-sm-2 col-6">
                    <i className="fa-solid fa-signal" aria-label="Difficulty Level"></i> Level:{' '}
                    {qnATextDetailData.difficultyTypeName}
                  </div>
                  <div className="d-block d-sm-none col-6">
                    <a
                      className="gobackicon btn btn-outline-primary"
                      href={`/user/app/training/details/${courseid}/${subscriptionid}/0/qna/text`}
                      style={{ float: 'right', marginRight: '6px', marginTop: '-6px' }}
                    >
                      <i className="fa fa-arrow-circle-left" aria-label="Go Back"></i>{' '}
                      <span className="gobacktext">Go Back</span>
                    </a>
                  </div>
                  <div className="col-sm-4 col-12">
                    <span className="mentorspan">
                      <i
                        className="fa-solid fa-chalkboard-user"
                        aria-label="Mentor"
                      ></i>{' '}
                      Mentor: {qnATextDetailData.mentorName || 'NA'}
                    </span>
                  </div>
                  <div className="col-sm-2 col-6">
                    <i className="far fa-clock" aria-label="Duration"></i> Duration:{' '}
                    {qnATextDetailData.duration || 'N/A'}
                  </div>
                  <div className="d-block d-sm-none col-6">
                    {qnATextDetailData.isQnATextCompleted ? (
                      <span
                        style={{ color: 'green', fontSize: '14px', float: 'right' }}
                        className="ps-2"
                      >
                        <i
                          style={{ color: 'green' }}
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          aria-label="Completed"
                        ></i>{' '}
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={saveTracking}
                        className="btn-sm btn-primary ms-2"
                        style={{
                          padding: '11px',
                          cursor: 'pointer',
                          float: 'right',
                          marginRight: '6px',
                          marginTop: '-6px',
                        }}
                      >
                        I've Finished
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="quicknote">
            <div
              className="box-shadow p-3"
              dangerouslySetInnerHTML={{ __html: qnATextDetailData.description || '' }}
            ></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            {pIndex > 1 && (
              <button
                type="button"
                onClick={prevQN}
                className="btn-sm btn-primary ms-2"
                style={{ padding: '6px 20px' }}
              >
                {prev}
              </button>
            )}
            {pIndex < totalQN && (
              <button
                type="button"
                onClick={nextQN}
                className="btn-sm btn-primary ms-2"
                style={{ padding: '6px 20px' }}
              >
                {next}
              </button>
            )}
            {qnATextDetailData.isQnATextCompleted ? (
              <span style={{ color: 'green', fontSize: '14px' }} className="ps-2">
                <i
                  style={{ color: 'green' }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                  aria-label="Completed"
                ></i>{' '}
                Completed
              </span>
            ) : (
              <button
                onClick={saveTracking}
                className="btn-sm btn-primary ms-2"
                style={{ padding: '9px 20px', cursor: 'pointer' }}
              >
                I've Finished
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
