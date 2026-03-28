import './App.css';
import React, {useState} from 'react';
import Header from './components/Header';
import Card from './components/Card';
import UserProfile from './components/UserProfile';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';


// function App() {
//   const unserName = "Alita BattleAngle";
//     const userRole = "Developer";
//     const isLoggedIn = true;
//     const unreadMessages = 5;
//     const getGreeting = () =>{
//       const hours = new Date().getHours();
//       if(hours < 12) return "Good Morning";
//       if(hours < 18) return "Good AfterNoon";
//       return "Good Evening"
//     };

//     const notificationBadge = unreadMessages > 0 ?
//     <span className='badge'>{unreadMessages}</span> : null;
//     return (
//       <div>
//         <h1>{getGreeting()}, {unserName}!</h1>
//         <p>Your role is: {userRole}</p>
//         {isLoggedIn ? (
//           <div>
//             <p>You have {unreadMessages} unread messages.</p>
//             {notificationBadge}
//           </div>
//         ) : (
//           <p>Please log in to see your messages.</p>
//         )}
//         {/* List Rendering example */}
//         <ul>
//           {["Learn React", "Build a Projects", "Deploy to production"]
//           .map((task, index) => (
//             <li key={index}>{task}</li>
//           ))}
//         </ul>
//       </div>
//     );
// }
// export default App;


//Use state Function in React
// function App(){
//   const projects = [
//     { id: 1, title: "React App", content: "A Modern Web Application.", icon: "🚀", isFeaured: true },
//     { id: 2, title: "Api Service", content: "Restful API Integration.", icon: "💻" },
//     { id: 3, title: "Mobile App", content: "React Native project.", icon: "📱" }
//   ];

    // const [count, setCount] = useState(0);
    // const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());

    // const updateTimeStamp = () => {
    //   setTimestamp(new Date().toLocaleTimeString());
    // };
//     return (
      
//       <div>
//           <Header></Header>
//           <h1>Virtual Dom Demo</h1>

//           {/* This component re-renders but only the number changes */}
//         <div style={{ padding: "20px", border: "1px solid #ccc" }}>

//           <h2>Counter: {count}</h2>
//           <button onClick={() => setCount(count + 1)}>Increment</button>
//           <button onClick={() => setCount(count - 1)}>Decrement</button>
//           <p>Current Time: {timestamp}</p>
//           <button onClick={updateTimeStamp}>Update Time</button>
//         </div>
//         {/* {this updates indepedently without affecting the count} */}
//         <div style={{ padding: '20px', marginTop: '20px', border: '1px solid #ccc' }}>
//           <h2>Timestamp: {timestamp}</h2>
//           <button onClick={updateTimeStamp}>Update Timestamp (Only this changes)</button>
//         </div>
//         {/* static content - never changes */}
//         <p style={{marginTop: '20px'}}>This is static content. It will not re-render when the count or timestamp changes.</p>
//       </div>
//     );
// }

//  return (
      
//       <div>
//           <Header title="Component composition Demo" subtitle="Building UIs From resuable Components"/>
          
//           <div style={{ 
//             display: "flex", 
//             justifyContent: "center", 
//             flexWrap: "wrap",
//             padding: "20px"
//             }}>
//             {projects.map(project => (
//               <Card
//                 key={project.id}
//                 title={project.title}
//                 content={project.content}
//                 icon={project.icon}
//                 isFeaured={project.isFeaured}
//               />
//             ))}
//           </div>


          //Edit Profile Click Handler
  //  const handleEdit = () =>{
  //     alert("Edit Profile Clicked!");   
  //   };

  //   return (
  //   <div style={{padding: "20px"}}>
  //     <Header title="User Profile" subtitle="Component with Props and State"/>
  //     <UserProfile 
  //       name="John Doe"
  //       age={30}
  //       email="johndoe@example.com"
  //       isActive={true}
  //       hobbies={["Reading", "Gaming", "Coding"]}
  //       onEdit={handleEdit}
  //     />
  //     <UserProfile
  //       name="Jane Smith"
  //       age="twenty"
  //       email="jane@example.com"
  //       onEdit={handleEdit}
  //     />
  //   </div>
  // );
 
// }

//Todo List App with State Management
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Props', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Component Communication', completed: false }
  ]);
  
  // Add new todo - receives data from child (TodoForm)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  
  // Toggle todo status - receives data from child (TodoItem)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo - receives data from child (TodoItem)
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>📝 Todo App - Communication Patterns</h1>
      <p style={{ color: '#666' }}>
        <strong>Patterns shown:</strong><br/>
        • Parent → Child: Props passed to TodoForm, TodoItem, TodoStats<br/>
        • Child → Parent: Callbacks (addTodo, toggleTodo, deleteTodo)<br/>
        • Sibling Communication: TodoForm updates state, TodoStats displays it
      </p>
      
      {/* Child to Parent: TodoForm sends data UP via onAddTodo */}
      <TodoForm onAddTodo={addTodo} />
      
      {/* Parent to Child: Stats receives todos via props */}
      <TodoStats todos={todos} />
      
      {/* Parent to Child: TodoItem receives data and callbacks */}
      <div>
        <h3>Your Tasks</h3>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
export default App;


