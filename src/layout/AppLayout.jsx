import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      navbar
      <Outlet />
    </div>
  );
  );
};

export default AppLayout;
