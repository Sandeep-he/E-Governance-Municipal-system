import React from 'react';
import Navbar from "../home/navbar";
import HomeBody from "../home/home_content";
import Footer from '../home/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>

        {/* Main Content */}
        <div className="flex-1">
          <HomeBody/>
        </div>

        <Footer/>
    </div>
  );
}
