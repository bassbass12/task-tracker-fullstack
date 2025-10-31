    const btnBase = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  marginRight: "6px",
};

const TaskList = ({
  tasks,
  onDelete,
  onToggle,
  onEdit,
  onChange,
  onUpdate,
  editId,
  editForm,
  cancelEdit
}) => {
  if (!tasks || tasks.length === 0) 
    return
 <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
  No tasks found for this filter.
</p>

  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id} style={{ marginBottom: "10px" }}>
          {editId === t.id ? (
            /* Edit Mode : shows inputs prefilled from editForm (read only now ) */
            <div>
              <input
                type="text"
                value={editForm.title}
                onChange={onChange}
                placeholder="Edit Title"
                style={{ marginRight: "6px" }}
              />
              <input
                type="text"
                name="description"
                value={editForm.description}
                onChange={onChange}
                placeholder="Edit description"
                style={{ marginRight: "6px" }}
              />
              <select
                name="status"
                value={editForm.status}
                onChange={onChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              {/* For this floor : show save/Cancel but it will work later  */}
              <button
                onClick={onUpdate}
                style={{
                  ...btnBase,
                  color: "white",
                }}
              >
                update(save)💾
              </button>
              <button
                onClick={cancelEdit}
                style={{
                  ...btnBase,
                  color: "red",
                  
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {/* // view mode */}
              <strong>
                {t.title}
                <span
                  style={{
                    color: t.status === "completed" ? "green" : "orange",
                    marginLeft: "6px",
                  }}
                >
                  {" "}
                  [{t.status}]
                </span>
              </strong>

              <p style={{ margin: "4px 0 0 0", color: "#554" }}>
                {t.description}
              </p>

              <button
                onClick={() => onToggle(t.id, t.status)}
                style={{
                  ...btnBase,
                  color: "white",
                  background: t.status === "completed" ? "orange" : "green",
                  
                }}
              >
                {t.status === "completed" ? "Mark pending" : "Mark Done"}
                /Toggle
              </button>
              <button
                onClick={() => onEdit(t)}
                style={{
                  ...btnBase,
                   color: "blue",
                  
                }}
              >
                ✏️Edit
              </button>
              <button
                onClick={() => onDelete(t.id)}
                style={{
                  ...btnBase,
                  color: "white",
                }}
              >
               🥡 Del 
              </button>
            </div>
          )}
        </li>
      ))  }
    </ul>
  );
};
export default TaskList;
