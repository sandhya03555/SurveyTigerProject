import React, { useState, Fragment } from "react";
import { Link,Redirect } from 'react-router-dom';
const Survey = (props) => {
  const [surveyType, setSurveyType] = useState("defaultValue");
  const [options, setOptions] = useState([{ value: ``, id: Date.now() }]);
  const [question,setquestion]=useState('');
  const [redirect, setRedirect]=useState(false);


  const onAddition = () => {
    if (surveyType === "single" && options.length == 2) return;
    if (surveyType === "multi" && options.length === 4) return;
    setOptions([...options, { value: "", id: Date.now() }]);
  };
  const onAddItem = (text, id) => {
    const optionCopy = [...options];
    const updateOption = optionCopy.map((option) => {
      if (option.id === id) {
        return { ...option, value: text };
      } else {
        return option;
      }
    });
  };
  const onAddAnswer = (text, id) => {
    const optionCopy = [...options];
    const updateOptions = optionCopy.map((option) => {
      if (option.id === id) {
        return { ...option, value: text };
      } else {
        return option;
      }
    });
    setOptions(updateOptions);
  };

  const onRemoveItem = (id) => {
    const updatedOption = options.filter((option) => option.id !== id);
    setOptions(updatedOption);
  };
  const redirectToPage=()=>{
    setRedirect(true);
};
const renderRedirect=()=>{
   if(redirect==true){
      return(<Redirect
        to={{
        pathname: "/publish",
        state:{question:question,options:options}
      }}
    />
      );
   }
};

  return (
    <Fragment>
      {renderRedirect()}
      <div className="question-type-container">
        <select
          name="survey"
          value={surveyType}
          onChange={(evt) => {
            setSurveyType(evt.target.value);
            setOptions([{ value: "", id: Date.now() }]);
          }}
        >
          <option value="defaultValue">Select question type</option>
          <option value="multi">Multi-select</option>
          <option value="single">Single select</option>
        </select>
      </div>
      {surveyType !== "defaultValue" ? (
        <div className="survey-container">
          <input
            type="text"
            placeholder="Enter your question here"
            className="question-container"
            value={props.question}
            onChange={(evt) => {
              setquestion(evt.target.value);
            }}
          />
          <p>Options</p>
          {options.map((option) => (
            <div className="answer-container" key={option.id}>
              <input
                type="text"
                placeholder="Type answer here"
                value={props.option}
                onChange={(evt) => {
                  onAddAnswer(evt.target.value,option.id);
                }}
              />
              <p onClick={onAddition}>➕</p>
              <p
                onClick={() => {
                  onRemoveItem(option.id);
                }}
              >
                ➖
              </p>
            </div>
          ))}
          {(surveyType === "multi" && options.length >= 4) ||
          (surveyType === "single" && options.length === 2) ? (
            <span>
              <button className="add question">Add question</button>
              <button onClick={redirectToPage} className="publish">publish</button>
            </span>
          ) : null}

        </div>
      ) : null}
    
    </Fragment>
  );
};
export default Survey;
