const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Define a mapping of words to be replaced
const wordMapping = {
  'ABN': 'ABN AMRO',
  'ING': 'ING Bank',
  'Rabo': 'Rabobank',
  'Triodos': 'Triodos Bank',
  'Volksbank': 'de Volksbank'
};

// Define a function to perform the find and replace
function findAndReplace(text) {
  // Use regular expressions to replace words from the mapping
  for (const word in wordMapping) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, wordMapping[word]);
  }
  return text;
}

// Define a route to handle the API request
app.post('/replace', (req, res) => {
  const inputText = req.body.input;
  if (!inputText) {
    return res.status(400).json({ error: 'Input text is required.' });
  }

  const replacedText = findAndReplace(inputText);
  res.json({ result: replacedText });
});

  app.get('/replace', (req, res) => {
    let inputText = req.query.input
    
    if (!inputText) {
      return res.status(400).json({ error: 'Input text is required.' });
    }
    const replacedText = findAndReplace(inputText);
    res.json({ result: replacedText });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
