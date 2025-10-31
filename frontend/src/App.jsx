import { useState,useEffect } from 'react';
import Tasklist from "./Component/TaskList";
import TaskForm from './Component/Form';
import './App.css'

function App() {
        //-------------- states source of truth ------
     const [tasks,setTasks]=useState([]); // to all task on UI
     const[loading,setLoading]=useState(true); // to show wahte task load flag
     const[error,setError]=useState(null);
     
     // for filtering which task to shows (all/pending/completed) 
     const [filter,setFilter] = useState("all");

     // for controling edit mode (which task will be edit)
     const[editId,setEditId] = useState(null);
    
     // for controling inputs when edit task inline
     const[editForm,setEditForm] = useState({
      title:          "",
      description:    "",
      status:         "pending" //default
     });
     
    
    
    //======Fetch helper one time from back end when app run first======

     useEffect(()=>{
      async function load()
       {
        try{
           const response = await fetch("http://localhost:8080/api/tasks");
           if(!response.ok) throw Error(`HTTP ${response.status}`);
           const data = await response.json();
           setTasks(data);
           console.log("tasks from backend", data);
console.log("statuses:", data.map(t => ({ id: t.id, status: t.status, type: typeof t.status })));

           }catch(err){
  console.error("Failed to fetch tasks..",err);
   setError("failed ..loading tasks..");
          }
          finally{
                    setLoading(false);
                    }
      }
      load();
     },[]);
// All handler
/* Toggle handler  */ 
/* const handleToggle = async(id,currentStatus)=>{
  try{
    // find task you want to toggle
    const task = tasks.find((t)=>t.id == id);
    if(!task) return;
    // decide new status to be toggle
    const updatedStatus =
           currentStatus ==="completed" ? "pending" : "completed";
           // build payload
           const payload ={
            title: task.title,
            description: task.description,
            status:updatedStatus
           };

           // send Put req to backend
           const res= await fetch(`http://localhost:8 080/api/tasks/${id}`,{
            method: "PUT",
            headers:{"Content-Type": "application/json"},
            body : JSON.stringify(payload), 
           });
           if(!res.ok) throw new Error(`HTTP ${res.status}`);
           
           // or parse response and update the state
           const updated = await res.json();
           setTasks((prev)=>prev.map((t)=>(t.id === id ? updated : t))); 
      }
      catch(e){
        console.error("Toggle failed ..",e)
        setError("Failed to Toggle task status.. ")
      }
} 
 */
/*     to add task
 */   

const handleAdd = (newTask)=>{
  setTasks((prev)=>[...prev, newTask]);
}
/* Toggle handler  */ 
  
const handleToggle = async(id,currentStatus)=>{
  try{
    // find the task you want to toggle 
    const task = tasks.find(t=>t.id === id );
    if(!task) return;
    // decide the new task to updatedstatus
    const updatedStatus =
    currentStatus === "completed" ? "pending" : "completed";

    // build payload for status to send it to back end 
    const payload ={
      title: task.title,
      description: task.description,
      status: updatedStatus,
    };
    // put the updated status to back end 
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`,{
      method: "PUT",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify(payload),
      
    });
     
    if(!res.ok) throw new Error(`HTTP ${res.status}`);

    // parse resonse and update state status

    const updated = await res.json();
        console.log("Updated task returned from backend:", updated);

    setTasks((prev)=>prev.map((t)=>(t.id === id ? updated : t)));
  }catch(err){
    console.error("Toggle task failed..",err);
    setError("failed to toggle status of task...");
  }
}


/* handle delete */
  const handleDelete = async (id)=>{
    try{
           const response = await fetch(`http://localhost:8080/api/tasks/${id}`,{
            method: "DELETE",
           });
           if(!response.ok) throw new Error (`HTTP ${response.status}`);

           // remove deleted task from frontend state 
           setTasks((prev)=>prev.filter(t=>t.id !== id));
    } catch(err){
           console.error("Delete task faled..",err);
           setError("Error delete..");
    }
  }

  // Edit for each task on front end / edit handler 
  const handleEdit =(task)=>{
 // to mark which task is being editid
 setEditId(task.id);

 // pre fill the editform with task`s current data 
    setEditForm({
      title:       task.title ?? "",
      description: task.description ?? "",
      status:    (  task.status ? String(task.status) : "pending" ),
    });
    console.log("start edit", task.id , task);
  }

// Track form changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setEditForm((prev) => ({ ...prev, [name]: value }));
};

// Save the changes (update backend + local state)
const handleUpdate = async () => {
  const updatedTask ={
    id :editId,
    ...editForm
  };
  try{
    if(!editId) return;
    const response = await fetch(`http://localhost:8080/api/tasks/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });

  
   
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
     const updated = await response.json();
    console.log("updated from back end ", updatedTask);

    // reflect in front end state 
    setTasks((prev) =>
      prev.map((t) => (t.id === editId ? updated : t))
    );
    // reset edit mode ..
    setEditId(null);
    setEditForm({title: "", description: "", status: "pending"})
   console.log('task updated',updated)
    //console.error("Failed to update task");
  }catch(e){
    console.error("update failed ",e);
    setError("Faild to update task ..")
  }
};

// 🟨 Cancel Edit — clear editing state
const cancelEdit = () => {
  setEditId(null);
  setEditForm({ title: "", description: "", status: "" });
};

// Apply filter before rendering
const filteringTasks =
  filter === "all"
    ? tasks
    : tasks.filter(
        (t) =>
          (t.status || "").toLowerCase() === filter.toLowerCase()
      );

 
      // show error messages
      const btnBase = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  marginRight: "6px",
};

  return (
    
      <div className='App' 
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "#f8f9fa",
        padding: "20px",
        borderRadius: "10x",
       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

      }}> 
        {/*  return 
        1- Title App name
        2-  Error /loading Mssage
        3- Task form to add new Tasks
        4-filter down list choose All/
        Pending /completed>*/}

        {/* title */}
         <h1>📄📝 Task Tracker</h1>

       {/* ADd Task Form  new task */}
       <TaskForm onAdd ={handleAdd}
       />
        {/* filter Dropdown */}
        <div style={{marginBottom :"10px"}}>
          <label htmlFor='filter-select'>Filter Tasks: </label>
          <select 
          id='filter-select'
           value={filter} 
           onChange={(e)=>setFilter(e.target.value)}>
            <option value= "all">All</option>
            <option value= "pending">Pending</option>
            <option value= "completed">Completed</option>
          </select>
        </div>
        { 
           loading ? (
          <p>Loading...</p>
        ) : error ? (
        <p style={{color:"red"}}>{error}</p>
      ) :(
      <Tasklist 
      tasks = {filteringTasks}
       onDelete ={handleDelete}
       onToggle ={handleToggle}
       onEdit={handleEdit}  // --> call when Edit button clicked
       onChange ={handleChange}
       onUpdate ={handleUpdate}
       editId ={editId}  // --> tells child which row is in edit mode
       editForm = {editForm}  // --> the current values for edit inputs
       cancelEdit={cancelEdit}
       />  
    ) }
      </div>
      
  )
}

export default App
