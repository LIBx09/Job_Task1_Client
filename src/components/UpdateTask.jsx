/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import socket from "../components/Socket"; // Import socket for emitting events
import { useEffect } from "react";
import { toast } from "react-toastify";

const UpdateTask = ({ task, closeModal }) => {
  // Receiving task as prop
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Populate form with existing task data when modal opens
  useEffect(() => {
    if (task) {
      reset(task); // Reset form with the task data
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    const updatedTask = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Emit updated task to the server
    socket.emit("update_task", updatedTask);
    toast.success("Task updated successfully!");
    closeModal();
  };

  useEffect(() => {
    const modal = document.getElementById("my_modal_5");
    if (modal && task) {
      modal.showModal(); // Show the modal when a task is selected
    }
  }, [task]); // Trigger whenever `task` prop changes

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                maxLength: 50,
              })}
              className="w-full border p-2 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description", { maxLength: 200 })}
              className="w-full border p-2 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                Description cannot exceed 200 characters
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full border p-2 rounded-md"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Update Task
          </button>
        </form>
        <div className="modal-action">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateTask;
