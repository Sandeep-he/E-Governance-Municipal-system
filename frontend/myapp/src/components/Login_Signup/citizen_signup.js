import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function CitizenSignup() {

    const [image, setImage] = useState({
        userProfileImage: "logo.png"
    });

    const [form, setForm] = useState({
        name: '',
        address: '',
        contactNum: '',
        password: '',
        confirmPassword: '',
        profileImage: "logo.png"
    });

    const [message, setMessage] = useState({ msg: '' });
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate();
    const inputFileRef = useRef(null);

    // -------------------------
    // REGISTER USER
    // -------------------------
    async function regUser() {
        await axios.post('http://localhost:3307/user', form)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success('Successfully Signed Up!');
                    setTimeout(() => navigate('/login'), 1200);
                }
            })
            .catch(function (error) {
                console.log("Signup error:", error);
                toast.error("Error signing up");
            });
    }

    // -------------------------
    // UPLOAD IMAGE
    // -------------------------
    const onFilechange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ userProfileImage: reader.result });
                setForm({ ...form, profileImage: reader.result });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const onBtnClick = () => {
        inputFileRef.current.click();
    };

    // -------------------------
    // FORM INPUT CHANGE
    // -------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // -------------------------
    // FORM VALIDATION + SUBMIT
    // -------------------------
    const submitForm = () => {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/;

        const formIsValid =
            form.name.trim() !== "" &&
            form.address.trim() !== "" &&
            form.contactNum.length === 10 &&
            passwordRegex.test(form.password) &&
            form.password === form.confirmPassword;

        if (!formIsValid) {

            if (form.contactNum.length !== 10) {
                setMessage({ msg: "Invalid Contact Number" });
            } else if (!passwordRegex.test(form.password)) {
                setMessage({ msg: "Password must include A-Z, a-z, 0-9, and a special character" });
            } else if (form.password !== form.confirmPassword) {
                setMessage({ msg: "Passwords do not match" });
            } else {
                setMessage({ msg: "Please fill all fields" });
            }

            setSubmit(false);
            return;
        }

        setSubmit(true);
        setMessage({ msg: "" });
        regUser();
    };

    // -------------------------
    // UI
    // -------------------------
    return (
        <div
            className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/loginpage2.png')" }}
        >
            <Toaster />

            {/* GLASS CARD */}
            <div className="w-[450px] p-10 rounded-2xl 
                            backdrop-blur-xl bg-white/10 border border-white/20 
                            shadow-[0px_0px_40px_rgba(0,0,0,0.5)]
                            animate-[fadeIn_1s_ease]">

                {/* Glow Line */}
                <div className="w-full h-[3px] rounded-full mb-6 
                                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"></div>

                <h1 className="text-white text-3xl text-center font-bold drop-shadow-lg mb-4">
                    Citizen Registration
                </h1>

                {/* ERROR MESSAGE */}
                <p className="text-red-400 text-center h-5 mb-2 font-medium">
                    {!submit && message.msg}
                </p>

                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full h-12 px-4 mb-4 rounded-xl bg-white/20 text-white 
                               placeholder-gray-300 border border-white/30
                               hover:bg-white/25 focus:border-purple-400 focus:shadow-lg 
                               focus:shadow-purple-500/40 outline-none transition-all duration-300"
                />

                {/* ADDRESS */}
                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full h-20 px-4 py-2 mb-4 rounded-xl bg-white/20 text-white 
                               placeholder-gray-300 border border-white/30
                               hover:bg-white/25 focus:border-purple-400 focus:shadow-lg 
                               focus:shadow-purple-500/40 outline-none transition-all duration-300"
                />

                {/* CONTACT */}
                <input
                    type="tel"
                    name="contactNum"
                    value={form.contactNum}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    className="w-full h-12 px-4 mb-4 rounded-xl bg-white/20 text-white 
                               placeholder-gray-300 border border-white/30
                               hover:bg-white/25 focus:border-blue-400 focus:shadow-lg 
                               focus:shadow-blue-500/40 outline-none transition-all duration-300"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full h-12 px-4 mb-4 rounded-xl bg-white/20 text-white 
                               placeholder-gray-300 border border-white/30
                               hover:bg-white/25 focus:border-blue-400 focus:shadow-lg 
                               focus:shadow-blue-500/40 outline-none transition-all duration-300"
                />

                {/* CONFIRM PASSWORD */}
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full h-12 px-4 mb-4 rounded-xl bg-white/20 text-white 
                               placeholder-gray-300 border border-white/30
                               hover:bg-white/25 focus:border-blue-400 focus:shadow-lg 
                               focus:shadow-blue-500/40 outline-none transition-all duration-300"
                />

                {/* PROFILE IMAGE UPLOAD */}
                <div className="mb-6">
                    <div className="flex justify-center mb-3">
                        <img
                            src={image.userProfileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        />
                    </div>

                    <div
                        onClick={onBtnClick}
                        className="cursor-pointer flex flex-row justify-center items-center 
                                   w-full py-3 gap-3 text-white bg-gradient-to-r from-purple-600 to-blue-600
                                   rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        <FiUpload className="text-xl" />
                        <span className="font-semibold text-sm">Upload Profile Image</span>
                        <input type="file" ref={inputFileRef} onChange={onFilechange} className="hidden" />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    onClick={submitForm}
                    className="w-full h-12 text-white font-semibold rounded-xl
                               bg-gradient-to-r from-blue-600 to-purple-600
                               shadow-lg hover:shadow-purple-700/50 
                               hover:scale-[1.03] transition-all duration-300"
                >
                    Submit
                </button>

                {/* LOGIN LINK */}
                <p
                    onClick={() => navigate('/login')}
                    className="text-white text-center mt-4 cursor-pointer hover:underline underline-offset-4"
                >
                    Already registered? Login Now!
                </p>

            </div>
        </div>
    );
}
