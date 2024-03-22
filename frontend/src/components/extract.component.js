import React, { useState } from 'react';
import '../css/extractor.css';

const PageSelector = ({ pageCount }) => {
  const [selectedPages, setSelectedPages] = useState([]);

  const togglePageSelection = (pageNumber) => {
    setSelectedPages(prevSelectedPages => {
      if (prevSelectedPages.includes(pageNumber)) {
        // Deselect the page if it's already selected
        return prevSelectedPages.filter(page => page !== pageNumber);
      } else {
        // Select the page if it's not already selected
        return [...prevSelectedPages, pageNumber];
      }
    });
  };

  const handleExtractPages = () => {
    // Handle extract pages action
    console.log('Extracting pages:', selectedPages);
  };

  return (
    <div className="page-selector-container page-label div">
      <h3 className="page-selector-title">Select Pages You Want To Extract</h3>
      <ul className="page-list">
        {[...Array(pageCount)].map((_, index) => (
          <li key={index}>
            <label className="page-label">
              <input
                type="checkbox"
                className="page-checkbox"
                checked={selectedPages.includes(index + 1)}
                onChange={() => togglePageSelection(index + 1)}
              />
              Page {index + 1}
            </label>
          </li>
        ))}
      </ul>
      <p className="selected-pages">Selected Pages: {selectedPages.join(', ')}</p>
        <div className="page-btn">
      <button className="extract-button btn" onClick={handleExtractPages}>Extract Pages</button>
      </div>
     
    </div>
  );
};

export default PageSelector;
