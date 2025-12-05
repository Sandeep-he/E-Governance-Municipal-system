import React, { useState, useEffect, useContext } from "react";
import ToDo from "./toDo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { UserContext } from "../context";
import toast from "react-hot-toast";
const axios = require("axios");

export default function AdminDashBody() {
  const [toDoData, setToDoData] = useState([]);
  const [inProgressData, setInProgressData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragId, setDragId] = useState("");
  const [adminId, setAdminId] = useState("");

  const { value } = useContext(UserContext);

  const [state, setState] = useState({
    toDo: { title: "To Do", items: [] },
    inProgress: { title: "In Progress", items: [] },
    done: { title: "Done", items: [] },
    rejected: { title: "Rejected", items: [] },
  });

  const getAllData = async () => {
    await axios
      .get("/complaint/getallcomplaints")
      .then((response) => {
        setLoading(true);

        response.data?.map((data) => {
          if (data.complaint_status === "Pending") setToDoData((a) => [...a, data]);
          else if (data.complaint_status === "Resolved") setDoneData((a) => [...a, data]);
          else if (data.complaint_status === "Working") setInProgressData((a) => [...a, data]);
          else if (data.complaint_status === "Rejected") setRejectedData((a) => [...a, data]);
        });

        setState((s) => ({ ...s, toDo: { title: "To Do", items: toDoData } }));
        setState((s) => ({ ...s, inProgress: { title: "In Progress", items: inProgressData } }));
        setState((s) => ({ ...s, done: { title: "Done", items: doneData } }));
        setState((s) => ({ ...s, rejected: { title: "Rejected", items: rejectedData } }));

        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllData();
    if (value.exists === true && value.type === "admin") setAdminId(value.user_id);
  }, [loading]);

  useEffect(() => {
    if (
      state.toDo.items.length === 0 &&
      state.done.items.length === 0 &&
      state.inProgress.items.length === 0 &&
      state.rejected.items.length === 0
    )
      setLoading(true);
    else setLoading(false);
  }, []);

  function handleOnDragEnd({ destination, source }) {
    setIsDragging(false);

    if (
      source.droppableId === "done" ||
      source.droppableId === "inProgress" ||
      destination.droppableId === "done" ||
      destination.droppableId === "inProgress"
    ) {
      toast.error("Not Allowed");
      return;
    }

    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;

    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
      return prev;
    });

    var stamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    if (destination.droppableId === "toDo")
      updateComplaintStatus({ id: dragId, status: "Pending", empId: adminId, commentTime: stamp });
    else if (destination.droppableId === "rejected")
      updateComplaintStatus({ id: dragId, status: "Rejected", empId: adminId, commentTime: stamp });
  }

  const updateComplaintStatus = async (data) => {
    try {
      const res = await axios.post("/complaint/updatecomplaint", data);

      if (res.status === 200 && res.data.value.updated && res.data.value2.commentCreated) {
        setDoneData([]);
        setInProgressData([]);
        setToDoData([]);
        setRejectedData([]);
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleOnDragStart(e) {
    setIsDragging(true);
    setDragId(e.draggableId);
  }

  return (
    <div className="w-full min-h-[740px] bg-[#171717]">
      <div className="container mx-auto mt-6 py-2">
        {!loading && (
          <div className="flex flex-row items-start justify-between mt-4 w-11/12 mx-auto">
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
              {_.map(state, (data, key) => (
                <div
                  key={key}
                  className="flex flex-col items-start justify-start w-1/4 px-6 overflow-visible relative z-20 py-4 min-h-[500px]"
                >
                  <h1 className="font-[Poppins] text-white text-lg py-2">{data.title}</h1>

                  <Droppable droppableId={key}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="w-full overflow-visible relative z-30"
                      >
                        {data.items?.map((el, index) => (
                          <Draggable
                            key={el.complaint_number.toString()}
                            index={index}
                            draggableId={el.complaint_number.toString()}
                          >
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                className="py-2 overflow-visible relative"
                              >
                                <ToDo
                                  description={el}
                                  isdraggable={isDragging}
                                  dragid={dragId}
                                  column={data.title}
                                  adminId={adminId}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
}
