"use client";
import ReportPdf from "@/components/ReportPdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import axios from "../../../axios";
import globalUser from "@/store/user";
import ReportFilter from "@/components/filters/ReportFilter";



function Reports() {
  const [isClient, setIsClient] = useState(false);
  const [reportData,setReportData] = useState(null)
  const authenticatedToken = globalUser((state) => state.authenticatedToken);
  const loggedInUser = globalUser(state=>state.loggedInUser)



  const title = () => {
    if (!loggedInUser) {
      return <Spinner />;
    }

    if (loggedInUser?.role?.account_type === "ministry") {
      return "Ministry";
    } else if (loggedInUser?.role?.account_type === "regional") {
      return loggedInUser?.region?.region_name + " Region";
    } else if (loggedInUser.role.account_type === "district") {
      return loggedInUser?.district?.district_name + " District";
    } else {
      return loggedInUser?.facilities?.facility_name + " Facility";
    }
  };

  const reportTitle = title()

  console.log(title)

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(()=>{
  //   axios.post('/reports',null,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${authenticatedToken}`,
  //       },
  //     }
  //   ).then((res)=>{
  //     setReportData(res.data)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // },[authenticatedToken])

  return (
    <div className="h-screen space-y-3">
      <div className="flex-col gap-y-2 flex">
      <header className="flex justify-between">
        <h1>Report for {reportTitle}</h1>
        {isClient ? (
          <PDFDownloadLink
            document={<ReportPdf title={reportTitle} reportData={reportData} />}
            fileName="report.pdf"
            style={{
              textDecoration: "none",
              padding: "10px 20px",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        ) : (
          "Loading..."
        )}
      </header>
      <div className="w-full">
     {/* {(loggedInUser?.role?.account_type === "ministry" || (loggedInUser?.role?.account_type === "regional") || (loggedInUser?.role?.account_type === "district")) && <ReportFilter  setReportData={setReportData}/>} */}
     <ReportFilter  setReportData={setReportData}/>
      </div>
      </div>


      {!reportData ? <div>Loading....</div> : <table className="w-full min-w-max table-auto text-left">
        <thead className="bg-white border-t border-gray-900">
          <tr className="border-blue-gray-800 border font-bold ">
            <th className=" w-2 border-r border-gray-900 text-center p-2 text-black">No.</th>
            <th className=" w-60 text-center ">Description</th>
            <th className="border-l border-r p-0 m-0 border-gray-900">
              {/* This row spans two columns */}
              <table className="w-full divide-gray-900 divide-y text-black">
                <thead className="">
                  <tr className="flex">
                    <th className="w-1/4 border-r border-gray-900 text-black"></th>
                    <th className="w-3/4 text-center text-black" colSpan={3}>
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody className=" ">
                  {/* This row spans three columns */}
                  <tr className="flex">
                    <td className="w-1/4 border-r border-gray-900"></td>
                    <td className="w-1/4 text-center   border-r border-gray-900 text-black">
                      Male
                    </td>
                    <td className="w-1/4 text-center   border-r border-gray-900 text-black">
                      Female
                    </td>
                    <td className="w-1/4 text-center ">Total</td>
                  </tr>
                </tbody>
              </table>
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-900">
          {!reportData ? <tr><Spinner/></tr> : reportData?.map((item, index) => (
            <tr key={index} className=" border-l border-gray-900 border-b">
             <td className="border-r border-gray-900 text-center p-2">{item.No}</td>
             <td className="border-r border-gray-900 p-2 text-xs">{item.Description}</td>
             <td className="border-l border-r p-0 m-0 border-gray-900">
              {/* This row spans two columns */}
              <table className="w-full divide-gray-900 divide-y">
                <tbody className="">
                  {/* This row spans three columns */}
                  <tr className="flex">
                    <td className="w-1/4  border-r border-gray-900 p-2">{item.Dose}</td>
                    <td className="w-1/4 text-center   border-r border-gray-900 p-2">
                      {item.Male}
                    </td>
                    <td className="w-1/4 text-center   border-r border-gray-900 p-2">
                      {item.Female}
                    </td>
                    <td className="w-1/4 text-center ">{item.Total}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            </tr>
          ))}
        </tbody>

      </table>}
    </div>
  );
}

export default Reports;
