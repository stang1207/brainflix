import React from 'react';

const Box = ({ element = 'div', className, children }) => {
  const CustomTag = `${element}`;
  return (
    <CustomTag className={className ? className : null}>{children}</CustomTag>
  );
};

export default Box;
