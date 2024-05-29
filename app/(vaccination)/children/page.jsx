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
  const { register, handleSubmit, setValue,watch,trigger,setError,formState:{errors,touchedFields},control } = useForm();
  const loggedInUser = globalUser(state=>state.loggedInUser)
   const router = useRouter();

  const data = [
    {
      label: "Child",
      value: "child",
      form: <ChildRegistrationForm setValue={setValue} register={register} errors={errors} errTouched={{setError,touchedFields,watch,trigger}} />,
    },
    {
      label: "Parent/Guardian",
      value: "parent",
      form: <ParentGuardianForm setValue={setValue} register={register} errors={errors} control={control} errTouched={{touchedFields,watch,trigger}}  />,
    },
  ];  

  const submitFunction = (data) => {

    
    
    axios.post(`/parentChildData`,{...data,facility_id:loggedInUser?.facility_id,modified_by:loggedInUser?.id}).then((res)=>{
      console.log(res.status)
      if(res.status == 200){
        console.log(res.data)
        router.push(`/childdetails?cardNo=${res.data.cardNo}`)

      }else{
        console.log(res.data.message)
      }
    })
    
  };

  

  return (
    <Tabs className="mt-5" value="child">
      <TabsHeader>
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
