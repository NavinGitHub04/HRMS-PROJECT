import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import './app.css';

export default function App() {
  return (
    <>
    <Header/>
    <main className='p-4'>
    <Outlet/>     
    </main> 
    </>
  );
}
