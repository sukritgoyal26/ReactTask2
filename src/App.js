import React , {useState} from "react";

import Header from "./components/header/Header";
import Keypad from "./components/keypad/keypad";

import "./App.css";

const usedkeyCodes=[
  48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,13,190,187,189,56,111,106,107,109
];
const numbers= ["0","1","2","3","4","5","6","7","8","9","0"];
const operators = ["+","-","*","/"];

function App() {

  const [expression,setExpression]=useState("");
  const [result,SetResult]=useState("");
  const [history , SetHistory]=useState([]);

  const handlekeypress = (keyCode,key)=>{
    if (!keyCode) {return};
    if(!usedkeyCodes.includes(keyCode)) return;

    if(numbers.includes(key)){
      if (key==="0") {
        if (expression.length===0) {
          return;
        }
        
      }
      setExpression(expression+key);
      calculateResult(expression + key);
    }
    else if(operators.includes(key)){
      if(!expression){
        return;
      }
      const lastchar=expression.slice(-1);
      if(operators.includes(lastchar))return;
      if(lastchar===".") return;

      setExpression(expression + key);

    }
    else if(key==="."){
      if (!expression) {
        return;
      }
      const lastchar = expression.slice(-1);
      if(!numbers.includes(lastchar)){
        return;
      }
      setExpression(expression+key);
    }
    else if(keyCode===13){
      if(!expression){
        return;
      }
      calculateResult(expression);

      const temphis = [...history];
      if(temphis.length>15){
        temphis = temphis.splice(0,1);
      }

      temphis.push(expression);
      SetHistory(temphis);

      setExpression("")
      

    }
    else if(keyCode===8){
      if(!expression)return;
      calculateResult(expression.slice(0,-1))
      setExpression(expression.slice(0,-1))
      
    }
  };

  const calculateResult = (exp) =>{
    if(!exp) {
      SetResult("");
      return
    };
    const lastchar = exp.slice(-1);
    if(!numbers.includes(lastchar)) exp=exp.slice(0,-1)

    const res = eval(exp).toFixed(2)+"";
    SetResult(res);
  };
  return (
    <div className="App" 
    tabIndex="0"
    onKeyDown={
      (event)=>
        handlekeypress(event.keyCode,event.key)
      }>
    
    
      <div className="calculator">
        <Header expression={expression} result = {result} history = {history}/>
        <Keypad handlekeypress={handlekeypress}/>
      </div>
    </div>
  );
}

export default App;
