import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/extractor.css';


const PageSelector = () => {
  const { fileName } = useParams();
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  //Retrive the total pages from pdf file
  const fetchPageNumbers = async () => {
    try {
      const response = await axios.get(`https://pdf-file-editor-eqpx.vercel.app/api/pdfPageCount/${fileName}`, { withCredentials: true });

      //console.log("this is response" + response.data.pageCount);
      setPageCount(response.data.pageCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchPageNumbers();
  }, []);


  //Post request to extract the pdf and display in the browser
  const handleExtractPages = async () => {
    const data = {
      filename: fileName,
      selectedPages: selectedPages
    };

    try {
      const response = await fetch('https://pdf-file-editor-eqpx.vercel.app/api/extract-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      navigate('/home');
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
      <h3 className="page-selector-title">Select Pages(select in order wise if you want)</h3>
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
