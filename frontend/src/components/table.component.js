import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessModal from './success.component';
import DeleteSuccessModal from './success.component';
import '../css/table.css';

const DynamicTable = () => {

  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const navigate = useNavigate();


  //Check if the user login or not if not navigate it to login page
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/checkLoginStatus', { withCredentials: true });
        const data1 = response.data;
        if (!data1.loggedIn) {
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  //Retrive the files form server
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getPdfByUser', { withCredentials: true });
      setPdfFiles(response.data.pdfFiles);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
  };

  const handleFileUpload = () => {
    const input = document.getElementById('fileUpload');
    const file = input.files[0];

    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('uploadpdf', file);

    axios.post('http://localhost:5000/api/uploadpdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
      .then(response => {
        setShowSuccessModal(true);
        console.log('File uploaded successfully:', response.data);
        fetchData();

      })
      .catch(error => {
        console.error('Error uploading file:', error);
        // Handle upload error
      });
  };





  const handleExtract = (fileName) => {
    console.log(`Extracting file: ${fileName}`);
    navigate(`/extract/${fileName}`);

  };



  const handleDelete = (fileName) => {

    axios.delete(`http://localhost:5000/api/delete-pdf/${fileName}`, { withCredentials: true })
      .then(response => {
        console.log(`File "${fileName}" deleted successfully`);
        fetchData();
        setShowDeleteSuccessModal(true);
      })
      .catch(error => {
        console.error(`Error deleting file "${fileName}":`, error);

      });

  };


  const handleView = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/view-pdf/${fileName}`, {
        responseType: 'blob', // Specify response type as blob
        withCredentials: true
      });

      // Create a Blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a temporary URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      // Open a new window to display the PDF using the embedded PDF viewer
      window.open(url, '_blank');

      // Clean up: revoke the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };





  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="fileUpload" className="upload form-label">Upload PDF File:</label>
        <div className="uploadField">
          <div>
            <input type="file" className="form-control" id="fileUpload" accept=".pdf" />
          </div>
          <div>
            <button className="btn uploadBtn mr-2" onClick={handleFileUpload}>Upload</button>
          </div>
          <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} message="File uploaded successfully!" />

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
          {pdfFiles.length === 0 && (
            <div className="empty">
              <p>No files are uploaded.</p>
            </div>

          )}
          {pdfFiles.map((item, index) => (
            <tr key={index}>
              <td>{item.filename.substring(14)}</td>
              <td>
                <button className="btn mr-2" onClick={() => handleView(item.filename)}>View</button>
                <button className="btn mr-2" onClick={() => handleExtract(item.filename)}>Extract</button>
                <button className="btn mr-2" onClick={() => handleDelete(item.filename)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteSuccessModal && (
        <DeleteSuccessModal show={showDeleteSuccessModal} handleClose={handleCloseDeleteSuccessModal} message="File deleted successfully!" />
      )}
    </div>
  );
};

export default DynamicTable;
