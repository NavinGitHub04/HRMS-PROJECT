import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Componey from './components/routes/componey.jsx';
import Department from './components/routes/department.jsx';
import Division from './components/routes/division.jsx';
import SubDivision from './components/routes/subdivision.jsx';
import Employ from './components/routes/employ.jsx';
import SubEmploy from './components/routes/subemploy.jsx';
import Job from './components/routes/job.jsx';
import OrgUnit from './components/routes/0rgUnit.jsx'; // Fixed import path for OrgUnit component
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'componey',
        element: <Componey />,
      },
      {
        path: 'department',
        element: <Department />,
      },
      {
        path: 'division',
        element: <Division />,
      },
      {
        path: 'subDivision',
        element: <SubDivision />,
      },
      {
        path: 'Employ',
        element: <Employ />,
      },
      {
        path: 'subEmploy',
        element: <SubEmploy />,
      },
      {
        path: 'job',
        element: <Job />,
      },
      {
        path: 'OrgUnit',
        element: <OrgUnit />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
