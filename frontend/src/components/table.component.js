import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageBox from './message.component';
import '../css/table.css';

const DynamicTable = () => {

  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  //Message and Alert Handler
  const handleShowMessage = (message, color) => {
    setMessage(message);
    setColor(color);
    setShowMessage(true);
  };
  const handleCloseMessage = () => {
    setShowMessage(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  //Check if the user login or not if not navigate it to login page
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://pdf-file-editor-eqpx.vercel.app/api/checkLoginStatus', { withCredentials: true });
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
      const response = await axios.get(`https://pdf-file-editor-eqpx.vercel.app/api/getPdfByUser?page=${currentPage}`, { withCredentials: true });

      setPdfFiles(response.data.pdfFiles);
      setTotalPages(response.data.totalPages);
      console.log("toatl page is" + response.data)

    } catch (error) {
      console.error('Error fetching data:', error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleFileUpload = () => {
    const input = document.getElementById('fileUpload');
    const file = input.files[0];

    if (!file) {
      console.error('No file selected.');
      handleShowMessage('No files selected', 'info');
      return;
    }

    if (file.type !== 'application/pdf') {
      handleShowMessage('Please select a PDF file..', 'danger');
    }
    else {
      const formData = new FormData();
      formData.append('uploadpdf', file);

      axios.post('https://pdf-file-editor-eqpx.vercel.app/api/uploadpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

        .then(response => {

          handleShowMessage('File uploaded successfully', 'success');
          fetchData(); // Fetch data only if upload is successful

        })
        .catch(error => {
          console.error('Error uploading:', error);
          handleShowMessage('Duplicate file detected', 'danger');
        });
    }

  };



  const handleExtract = (fileName) => {
    console.log(`Extracting file: ${fileName}`);
    navigate(`/extract/${fileName}`);

  };



  const handleDelete = (fileName) => {
    axios.delete(`https://pdf-file-editor-eqpx.vercel.app/api/delete-pdf/${fileName}`, { withCredentials: true })
      .then(response => {
        const fileNameSub = fileName.substring(14);
        console.log(`File "${fileName}" deleted successfully`);
        fetchData();
        handleShowMessage(`"${fileNameSub} file deleted"`, 'danger');
      })
      .catch(error => {

        console.error(`Error deleting file "${fileName}":`, error);
        handleShowMessage(`Error deleting file "${fileName}": ${error.message}`, 'danger');
      });
  };


  const handleView = async (fileName) => {
    try {
      const response = await axios.get(`https://pdf-file-editor-eqpx.vercel.app/api/view-pdf/${fileName}`, {
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
      {showMessage && (
        <MessageBox message={message} color={color} onClose={handleCloseMessage} />
      )}
      <div className="mb-3">
        <label htmlFor="fileUpload" className="upload form-label">Upload PDF File:</label>
        <div className="uploadField">
          <div>
            <input type="file" className="form-control" id="fileUpload" accept=".pdf" />
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
          {
            loading && (
              <div className="empty">
                <p>Loading...</p>
              </div>
            )
          }
          {pdfFiles.length === 0 && (
            <div className="empty">
              <p>No files are uploaded.</p>
            </div>

          )}
          {!loading &&
            pdfFiles.map((item, index) => (
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
      <div className='pageDiv'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className="pagination-button"
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage} // Disable button if it represents the current page
          >
            {page}
          </button>
        ))}
      </div>
      <div className='pageDiv'>
        <p>Page {currentPage} of {totalPages}</p>
      </div>
    </div>
  );
};

export default DynamicTable;
