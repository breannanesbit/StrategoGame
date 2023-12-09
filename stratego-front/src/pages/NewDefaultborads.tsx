import toast from "react-hot-toast";
import GenericBorad from "../component/GenericBorad"
import { useMutationPostANewDefaultBorad } from "../query/hook"
import { GenericTextInput, useCustomInputControl } from "../component/GenericInput";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";


export const NewDefaultBoard = () => {
    const [boardName, setBoardName] = useState("")

    const defaultMut = useMutationPostANewDefaultBorad()
    const auth = useAuth();
    const user = auth.user?.profile.preferred_username || '';
    const navigate = useNavigate();

    const handleSubmitBoard = (newBoard: string[][]) => {
        try {
            setBoardName(inputControl.value)
            defaultMut.mutateAsync({user, board: newBoard, boardName})

        } catch(error) {
            navigate("/seeboards");
            toast.error("fail to save board try again")
        }
    }

    const inputControl = useCustomInputControl({
        label: "Name",
        validatemessage: "valid",
        initialValue: '',
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