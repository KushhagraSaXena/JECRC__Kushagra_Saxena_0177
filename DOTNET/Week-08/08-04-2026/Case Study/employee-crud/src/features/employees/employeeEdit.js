import React,{use, useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateEmployee } from "./employeeSlice";

function EmployeeEdit({ selectedEmployee, onCancel }) {

  const [name,setName] = React.useState(selectedEmployee.name);
  const [position,setPosition] = React.useState(selectedEmployee.position);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(selectedEmployee.name);
    setPosition(selectedEmployee.position);
  }, [selectedEmployee]);

  const handleSubmit = (e) => {
    dispatch(updateEmployee({id: selectedEmployee.id, name, position}));
    clearEdit();
  }

  const clearEdit = () => {
    setName("");
    setPosition("");
    onCancel();
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Update Employee</button>
        <button type="button" onClick={clearEdit}>Cancel</button>
      </form>
    </div>
  );
}

export default EmployeeEdit;