import { useState } from "react";
import keycloak from "../component/keycloak";
import { GenericTextInput, useCustomInputControl } from "../component/GenericInput";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/settings.css'; // Import your CSS file for additional styling
import { useUserInforQuery } from "../query/hook";


export interface User {
    id: string,
    name: string,
    username: string,
    imageBase64: string
}

export const Settings = () => {
    const username = keycloak.tokenParsed?.preferred_username;
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

    if (!keycloak.authenticated) {
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
            <h2>Welcome, {username}</h2>
            <div className="settings-container">
                <div className="user-icon-container">

                    {formData.imageBase64 ? (<img src={formData.imageBase64} className="user-icon" alt="icon"/>) : (<i className="fa-regular fa-user user-icon"></i>)}
                    {userInfo && (
                        <div>
                            <h6>Points: {userInfo.data?.points}</h6>
                            <h6>Games played: {userInfo.data?.gamesPlayed}</h6>

                            </div>
                    )}
                </div>
                <form>
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
        </div>
    );
}
export default Settings;