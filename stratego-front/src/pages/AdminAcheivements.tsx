import React, { useEffect, useState } from "react";
import { GenericAcheivements } from "../component/GenericAcheivment";
import {
  GenericTextInput,
  useCustomInputControl,
} from "../component/GenericInput";
import {
  GenericSelect,
  GenericSelectInput,
  useCustomSelectControl,
} from "../component/GenericSelect";
import { User } from "../models/user";
import "../styles/acheivements.css";

interface Acheivements {
  title: string;
  description: string;
  conditionVariable: string; // games, points
  conditionValue: number; //how many games, points
}
export const examplePlayerList: User[] = [
  { id: "0", userName: "admin", points: 0, gamesPlayed: 0 },
];
export const exampleAcheivmentList = [
  {
    title: "acheivment 1",
    description: "description of acheivement 1",
    conditionVariable: "points",
    conditionValue: 5,
  },
  {
    title: "acheivment 2",
    description: "description of acheivement 2",
    conditionVariable: "points",
    conditionValue: 50,
  },
  {
    title: "acheivment 3",
    description: "description of acheivement 3",
    conditionVariable: "points",
    conditionValue: 75,
  },
  {
    title: "acheivment 4",
    description: "description of acheivement 4",
    conditionVariable: "gamesPlayed",
    conditionValue: 5,
  },
  {
    title: "acheivment 5",
    description: "description of acheivement 5",
    conditionVariable: "gamesPlayed",
    conditionValue: 50,
  },
  {
    title: "acheivment 6",
    description: "description of acheivement 6",
    conditionVariable: "gamesPlayed",
    conditionValue: 75,
  },
];

export const AdminAcheivements = () => {
  const [_user, _setUser] = useState<User>(examplePlayerList[0]);
  const [acheivementsList, setAcheivementsList] = useState<Acheivements[]>([]);

  useEffect(() => {
    setAcheivementsList(exampleAcheivmentList);
  }, []);

  const titleInput = useCustomInputControl({
    label: "Title:*",
    validatemessage: "Please enter a title",
  });

  const descriptionInput = useCustomInputControl({
    label: "Description:*",
    validatemessage: "Please enter a description",
  });

  const valueInput = useCustomInputControl({
    label: "Value (number):*",
    validatemessage: "Please enter a value",
  });

  const conditionVariableSelect = useCustomSelectControl({
    initialValue: "select",
    label: "Condition Variable:*",
    validatemessage: "Please pick a condition variable",
    options: ["points", "gamesPlayed"],
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      titleInput.isValid &&
      descriptionInput.isValid &&
      valueInput.isValid &&
      conditionVariableSelect.isValid
    ) {
      const newAchievement: Acheivements = {
        title: titleInput.value,
        description: descriptionInput.value,
        conditionVariable: conditionVariableSelect.value,
        conditionValue: parseInt(valueInput.value, 10),
      };
  
      setAcheivementsList((prevList) => [...prevList, newAchievement]);
  
      titleInput.onChange("");
      descriptionInput.onChange("");
      valueInput.onChange("");
    } else {
      console.log("Form validation failed. Please check your inputs.");
      console.log("Title input:", titleInput);
    console.log("Description input:", descriptionInput);
    console.log("Value input:", valueInput);
    console.log("Condition Variable input:", conditionVariableSelect);
    }
  };
  
  return (
    <div>
      <h2 className="text-start mx-5 pt-5"> Acheivements:</h2>
      <div className="horizontal-line "></div>
      <form className="mx-5 py-3 " onSubmit={handleSubmit} >
        <h4>Add Acheivement:</h4>
        <GenericTextInput control={titleInput} />
        <div className="row">
          <div className="col col-6">
            <GenericSelectInput control={conditionVariableSelect} />
          </div>
          <div className="col col-6">
            <GenericTextInput control={valueInput} />
          </div>
        </div>
        <GenericTextInput control={descriptionInput} />
      <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-3">
        add Achievement
      </button>
      </form>
      <div className="horizontal-line"></div>
      <div className="col col-12">
        <GenericAcheivements
          acheivements={acheivementsList}
          playerPoints={_user.points}
          playerGamesPlayed={_user.gamesPlayed}
        />
      </div>
    </div>
  );
};
