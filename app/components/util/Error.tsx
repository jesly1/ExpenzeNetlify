import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
interface ErrorProps {
  title: string;
  children: React.ReactNode; 
}
const Error: React.FC<ErrorProps> = ({ title, children }) => {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
export default Error;
