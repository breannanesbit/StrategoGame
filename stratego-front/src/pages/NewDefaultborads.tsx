import toast from "react-hot-toast";
import GenericBorad from "../component/GenericBorad"
import { useMutationPostANewDefaultBorad } from "../query/hook"
import { GenericTextInput, useCustomInputControl } from "../component/GenericInput";
import { useState } from "react";
import { useAuth } from "react-oidc-context";


export const NewDefaultBoard = () => {
    const [boardName, _setBoardName] = useState("")
    const defaultMut = useMutationPostANewDefaultBorad()
    const auth = useAuth();
    const user = auth.user?.profile.sub || '';
    const handleSubmitBoard = (newBoard: string[][]) => {
        try {
            defaultMut.mutateAsync({user, board: newBoard, boardName})
        } catch(error) {
            toast.error("fail to save board try again")
        }
    }

    const inputControl = useCustomInputControl({
        label: "Name",
        validatemessage: "valid",
        initialValue: boardName,
    })
    return (
        <div>
            <div style={{ margin: '2%' }}>
            <h2>Create a new Board</h2>
            <GenericTextInput control={inputControl}/>

            </div>
            <GenericBorad handleSubmit={(board) => handleSubmitBoard(board) }/>
        </div>
    )
    
}