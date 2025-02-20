import { useForm } from "react-hook-form";
import socket from "../components/Socket";
import { toast } from "react-toastify";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const task = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Emit event to the server
    socket.emit("add_task", task);

    // Optional: Show success notification
    toast.success("Task added successfully!");

    // Reset the form
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Task</h2>
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
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In Progress</option>
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
