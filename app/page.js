"use client"

import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTask([...task, { title, description, isCompleted: false }]); // Add isCompleted property
    setTitle('');
    setDescription('');
  };

  const deleteHandler = (i) => {
    let copyTask = [...task];
    copyTask.splice(i, 1);
    setTask(copyTask);
  };

  const completeHandler = (i) => {
    let copyTask = [...task];
    copyTask[i].isCompleted = !copyTask[i].isCompleted; // Toggle the isCompleted state
    setTask(copyTask);
  };

  let renderTask = <h1>No available Task</h1>;
  if (task.length > 0) {
    renderTask = task.map((t, i) => {
      return (
        <div key={i} className='flex justify-center m-5'>
          <div className={`flex items-center justify-between ${t.isCompleted ? 'line-through text-green-500' : ''}`}>
            <h1>{t.title}</h1>
            <p>{t.description}</p>
          </div>
          <button
            className='bg-red-400 text-white rounded flex m-10 p-4'
            onClick={() => deleteHandler(i)}
          >
            Delete
          </button>
          <button
            className={`bg-blue-400 text-white rounded flex m-10 p-4 ${t.isCompleted ? 'bg-gray-400' : 'bg-blue-400'}`}
            onClick={() => completeHandler(i)}
          >
            {t.isCompleted ? 'Undo' : 'Complete'}
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <div>
        <h1 className='bg-gray-800 text-white font-mono flex justify-center m-3 p-10 text-6xl'>Rohan's Todo List</h1>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            className='text-2xl border-zinc-700 border-2 m-5 px-4 py-2'
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='text'
            className='text-2xl border-zinc-700 border-2 m-5 px-4 py-2'
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className='bg-red-400 text-white rounded p-2 m-5'>Add Task</button>
        </form>
        <div>
          <h1 className='bg-slate-500 text-white font-semibold'>{renderTask}</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
