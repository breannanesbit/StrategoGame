import toast from "react-hot-toast";
import GenericBorad from "../component/GenericBorad"
import { useMutationPostUserInfo, useUserInforQuery } from "../query/hook"
import { GenericTextInput, useCustomInputControl } from "../component/GenericInput";
import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user";

export const NewDefaultBoard = () => {
    const [boardName, setBoardName] = useState("")
    const [userData, setUserData] = useState<User | undefined>();

    const defaultMut = useMutationPostUserInfo()
    const auth = useAuth();
    const user = auth.user?.profile.preferred_username || '';
    const userInfo = useUserInforQuery(user)
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.data) {
            setUserData(userInfo.data);
        }
    }, [userInfo.data]);

    const handleSubmitBoard = async (newBoard: string[][]) => {
        try {
            setBoardName(inputControl.value);

            // Assuming the User interface includes a 'boards' property
            const randomUniqueId = uuidv4();
            const updatedUser: User = {
                ...userData!,
                boards: [
                    ...(userData?.boards || []), // Keep existing boards, if any
                    { id: randomUniqueId, title: boardName, board: newBoard },
                ],
            };

            await defaultMut.mutateAsync({ user: updatedUser });
            //if(response.status === 200) {
                toast.success('Default board has been saved');
                navigate("/seeboards");
            //}
            
        } catch (error) {
            toast.error("Failed to save board, please try again");
        }
    };

    const inputControl = useCustomInputControl({
        label: "Name",
        validatemessage: "valid",
        initialValue: boardName,
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div style={{ margin: '2%' }}>
                        <h2>Create a new Board</h2>
                        <GenericTextInput control={inputControl} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <GenericBorad handleSubmit={(board) => handleSubmitBoard(board)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
