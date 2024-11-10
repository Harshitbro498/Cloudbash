import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import WordFrequencyTable from './components/WordFrequencyTable';
import './styles/app.css';

function App() {
  const [wordFrequencies, setWordFrequencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWordFrequencies = async (url, topN) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/fetch-words', { url, topN });
      setWordFrequencies(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please check the URL.');
      setWordFrequencies([]);
    }
    setLoading(false);
  };

  return (
    <div className="app-container flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <h1 className="app-title">Word Frequency Analyzer</h1>
      <p className="app-subtitle">Analyze and discover the most common words on any webpage</p>
      <InputForm fetchWordFrequencies={fetchWordFrequencies} />
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          {wordFrequencies.length > 0 && <WordFrequencyTable wordFrequencies={wordFrequencies} />}
        </>
      )}
    </div>
  );
}

export default App;
