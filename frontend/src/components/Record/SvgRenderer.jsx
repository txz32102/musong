import React from 'react';

const SvgRender = ({ filePath, scale = 1, onClick, className}) => {
  const width = 100 * scale;
  const height = 100 * scale;

  return (
    <div onClick={onClick} className={className}>
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
