import React, { useState } from 'react';

function InputForm({ fetchWordFrequencies }) {
  const [url, setUrl] = useState('');
  const [topN, setTopN] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWordFrequencies(url, topN);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL"
        className="input-field"
      />
      <input
        type="number"
        value={topN}
        onChange={(e) => setTopN(Number(e.target.value))}
        placeholder="Top N Words"
        className="input-field mt-2"
      />
      <button type="submit" className="submit-button mt-4">Analyze</button>
    </form>
  );
}

export default InputForm;
