import React, { useState, useEffect } from "react";
import "./game.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const NUM_HOLES = 9;
const GAME_TIME = 30; // seconds

// Game Sounds
const score_sound = new Audio("/score.mp3");
const bg_sound = new Audio("/bg-music.mp3");

export default function WhackAMole() {
    const [score, setScore] = useState(0);
    const [activeHole, setActiveHole] = useState(null);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        let moleInterval;
        let countdownInterval;

        if (isPlaying) {
            bg_sound.play();

            // Mole popping logic
            moleInterval = setInterval(() => {
                const randomHole = Math.floor(Math.random() * NUM_HOLES);
                setActiveHole(randomHole);
            }, 800);

            // Countdown timer
            countdownInterval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev < 1) {
                        clearInterval(moleInterval);
                        clearInterval(countdownInterval);
                        setIsPlaying(false);
                        setActiveHole(null);
                        setGameOver(true);
                        bg_sound.pause();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(moleInterval);
            clearInterval(countdownInterval);
        };
    }, [isPlaying]);

    const handleStart = () => {
        setScore(0);
        setTimeLeft(GAME_TIME);
        setIsPlaying(true);
        setGameStarted(true);
    };
    
    const Restart = () => {
        setScore(0);
        setTimeLeft(GAME_TIME);
        setIsPlaying(false);
        setGameStarted(false);
        setTimeout(() => {
            setIsPlaying(true);
            setGameOver(false);
            setGameStarted(true);
            bg_sound.pause(); // Stop the current playback
            bg_sound.currentTime = 0; // Reset the audio to the beginning
            bg_sound.play(); // Start playing the audio from the beginning
        }
        , 10);
    };

    const handleWhack = (index) => {
        if (index === activeHole && isPlaying) {
            score_sound.play();
            setScore(score + 1);
            setActiveHole(null);
        }
    };

    return (
        <div className="container" >
            <h1>🐹 Whack-a-Mole</h1>
            {!gameStarted ? (
                <button onClick={handleStart} className="button">
                    Start Game
                </button>
            ) : (
                <>
                    <p>Time Left: {timeLeft}s</p>
                    <p>Score: {score}</p>
                    <div className="grid">
                        {Array.from({ length: NUM_HOLES }).map((_, i) => (
                            <div
                                key={i}
                                onClick={() => handleWhack(i)}
                                className={`hole ${i === activeHole ? "active" : ""}`}
                            >
                                {i === activeHole ? "🐹" : ""}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Game Over Modal */}
            {gameOver && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="game-over">Game Over</h2>
                        <p>Your Score: {score}</p>
                        <button onClick={Restart} className="button">
                            <FontAwesomeIcon icon={faRedo} /> Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
