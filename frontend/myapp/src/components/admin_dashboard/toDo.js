import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { BsListTask } from "react-icons/bs";
import { GiCrossMark } from "react-icons/gi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ToDo(props) {
  const getTime = () => {
    const newDate = new Date();
    return newDate.toISOString().slice(0, 19).replace("T", " ");
  };

  const comment_time = getTime();
  const estimatedDate = comment_time.slice(0, 10);

  const [empList, setEmpList] = useState([]);

  const [form, setForm] = useState({
    id: props.description.complaint_number,
    estimatedDate: estimatedDate,
    empAssigned: "Not Assigned",
    empId: props.adminId,
    comment_time: comment_time,
  });

  const [form2, setForm2] = useState({
    id: props.description.complaint_number,
    commentTime: comment_time,
    comment: "",
    empId: props.adminId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChange2 = (e) => {
    setForm2({ ...form2, comment: e.target.value });
  };

  const submitComment = async () => {
    try {
      const res = await axios.post("/complaint/addcomment", form2);
      if (res.status === 200 && res.data.commentCreated) {
        toast.success("Comment added!");
        setForm2({ ...form2, comment: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitData = (e) => {
    if (e.key === "Enter") {
      const t = getTime();
      setForm2((prev) => ({ ...prev, commentTime: t }));
      submitComment();
    }
  };

  const getEmp = async () => {
    const deptName = props.description.complaint_type;

    try {
      const res = await axios.get(
        `/employee/getEmpByDept/${encodeURIComponent(deptName)}`
      );
      setEmpList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  const updateComplaintWithEmp = async () => {
    try {
      const res = await axios.post("/complaint/updateEmpDate", form);
      if (res.status === 200) toast.success("Task Assigned Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (form.empAssigned !== "Not Assigned") {
      const t = getTime();
      setForm({ ...form, comment_time: t });
      updateComplaintWithEmp();
    }
  }, [form.empAssigned, form.estimatedDate]);

  return (
    <div
      className={`
        bg-[#303030] w-full h-max p-4 rounded-xl shadow-md shadow-black 
        hover:bg-gray-800 transition
        ${
          props.isdraggable && props.description.id === props.dragid
            ? "opacity-50"
            : "opacity-100"
        }
        overflow-visible relative z-50
      `}
    >
      <Toaster />

      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row items-center gap-4">
          {props.column === "To Do" && <BsListTask className="text-lg text-blue-400" />}
          {props.column === "Done" && <MdCheckCircle className="text-lg text-green-400" />}
          {props.column === "In Progress" && <CgSandClock className="text-lg text-yellow-400" />}
          {props.column === "Rejected" && <GiCrossMark className="text-lg text-red-800" />}
          <h1 className="text-white text-sm">{props.description.complaint_type}</h1>
        </div>

        <h1 className="text-white text-xs py-1 px-2 rounded-xl bg-[#697d36]">
          {props.description.complaint_description}
        </h1>

        <h1 className="text-white text-xs py-1 px-2 rounded-xl bg-[#0a5d83]">
          CUId: {props.description.complaint_number}
        </h1>

        <div className="flex gap-3">
          <h1 className="text-white text-xs py-1 px-2 rounded-xl bg-[#c87070]">
            {props.description.priority ?? "Low"}
          </h1>
          <h1 className="text-white text-xs py-1 px-2 rounded-xl bg-[#2d5585]">
            {props.description.estimated_time === null
              ? "ET: TBA"
              : `ET: ${props.description.estimated_time.slice(0, 10)}`}
          </h1>
        </div>

        {props.description.estimated_time === null &&
          props.description.empAssignedId === null && (
            <div className="w-full relative z-50">
              <select
                name="empAssigned"
                onChange={handleChange}
                value={form.empAssigned}
                className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300"
              >
                <option>Select Employee</option>
                {empList?.map((emp, index) => (
                  <option key={index} value={emp.ssn}>
                    {emp.employee_name}
                  </option>
                ))}
              </select>
            </div>
          )}

        <div className="flex gap-2 w-full">
          <h1 className="text-white text-xs py-1 px-2 rounded-xl bg-[#85462d] w-5/12">
            RD: {props.description.registration_date.slice(0, 10)}
          </h1>

          {props.description.empAssignedId &&
            props.description.estimated_time && (
              <h1 className="text-white text-xs py-1 px-2 rounded-xl bg-[#655a0b] w-6/12">
                EmpId: {props.description.empAssignedId}
              </h1>
            )}

          {props.description.estimated_time === null &&
            props.description.empAssignedId === null && (
              <input
                name="estimatedDate"
                type="date"
                min={form.estimatedDate}
                onChange={handleChange}
                value={form.estimatedDate}
                className="rounded-lg px-2 w-6/12 bg-black/40 text-white border"
              />
            )}
        </div>

        <input
          type="text"
          name="comment"
          value={form2.comment}
          onKeyDown={submitData}
          onChange={handleChange2}
          placeholder="Write a note"
          className="w-11/12 px-3 py-1 rounded-xl bg-[#2d5585] text-white text-xs outline-none"
        />
      </div>
    </div>
  );
}
