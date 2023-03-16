import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  console.log('====================================');
  console.log(text);

  const handleChange = async (event) => {
    setText(event.target.value);
  };

  const handleDownloadPDF = () => {
    axios({
      url: 'http://localhost:5000/generate-pdf',
      method: 'POST',
      responseType: 'blob',
      data: {
        text: text
      }
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.pdf');
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div>
      <h1>Generate PDF </h1>
      <form>
        <label>
          Text:
          <textarea value={text} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleDownloadPDF}>Generate PDF</button>
      </form>
    </div>
  );
}

export default App;
