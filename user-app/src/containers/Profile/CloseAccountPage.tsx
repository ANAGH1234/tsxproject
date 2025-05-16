import { useNavigate } from "react-router-dom";
import authUser from "../../helpers/authUser";
import { closeAccount } from "../../services/ProfileService";

const CloseAccountPage = ({onCancel}:any) => {
  const navigate = useNavigate();
  const user = authUser.Get()
  const username = user?.firstName+" "+user?.lastName

  const handleCloseAccount = () => {
    closeAccount();
  }
  return (
    <section id="content">
      <h2>Hi, {username}</h2>
      <p className="mb-4 text-danger">
        <strong>Warning:</strong> Clicking the button below will erase all your data permanently.
      </p>
      <h3 className="mb-3">Are you sure you want to close your account?</h3>
      <button className="btn btn-danger" onClick={handleCloseAccount}>Yes, Close My Account</button>
      &nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary" onClick={() => navigate("/user/app/profile")}>No, Changed My Mind</button>
    </section>
  );
};

export default CloseAccountPage;
