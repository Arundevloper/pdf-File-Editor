import React from 'react';

const ThumbnailView = ({ pages }) => {
  return (
    <div className="thumbnail-view">
      {pages.map((page, index) => (
        <img key={index} src={page.thumbnail} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default ThumbnailView;
