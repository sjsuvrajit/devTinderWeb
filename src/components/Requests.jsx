import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const userRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      console.log(BASE_URL + "/request/review/" + status + "/" + _id);
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!userRequests) return;

  if (userRequests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl">No Request Found!</h1>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-center text-2xl">Connection Requests</h1>

      {userRequests.map((req) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          req.fromUserId;

        return (
          <div key={_id} className="flex justify-center my-5">
            <div className="flex justify-between items-center w-2/3  bg-red-950 rounded-xl">
              <div>
                <img
                  className="w-20 h-20 rounded-3xl mx-2 my-2"
                  src={photoUrl}
                  alt="Profile Photo"
                />
              </div>
              <div>
                <h2 className="text-2xl">{firstName + " " + lastName}</h2>
                {age && gender && <p className="py-1">{age + ", " + gender}</p>}
                <p className="py-1">{about}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  reviewRequest("rejected", req._id);
                }}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
