import React, { useState } from 'react';

const OPTIONS = [
  { label: 'Defend', value: 'defend', runs: 0 },
  { label: '1', value: 1, runs: 1 },
  { label: '2', value: 2, runs: 2 },
  { label: '3', value: 3, runs: 3 },
  { label: '4', value: 4, runs: 4 },
  { label: '6', value: 6, runs: 6 },
];

const MAX_OVERS = 2;
const BALLS_PER_OVER = 6;

function App() {
  const [game, setGame] = useState({
    player1Score: 0,
    player2Score: 0,
    ballsBowled: 0,
    currentInnings: 1,
    player1Choice: null,
    player2Choice: null,
    isOut: false,
    gameOver: false,
    commentary: [],
    player1BallsLeft: MAX_OVERS * BALLS_PER_OVER,
    player2BallsLeft: MAX_OVERS * BALLS_PER_OVER,
  });

  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const playTurn = () => {
    if (player1Choice === null || player2Choice === null) {
      alert('Both players must make a choice!');
      return;
    }

    const commentaryLine = [];

    let {
      player1Score,
      player2Score,
      ballsBowled,
      currentInnings,
      isOut,
      gameOver,
      commentary,
      player1BallsLeft,
      player2BallsLeft,
    } = game;

    const batsmanChoice = currentInnings === 1 ? player1Choice : player2Choice;
    const bowlerChoice = currentInnings === 1 ? player2Choice : player1Choice;
    const batsmanRuns = OPTIONS.find(o => o.value === batsmanChoice)?.runs ?? 0;

    let outThisBall = false;
    if (
      batsmanChoice === bowlerChoice &&
      batsmanChoice !== 'defend'
    ) {
      outThisBall = true;
    }

    if (outThisBall) {
      commentaryLine.push(`Player ${currentInnings} is OUT!`);
      isOut = true;
    } else {
      if (currentInnings === 1) {
        player1Score += batsmanRuns;
        player1BallsLeft -= 1;
      } else {
        player2Score += batsmanRuns;
        player2BallsLeft -= 1;
      }
      commentaryLine.push(
        `Player ${currentInnings} scored ${batsmanRuns} run${batsmanRuns !== 1 ? 's' : ''}.`
      );
      isOut = false;
    }

    ballsBowled += 1;

    let inningsOver =
      isOut ||
      (currentInnings === 1
        ? player1BallsLeft === 0
        : player2BallsLeft === 0);

    // Player 2 surpasses Player 1 - instant win!
    if (currentInnings === 2 && player2Score > player1Score) {
      commentaryLine.push('Player 2 has surpassed Player 1\'s score!');
      inningsOver = true;
      gameOver = true;
    }

    if (inningsOver && !gameOver) {
      if (currentInnings === 1) {
        commentaryLine.push('End of innings 1. Player 2 bats now!');
        currentInnings = 2;
        isOut = false;
        setShowModal(true);
      } else {
        commentaryLine.push('End of innings 2. Game Over!');
        gameOver = true;
      }
    }

    setGame({
      player1Score,
      player2Score,
      ballsBowled,
      currentInnings,
      player1Choice: null,
      player2Choice: null,
      isOut,
      gameOver,
      commentary: [commentaryLine.join(' '), ...commentary].slice(0, 10),
      player1BallsLeft,
      player2BallsLeft,
    });

    setPlayer1Choice(null);
    setPlayer2Choice(null);
  };

  const resetGame = () => {
    setGame({
      player1Score: 0,
      player2Score: 0,
      ballsBowled: 0,
      currentInnings: 1,
      player1Choice: null,
      player2Choice: null,
      isOut: false,
      gameOver: false,
      commentary: [],
      player1BallsLeft: MAX_OVERS * BALLS_PER_OVER,
      player2BallsLeft: MAX_OVERS * BALLS_PER_OVER,
    });
    setPlayer1Choice(null);
    setPlayer2Choice(null);
  };

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        maxWidth: 600,
        margin: '20px auto',
        padding: 20,
        backgroundColor: '#f0f4f8',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Bat & Ball Battle</h1>
      <h3 style={{ color: '#34495e' }}>
        {game.gameOver
          ? 'Game Over'
          : `Innings: Player ${game.currentInnings} Batting`}
      </h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 20,
          color: '#34495e',
        }}
      >
        <div>
          <h4>Player 1 Score</h4>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>{game.player1Score}</p>
          <p>Balls Left: {game.player1BallsLeft}</p>
        </div>
        <div>
          <h4>Player 2 Score</h4>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>{game.player2Score}</p>
          <p>Balls Left: {game.player2BallsLeft}</p>
        </div>
      </div>

      {!game.gameOver && (
        <>
          <div style={{ marginBottom: 10 }}>
            <h4>Player 1 Choose your move:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPlayer1Choice(opt.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    border:
                      player1Choice === opt.value
                        ? '2px solid #27ae60'
                        : '1px solid #bdc3c7',
                    backgroundColor:
                      player1Choice === opt.value ? '#2ecc71' : '#ecf0f1',
                    color: player1Choice === opt.value ? '#fff' : '#2c3e50',
                    cursor: 'pointer',
                    minWidth: 70,
                    fontWeight: '600',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <h4>Player 2   Choose your move:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPlayer2Choice(opt.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    border:
                      player2Choice === opt.value
                        ? '2px solid #c0392b'
                        : '1px solid #bdc3c7',
                    backgroundColor:
                      player2Choice === opt.value ? '#e74c3c' : '#ecf0f1',
                    color: player2Choice === opt.value ? '#fff' : '#2c3e50',
                    cursor: 'pointer',
                    minWidth: 70,
                    fontWeight: '600',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={playTurn}
            disabled={player1Choice === null || player2Choice === null}
            style={{
              marginTop: 20,
              padding: '12px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor:
                player1Choice !== null && player2Choice !== null
                  ? '#2980b9'
                  : '#95a5a6',
              color: '#fff',
              fontWeight: '700',
              cursor:
                player1Choice !== null && player2Choice !== null
                  ? 'pointer'
                  : 'not-allowed',
              width: '100%',
            }}
          >
            Play Ball
          </button>
        </>
      )}

      {game.gameOver && (
        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <h2>
            {game.player1Score > game.player2Score
              ? 'Player 1 Wins! 🏏'
              : game.player2Score > game.player1Score
              ? 'Player 2 Wins! 🏏'
              : "It's a Draw!"}
          </h2>
          <button
            onClick={resetGame}
            style={{
              marginTop: 15,
              padding: '12px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#27ae60',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Restart Game
          </button>
        </div>
      )}

      <div
        style={{
          marginTop: 25,
          maxHeight: 150,
          overflowY: 'auto',
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: '#2c3e50',
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        <h4>Commentary</h4>
        {game.commentary.length === 0 ? (
          <p>No commentary yet</p>
        ) : (
          game.commentary.map((line, idx) => <p key={idx}>{line}</p>)
        )}
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 30,
              maxWidth: 400,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              cursor: 'default',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: '#2980b9' }}>
              Player 1 is Out! 🏏
            </h2>
            <p style={{ fontSize: 18, marginTop: 15 }}>
              Time for Player 2 to bat!
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: 25,
                padding: '12px 24px',
                backgroundColor: '#2980b9',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
