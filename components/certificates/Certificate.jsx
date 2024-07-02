"use client";
import {Button, Dialog} from "@material-tailwind/react";
import React, {useState} from "react";
import axios from "../../axios";
import {CertificateGenerator} from "@/constants/certificate_generator";
import {PDFViewer} from "@react-pdf/renderer";
import globalAlert from "@/store/alert";

function Certificates({card_no, firstname, middlename, surname, certificate_status, handleGenerate}) {
    const {generateCertificate} = CertificateGenerator();
    const alert = globalAlert((state) => state.alert);
    const setAlert = globalAlert((state) => state.setAlert);
    const [loading, setLoading] = useState(false);
    const [certificate, setCertificate] = useState()



    const handleViewCertificate = () => {
        setLoading(true);
        axios.get(`certificates/${card_no}`).then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                setCertificate(response.data.certificate);
                setLoading(false);
            }else{
                setLoading(false);
            }
        }).catch(err=>{
            setLoading(false)
            console.log(err)
        })
    }

    const handleSave = async () => {

        const formData = await generateCertificate(card_no, firstname, middlename, surname);

        setTimeout(() => {
            axios
                .post("certificates", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res.data.status === 201) {
                        setAlert({
                            alert, visible: true, message: res.data.message, type: "success",
                        });
                        console.log(res.data);
                        setLoading(false);
                    } else {
                        setAlert({
                            alert, visible: true, message: res.data.message, type: "error",
                        });
                        setLoading(false);
                    }
                }).catch(err => {
                console.log(err)
                setLoading(false)
            });
        }, [3000]);
    }



    return (<main className="flex flex-col gap-4 ">
        {!certificate_status ? <Button
            ripple={false}
            loading={loading}
            className="bg-[#212b36] rounded-[0.25rem] shadow-none flex justify-center items-center w-full"
            onClick={() => {
                handleSave()
                setLoading(true);
            }}
        >
            {loading ? "Generating certificate" : "Generate certificate"}
        </Button> : <Button
            ripple={false}
            className="bg-[#212b36] rounded-[0.25rem] shadow-none flex justify-center items-center w-full"
            onClick={() => {
                handleViewCertificate()

            }}
        >
            {loading ? "opening certificate" : "View certificate"}
        </Button>}

        <Dialog
            open={certificate}
            handler={() => {
                setCertificate(null);
            }}
        >
            <iframe
                src={`http://localhost:8000/storage/${certificate}`}
                style={{width: '100%', height: '85vh'}}
            />
        </Dialog>

    </main>);
}

export default Certificates;
