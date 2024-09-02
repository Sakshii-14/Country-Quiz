import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import congratspic from '../assets/congrats.svg'
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../feature/questionSlice';
import {useEffect} from 'react'

function Congrats() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    const img = new Image();
    img.src = congratspic;
  }, []);

  const questionslist = useSelector(
        (state) => state.questionslice.questionsList
      );

  const handlePlayAgain = () => {
        dispatch(resetQuiz());  
        navigate('/');  
    };
    
  return (
    <div className="h-auto overflow-hidden md:w-[35%] sm:w-[45%] w-[55%] bg-[#343964] rounded-xl flex flex-col sm:gap-6 gap-3 items-center ">
     <div className='w-full '>
      <img src={congratspic} alt="Congrats" className='w-full' />
     </div>
     <div className="w-full sm:px-5 px-3 sm:py-4 py-2 text-[#E2E4F3] flex flex-col justify-center items-center gap-3">
      <p className="text-[1.5rem] text-center font-semibold">Congrats! You completed the quiz. </p>
      <p className="text-[1rem] font-medium text-center">You answered {questionslist.filter((elem)=>elem.iscorrect).length}/10 correctly</p>
     </div>
    
     <button

     className="text-[1rem] mb-4 text-[#E2E4F3] sm:w-[50%] w-[55%] bg-[#393F6E] sm:py-4 py-3 flex justify-center items-center gap-3 rounded-xl bg-gradient-to-r from-[#E65895] to-[#BC6BE8] "
   onClick={handlePlayAgain}
   >
     
     Play Again
     
   </button>
     
    
   </div>
  )
}

export default Congrats