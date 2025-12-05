import React from "react";
import BackButton from "../common/BackButton";

const About1 = () => {
    return (
        <div className="w-full min-h-screen bg-[#171717] py-10 mt-[70px]">
            
            {/* Back Button */}
            <div className="container mx-auto px-4 mb-6">
                <BackButton />
            </div>

            <div className="2xl:container 2xl:mx-auto lg:py-10 lg:px-20 md:py-8 md:px-6 py-5 px-4 
                            bg-[#1f1f1f] border border-white/20 rounded-xl shadow-xl">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    
                    {/* Left Text */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">
                            About Us
                        </h1>
                        <p className="font-normal text-base leading-6 text-gray-300">
                            The Pune Municipal Corporation is responsible for managing civic services, 
                            infrastructure, and public welfare within Pune City. Established in 1950, the PMC 
                            oversees a population of over 3.4 million across 484 sq. km., ensuring smooth governance, 
                            public service delivery, and urban development.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-8/12">
                        <img 
                            className="w-full h-full rounded-lg shadow-lg" 
                            src="https://images.indianexpress.com/2021/06/PMC.jpg" 
                            alt="Pune Municipal Corporation" 
                        />
                    </div>
                </div>

                {/* Officials Section */}
                <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">

                    {/* Left Text Section */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">
                            City Officials
                        </h1>

                        <ol className="text-gray-300 text-base leading-7">
                            <li><b>1. Municipal Commissioner :</b> Vikram Kumar, IAS</li>
                            <li><b>2. Commissioner of Police :</b> Amitabh Gupta, IPS</li>
                            <li><b>3. Mayor :</b> Murlidhar Mohol (BJP)</li>
                            <li><b>4. Deputy Mayor :</b> Sunita Wadekar (BJP)</li>
                        </ol>
                    </div>

                    {/* Right Images Grid */}
                    <div className="w-full lg:w-8/12 lg:pt-8">
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-md rounded-md">

                            {/* Commissioner */}
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img 
                                  className="md:block hidden rounded-md shadow-lg" 
                                  img src="https://junagadhmunicipal.org/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-11-at-12.45.35-PM.jpeg" 
                                  alt="Municipal Commissioner"
                                />
                                <p className="font-medium text-xl leading-5 text-white mt-4">
                                    Municipal Commissioner
                                </p>
                            </div>

                            {/* Police Commissioner */}
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img 
                                  className="md:block hidden rounded-md shadow-lg" 
                                  src="https://www.shutterstock.com/editorial/image-editorial/M7TaM6x7N7z9Me31NTg0NjU=/newly-appointed-delhi-police-commissioner-sanjay-arora-440nw-13060358b.jpg" 
                                  alt="Commissioner of Police"
                                />
                                <p className="font-medium text-xl leading-5 text-white mt-4">
                                    Commissioner of Police
                                </p>
                            </div>

                            {/* Mayor */}
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img 
                                  className="md:block hidden rounded-md shadow-lg" 
                                  src="https://www.myhmc.in/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-28-at-12.35.39-768x1024.jpeg" 
                                  alt="Mayor"
                                />
                                <p className="font-medium text-xl leading-5 text-white mt-4">
                                    Mayor
                                </p>
                            </div>

                            {/* Deputy Mayor */}
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img 
                                  className="md:block hidden rounded-md shadow-lg" 
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3QZWdqyaP_gMJ-jVxBLnCPLl_Qd6XNvBUQ&s" 
                                  alt="Deputy Mayor"
                                />
                                <p className="font-medium text-xl leading-5 text-white mt-4">
                                    Deputy Mayor
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default About1;
