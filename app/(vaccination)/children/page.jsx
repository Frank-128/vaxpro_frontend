"use client";
import ChildRegistrationForm from "@/components/ChildForm";
import ParentGuardianForm from "@/components/ParentGuardianForm";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "../../../axios";
import { useForm } from "react-hook-form";
import globalUser from "@/store/user";
import { useRouter } from "next/navigation";



const Children = () => {
  const { register, handleSubmit,clearErrors, validate,setValue,watch,trigger,setError,formState:{errors,touchedFields,isValid,isSubmitted},control } = useForm();
  const loggedInUser = globalUser(state=>state.loggedInUser)
   const router = useRouter();


  const data = [
    {
      label: "Child",
      value: "child",
      form: <ChildRegistrationForm setValue={setValue} register={register} errors={errors} errTouched={{setError,control,validate,touchedFields,clearErrors,trigger}} />,
    },
    {
      label: "Parent/Guardian",
      value: "parent",
      form: <ParentGuardianForm setValue={setValue} register={register} errors={errors} control={control} errTouched={{isValid,touchedFields,watch,trigger,isSubmitted}}  />,
    },
  ];

  const submitFunction = (data) => {


    function getDaysDifference(startDate, endDate) {
      const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.round((end - start) / oneDay);
      return diffDays;
    }



    const today = new Date().toISOString().split('T')[0];

    axios.post(`/parentChildData`,{...data,facility_id:loggedInUser?.facility_id,modified_by:loggedInUser?.id}).then((res)=>{
      console.log(res.status)
      if(res.status === 200){


        const child_date = new Date(res.data.birthDate)
        const daysDifference = getDaysDifference(child_date, today);

        if(daysDifference > 0){
          console.log(daysDifference)
         return router.push(`/children/`+res.data.cardNo)
        }
       return  router.push(`/childdetails?cardNo=${res.data.cardNo}`)

      }else{
        console.log(res.data.message)
      }
    })

  };

  return (
    <Tabs className="mt-5 " value="child">
      <TabsHeader className="z-0">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <form onSubmit={handleSubmit(submitFunction)}>
          {data.map(({ value, form }) => (
            <TabPanel
              key={value}
              value={value}
              className="flex justify-center items-center"
            >
              {form}
            </TabPanel>
          ))}
        </form>
      </TabsBody>
    </Tabs>
  );
};

export default Children;
