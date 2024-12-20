
import { convertNumberToPercentage } from '../../../utils.js';
import { IS_MOBILE } from '../../../constant';
import { ButtonAnimate } from './ButtonAnimate';


const CardDrawing = ({draw}) => {
    return (
        <div className='flex flex-col items-center justify-center bg-white/20 rounded-lg p-1 m-4'>
          <div className='flex flex-col'>
            <p>label: {draw.label}</p>
            <p>score: {convertNumberToPercentage(draw.score)}</p>
            <p>time: {draw.time}</p>
            </div>
            <img src={draw.drawing} alt={draw.label} width={50} height={50}/>
        </div>
    )
}
export const Menu = ({ label, prediction, result, cleanCanvas, switchLabel, draws ,time}) => {
    return (
      <div className=" absolute top-0 right-0 ">
        <div className="text-white bg-white/20 rounded-lg p-4 min-w-[20rem] m-4">
          <details className="cursor-pointer" open={!IS_MOBILE}>
            <summary className="text-lg font-semibold">
            You need to draw a {label}
              <div className='grid grid-cols-2 gap-2 mt-2'>
                <button onClick={cleanCanvas} className="bg-red-800 py-1">
                  Clean
                </button>
              <ButtonAnimate
                  text={'Change'}
                  onClick={switchLabel}
                  className={'bg-green-800 py-1'}
                  isAnimated={!!result}
                /> 
                </div>
            </summary>
            <div className="mt-4">
              <div>
                <p>Prediction : {prediction && prediction.label}</p>
                <p>Result : {result && `🏆 ${result.label}`}</p>
                <p>
                  Score : {result && `${convertNumberToPercentage(result.score)}`}
                </p>
                <p>
                  Time : {time}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
    
              </div>
            </div>
            <div className="max-h-[20rem] overflow-y-auto mt-7"> 
                {draws.map((draw, index) => (
                    <CardDrawing key={index} draw={draw}/>
                  ))}
            </div>
          </details>
        </div>
      </div>
    );
  };