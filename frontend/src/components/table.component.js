import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/table.css';

const DynamicTable = () => {
  const initialData = [
    { fileName: 'Document1.pdf' },
    { fileName: 'Image1.jpg' },
    { fileName: 'Spreadsheet1.xlsx' }
  ];
  const [data, setData] = useState(initialData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/checkLoginStatus', { withCredentials: true });
        const data = response.data;
        if (data.loggedIn) {
          setIsLoggedIn(true);
          setUserId(data.userId); // Assuming server sends userId in the response
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          navigate('/'); // Redirect to login if not logged in
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);


  //Handling file upload 
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  
  const formData = new FormData();
  formData.append('file', file);
  
  
  axios.post('http://localhost:5000/api/uploadpdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('File uploaded successfully:', response.data);
  })
  .catch(error => {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error while setting up request:', error.message);
    }
  });

  };

  const handleExtract = (fileName) => {
    console.log(`Extracting file: ${fileName}`);
  };

  const handleDelete = (fileName) => {
    console.log(`Deleting file: ${fileName}`);
  };

  const handleView = (fileName) => {
    console.log(`Viewing file: ${fileName}`);
  };

  return (
    <div className="container">
      <div className="mb-3">

      <label htmlFor="fileUpload" className="upload form-label">Upload PDF File:</label>
      <div className="uploadField">
        <div>
        <input type="file" className="form-control" id="fileUpload"  accept=".pdf" />
      </div>
      <div>
        <button className="btn uploadBtn mr-2" onClick={handleFileUpload}>Upload</button>
      </div>
      </div>
      </div>
      <h2>PDF Files</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>FileName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.fileName}</td>
              <td>
                <button className="btn mr-2" onClick={() => handleView(item.fileName)}>View</button>
                <button className="btn mr-2" onClick={() => handleExtract(item.fileName)}>Extract</button>
                <button className="btn mr-2" onClick={() => handleDelete(item.fileName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() =>
          setData([
            ...data,
            {
              fileName: selectedFile ? selectedFile.name : 'NewFile.txt'
            }
          ])
        }
      >
        Add Row
      </button>
    </div>
  );
};

export default DynamicTable;
