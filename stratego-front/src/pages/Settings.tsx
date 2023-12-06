import { useState } from "react";
// import keycloak from "../component/keycloak";
import { GenericTextInput, useCustomInputControl } from "../component/GenericInput";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/settings.css';
import { useUserInforQuery } from "../query/hook";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";


export interface User {
    id: string,
    name: string,
    username: string,
    imageBase64: string
}

export const Settings = () => {
    const auth = useAuth();
    const username = auth.user?.profile.preferred_username || '';
    console.log(username)
    const userInfo = useUserInforQuery(username)

    const [formData, setFormData] = useState<User>({
        id: "0",
        name: "",
        username: "",
        imageBase64: "",
    });

    const customInputControl = useCustomInputControl({
        label: "Name",
        validatemessage: "valid",
        initialValue: formData.name,
    })

    const customInputControl2 = useCustomInputControl({
        label: "Username",
        validatemessage: "valid",
        initialValue: formData.username,
    })

    if (!auth.isAuthenticated) {
        // Redirect to login or handle unauthenticated user
        return <div>Not authenticated. Redirecting...</div>;
    }


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setFormData({
                    ...formData,
                    imageBase64: event.target?.result as string,
                });
            };

            reader.readAsDataURL(file);
        }
    };





    return (
        <div>
            <h2 style={{margin: '2%'}}>Welcome, {username}</h2>
            <div className="settings-container">
                <div className="user-icon-container">

                    {formData.imageBase64 ? (<img src={formData.imageBase64} className="user-icon" alt="icon" />) : (<i className="fa-regular fa-user user-icon fa-7x" ></i>)}
                    {userInfo && (
                        <div>
                            <h4>Points: {userInfo.data?.points}</h4>
                            <h4>Games played: {userInfo.data?.gamesPlayed}</h4>

                        </div>
                    )}
                    <Link to={"/seeboards"}>See your boards</Link>
                </div>
            </div>
            <form>
                <h6>Edit your information</h6>
                <label htmlFor="image" className="form-label"></label>
                <input
                    id="image"
                    className="form-control"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                />
                <GenericTextInput control={customInputControl} />
                <GenericTextInput control={customInputControl2} />
            </form>

        </div>
    );
}
export default Settings;