import React from "react";

const FeedBackView = ({ feedbacks }) => {
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
                    Child Name
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
                      {feedback.child.firstname} {feedback.child.middlename}{" "}
                      {feedback.child.surname}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {feedback.reason_for_absence}
                    </p>
                  </td>
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
