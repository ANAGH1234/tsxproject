import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { CertificateMaster } from '../../models/training/training';




const MyCertificates: React.FC = () => {
  const [certificateData, setCertificateData] = useState<CertificateMaster[] | any>(null);
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  useEffect(() => {
    setIsLoading(true);
    document.title = 'My Certificates';
    if(!user) return
    TrainingService.getCertificates(user.userId).then(res => {
      setCertificateData(res);
      setCertificateCount(res.TotalRows);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="pt-5">
      <div className="block-header">
        <h2>
          My Certificates{' '}
          {certificateCount !== undefined ? `(${certificateCount})` : ''}
        </h2>
      </div>
      {certificateData?.Data?.length ? (
        <div className="pt-4">
          <table
            className="table table-bordered bordered table-striped"
            style={{ border: '1px solid #dee2e6' }}
          >
            <tbody>
              <tr>
                <th style={{ border: '1px solid #dee2e6' }}>Certificate Id</th>
                <th style={{ border: '1px solid #dee2e6' }}>Certificate Title</th>
                <th style={{ border: '1px solid #dee2e6' }} className="hidden-xs">
                  Certificate Type
                </th>
                <th style={{ border: '1px solid #dee2e6' }} className="hidden-xs">
                  Issued Date
                </th>
                <th style={{ border: '1px solid #dee2e6' }}>Action</th>
              </tr>
              {certificateData.Data.map((certificate: CertificateMaster, cIndex: number) => {
                const downLoadURL = `/User/Home/ViewCertificateDownload/${certificate.Id}`;
                return (
                  <tr key={cIndex}>
                    <td style={{ border: '1px solid #dee2e6' }}>
                      {certificate.CertificateId}
                    </td>
                    <td style={{ border: '1px solid #dee2e6' }}>
                      {certificate.CourseName}
                    </td>
                    <td
                      style={{ border: '1px solid #dee2e6' }}
                      className="hidden-xs"
                    >
                      {certificate.CertificateTypeName}
                    </td>
                    <td
                      style={{ border: '1px solid #dee2e6' }}
                      className="hidden-xs"
                    >
                      {moment(certificate.IssueDate).format('DD MMM yyyy')}
                    </td>
                    <td
                      style={{ paddingTop: '4px', border: '1px solid #dee2e6' }}
                    >
                      <a href={downLoadURL}>Download</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : (
            certificateCount === undefined && (
              <div className="text-center pt-3">
                <p className="pt-2 pb-2">
                  <img src="/images/empty-box.png" alt="No certificates" />
                </p>
                <p>You haven't earned any certificate yet.</p>
                <p className="pt-2 pb-2">
                  <NavLink
                    to="/user/app/subscribed-training"
                    className="btn btn-primary"
                  >
                    Browse My Courses
                  </NavLink>
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MyCertificates;