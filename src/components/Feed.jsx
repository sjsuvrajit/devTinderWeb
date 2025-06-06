import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) return;

  if (feedData.length <= 0) {
    return (
      <h1 className="flex justify-center my-10">No New User is Available</h1>
    );
  }

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
