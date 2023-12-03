import "../styles/gameborad.css";
import GenericBorad from "../component/GenericBorad";
import {useMutationPostBoard1 } from "../query/hook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "react-oidc-context";

const GameBoard: React.FC = () => {
  const auth = useAuth();
  const user = auth.user?.profile.sub || '';
  const postBoardMutation = useMutationPostBoard1();
  const navigate = useNavigate(); // useNavigate hook for navigation


  const handleSubmit1 = async (board: string[][]) => {
    try {
      await postBoardMutation.mutateAsync({ user, board });
      navigate('/playGame'); // Replace '/some-other-page' with your desired route

    } catch (error) {
      console.log(error)
      toast.error("failed to submit the board")
    }
  };

  return (
    <div>
      <GenericBorad handleSubmit={(board:string[][]) => handleSubmit1(board)} />
    </div>
  );
};

export default GameBoard;
