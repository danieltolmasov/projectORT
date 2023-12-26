import React, { useState } from "react";
import { Form, Select } from "react-bootstrap";
import data from "../data/data.json";
import "../style/Information.css";

export default function Information() {
  const sections = data.map((section) => section.title);
  const [selected, setSelected] = useState(sections[0]);
  const selectedSection = data.find((section) => section.title === selected);

  return (
    <div className="incontainer">
      <div>
        <Form>
          <select onChange={(e) => setSelected(e.target.value)} value={selected}>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </Form>
      </div>
      <div key={selectedSection.title}>
        <h1>{selectedSection.title}</h1>
        <h6 className="textI">{selectedSection.information}</h6>
      </div>
      <div className="card-container">
        {selectedSection.qa.map((qa, index) => (
          <div className="card" key={index}>
            <div className="face face1">
              <div dir="rtl" className="content">
                <h5 style={{ color: "white" }}>{qa.question}</h5>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>{qa.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}