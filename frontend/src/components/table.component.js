import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/table.css';

const DynamicTable = () => {
  // Example data for the table
  const initialData = [
    { fileName: 'Document1.pdf' },
    { fileName: 'Image1.jpg' },
    { fileName: 'Spreadsheet1.xlsx' }
  ];

  // State to manage table data
  const [data, setData] = useState(initialData);
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle extract action
  const handleExtract = (fileName) => {
    // Implement extract action logic here
    console.log(`Extracting file: ${fileName}`);
  };

  // Function to handle delete action
  const handleDelete = (fileName) => {
    // Implement delete action logic here
    console.log(`Deleting file: ${fileName}`);
  };

  // Function to handle view action
  const handleView = (fileName) => {
    // Implement view action logic here
    console.log(`Viewing file: ${fileName}`);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="fileUpload" className=" upload form-label">Upload PDF File:</label>
        <input type="file" className="form-control" id="fileUpload" onChange={handleFileUpload} accept=".pdf" />
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
                <button className="btn mr-2 " onClick={() => handleView(item.fileName)}>View</button>
                <button className="btn mr-2" onClick={() => handleExtract(item.fileName)}>Extract</button>
                <button className="btn  mr-2" onClick={() => handleDelete(item.fileName)}>Delete</button>

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
