
import { convertNumberToPercentage } from '../../../utils.js';
import { IS_MOBILE } from '../../../constant';
import { ButtonAnimate } from './ButtonAnimate';


const CardDrawing = ({draw}) => {
    return (
        <div className='flex flex-col items-center justify-center bg-white/20 rounded-lg p-1 m-2'>
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
      <div className="bg-blue-300/90 absolute top-0 right-0 ">
        <div className="text-blackrounded-lg p-4 min-w-[20rem] m-4">
          <details className="cursor-pointer" open={!IS_MOBILE}>
            <summary className="text-lg font-semibold">
            You need to draw a {label}
              <div className='grid grid-cols-2 gap-2 mt-2'>
                <button onClick={cleanCanvas} className="bg-red-800 py-1 text-white">
                  Clean
                </button>
              <ButtonAnimate
                  text={'Next'}
                  onClick={switchLabel}
                  className={'bg-green-800 py-1 text-white'}
                  isAnimated={!!result}
                /> 
                </div>
            </summary>
            <div className="mt-4">
              <div>
                <p>
                  Time : {time}
                </p>
                <p>Guess : {prediction && prediction.label}</p>
                <p>Result : {result && `🏆 ${result.label}`}</p>
                <p>
                  Score : {result && `${convertNumberToPercentage(result.score)}`}
                </p>
              </div>
            </div>
            <div className="max-h-[20rem] overflow-y-auto"> 
                {draws.map((draw, index) => (
                    <CardDrawing key={index} draw={draw}/>
                  ))}
            </div>
          </details>
        </div>
      </div>
    );
  };