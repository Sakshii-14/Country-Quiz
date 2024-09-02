import { useEffect } from "react";
import useCountryInfo from "./customhook/useCountryInfo";
import { useDispatch, useSelector } from "react-redux";
import Container from "./components/Container";
import Button from "./components/Button";
import { getList, generateQuestion, updateList } from "./feature/questionSlice";
import "./styles/style.css";
import check from "./assets/Check_round_fill.svg";
import close from "./assets/Close_round_fill.svg";
import { useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/themes/light.css'; // Specific theme styles (if using a predefined theme)


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionslist = useSelector(
    (state) => state.questionslice.questionsList
  );
  const current = useSelector((state) => state.questionslice.current);

  const { list, loading, error } = useCountryInfo();

  useEffect(() => {
    if (list.length > 0) {
      dispatch(getList({ list }));
    }
    if (current === null && list.length > 0) {
      dispatch(generateQuestion({ id: "1" }));
    }
  }, [list, dispatch]);

  useEffect(()=>{
    
   const img1=new Image();
   const img2=new Image();
    img1.src=check;
    img2.src=close;
  },[])

  const numbers = useSelector((state) => state.questionslice.numbers);

  const renderAnswerImage = (item, elem) => {
    if (elem.isanswered) {
      if (item === elem.selectedValue) {
        return elem.iscorrect ? (
          <img src={check} alt="check" />
        ) : (
          <img src={close} alt="close" />
        );
      }
      if (item === elem.answer && item !== elem.selectedValue) {
        return <img src={check} alt="check" />;
      }
    }
    return null;
  };

  const checkComplete = () => {
    
    const isansweredall = numbers.every(
      (item) => Object.values(item)[0] === true
    );
  
    if (isansweredall) {
      navigate("/complete");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      checkComplete();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [numbers, checkComplete]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <p className="text-[#8B8EAB] font-bold text-[0.875rem] tracking-wide">
        Country Quiz
      </p>
      <div className="w-full flex flex-wrap justify-center items-center gap-3">
        {numbers.map((item) => (
          <Button
            text={Object.keys(item)[0]}
            key={Object.keys(item)[0]}
            isanswered={item[Object.keys(item)[0]]}
          />
        ))}
      </div>
      {questionslist
        .filter((elem) => elem.id === current)
        .map((elem) => (
          <div
            key={elem.id}
            className="w-full flex flex-col justify-center items-center gap-5"
          >
            <p className="text-[1.25rem] text-center text-wrap font-medium text-[#E2E4F3] emoji-text">
              {elem.question}
            </p>
            <div className=" w-full grid grid-cols-2  gap-5 justify-center items-center">
              {elem.option.map((item) => (
                <Tippy key={item} content={item} theme="dark"  animation="scale-extreme"  placement="top">
                    <button     
                  key={item}
                  className={`text-[1rem] h-[100%] text-[#E2E4F3] bg-[#393F6E] py-4 text-wrap flex justify-center items-center gap-3  rounded-xl hover:bg-gradient-to-r from-[#E65895] to-[#BC6BE8] grid-auto-rows flex-1 ${
                    elem.selectedValue === item ? "selected" : ""
                  }`}
                  id={item}
                  style={{
                    minHeight: "60px",
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    gridAutoRows: "minmax(60px, auto)",
                  }}
                  onClick={(e) => {
                    if (!elem.isanswered) {
                      dispatch(
                        updateList({ id: elem.id, answer: e.target.id })
                      );
                      e.target.classList.add("selected");
                    }
                  }}
                  disabled={elem.isanswered}
                >
                  { item.split(" ").length>4 ? item.split(" ").slice(0,4).join(" ")+'...':item}
                  {renderAnswerImage(item, elem)}
                </button>
                </Tippy>
               
              ))}
            </div>
          </div>
        ))}
    </Container>
  );
}

export default App;
