import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "../styles/homepage.css";

export const HomePage = () => {
  const auth = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const username = auth.user?.profile.preferred_username || null;
        setUsername(username);
        setLoading(false);
      } catch (error) {
        console.error("Error loading user profile", error);
        setLoading(false);
      }
    };

    const loadUploadedImage = () => {
      const dataUrl = localStorage.getItem("uploadedImage");
      setUploadedImage(dataUrl);
    };

    const updateLoginStatus = () => {
      if (auth.isAuthenticated) {
        loadUserProfile();
      } else {
        setUsername(null);
        setLoading(false);
      }
    };

    // Load user profile and update login status when the component mounts
    updateLoginStatus();
    loadUploadedImage();

    // Use the useEffect hook to listen for changes in the authentication status
    const intervalId = setInterval(() => {
      updateLoginStatus();
    }, 1000);

    // Cleanup function
    return () => {
      // Clear interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [auth]);

  return (
    <div className="bg-image">
      <h1 className="text-center py-5">
        Welcome {loading ? "Loading..." : username || "Guest"} to Stratego
      </h1>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center max-height">
        {uploadedImage && <img className="user-icon" src={uploadedImage} alt="Uploaded" />}
        <div className="col col-7">
          <div className="row">
            <div className="col col-6 d-flex justify-content-end">
              <button className="btn btn-outline-danger mx-5 ">
                <Link
                  style={{ textDecoration: "none", color: "red" }}
                  to={"/buildborad"}
                >
                  Play
                </Link>
              </button>
            </div>
            <div className="col col-6 d-flex justify-content-start">
              <button className="btn btn-outline-danger mx-5">Join Game</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
