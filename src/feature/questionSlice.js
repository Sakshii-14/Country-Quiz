import { createSlice } from "@reduxjs/toolkit";

const initialState={
    List:[],
    category:[{capital:"Which country is -- the capital ? "},{flag:"Which country does this flag -- belong to ? "},{cca2:"Which country has this cca code -- ? "}],
    questionsList:[],
    current:null,
    numbers:[{1:false}, {2:false}, {3:false}, {4:false}, {5:false}, {6:false}, {7:false}, {8:false}, {9:false}, {10:false}],
}

const getRandom=(len)=>{
  return (Math.floor(Math.random()*len))
}

const getOptionlist=(list,index)=>{
    
    if (list.length === 0) return []
    let arr=[]
    let usedIndices = new Set();
    arr.push(list[index].name.common)
    usedIndices.add(index);

    while(arr.length<4)
        {
            let num=getRandom(list.length)
            if (!usedIndices.has(num)) {  
                arr.push(list[num].name.common);
                usedIndices.add(num);
            }  
        }

  return shuffle(arr)
}

const shuffle=(arr)=>{
   
    
    
   for(let i=arr.length-1;i>=0;i--)
    {   
        const j=Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]]
    }
   
    return arr;
}

const questionSlice=createSlice({
    name:"questionslice",
    initialState,
    reducers:{
        getList:(state,action)=>{
            state.List=[...action.payload.list]
            
        },
        generateQuestion:(state,action)=>{
           state.current=action.payload.id || 1
           const randomlist=getRandom(state.List.length);
           const randomcategory=getRandom(state.category.length);
           const country=state.List[randomlist]
           const category=state.category[randomcategory]
           const questionType=Object.keys(category)[0]
           state.questionsList=[...state.questionsList,{id:action.payload.id || '1' , question:category[questionType].replace('--',questionType==='capital' ? country.capital[0]:country[questionType]) , answer : country.name.common , option : getOptionlist(state.List,randomlist) , isanswered:false ,iscorrect:false , selectedValue:null}]
           
        },
        updateList:(state,action)=>{
          
            state.questionsList=state.questionsList.map((item)=>action.payload.id===item.id?{...item,isanswered:true,iscorrect:action.payload.answer===item.answer ,selectedValue:action.payload.answer}:item)
            state.numbers = state.numbers.map((item) => {
                const key = Object.keys(item)[0]; 
                return key === action.payload.id 
                  ? { ...item, [key]: true } 
                  : item; 
              });
            
        },
        updateCurrent:(state,action)=>{
            state.current=action.payload.id
        },
        resetQuiz:(state)=>{
            return initialState
        }
    }
})


export const {getList,generateQuestion,updateList,updateCurrent,resetQuiz}=questionSlice.actions
export default questionSlice.reducer