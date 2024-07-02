'use client'
import FeedBackView from "@/components/FeedBackView";
import { Typography } from "@material-tailwind/react";
import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import globalUser from "@/store/user";

const Feedbacks = () => {
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    if (loggedInUser?.role?.account_type === "district") {
      axios.get(`/district_wards/${loggedInUser?.district_id}`).then((res) => {
        if (res.status === 200) {
          const facilities = [];
          res.data.forEach((ward) => {
            ward.facility.forEach((facility) => {
              facilities.push(facility.facility_reg_no);
            });
          });
          const facilitiesParam = facilities.join(",");

          axios.get(`/getFeedback/${facilitiesParam}`).then((res) => {
            if (res.status === 200) {
              console.log(res.data.feedbacks,"this is the feedback");


              setFeedbacks(res.data.feedbacks);
            }
          });
        }
      });
    }
  }, [loggedInUser]);
  return (
    <div>
      <div className="mt-10">
        <Typography className="font-bold flex items-center justify-center">
          Children Feedback from Community Health Worker
        </Typography>
        <FeedBackView feedbacks={feedbacks} />
      </div>
    </div>
  );
};

export default Feedbacks;
