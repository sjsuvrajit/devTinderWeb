import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import UserCard from './userCard';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async() => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            }, {withCredentials: true});

            dispatch(addUser(res.data.data));
            setIsShow(true);
            setMessage(res.data.message);
            setTimeout(() => {
                setIsShow(false);
            }, 3000);
        } catch (err) {
            setError(err?.response?.data);
        }
    }
  return (
    <>
    <div className='flex justify-center my-10'>
        <div className="flex justify-center mx-10">
            <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-gray-800">First Name: </span>
                </div>
                <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => {setFirstName(e.target.value)}}
                />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-gray-800">Last Name: </span>
                </div>
                <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => {setLastName(e.target.value)}}
                />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-gray-800">PhotoUrl: </span>
                </div>
                <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => {setPhotoUrl(e.target.value)}}
                />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-gray-800">Age: </span>
                </div>
                <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => {setAge(e.target.value)}}
                />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-gray-800">Gender: </span>
                </div>
                <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => {setGender(e.target.value)}}
                />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-gray-800">About: </span>
                </div>
                <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => {setAbout(e.target.value)}}
                />
                </label>
                <p className="text-red-900">{error}</p>
                <div className="card-actions justify-center">
                <button className="btn" onClick={saveProfile}>Save Profile</button>
                </div>
            </div>
            </div>
        </div>
        <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
    </div>
    {isShow && (<div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>{message}</span>
        </div>
    </div>)}
    </>
  )
}

export default EditProfile