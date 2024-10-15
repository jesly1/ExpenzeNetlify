import { Link } from '@remix-run/react';
import React from 'react';
const Logo: React.FC = () => {
  return (
    <h1 id="logo">
      <Link to="/">RemixExpenses</Link>
    </h1>
  );
};
export default Logo;
