import { useEffect, useState } from "react";
import socket from "../components/Socket";
import TasksCard from "../components/TasksCard";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Tasks = () => {
  const [getTasks, setGetTasks] = useState([]);
  const categories = ["To-Do", "In-Progress", "Done"];

  useEffect(() => {
    socket.emit("getting_task");

    socket.on("task_data", (data) => {
      setGetTasks(data.tasks);
    });

    // ... keep other socket listeners the same ...

    return () => {
      // ... keep cleanup the same ...
    };
  }, []);

  // Fixed drag handler
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

      // Update server
      socket.emit("update_task", updatedTask);
    }
  };

  // Filter tasks by category
  const getFilteredTasks = (category) => {
    return getTasks.filter((task) => task.category === category);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {categories.map((category) => (
          <div
            key={category}
            id={category}
            className="border h-[400px] p-4 my-2 overflow-y-auto"
          >
            <h2 className="font-bold text-xl mb-4">{category}</h2>

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
                <p>No tasks available in {category}</p>
              )}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Tasks;
