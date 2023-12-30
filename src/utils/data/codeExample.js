export const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudyWire</title>
</head>
<body>
  <h1>StudyWire</h1>
</body>
</html>`;
export const reactCode = `import React from 'react';
import ReactDOM from 'react-dom/client';

function StudyWire(props) {
  return (
          <h1>StudyWire</h1>
         )
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<StudyWire />);`;
