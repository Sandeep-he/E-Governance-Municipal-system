// frontend/src/components/contact_us/contact.js

import React from "react";
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import BackButton from "../common/BackButton";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  const contacts = [
    {
      title: "Fire Officer",
      img: "https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/05/14/Incoming/Pictures/1347258_Wallpaper2.jpg",
      content: "9689931991",
    },
    {
      title: "Emergency Contact",
      img: "https://mahad.grptechs.com/wp-content/uploads/2025/08/447866-PF6HAW-547.png",
      content: "020-25506800/1/2/3",
    },
    {
      title: "Assistant Public Information Officer",
      img: "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/808157682PublicInformationOfficer.jpg",
      content: "+91 9689931986",
    },
    {
      title: "Appeal Authority",
      img: "https://www.latestlaws.com/media/2018/06/Appeal.jpeg",
      content: "+91 9689931986",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#171717] py-10 mt-[70px]">
      {/* Back Button */}
      <div className="w-11/12 mx-auto mb-4">
        <BackButton />
      </div>

      {/* Heading */}
      <div className="flex items-center justify-center bg-[#303030] py-3 w-11/12 mx-auto rounded-xl">
        <h1 className="text-white font-semibold text-lg">Contact Us</h1>
      </div>

      {/* TAB BUTTONS */}
      <ul
        className="flex mb-5 list-none flex-wrap pt-4 pb-2 flex-row w-11/12 mx-auto"
        role="tablist"
      >
        <li className="mr-2 flex-auto text-center">
          <button
            role="tab"
            aria-selected={openTab === 1}
            onClick={() => setOpenTab(1)}
            className={
              "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block cursor-pointer " +
              (openTab === 1 ? "text-white bg-black" : "text-gray-200 bg-white")
            }
          >
            PMC Office
          </button>
        </li>

        <li className="mr-2 flex-auto text-center">
          <button
            role="tab"
            aria-selected={openTab === 3}
            onClick={() => setOpenTab(3)}
            className={
              "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block cursor-pointer " +
              (openTab === 3 ? "text-white bg-black" : "text-gray-600 bg-white")
            }
          >
            Telephone Directory
          </button>
        </li>
      </ul>

      {/* TAB CONTENT */}
      <div className="relative flex flex-col w-11/12 mx-auto mb-10 shadow-lg rounded bg-white/10 backdrop-blur-xl p-6">
        <div className={openTab === 1 ? "block" : "hidden"}>
          {/* PMC OFFICE TABLE */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left bg-white border rounded-lg">
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 font-bold border-r">Address</td>
                  <td className="px-3 font-bold">:</td>
                  <td className="px-6 py-4 font-bold">
                    PMC Main Building, Near Mangla Theatre, Shivajinagar, Pune-411005
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 font-bold border-r">PMC Contact No.</td>
                  <td className="px-3 font-bold">:</td>
                  <td className="px-6 py-4 font-bold">020-25501000</td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 font-bold border-r">PMC Security Contact</td>
                  <td className="px-3 font-bold">:</td>
                  <td className="px-6 py-4 font-bold">020-25501130</td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 font-bold border-r">Municipal Mayor Fax</td>
                  <td className="px-3 font-bold">:</td>
                  <td className="px-6 py-4 font-bold">020-25501012</td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 font-bold border-r">PMC Fax No.</td>
                  <td className="px-3 font-bold">:</td>
                  <td className="px-6 py-4 font-bold">020-25501104</td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-bold border-r">Email</td>
                  <td className="px-3 font-bold">:</td>
                  <td className="px-6 py-4 font-bold text-blue-700 underline">
                    <a href="mailto:info@punecorporation.org">info@punecorporation.org</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TELEPHONE DIRECTORY */}
        <div className={openTab === 3 ? "block" : "hidden"}>
          <div className="grid gap-6 mt-6 lg:grid-cols-4 md:grid-cols-2">
            {contacts.map((item, index) => (
              <div
                key={index}
                className="bg-white/20 border border-white/20 rounded-lg shadow-lg overflow-hidden backdrop-blur-xl"
              >
                <img className="object-cover w-full h-48" src={item.img} alt="contact" />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                  <p className="text-gray-200 mt-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <Tabs color="black" />
      <Footer />
    </>
  );
}
