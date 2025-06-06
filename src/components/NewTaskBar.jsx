import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import DeleteAllTasks from "./DeleteAllTasks";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
// import styles from "@/styles/NewTaskBar.module.css"

function NewTaskBar({nextTaskKey, setNextTaskKey, setTaskList}){
  const [newTask, setNewTask] = useState({
    taskName:'',
    expectedCycles: 1
  });
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  // const [delteAllTasks, setDeleteAllTasks] = useState(false);

  const taskVerification = () => {
  // check new task description is not empty
    if (newTask.taskName.length > 0){
      setTaskList((prevTaskList) => ([
        ...prevTaskList, {
          key: nextTaskKey,
          taskName: newTask.taskName,
          expectedCycles: Number(newTask.expectedCycles),
          actualTime: 0,
          finished: false
        }
      ]))
      setNextTaskKey(nextTaskKey+1)
    }
    else {
      setShowErrorMsg(true)
    }
    setNewTask({
      taskName:'',
      expectedCycles: 1
    })
  }

  // const deleteAllTask = ()=>{
  //   setTaskList([])
  //   setNewTask({
  //     taskName:'',
  //     expectedCycles: 1
  //   })
  // }

  return(
    <div>
      {showErrorMsg && <ErrorMessage setShowErrorMsg={setShowErrorMsg} />}
      <div id='newTaskBar'>
        <input id='newTaskDesc' type="text" value={newTask.taskName} onChange={
          (e) => 
            setNewTask((prevState) => ({
              ...prevState,
              taskName: e.target.value
            }))
          }
        />
        <input id='taskCycle' type="number" value={newTask.expectedCycles} min='1' onChange={
          (e) => 
            setNewTask((prevState) => ({
              ...prevState,
              expectedCycles: e.target.value
            }))
        }/>
        <IoMdAdd className='taskButton' onClick={() => taskVerification()}/>
        {showDeleteAll && <DeleteAllTasks setShowDeleteAll={setShowDeleteAll} setTaskList={setTaskList} setNewTask={setNewTask} />}
          <MdDeleteOutline className='taskButton' onClick={() => setShowDeleteAll(true)}/>
      </div>
    </div>
  );
}

export default NewTaskBar;