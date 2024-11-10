import React from 'react';

function WordFrequencyTable({ wordFrequencies }) {
  return (
    <table className="word-table mt-6">
      <thead>
        <tr>
          <th>Word</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {wordFrequencies.map(({ word, count }, index) => (
          <tr key={index}>
            <td>{word}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WordFrequencyTable;
