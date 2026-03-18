import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState({ Thing: '', Place: '', Emotion: '' });

  const fetchPrompt = () => {
    fetch('/api/prompt')
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => setPrompt(data))
      .catch((err) => console.error('Failed to fetch prompt:', err));
  };

  useEffect(() => {
    fetchPrompt();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Creative Writing Prompts</h1>
      </header>
      <main className="content-placeholder">
        <div className="cards">
          <div className="card-wrapper">
            <h2 className="card-label">Thing</h2>
            <div className="card">{prompt.Thing}</div>
          </div>
          <div className="card-wrapper">
            <h2 className="card-label">Place</h2>
            <div className="card">{prompt.Place}</div>
          </div>
          <div className="card-wrapper">
            <h2 className="card-label">Emotion</h2>
            <div className="card">{prompt.Emotion}</div>
          </div>
        </div>
        <button className="shuffle-btn" onClick={fetchPrompt}>Shuffle</button>
      </main>
    </div>
  );
}

export default App;
