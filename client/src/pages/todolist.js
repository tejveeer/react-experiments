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
        console.log(task.title);
        return task.title.includes(value);
      }),
    );
  };

  return (
    <input
      className='focus:border-blue-500 focus:outline-double outline-none w-[50%] border-solid p-1 text-[1rem] enabled:rounded-none'
      onChange={onChange}
      placeholder='Search'
    ></input>
  );
};

const getRestrictedString = (string, N) => {};

const Task = ({
  id,
  title,
  description,
  days,
  time,
  repeating,
  deleteTask,
  isLast,
  taskLength,
}) => {
  const { setOperation, setLoadViewingScreen } = useContext(TaskContext);

  const addBottomBorder = !isLast || (isLast && taskLength <= 3);
  const onDoubleClick = () => {
    setLoadViewingScreen(true);
    setOperation({
      type: 'edit',
      props: {
        id,
        title,
        description,
        days,
        time,
        repeating,
      },
    });
  };

  return (
    <div
      className={`flex gap-2 p-2 ${
        addBottomBorder ? 'border-x-0 border-t-0 border-solid' : ''
      } text-[1.2rem] hover:cursor-pointer hover:bg-slate-50`}
      onDoubleClick={onDoubleClick}
    >
      <div className='w-[80%]'>
        <h3 className='m-0 border border-x-0 border-t-0 border-solid border-red-400 text-gray-500'>
          {title}
        </h3>
        <p className='h-[2rem] text-[12px]'>{description}</p>
      </div>
      <div className='grid w-[10%] grid-cols-2 p-1 text-[0.7rem] font-bold'>
        {['M', 'T', 'W', 'Th', 'F', 'S', 'Su'].map((day, idx) => {
          const color = days[idx] ? 'text-green-500' : 'text-red-500';
          if (idx !== 6) {
            return <div className={color}>{day}</div>;
          }
          return <div className={`${color} col-span-2 text-center`}>{day}</div>;
        })}
      </div>
      <div className='relative flex h-[20px] w-[20px] items-center justify-center self-center rounded-[50%] bg-red-400 hover:bg-red-500'>
        <div className='h-[3px] w-[70%] bg-white'></div>
      </div>
    </div>
  );
};

const Tasks = () => {
  const { tasks, setTasks, searchedTasks, setSearchedTasks } =
    useContext(TaskContext);

  const tasksToDisplay = searchedTasks.length !== 0 ? searchedTasks : tasks;
  // implement this when the db is setup; need id to delete
  const deleteTask = (id) => {};

  return (
    <div className='overflow scrollbar-thin box-border h-[25.3rem] w-[80%] overflow-y-scroll rounded-lg border-solid'>
      {tasksToDisplay.map((task, idx) => (
        <Task
          id={idx}
          title={task.title}
          description={task.description}
          days={task.days}
          time={task.time}
          repeating={task.repeating}
          deleteTask={deleteTask}
          isLast={idx + 1 === tasksToDisplay.length}
          taskLength={tasksToDisplay.length}
        />
      ))}
    </div>
  );
};

// components relating to adding/editing tasks
const TaskViewScreen = () => {
  const { operation, setLoadViewingScreen } = useContext(TaskContext);
  const setFromOperation = (key, def) => () => operation.props[key] || def;

  const [title, setTitle] = useState(setFromOperation('title', ''));
  const [description, setDescription] = useState(
    setFromOperation('description', ''),
  );
  const [days, setDays] = useState(
    setFromOperation('days', [false, false, false, false, false, false, false]),
  );
  const [time, setTime] = useState(setFromOperation('time', ''));
  const [repeating, setRepeating] = useState(
    setFromOperation('repeating', false),
  );

  return (
    // here
    <div className='flex flex-col justify-center items-center absolute h-screen w-screen backdrop-blur-[30px]'>
      <div
        className='absolute h-screen w-screen'
        onClick={() => setLoadViewingScreen(false)}
      ></div>
      <div className='flex flex-col gap-2 p-6 rounded-sm z-10 bg-slate-300'>
        <input
          spellcheck='false'
          className='border-solid border-transparent focus:border-solid focus:border-blue-500 text-[1rem] p-1 rounded-md text-slate-500 font-bold outline-none'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <textarea
          spellcheck='false'
          className='p-2 rounded-md border-none resize-none outline-none h-[10rem]'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className='flex self-center'>
          {['M', 'T', 'W', 'Th', 'F', 'S', 'Su'].map((day, idx) => (
            <div className='flex flex-column justify-center max-w-min flex-wrap'>
              <input
                type='checkbox'
                onChange={() => {
                  let newDays = [...days];
                  newDays[idx] = !days[idx];
                  setDays(newDays);
                }}
                checked={days[idx]}
              ></input>
              <div className='text-[14px] font-mono'>{day}</div>
            </div>
          ))}
        </div>
        <div className='self-center'>
          <div>
            <button
              className={`p-[0.37rem] ${repeating ? 'bg-slate-400' : 'bg-white'} hover:bg-slate-200 font-bold rounded-l-full border-none`}
              onClick={() => setRepeating(!repeating)}
            >
              R
            </button>
            <input
              type='time'
              className='p-1 rounded-r-full border-none border-gray-300 focus:outline-none focus:ring-blue-500'
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>
        </div>
      </div>
      <button className='relative border-none rounded-md bg-orange-300 hover:bg-orange-400 cursor-pointer text-white font-bold w-[4rem] p-1 right-[6.5rem] top-2 z-10'>
        {operation.type[0].toUpperCase() + operation.type.substr(1)}
      </button>
    </div>
  );
};

const AddTaskButton = () => {
  const { setLoadViewingScreen, setOperation } = useContext(TaskContext);

  return (
    <div
      className='relative right-[11rem] flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-green-400 hover:cursor-pointer hover:bg-green-500'
      onClick={() => {
        setLoadViewingScreen(true);
        setOperation({
          type: 'add',
          props: {},
        });
      }}
    >
      <div className='h-[15%] w-[60%] bg-white'></div>
      <div className='absolute h-[15%] w-[60%] rotate-90 bg-white'></div>
    </div>
  );
};

const choose = (choices) => {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

const TodoApp = () => {
  // [{ title, description, days, time }, ...]
  const [tasks, setTasks] = useState(() => {
    let tasks = [];
    for (let i = 0; i < 5; i++) {
      tasks.push({
        title: generate(2).join(' '),
        description: generate({ min: 5, max: 10 }).join(' '),
        days: Array(7)
          .fill(null)
          .map(() => choose([true, false])),
        time: '09:00',
        repeating: choose([true, false]),
      });
    }
    return tasks;
  });
  const [searchedTasks, setSearchedTasks] = useState([]);
  const [loadViewingScreen, setLoadViewingScreen] = useState(false);
  const [operation, setOperation] = useState({
    type: null,
    props: {},
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        searchedTasks,
        setSearchedTasks,
        setLoadViewingScreen,
        operation,
        setOperation,
      }}
    >
      <div className='mx-auto flex h-screen w-[30rem] flex-col items-center justify-center gap-2'>
        <Search />
        <Tasks />
        <AddTaskButton />
        {loadViewingScreen && <TaskViewScreen />}
      </div>
    </TaskContext.Provider>
  );
};

export default TodoApp;
