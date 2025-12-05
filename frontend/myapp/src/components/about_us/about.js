import React from 'react';
import Navbar from "../home/navbar";
import Footer from '../home/footer';
import About1 from './about1';  // importing actual content page

export default function About() {
  return (
    <div>
      <Navbar />
      <About1 />
      <Footer />
    </div>
  );
}
