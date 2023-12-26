import { db } from "./firebase";

import {
  collection,
  getDocs,
  updateDoc,
  query,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { getLawyers } from "./lawyers";

const qasCollection = collection(db, "qas");

export const addQuestion = async (lawyerId, question) => {
  const newQuestion = {
    question,
    timestamp: Date.now(),
    lawyerId,
    answers: [],
  };

  await addDoc(qasCollection, newQuestion);
};

export const addAnswer = async (questionId, lawyerId, answer) => {
  const docRef = doc(db, "qas", questionId);
  const question = await getDoc(docRef);
  const newQuestion = question.data();
  newQuestion.answers.push({
    answer,
    timestamp: Date.now(),
    lawyerId,
  });

  await updateDoc(docRef, newQuestion);
};

export const getQuestions = async () => {
  const qas = (await getDocs(query(qasCollection))).docs;

  const parsedQas = [];

  for (let qa of qas) {
    const qaId = qa.id;
    const parsedQa = qa.data();
    parsedQa.id = qaId;
    parsedQas.push(parsedQa);
  }

  const lawyers = await getLawyers();

  const lawyersNames = lawyers.reduce((lawyers, lawyer) => {
    return { ...lawyers, [lawyer.id]: `${lawyer.name} ${lawyer.lastName}` };
  }, {});

  const formatedQas = parsedQas.map((qa) => ({
    ...qa,
    lawyer: lawyersNames[qa.lawyerId],
    date: new Date(qa.timestamp).toLocaleString(),
    answers: qa.answers.map((answer) => ({
      ...answer,
      lawyer: lawyersNames[qa.lawyerId],
      date: new Date(qa.timestamp).toLocaleString(),
    })),
  }));

  console.log({ formatedQas });

  return formatedQas;
};
