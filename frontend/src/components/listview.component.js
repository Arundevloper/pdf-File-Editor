// ListView.js

import React from 'react';

const ListView = ({ pages, onDragStart, onDragOver, onDrop }) => {
  return (
    <div className="list-view">
      <ul>
        {pages.map((page, index) => (
          <li key={index}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, index)}>
            <span>Page {index + 1}</span>
            <img src={page.thumbnail} alt={`Page ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
