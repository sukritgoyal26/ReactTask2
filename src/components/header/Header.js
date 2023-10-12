import React, { useEffect, useRef } from "react";
import "./header.css";

function Header(props){
    const ResultRef = useRef();

    useEffect(()=>{
        ResultRef.current.scrollIntoView();
    }, [props.history]);
    return (<div className="header custom-scroll">
        <div className="history">
            {props.history &&
            props.history?.map((item)=>(
            <p key={item + ""+Math.random()*44}>{item}</p>
        ))}
        </div>
        <br />
        <div className="expression custom-scroll"><p>{props.expression}</p></div>
        <div className="result"><p ref={ResultRef}>{props.result}</p></div>
    </div>)
}
export default Header;