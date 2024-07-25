import { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { generate } from 'random-words';

import '../styles/scrollbar.css';

const Search = () => {
  const [content, setContent] = useState('Search');
  const { tasks, setSearchedTasks } = useContext(TaskContext);

  const onChange = (e) => {
    const value = e.target.value;
    setContent(value);

    setSearchedTasks(
      tasks.filter((task) => {
        console.log(task.name);
        return task.name.includes(value);
      }),
    );
  };

  return (
    <input
      className='w-[50%] text-[1rem] p-1 border-solid'
      onChange={onChange}
      onFocus={() => {
        setContent('');
        setSearchedTasks('');
      }}
      onBlur={(e) => {
        if (e.target.value === '') setContent('Search');
      }}
      value={content}
    ></input>
  );
};

const getRestrictedString = (string, N) => {};

const Task = ({ id, name, description, days, time, deleteTask, isLast }) => {
  return (
    <div
      className={`flex gap-2 p-2 ${
        !isLast ? 'border-solid border-t-0 border-x-0' : ''
      } hover:bg-slate-50 hover:cursor-pointer text-[1.2rem]`}
    >
      <div className='w-[80%]'>
        <h3 className='m-0 text-gray-500 border-solid border-t-0 border-x-0 border-red-400 border'>
          {name}
        </h3>
        <p className='text-[12px] h-[2rem] overflow-hidden'>{description}</p>
      </div>
      <div className='w-[10%] border-solid'></div>
    </div>
  );
};

const Tasks = () => {
  const { tasks, setTasks, searchedTasks, setSearchedTasks } =
    useContext(TaskContext);

  console.log(searchedTasks);
  const tasksToDisplay = searchedTasks.length ? searchedTasks : tasks;
  const deleteTask = () => {};

  return (
    <div className='overflow-hidden overflow-y-scroll scrollbar-thin box-border rounded-lg w-[80%] h-[20rem] border-solid'>
      {tasksToDisplay.map((task, idx) => (
        <Task
          id={idx}
          name={task.name}
          description={task.description}
          days={task.days}
          time={task.time}
          deleteTask={deleteTask}
          isLast={idx + 1 === tasksToDisplay.length}
        />
      ))}
    </div>
  );
};

// components relating to adding/editing tasks
const TaskModal = ({ operation }) => {};
const TaskViewScreen = ({ operation }) => {};

const AddTaskButton = () => {};

const TodoApp = () => {
  // [{ name, description, days, time }, ...]
  const [tasks, setTasks] = useState(() => {
    let tasks = [];
    for (let i = 0; i <= 10; i++) {
      tasks.push({
        name: generate(2).join(' '),
        description: generate({ min: 5, max: 10 }).join(' '),
        days: [],
        time: '',
      });
    }
    return tasks;
  });
  const [searchedTasks, setSearchedTasks] = useState([]);

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, searchedTasks, setSearchedTasks }}
    >
      <div className='flex flex-col justify-center gap-2 items-center mx-auto w-[30rem] h-screen'>
        <Search />
        <Tasks />
        <AddTaskButton />
      </div>
    </TaskContext.Provider>
  );
};

export default TodoApp;
