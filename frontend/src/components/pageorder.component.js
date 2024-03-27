// MainComponent.js

import React, { useState } from 'react';
import ListView from './listview.component';

const MainComponent = () => {
  // Example pages data
  const [pages, setPages] = useState([
    { thumbnail: 'page1.jpg' },
    { thumbnail: 'page2.jpg' },
    { thumbnail: 'page3.jpg' },
    // Add more pages as needed
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('index'));

    // Rearrange the pages array
    const newPages = Array.from(pages);
    const [draggedItem] = newPages.splice(dragIndex, 1);
    newPages.splice(dropIndex, 0, draggedItem);

    setPages(newPages);
  };

  return (
    <div>
      <h1>PDF Page Order</h1>
      <ListView
        pages={pages}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default MainComponent;
