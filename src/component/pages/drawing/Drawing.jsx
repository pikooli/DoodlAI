import { useRef, useEffect, useState, useCallback } from 'react';
import SketchCanvas from './SketchCanvas';
import { getLabelRandom } from '../../../utils.js';
import { DisplayElement } from './DisplayElement.jsx';
import { Error } from '../Error';
import { Menu } from './Menu';
import { v4 as uuidv4 } from 'uuid';
import { Loading } from '../Loading';

const DISPLAY_TEXT_TIME = 2000;
const WIN_TEXT = '✨🏆✨';

export const Drawing = () => {
  const [hasDrawingChanged, setHasDrawingChanged] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [currentDraw, setCurrentDraw] = useState({});
  const [shouldDisplayText, setShouldDisplayText] = useState(false);
  const [shouldDisplayWin, setShouldDisplayWin] = useState(false);
  const [draws, setDraws] = useState([]);
  const [isWorkerReady, setIsWorkerReady] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState(null);
  const [timeSpentDrawing, setTimeSpentDrawing] = useState(0);
  const worker = useRef(null);
  const canvasRef = useRef(null);

  const defineNextDraw = useCallback(() => {
    setCurrentDraw({label: getLabelRandom(), id: uuidv4()});
    setTimeSpentDrawing(0);
  }, []);

  const cleanCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas(true);
      setPrediction(null);
      setResult(null);
    }
  }, [canvasRef]);

  const switchLabel = useCallback(() => {
    defineNextDraw();
    cleanCanvas();
    setShouldDisplayText(true);
  }, [cleanCanvas, defineNextDraw]);

  const classify = useCallback(() => {
    if (worker.current && canvasRef.current) {
      const image = canvasRef.current.getCanvasData();
      if (image !== null) {
        setIsPredicting(true);
        worker.current.postMessage({ action: 'classify', image });
      }
    }
  }, [canvasRef, worker]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpentDrawing(prev => prev + 1);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shouldDisplayText && isWorkerReady) {
      setTimeout(() => {
        setShouldDisplayText(false);
      }, DISPLAY_TEXT_TIME);
    }
  }, [shouldDisplayText, isWorkerReady]);

  useEffect(() => {
    if (shouldDisplayWin) {
      setTimeout(() => {
        setShouldDisplayWin(false);
      }, DISPLAY_TEXT_TIME);
    }
  }, [shouldDisplayWin]);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL('../../../worker.js', import.meta.url),
        {
          type: 'module',
        }
      );

      worker.current.onmessage = (event) => {
        if (event.data.type === 'status' && event.data.status === 'ready') {
          setIsWorkerReady(true);
          setShouldDisplayText(true);
          defineNextDraw();
        }
        if (event.data.type === 'result' && event.data.result.length > 0) {
          const prediction = event.data.result[0];
          setPrediction(prediction);
          setIsPredicting(false);
        }
      };

      worker.current.onerror = (event) => {
        console.error('Worker error:', event);
        setHasError(true);
      };
    }
  }, [defineNextDraw]);

  useEffect(() => {
    if (prediction && prediction.label === currentDraw.label) {
      setResult({...prediction, id: currentDraw.id, time: timeSpentDrawing});
    }
  }, [prediction, currentDraw, timeSpentDrawing]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasDrawingChanged && !isPredicting) {
        classify();
        setHasDrawingChanged(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasDrawingChanged, classify, isPredicting]);

  useEffect(() => {
    if (result) {
      setDraws((prev) => {
        if (!prev.find((draw) => draw.id === result.id)) {
          setShouldDisplayWin(true);
          return [...prev, {...result,  drawing: canvasRef.current.getCanvasElement().toDataURL()}];
        }
        return prev;
      });
    }
  }, [result]);

  if (hasError) {
    return <Error />;
  }
  if (!isWorkerReady) {
    return <Loading />;
  }
  return (
    <>
    <div className="w-full h-full bg-[url('/bg.png')] bg-gray-300 opacity-30 absolute top-0 left-0"></div>
      <div className="w-full h-full absolute top-0 left-0">
        <SketchCanvas
          onSketchChange={() => setHasDrawingChanged(true)}
          ref={canvasRef}
        />
      </div>
      {shouldDisplayText && <DisplayElement text={currentDraw.label} />}
      {shouldDisplayWin && <DisplayElement text={WIN_TEXT} />}
      <Menu
        label={currentDraw.label}
        time={timeSpentDrawing}
        draws={draws}
        prediction={prediction}
        result={result}
        cleanCanvas={cleanCanvas}
        switchLabel={switchLabel}
      />
    </>
  );
};
