import React from "react";
import "../styles/style.css";
import { useDispatch ,useSelector} from "react-redux";
import { generateQuestion,updateCurrent } from "../feature/questionSlice";


function Button({ text ,isanswered}) {

  const dispatch = useDispatch();
  
  const questionslist = useSelector(
    (state) => state.questionslice.questionsList
  );

  const generateQues=(e)=> {
    if(!questionslist.some((item)=>item.id===e.target.id))dispatch(generateQuestion({ id: e.target.id }));
    else {dispatch(updateCurrent({id:e.target.id}))}
  }



  return (
    <button
      className={`text-[1rem] h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#393F6E] text-[#E2E4F3] hover:bg-gradient-to-r from-[#E65895] to-[#BC6BE8] ${isanswered ?'selected':''}`}
      id={text}
      onClick={generateQues}
      
    >
      {text}
    </button>
  );
}

export default Button;
