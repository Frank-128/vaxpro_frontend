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
import axios from "../axios";
import { useForm } from "react-hook-form";

const Children = () => {
  const { register, handleSubmit, setValue } = useForm();
  const data = [
    {
      label: "Child",
      value: "child",
      form: <ChildRegistrationForm setValue={setValue} register={register} />,
    },
    {
      label: "Parent/Guardian",
      value: "parent",
      form: <ParentGuardianForm setValue={setValue} register={register} />,
    },
  ];  

  const submitFunction = (data) => {
    console.log(data)
    
    // axios.post(`/parentChildData`).then((res)=>{
    //   if(res.data.status == 200){
    //     console.log(res.data.message)
    //   }else{
    //     console.log(res.data.message)
    //   }
    // })
    
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
