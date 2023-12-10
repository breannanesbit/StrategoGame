import "../styles/gameborad.css";
import GenericBorad from "../component/GenericBorad";
import { useMutationPostBoard1, useUserInforQuery } from "../query/hook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "react-oidc-context";
import { FormEvent, useEffect, useState } from "react"; // Import useEffect
import {
  GenericRadioInput,
  useCustomRadioControl,
} from "../component/GenericRadio";
import { useGameContext } from "../context/gameContext";

const GameBoard: React.FC = () => {
  const [boardoption, setBoardOptions] = useState<string[]>([]);
  const [selectedBoard, _setSelectedBoard] = useState<string>(''); 
  const auth = useAuth();
  const user = auth.user?.profile.preferred_username || "";

  const { data: userBoards } = useUserInforQuery(user);
  const postBoardMutation = useMutationPostBoard1();
  const { game, player1board, setGame } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userBoards && userBoards.boards) {
      const titles = userBoards.boards.map((board) => board.title);
      setBoardOptions(titles);
    }
  }, [userBoards]); // Trigger effect only when userBoards changes

  const handleSubmit1 = async (board: string[][]) => {
    try {
      await postBoardMutation.mutateAsync({ user, board });
      setGame((prevGame) => ({
        ...prevGame,
        Player1: user,
        player1board:board,
      }));
      console.clear()
      console.log("sending board to game",game)
      console.log("sending board to game",game)

      navigate("/playGame");
    } catch (error) {
      console.log(error);
      toast.error("failed to submit the board");
    }
  };

  const radioControl = useCustomRadioControl({
    label: "Name",
    validatemessage: "valid",
    initialValue: selectedBoard,
    options: boardoption,
  });

  const SubmitDefaultBoard = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent default form submission

    const _selectedBoardData = userBoards?.boards.find(board => board.title === selectedBoard);
  
    // Do something with selectedBoardData
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div style={{ margin: "2%" }}>
            <h2>Create a your Board</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <GenericBorad
              handleSubmit={(board: string[][]) => handleSubmit1(board)}
            />
          </div>
        </div>
        <div className="row">
          {boardoption.length > 0 && (
            <form onSubmit={SubmitDefaultBoard}>
              <h3>Or select one of your default boards</h3>
              <GenericRadioInput control={radioControl} />
              <button className="btn btn-outline-danger" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
