export interface DefaultBoard {
    id: string;
    title: string;
    board: string[][];
}

export interface User {
    id: string;
    userName: string;
    points: number;
    gamesPlayed: number;
    imageBase64: string;
    boards: DefaultBoard[];
}
