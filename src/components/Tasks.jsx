import { useEffect, useState } from "react";
import socket from "../components/Socket";
import TasksCard from "../components/TasksCard";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Tasks = () => {
  const [getTasks, setGetTasks] = useState([]);
  const categories = ["To-Do", "In-Progress", "Done"];

  // Enable drag and drop support for both desktop (mouse) and mobile (touch)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Mouse drag starts after moving 5px
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }) // Touch drag starts after 200ms hold
  );

  useEffect(() => {
    // Request tasks from server
    socket.emit("getting_task");

    socket.on("task_data", (data) => {
      setGetTasks(data.tasks);
    });

    socket.on("task_updated", (updatedTask) => {
      setGetTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket.on("task_deleted", (taskId) => {
      setGetTasks((prev) => prev.filter((t) => t._id !== taskId));
    });

    return () => {
      socket.off("task_data");
      socket.off("getting_task");
      socket.off("task_updated");
      socket.off("task_deleted");
    };
  }, []);

  // Handle drag event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTask = getTasks.find((t) => t._id === active.id);
    const targetCategory = over.data.current?.sortable?.containerId || over.id;

    if (draggedTask.category !== targetCategory) {
      const updatedTask = { ...draggedTask, category: targetCategory };

      // Optimistic UI update
      setGetTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );

      // Send update to server
      socket.emit("update_task", updatedTask);
    }
  };

  // Filter tasks by category
  const getFilteredTasks = (category) => {
    return getTasks.filter((task) => task.category === category);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {categories.map((category) => (
          <div
            key={category}
            id={category}
            className="border h-[400px] p-4 my-2 overflow-y-auto rounded-lg shadow-md bg-white"
          >
            <h2 className="font-bold text-xl mb-4 text-center">{category}</h2>

            <SortableContext
              id={category}
              items={getFilteredTasks(category).map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              {getFilteredTasks(category).length > 0 ? (
                getFilteredTasks(category).map((task) => (
                  <TasksCard key={task._id} task={task} />
                ))
              ) : (
                <p className="text-gray-500 text-center">No tasks available</p>
              )}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Tasks;
