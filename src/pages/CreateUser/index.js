import React, {useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './createUser.scss'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Toast from '../../components/Toast';

const CreateUser = () => {

  const navigate = useNavigate();

  const POST_USER_URL = "http://localhost:8080/api/users/register"
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("true")
  const [joinedDate, setJoinedDate] = useState("")
  const [role, setRole] = useState("ADMIN");
  const [openLocation, setOpenLocation] = useState(true);
  const [location, setLocation] = useState("HCM");

  const handleCreateNewUser = () => {
    if (firstName && lastName && dateOfBirth && gender && joinedDate && role) {
      const payload = {
        firstname: firstName,
        lastname: lastName,
        dateOfBirth,
        gender,
        joinedDate,
        role,
      };
      axios
        .post(POST_USER_URL, payload)
        .then((res) => {
          if (res.status === 201) {
            Toast("success", "Successfully added!!");
            navigate("/manage-user");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.request) {
            Toast("error", "CREATE NEW USER FAILED!!");
          } else if (error.response) {
            if (error.response.data.validationErrors.firstname) {
              Toast(
                "error",
                "ERROR: " + error.response.data.validationErrors.firstname
              );
            }
            if (error.response.data.validationErrors.lastname) {
              Toast(
                "error",
                "ERROR: " + error.response.data.validationErrors.lastname
              );
            }
          } else if (error.response.data) {
            Toast("error", "ERROR: " + error.response.data.message);
          }
        });
    } else {
      Toast("error", "ALL FIELDS ARE REQUIRE");
    }
  };

  function handleCancel() {
    navigate("/manage-user");
  }

  const handleRole = (e) => {
    const value = e.target.value;
    setRole(value);
    if (value == 1) {
      setOpenLocation(true);
    } else if (value == 2) {
      setOpenLocation(false);
    }
  };

  return (
    <>
      <div className="form-create-user">
        <div className="form-create-user__container">
          <h2 className="form-create-user__title">Create New User</h2>
          <div className="form-create-user__input-wrapper">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-create-user__input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>

            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-create-user__input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>

            <label for="dateOfBirth">Date Of Birth</label>
            <input
              type="date"
              id="dateOfbirth"
              className="form-create-user__input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            ></input>

            <label for="gender">Gender</label>
            <div className="form-create-user__input--item">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="fav_language"
                  value="true"
                  onClick={(e) => setGender(e.target.value)}
                ></input>
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="female"
                  name="fav_language"
                  value="false"
                  onClick={(e) => setGender(e.target.value)}
                ></input>
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <label for="joinedDate">Joined Date</label>
            <input
              type="date"
              id="joinedDate"
              className="form-create-user__input"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
            ></input>

            <label for="type">Type</label>
            <select
              className="form-create-user__input"
              name="cars"
              id="cars"
              value={role}
              onChange={handleRole}
            >
              <option value={1}>ADMIN</option>
              <option value={2}>STAFF</option>
            </select>

            {openLocation && (
              <>
                <label for="type">Location</label>
                <select
                  className="form-create-user__input"
                  name="cars"
                  id="cars"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value={"HCM"}>Ho Chi Minh</option>
                  <option value={"DN"}>Da Nang</option>
                  <option value={"HN"}>Ha Noi</option>
                </select>
              </>
            )}
          </div>

          <div className="form-create-user__button-wrapper">
            <button
              id="save"
              className="form-create-user__button-item"
              onClick={handleCreateNewUser}
            >
              Save
            </button>
            <button
              id="cancel"
              className="form-create-user__button-item"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateUser;