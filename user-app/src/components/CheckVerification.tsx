import React, { useState } from 'react';
import type { User } from '../models/user/User';
import authUser from '../helpers/authUser';
import DashboardService from '../services/DashBoardService';
;

interface SweetAlert {
    fire: (title: string, message: string, icon: 'info' | 'success' | 'warning') => Promise<any>;
}

declare const swal: SweetAlert;

const CheckVerification: React.FC = () => {
    const [message, setMessage] = useState<string>("Click to Request");
    const user: User | null = authUser.Get();

    const sendVerifyLink = async () => {
        setMessage("Sending..");
        try {
            if (!user) {
                await swal.fire('', 'User not authenticated!', 'warning');
                setMessage("Request Again");
                return;
            }

            const res = await DashboardService.SendVerifyLink(user.email); 
            if (res.status === 200) {
                if (res.data === 1) {
                    await swal.fire('', 'Your Email already verified. No need to take any action', 'info');
                    setMessage("Email Verified");
                } else {
                    await swal.fire('', 'Sent verification email. Please check your mail inbox or spam/junk.', 'success');
                    setMessage("Email Sent");
                }
            } else {
                await swal.fire('', 'Unable to send verification email. Please try again!', 'warning');
                setMessage("Request Again");
            }
        } catch (err) {
            await swal.fire('', 'Unable to send verification email. Please try again!', 'warning');
            setMessage("Request Again");
        }
    };

    return (
        <div className="alert alert-warning d-flex align-items-center mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                viewBox="0 0 16 16"
                role="img"
                aria-label="Warning:"
            >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
                <strong>Please verify your Email Id. Please check your mail inbox or spam/junk. Didn't receive an email? </strong>
                <button className="btn btn-dark ms-2" onClick={sendVerifyLink}>
                    {message}
                </button>
            </div>
        </div>
    );
};

export default CheckVerification;


