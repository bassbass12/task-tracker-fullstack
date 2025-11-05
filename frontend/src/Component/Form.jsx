import { useState } from "react";
const TaskForm=({onAdd})=>{
    const [form,setForm] = useState({
       title: "",
       description: "",
       status:   "pending",
    });

    const handleChange = (e)=>{
        const {name,value}=e.target;
        setForm((prev)=>({...prev,[name]:value}));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!form.title.trim()) return alert ("Title required..!");
        try{
            const baseUrl = import.meta.env.VITE_API_URL;
              const response = await fetch(`${baseUrl}/api/tasks`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(form),
              });
            
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const newTask = await response.json();
        console.log("Added", newTask);
            onAdd(newTask);
            setForm({title: "", description: "", status: "pending"});
       
        }catch(err){
             console.error(" ❌❌❌❌❌❌❌❌❌❌👇❌Add Task Failed❌");
             alert("Failed to add task ..");

        }
    }
    return(
        <form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
            <input 
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Title"
            style={{marginRight: "8px"}}/>
           
            <input 
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Task description"
            style={{marginRight: "8px"}}/>
            <select 
            name="status"
            value={form.status}
            onChange={handleChange}
            title="Select task Status"
            >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
             <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "5px 12px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
        </form>
    )

}
export  default TaskForm;