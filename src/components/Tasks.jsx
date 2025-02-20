import { useEffect, useState } from "react";
import socket from "../components/Socket";
import TasksCard from "../components/TasksCard";

const Tasks = () => {
  const [getTasks, setGetTasks] = useState([]);

  useEffect(() => {
    socket.emit("getting_task");

    socket.on("task_data", (data) => {
      setGetTasks(data.tasks);
    });

    socket.on("task_added", (task) => {
      setGetTasks((prevTasks) => [...prevTasks, task]);
    });

    // Listen for deleted task event
    socket.on("task_deleted", (taskId) => {
      console.log(`Task deleted: ${taskId}`);
      setGetTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    });

    return () => {
      socket.off("task_data");
      socket.off("task_added");
      socket.off("task_deleted");
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="border h-[400px] p-4 my-2 overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">To-Do</h2>
        {getTasks.length > 0 ? (
          getTasks.map((task) => <TasksCard key={task._id} task={task} />)
        ) : (
          <p>No tasks available</p>
        )}
      </div>

      <div className="border h-[400px] p-4 my-2 overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">In-Process</h2>
      </div>

      <div className="border h-[400px] p-4 my-2 overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">Done</h2>
      </div>
    </div>
  );
};

export default Tasks;
