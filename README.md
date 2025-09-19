# Bat & Ball Battle

A simple turn-based cricket-inspired game built with React where two players alternate batting and bowling using strategic run choices.

---

## How to Play

- Player 1 (batsman) selects a move from the options: Defend, 1, 2, 3, 4, or 6 runs.
- Player 2 (bowler) simultaneously selects a move from the same options.
- Click **Play Ball** to reveal the outcome of the turn.
- If both players select the same run (except "Defend"), the batsman is out, and the innings switch.
- The game continues for a fixed number of balls per innings.
- After Player 1’s innings ends, Player 2 bats and Player 1 bowls.
- Player 2 tries to surpass Player 1’s total score to win.
- The game ends automatically when Player 2 outscores Player 1 or after all balls are bowled.

---

## How It Works

- Each innings lasts a predefined number of balls (e.g., 12 balls for 2 overs).
- Players choose runs or “Defend” each ball.
- If the batsman is out, innings switch.
- Runs accumulate to respective player scores.
- A popup notification alerts when the innings change.
- When Player 2 bats, if they score more than Player 1, the game immediately ends declaring Player 2 as the winner.
- If Player 2 gets out with the same runs as Player 1, the game declares a draw.
- The UI shows live commentary and score updates to keep players informed.

---

Enjoy the strategic battle of wits and chance in Bat & Ball Battle!
