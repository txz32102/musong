import React from 'react';

const SvgRender = ({ filePath, scale = 1, onClick }) => {
  const width = 100 * scale;
  const height = 100 * scale;

  return (
    <div onClick={onClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
      <img 
        src={filePath} 
        alt="Rendered SVG" 
        width={width} 
        height={height} 
      />
    </div>
  );
};

export default SvgRender;
