import  { useState } from "react";
import CloseAccountPage from "./CloseAccountPage";

const CloseMyAccount = () => {
    const [showClosePage, setShowClosePage] = useState(false); // Toggle CloseAccountPage

    return (
        <div className="ps-2 mb-3">
            {showClosePage ? (
                <CloseAccountPage onCancel={() => setShowClosePage(false)} /> // Show CloseAccountPage
            ) : (
                <>
                    <p className="text-danger">
                        <strong>Warning:</strong> Clicking the button below will erase all your data permanently.
                    </p>
                    <button className="btn btn-danger" onClick={() => setShowClosePage(true)}>
                        Close My Account
                    </button>
                </>
            )}
        </div>

    );
}
export default CloseMyAccount;