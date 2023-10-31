

export const GameRules = () => {
    return (
        <div>
          <h1>Stratego Board Game Rules</h1>
          <p>
            Stratego is a classic two-player board game that combines elements of strategy, memory, and deduction. The objective of the game is to capture your opponent's flag while protecting your own. Here are the rules for playing Stratego:
          </p>
          <h2>Setup:</h2>
          <ol>
            <li>The game is played on a square grid board with 10x10 squares.</li>
            <li>Each player starts with 40 pieces of different ranks, hidden from their opponent.</li>
            <li>These ranks include:
              <ul>
                <li>1 Flag (represents your objective, the piece your opponent must capture, can't move).</li>
                <li>1 Marshal (the highest-ranking piece 10).</li>
                <li>1 General (rank: 9)</li>
                <li>2 Colonels (rank: 8)</li>
                <li>3 Majors (rank: 7)</li>
                <li>4 Captains (rank: 6)</li>
                <li>4 Lieutenants (rank: 5)</li>
                <li>4 Sergeants (rank: 4)</li>
                <li>5 Miners (rank: 3)(can defuse bombs).</li>
                <li>8 Scouts (rank: 2)(can move any number of spaces in a straight line).</li>
                <li>1 Spy (Weakest piece, captured by any other attacking piece, but an attacking Spy can capture the Marshal)</li>
                <li>6 Bombs (defeat any attacking piece but are vulnerable to Miners).</li>
              </ul>
            </li>
          </ol>
          <h2>Objective:</h2>
          <p>The primary objective of the game is to capture your opponent's flag while protecting your own. Secondary objectives include capturing valuable enemy pieces and preventing your opponent from capturing your flag.</p>
          <h2>Gameplay:</h2>
          <ol>
            <li>Players take turns.</li>
            <li>On your turn, you can move one of your pieces to an adjacent square or attack an opponent's piece if it's in an adjacent square.</li>
            <li>A piece can move horizontally or vertically but not diagonally.</li>
            <li>When attacking, the higher-ranking piece wins, and the lower-ranking piece is removed from the board.</li>
            <li>If you attack a bomb with a piece other than a Miner, your attacking piece is removed from the game.</li>
            <li>If you attack your opponent's flag with any piece, you win the game.</li>
          </ol>
          <h2>Special Rules:</h2>
          <ol>
            <li>Scouts can move any number of spaces in a straight line, as long as they don't encounter an obstacle.</li>
            <li>Bombs are immobile and defeat any attacking piece, except Miners, which defuse bombs.</li>
            <li>Miners can defuse bombs by attacking them.</li>
            <li>The Marshal is the highest-ranking piece, followed by the General, and so on down the ranks.</li>
          </ol>
          <h2>Victory:</h2>
          <p>You win the game by capturing your opponent's flag, and you can also win if your opponent has no movable pieces left on the board.</p>
          <h2>Game End:</h2>
          <p>The game ends when a player captures their opponent's flag or when one player can no longer make any legal moves.</p>
          <p>Stratego is a game of both skill and strategy, as players must deduce the ranks of their opponent's hidden pieces and use their own pieces effectively to achieve victory. It's a game that combines elements of chess and memory, making it an enjoyable and challenging strategy game for two players.</p>
        </div>
      );
    }