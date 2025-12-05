import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';

export default function WorkerSignup() {

    let initialImage = {
        employeeProfileImage: "logo.png"
    };

    const [image, setImage] = useState(initialImage);
    const [form, setForm] = useState({
        name: '',
        designation: '',
        address: '',
        contactNum: '',
        password: '',
        confirmPassword: '',
        department: '',
        profileImage: initialImage.employeeProfileImage
    });

    const [valid, setValid] = useState({
        contact: true,
        password: true,
        confirmPassword: true,
        designation: true,
        department: true
    });

    const [message, setMessage] = useState({ msg: '' });
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate();
    const inputFileRef = useRef(null);

    // ----------------------- REGISTER EMPLOYEE -----------------------
    async function regEmployee() {
        try {
            const response = await axios.post('/employee/register', form);
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ----------------------- IMAGE UPLOAD -----------------------
    const onFilechange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ employeeProfileImage: reader.result });
                setForm(f => ({ ...f, profileImage: reader.result }));
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const onBtnClick = () => inputFileRef.current.click();

    // ----------------------- HANDLE INPUT -----------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // ----------------------- SUBMIT FORM -----------------------
    const submitForm = () => {
        let ok = true;

        if (form.contactNum.length !== 10) {
            ok = false;
            setValid(v => ({ ...v, contact: false }));
            setMessage({ msg: "Invalid Contact Number" });
        } else {
            setValid(v => ({ ...v, contact: true }));
        }

        if (form.designation === "select") {
            ok = false;
            setValid(v => ({ ...v, designation: false }));
            setMessage({ msg: "Please Select Designation" });
        } else {
            setValid(v => ({ ...v, designation: true }));
        }

        if (form.designation === "employee" && form.department === "select") {
            ok = false;
            setValid(v => ({ ...v, department: false }));
            setMessage({ msg: "Please Select Department" });
        } else {
            setValid(v => ({ ...v, department: true }));
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/;

        if (!passwordRegex.test(form.password)) {
            ok = false;
            setValid(v => ({ ...v, password: false, confirmPassword: false }));
            setMessage({ msg: "Invalid Password Format" });
        }

        if (passwordRegex.test(form.password) && form.password !== form.confirmPassword) {
            ok = false;
            setValid(v => ({ ...v, confirmPassword: false }));
            setMessage({ msg: "Passwords Don't Match" });
        }

        if (ok) {
            setSubmit(true);
            setMessage({ msg: "" });
            regEmployee();
        } else {
            setSubmit(false);
        }
    };

    // ----------------------- UI -----------------------
    return (
        <div
            className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: "url('/loginpage2.png')" }}
        >

            <div className="w-1/3 bg-[#000000a8] backdrop-blur-xl rounded-2xl shadow-2xl p-8">

                <h1 className="text-center text-white text-2xl font-bold mb-4 border-b border-gray-600 pb-2">
                    Register Employee
                </h1>

                {/* Error OR Empty */}
                <div className="text-red-400 text-center mb-2 h-5 text-sm font-semibold">
                    {!submit && message.msg}
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4">

                    {/* Name */}
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Name"
                        className="input-box"
                    />

                    {/* Designation */}
                    <select
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        className="input-box"
                    >
                        <option value="select">Select Designation</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Address */}
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="input-box h-20"
                    />

                    {/* Contact */}
                    <input
                        name="contactNum"
                        value={form.contactNum}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Contact Number"
                        className={`input-box ${valid.contact ? "" : "border-red-500"}`}
                    />

                    {/* Department */}
                    {form.designation === "employee" && (
                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className={`input-box ${valid.department ? "" : "border-red-500"}`}
                        >
                            <option value="select">Select Department</option>
                            <option value="99">Garbage and Sewage</option>
                            <option value="35">Power Supply</option>
                            <option value="55">Road Management</option>
                            <option value="25">Water Department</option>
                        </select>
                    )}

                    {/* Password */}
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        className={`input-box ${valid.password ? "" : "border-red-500"}`}
                    />

                    {/* Confirm Password */}
                    <input
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        placeholder="Confirm Password"
                        className={`input-box ${valid.confirmPassword ? "" : "border-red-500"}`}
                    />

                    {/* Image Upload */}
                    <div className="text-center">
                        <img
                            src={image.employeeProfileImage}
                            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                        />

                        <button
                            onClick={onBtnClick}
                            className="mt-4 bg-white text-blue-900 px-5 py-2 rounded-3xl shadow hover:bg-gray-200"
                        >
                            <FiUpload className="inline-block mr-2" />
                            Upload Profile Image
                        </button>

                        <input
                            type="file"
                            ref={inputFileRef}
                            onChange={onFilechange}
                            className="hidden"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={submitForm}
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition"
                    >
                        Submit
                    </button>

                    {/* Login Link */}
                    <p
                        className="text-center text-white mt-2 underline cursor-pointer"
                        onClick={() => navigate('/workerlogin')}
                    >
                        Already registered? Login Now!
                    </p>

                </div>

            </div>
        </div>
    );
}
