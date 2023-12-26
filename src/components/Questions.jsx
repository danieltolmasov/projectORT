import React, { useContext, useEffect, useState } from "react";
import UserContext from "../data/UserContext";
import { addAnswer, addQuestion, getQuestions } from "../firebase/qas";
import "../style/Questions.css";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

const Questions = () => {
  const { user } = useContext(UserContext);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const [qas, setQas] = useState([]);

  const saveQuestion = () => {
    if (!user) {
      alert("יש להתחבר על מנת להוסיף שאלה");
      return;
    }
    addQuestion(user.uid, question);
    setQuestion("");
    alert("השאלה נוספה בהצלחה");
    fetchQas();
  };

  const saveAnswer = (questionId) => {
    if (!user) {
      alert("יש להתחבר על מנת להוסיף תשובה");
      return;
    }
    addAnswer(questionId, user.uid, answers[questionId]);
    setAnswers({ ...answers, [questionId]: "" });
    alert("התשובה נוספה");
    fetchQas();
  };

  const fetchQas = async () => {
    const qas = await getQuestions();
    setQas(qas);
  };

  useEffect(() => {
    fetchQas();
  }, []);

  return (
    <div className="QContainer">
      <p className="textUp">יש לך שאלה? זה המקום לשאול כול מה שיש לך בנושאים משפטיים</p>
      <div className="inputAndButton d-flex">
        <button className="buttonQue btn btn-secondary" onClick={saveQuestion}>
          שאל
        </button>
        <input
          dir="rtl"
          className="inputQue"
          placeholder="הזן שאלה"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="AccordionContainer">
        <Accordion className="Accordion">
          {qas.map((qa) => (
            <Accordion.Item eventKey={qa.id} key={qa.id}>
              <Accordion.Header className="AHeader">
                <div
                  dir="rtl"
                  className="DivHeade"
                  style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                  <p className="QueAns bubble">{qa.question}</p>
                </div>
              </Accordion.Header>
              <Accordion.Body className="ABody">
                {qa.answers.map((answer) => (
                  <div
                    dir="rtl"
                    className={`ansBody bubble ${user && user.uid === answer.userId ? "right" : "left"}`}
                    key={`${qa.id}-${answer.timestamp}`}
                  >
                    <div className="upAnswer d-flex">
                      <p className="NaLawyer">{answer.lawyer}</p>
                      <p className="Date">{answer.date}</p>
                    </div>
                    <div className="downAnswer">
                      <p className="QueAns">{answer.answer}</p>
                    </div>
                  </div>
                ))}
                <button className="buttonQue btn btn-secondary" onClick={() => saveAnswer(qa.id)}>
                  ענה
                </button>
                <input
                  dir="rtl"
                  className="inputQue"
                  placeholder="הזן תשובה"
                  value={answers[qa.id] || ""}
                  onChange={(e) => setAnswers({ ...answers, [qa.id]: e.target.value })}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Questions;
