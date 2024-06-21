"use client";
import { Button, Dialog } from "@material-tailwind/react";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "../../axios";
import globalAlert from "@/store/alert";
import { CertificateGenerator } from "@/constants/certificate_generator";
import {useRouter} from "next/navigation";

function Certificates({card_no,certificate_status,handleGenerate}) {
  const {loading, generateCertificate, setLoading} = CertificateGenerator();
  const [certificate, setCertificate] = useState(false);
  const router = useRouter()

  const handleViewCertificate = async () => {
      // setLoading(true);
      axios.get(`certificates/${card_no}`,).then((response) => {

          setCertificate(response.data.certificate);
      })
  }

  return (
    <main className="flex flex-col gap-4 ">
        {!certificate_status ? <Button
            ripple={false}
            loading={loading}
            className="bg-[#212b36] rounded-[0.25rem] shadow-none flex justify-center items-center w-full"
            onClick={() => {
                generateCertificate(card_no,handleGenerate).then(()=>{

                    // setTimeout(()=>{
                    // // handleGenerate();
                    // },[3000])
                });
                setLoading(true);






            }}
        >
            {loading ? "Generating certificate" : "Generate certificate"}
        </Button>
            :
            <Button
            ripple={false}
        className="bg-[#212b36] rounded-[0.25rem] shadow-none flex justify-center items-center w-full"
        onClick={() => {
            handleViewCertificate()

        }}
    >
        {loading ? "opening certificate" : "View certificate"}
    </Button>
}


       <Dialog
        size="xl"
        open={certificate}
        handler={() => {
          setCertificate(null);
        }}
      >
           {certificate}
        <iframe
            src={`http://localhost:8000/storage/${certificate}`}
          width="100%"
          height="700px"
          frameBorder="0"
        ></iframe>
      </Dialog>
    </main>
  );
}
export default Certificates;
