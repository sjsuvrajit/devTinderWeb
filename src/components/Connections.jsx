import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl">No Connections Found!</h1>
      </div>
    );
  }
  return (
    <div className="my-10">
      <h1 className="text-center text-2xl">Connections</h1>

      {connections.map((con) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } = con;

        return (
          <div key={_id} className="flex justify-center my-5">
            <div className="flex justify-center w-1/2  bg-lime-950 rounded-xl">
              <div>
                <img
                  className="w-20 h-20 rounded-3xl mx-5 my-2"
                  src={photoUrl}
                  alt="Profile Photo"
                />
              </div>
              <div>
                <h2 className="text-2xl">{firstName + " " + lastName}</h2>
                {age && gender && <p className="py-1">{age + ", " + gender}</p>}
                <p className="py-1">{about}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
