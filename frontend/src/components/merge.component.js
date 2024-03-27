import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PDFDropdown = ({ onMerge }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({ file1: '', file2: '' });

  useEffect(() => {
    // Fetch PDF files from backend
    const fetchPDFFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getPdfFiles');
        setPdfFiles(response.data.pdfFiles);
      } catch (error) {
        console.error('Error fetching PDF files:', error);
      }
    };
    fetchPDFFiles();
  }, []);

  const handleSelectChange = (e, fieldName) => {
    setSelectedFiles(prevState => ({
      ...prevState,
      [fieldName]: e.target.value
    }));
  };

  const handleMergeClick = () => {
    const { file1, file2 } = selectedFiles;
    if (!file1 || !file2) {
      alert('Please select two PDF files to merge.');
      return;
    }

    // Call the onMerge callback with selected files
    onMerge(file1, file2);
  };

  return (
    <div>
      <div>
        <label htmlFor="pdfDropdown1">Select First PDF File:</label>
        <select id="pdfDropdown1" onChange={(e) => handleSelectChange(e, 'file1')}>
          <option value="">Select PDF File</option>
          {pdfFiles.map((file, index) => (
            <option key={index} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pdfDropdown2">Select Second PDF File:</label>
        <select id="pdfDropdown2" onChange={(e) => handleSelectChange(e, 'file2')}>
          <option value="">Select PDF File</option>
          {pdfFiles.map((file, index) => (
            <option key={index} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleMergeClick}>Merge PDF Files</button>
    </div>
  );
};

export default PDFDropdown;
