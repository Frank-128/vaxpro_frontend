import React, { useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const FeedBackView = ({ feedbacks }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="flex items-center justify-center mt-10">
      {feedbacks.length > 0 ? (
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    S/No
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Child Card Number
                  </p>
                </th>

                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Facility Reg No
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Facility Name
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Ward
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Reason for Absence
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {index + 1}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {feedback.child_id}
                    </p>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {feedback.facility.facility_reg_no}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {feedback.facility.facility_name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {feedback.facility.ward.ward_name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="items-center gap-3 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 flex"
                    >
                      {/* {feedback.reason_for_absence} */}
                      <IconButton variant="outlined">
                        <img src="/images/view.jpg" />
                      </IconButton>
                      <p className="font-bold italic">View Reason</p>
                    </button>
                  </td>
                  <Dialog maxWidth="sm" open={isDialogOpen}>
                    <DialogHeader>Reason for Absence</DialogHeader>
                    <DialogBody>{feedback.reason_for_absence}</DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        onClick={() => setIsDialogOpen(false)}
                        color="red"
                        className="mr-1"
                      >
                        <span>Close</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="italic text-sm">Currently No Feedbacks!</div>
      )}
    </div>
  );
};

export default FeedBackView;
