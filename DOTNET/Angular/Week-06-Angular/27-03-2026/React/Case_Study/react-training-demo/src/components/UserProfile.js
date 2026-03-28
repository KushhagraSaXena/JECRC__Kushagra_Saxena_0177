import React from "react";
import Proptypes from "prop-types";
function UserProfile({
  name,
  age,
  email,
  isActive = false,  //default value
  hobbies = [], // prevent undefined.map error
  onEdit
}) {
  return (
    <div style={{
      // display: "flex",
      // alignItems: "center",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "20px",
      margin: "10px auto",
      maxWidth: "400px",
      backgroundColor:"#f9f9f9",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "0.3s",
    }}
    onMouseOver={e=>e.currentTarget.style.transform = 'scale(1.03)'}
    onMouseOut={e=>e.currentTarget.style.transform = 'scale(1)'}
    >

      <h2>{name}</h2>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Email:</strong> {email}</p>
      
      <p>
        <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
      </p>

            <div style={{ marginTop: "10px" }}>
              <strong>Hobbies:</strong>
              <ul>
                {hobbies.length > 0 ? (hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))) : <li>No hobbies Available</li>} 
              </ul>
            </div>
      
            <button onClick={onEdit}
            style={{
              backgroundColor:'#007BFF',
              color:'white',
              border:'none',
              padding:'10px 15px',
              borderRadius:'5px',
              cursor: ' pointer',
              marginTop: '10px'
            }}
            >Edit Profile
            </button>
          </div>
        );
      }

      //prop Validation
      UserProfile.propTypes = {
        name: Proptypes.string.isRequired,
        age: Proptypes.number.isRequired,
        email: Proptypes.string.isRequired,
        isActive: Proptypes.bool,
        hobbies: Proptypes.arrayOf(Proptypes.string),
        onEdit: Proptypes.func.isRequired
      };

      export default UserProfile;