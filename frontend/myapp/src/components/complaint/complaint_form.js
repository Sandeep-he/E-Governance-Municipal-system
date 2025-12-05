import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUpload } from "react-icons/fi"
import { UserContext } from '../context'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function Complaint() {

    const { value } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!value.exists) navigate('/login')
        if (value.exists && value.type === 'employee') {
            toast.error("Please login as a citizen")
            setTimeout(() => navigate('/'), 1000)
        }
    }, [value])

    const [image, setImage] = useState({ preview: "logo.png" })
    const [form, setForm] = useState({
        department: '',
        description: '',
        location: '',
        problemImage: "logo.png",
        user: value.user_id,
        ward: ''
    })

    const fileRef = useRef(null)

    const onFileChange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ preview: reader.result })
                setForm(prev => ({ ...prev, problemImage: reader.result }))
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const submitComplaint = () => {
        if (!form.department || !form.description || !form.location) {
            toast.error("Please fill all fields")
            return
        }

        axios.post('/complaint', form)
            .then(res => {
                navigate('/success', { state: { complaintInfo: res.data.value } })
            })
            .catch(err => console.log(err))
    }

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-20 flex justify-center"
            style={{ backgroundImage: "url('/loginpage2.png')" }}
        >
            <Toaster />

            {/* GLASS PANEL */}
            <div className="
                w-11/12 md:w-3/5 p-10 rounded-2xl
                bg-white/10 backdrop-blur-xl
                shadow-2xl border border-white/20
                text-white flex flex-col gap-7 animate-fadeIn
            ">

                <h1 className="text-3xl font-bold text-center border-b border-white/30 pb-4">
                    Register Complaint
                </h1>

                {/* SHARED DROPDOWN STYLE */}
                {/** Use this class for each <select> */}
                {/** bg-black/40 + text-white ensures visibility */}

                {/* Department */}
                <select
                    name="department"
                    value={form.department}
                    onChange={e => setForm({ ...form, department: e.target.value })}
                    className="
                        w-full h-12 px-4 rounded-md 
                        bg-black/40 text-white 
                        border border-white/20 
                        backdrop-blur-md
                        focus:outline-none focus:ring-2 focus:ring-yellow-300
                        hover:bg-black/50 transition
                    "
                >
                    <option className="text-black" value="">-- Select Department --</option>
                    <option className="text-black" value="Water Department">Water Department</option>
                    <option className="text-black" value="Power Supply Department">Power Supply Department</option>
                    <option className="text-black" value="Road Management Department">Road Management Department</option>
                    <option className="text-black" value="Garbage and Sewage Management">
                        Garbage & Sewage Management
                    </option>
                </select>

                {/* Description */}
                <textarea
                    name="description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Problem Description"
                    className="
                        w-full h-24 px-4 py-2 rounded-md 
                        bg-black/30 text-white border border-white/20
                        backdrop-blur-md focus:ring-2 focus:ring-yellow-300
                    "
                />

                {/* Location */}
                <textarea
                    name="location"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="Location of Problem"
                    className="
                        w-full h-20 px-4 py-2 rounded-md 
                        bg-black/30 text-white border border-white/20
                        backdrop-blur-md focus:ring-2 focus:ring-yellow-300
                    "
                />

                {/* Ward */}
                <select
                    name="ward"
                    value={form.ward}
                    onChange={e => setForm({ ...form, ward: e.target.value })}
                    className="
                        w-full h-12 px-4 rounded-md 
                        bg-black/40 text-white 
                        border border-white/20 
                        backdrop-blur-md
                        focus:outline-none focus:ring-2 focus:ring-yellow-300
                        hover:bg-black/50 transition
                    "
                >
                    <option className="text-black" value="">-- Select Ward --</option>
                    <option className="text-black" value="25111">Hadapsar-Mundhwa</option>
                    <option className="text-black" value="35111">Sinhgad</option>
                    <option className="text-black" value="55111">Kondhwa</option>
                    <option className="text-black" value="25666">Kothrud-Bawdhan</option>
                    <option className="text-black" value="12554">Warje-Karvenagar</option>
                    <option className="text-black" value="98986">Shivajinagar</option>
                    <option className="text-black" value="14563">Wanawadi-Ramtekadi</option>
                    <option className="text-black" value="25896">Dhankawadi-Sahakar Nagar</option>
                    <option className="text-black" value="35795">Bibwewadi</option>
                </select>

                {/* IMAGE PREVIEW */}
                <div className="w-full bg-white/10 p-4 rounded-lg border border-white/20">
                    <div className="w-full flex justify-center">
                        <img
                            src={image.preview}
                            alt="preview"
                            className="rounded-lg border-2 border-white/30 h-[250px]"
                        />
                    </div>
                </div>

                {/* Upload Image Button */}
                <div
                    onClick={() => fileRef.current.click()}
                    className="
                        cursor-pointer flex justify-center items-center gap-3 
                        w-2/5 mx-auto py-3
                        rounded-xl bg-black/40 border border-white/20
                        hover:bg-black/60 transition backdrop-blur-md
                    "
                >
                    <FiUpload className="text-xl" />
                    Upload Problem Image
                </div>

                <input
                    type="file"
                    ref={fileRef}
                    onChange={onFileChange}
                    className="hidden"
                />

                {/* Submit */}
                <button
                    onClick={submitComplaint}
                    className="
                        w-2/5 mx-auto h-12 
                        bg-gradient-to-r from-blue-500 to-purple-600
                        rounded-lg text-white font-semibold
                        hover:opacity-90 shadow-xl
                        transition
                    "
                >
                    Submit
                </button>

            </div>
        </div>
    )
}
