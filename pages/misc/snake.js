// pages/misc/snake.js
import { useEffect, useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon } from 'lucide-react';
import DashboardFooter from '../components/dashboard/DashboardFooter'

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 120;

export default function SnakePage() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore') || '0';
    setHighScore(parseInt(savedHighScore));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    generateFood();
  }, []);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  const checkCollision = useCallback((head, snakeBody) => {
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(currentSnake => {
      const newHead = {
        x: (currentSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (currentSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE
      };

      if (checkCollision(newHead, currentSnake)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood, isPlaying, checkCollision]);

  const handleKeyPress = useCallback((e) => {
    if (!isPlaying) return;

    const keyDirections = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    };

    const newDirection = keyDirections[e.key];
    if (newDirection) {
      const isOpposite = (
        newDirection.x === -direction.x && newDirection.y === direction.y ||
        newDirection.y === -direction.y && newDirection.x === direction.x
      );
      
      if (!isOpposite) {
        setDirection(newDirection);
      }
    }
  }, [direction, isPlaying]);

  const handleDirectionButton = useCallback((newDirection) => {
    if (!isPlaying) return;

    const isOpposite = (
      newDirection.x === -direction.x && newDirection.y === direction.y ||
      newDirection.y === -direction.y && newDirection.x === direction.x
    );
    
    if (!isOpposite) {
      setDirection(newDirection);
    }
  }, [direction, isPlaying]);

  useEffect(() => {
    const generateStarfield = () => {
      const starfieldContainer = document.getElementById('starfield-background')
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 2 + 's'
        starfieldContainer.appendChild(star)
      }
    }

    generateStarfield()
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [isPlaying, moveSnake]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1a1a1a';
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(
          i * CELL_SIZE,
          j * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    snake.forEach((segment, index) => {
      const alpha = 1 - (index / snake.length) * 0.6;
      ctx.fillStyle = `rgba(255, 204, 0, ${alpha})`;
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      );
    });

    ctx.fillStyle = '#ff9900';
    ctx.shadowColor = '#ff9900';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    requestAnimationFrame(drawGame);
  }, [snake, food]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const animationFrame = requestAnimationFrame(drawGame);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [drawGame]);

  return (
    <>
      <Head>
        <title>Snake Game | BoltBot⚡</title>
      </Head>

      <div id="starfield-background" className="starfield-container" />

      <div className="game-page">
        
        <div className="game-content">
          <div className="game-header">
            <Image 
              src="/images/boltbot.webp"
              alt="BoltBot Logo"
              width={120}
              height={120}
              className="game-logo"
              priority
            />
            
            <h1>Snake Game</h1>
            <p>Use arrow keys or touch controls to play!</p>
          </div>

          <div className="navigation-actions">
            <Link href="/" className="home-button">
              <HomeIcon size={20} />
              Return Home
            </Link>
          </div>

          <div className="game-container">
            <div className="game-stats">
              <div className="stat">Score: {score}</div>
              <div className="stat">High Score: {highScore}</div>
            </div>

            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="game-canvas"
            />

            {!isPlaying && (
              <div className="game-overlay">
                <button onClick={resetGame} className="play-button">
                  {gameOver ? 'Play Again' : 'Start Game'}
                </button>
              </div>
            )}

            <div className="mobile-controls">
              <div className="controls-row">
                <button
                  className="direction-button"
                  onClick={() => handleDirectionButton({ x: 0, y: -1 })}
                >
                  ↑
                </button>
              </div>
              <div className="controls-row">
                <button
                  className="direction-button"
                  onClick={() => handleDirectionButton({ x: -1, y: 0 })}
                >
                  ←
                </button>
                <button
                  className="direction-button"
                  onClick={() => handleDirectionButton({ x: 0, y: 1 })}
                >
                  ↓
                </button>
                <button
                  className="direction-button"
                  onClick={() => handleDirectionButton({ x: 1, y: 0 })}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     <DashboardFooter />             
    </>
  );
}
