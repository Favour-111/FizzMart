import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const Profile = () => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const allUser = async () => {
    setLoader(true);
    try {
      const userFETCH = await axios.get(`${process.env.REACT_APP_API}/allUser`);
      if (userFETCH) {
        setUser(userFETCH.data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  const userId = localStorage.getItem("userId");
  const fetchUser = user.find((item) => item._id === userId);

  // 🔹 Handle delete
  const handleDelete = async () => {
    if (!password || !confirmPassword) {
      setError("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setDeleting(true);

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/deleteuser/${userId}`,
        {
          userId,
          password,
        }
      );

      if (res.data.success) {
        alert("Account deleted successfully");
        localStorage.clear();
        window.location.href = "/sign-in"; // redirect after deletion
      } else {
        setError(res.data.message || "Failed to delete account");
      }
    } catch (err) {
      setError("Error deleting account");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="profile-page-body">
        <div className="settings-head">Account Setting</div>
        <div className="settings-label">Account details</div>
        <div className="settings-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/418/808/non_2x/man-head-user-profile-character-free-png.png"
            alt=""
          />
        </div>
        <div className="settings-input-container">
          <div className="settings-input-item">
            <label className="settings-input-label">Name</label>
            <input
              className="form-input"
              type="text"
              value={loader ? "loading...." : fetchUser?.FullName}
              readOnly
            />
          </div>
          <div className="settings-input-item">
            <label className="settings-input-label">Email</label>
            <input
              className="form-input"
              type="text"
              value={loader ? "loading..." : fetchUser?.email}
              readOnly
            />
          </div>
          <div className="settings-input-item">
            <label className="settings-input-label">Phone Number</label>
            <input
              className="form-input"
              type="text"
              value={
                loader
                  ? "loading..."
                  : `*********${fetchUser?.phoneNumber?.slice(-3)}`
              }
              readOnly
            />
          </div>
        </div>

        <div className="settings-line"></div>

        <div className="delete-acc">
          <div className="settings-label">Delete Account</div>
          <div className="delete-content">
            Would you like to delete your account?
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={() => setModal(true)}
          >
            I want to delete my account
          </button>

          {modal && (
            <div className="modal-delete-overlay">
              <div className="modal-delete-body">
                <div className="modal-delete-head">
                  <div>Confirm account deletion</div>
                  <div
                    onClick={() => setModal(false)}
                    style={{ cursor: "pointer" }}
                  >
                    <MdClose />
                  </div>
                </div>

                <div className="password-input">
                  <div className="modal-delete-content">
                    Enter password to confirm account deletion
                  </div>

                  {error && <p className="error-text text-danger">{error}</p>}

                  <div className="password-input-item">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="password-input-item">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete Account"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
