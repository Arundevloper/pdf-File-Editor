import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/extractor.css';


const PageSelector = () => {
  const { fileName } = useParams();
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);


  //Retrive the files form server
  const fetchPageNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pdfPageCount/${fileName}`, { withCredentials: true });
      //console.log("this is response" + response.data.pageCount);
      setPageCount(response.data.pageCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchPageNumbers();
  }, []);


  
  const handleExtractPages = async () => {
    const data = {
      filename: fileName,
      selectedPages: selectedPages
    };

    try {
      const response = await fetch('http://localhost:5000/api/extract-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error extracting PDF:', error);
    }
  };


  //Keep the tract of page number selected
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
