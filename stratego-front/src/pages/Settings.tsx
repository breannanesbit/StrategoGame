import { useEffect, useState } from "react";
// import keycloak from "../component/keycloak";
//import { GenericTextInput, useCustomInputControl } from "../component/GenericInput";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/settings.css';
import { useMutationPostUserInfo, useUserInforQuery } from "../query/hook";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { User } from "../models/user";


export const Settings = () => {
    const auth = useAuth();
    const username = auth.user?.profile.preferred_username || '';
    console.log(username)
    const userInfo = useUserInforQuery(username)
    const userMutation = useMutationPostUserInfo()

    const [formData, setFormData] = useState<User>({
        id: '',
        userName: '',
        points: 0,
        gamesPlayed: 0,
        imageBase64: ''
    });

    useEffect(() => {
        if (userInfo.data) {
            setFormData(userInfo.data);
        }
    }, [userInfo.data]);
    // const customInputControl = useCustomInputControl({
    //     label: "Name",
    //     validatemessage: "valid",
    //     initialValue: formData.name,
    // })

    // const customInputControl2 = useCustomInputControl({
    //     label: "Username",
    //     validatemessage: "valid",
    //     initialValue: formData.username,
    // })

    if (!auth.isAuthenticated) {
        // Redirect to login or handle unauthenticated user
        return <div>Not authenticated. Redirecting...</div>;
    }


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                if (formData) {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        imageBase64: event.target?.result as string,
                    }));
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Assuming you have properties like name, username, etc., in your formData
            await userMutation.mutateAsync({ user: formData});

            // Optionally, you can fetch and update the user information after the mutation
            userInfo.refetch();
        } catch (error) {
            // Handle error
            console.error("Error submitting user information", error);
        }
    };

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h2 style={{ margin: '2%' }}>Welcome, {username}</h2>
            </div>
          
            <div className="col-md-6 mx-auto">
              <div className="settings-container">
                <div className="user-icon-container mx-auto">
                  {formData.imageBase64 ? (
                    <img src={formData.imageBase64} className="user-icon" alt="icon" />
                  ) : (
                    <i className="fa-regular fa-user user-icon fa-7x"></i>
                  )}
                  {userInfo && (
                    <div>
                      <h4>Points: {userInfo.data?.points}</h4>
                      <h4>Games played: {userInfo.data?.gamesPlayed}</h4>
                    </div>
                  )}
                  <Link to={"/seeboards"}>See your boards</Link>
                </div>
              </div>
            </div>
          
            <div className="col-md-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <h4>Edit your information</h4>
                <label htmlFor="image" className="form-label"></label>
                <input
                  id="image"
                  className="form-control"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                />
                 <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                {/* Add your GenericTextInput components here */}
              </form>
            </div>
          </div>
        </div>
      );

}
export default Settings;