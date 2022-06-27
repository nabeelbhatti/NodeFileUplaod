// import { yupResolver } from '';
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import Header from '../Header';
import './form.css';
import Input from './Input';

export default function FormPropsTextFields() {
  const navigate = useNavigate()

  const {id} = useParams()
  const Schema = yup.object({

  }).required();
  const { register, handleSubmit, formState: { errors }, control, setValue,reset } = useForm({
    // resolver: yupResolver(Schema),
  });
  
  useEffect(() => {
    id &&
    (async()=>{
      const res = await axios.get(`http://localhost:5000/api/v1/user/${id}`)
      reset(res.data.data.user);
 
    })() 
  }, [ ])
  const handler = async (e) => {
    const { sheetNo,
      catg,
      type,
      size,
      ownersName,
      mobileNo,
      secondMobileNo,
      thirdMobileNo,
      plotNo,
      secNo,
      communityCenter,
      refNo,
      emailId,
      cnicNo,
      mem } = e

    const payload = {

      sheetNo,
      catg,
      type,
      size,
      ownersName,
      mobileNo,
      secondMobileNo,
      thirdMobileNo,
      plotNo,
      secNo,
      communityCenter,
      refNo,
      emailId,
      cnicNo,
      mem
    }
if(!!id){
  await axios.put(`http://localhost:5000/api/v1/user/${id}`, payload).then(res => {
    console.log(res)
    navigate("/")
    
  }).catch(err => {
    alert(err)
  }
  )
  
}
else{
  await axios.post('http://localhost:5000/api/v1/user/create', payload).then(res => {
    console.log(res)
    navigate("/")

  }).catch(err => {
    alert(err)
  }
  )
 
}



  }
  return (
    <>
      <Header />
      <div className="container">

        <form onSubmit={handleSubmit(handler)} method="post" action="/" id="form"  >
          <Input type={"number"} label='Sheet No' errors={errors} register={register} name="sheetNo" />
          <Input label='Category' errors={errors} register={register} name="catg" />
          <Input label='Type' errors={errors} register={register} name="type" />
          <Input type={"number"} label='size' errors={errors} register={register} name="size" />
          <Input label='Owners Name' errors={errors} register={register} name="ownersName" />
          <Input type={"number"} label='Mobile No' errors={errors} register={register} name="mobileNo" />
          <Input label='Second Mobile No' errors={errors} register={register} name="secondMobileNo" />
          <Input label='Third Mobile No' errors={errors} register={register} name="thirdMobileNo" />
          <Input type={"number"} label='Plot No' errors={errors} register={register} name="plotNo" />
          <Input label='Sec No' errors={errors} register={register} name="secNo" />
          <Input label='Community Center' errors={errors} register={register} name="communityCenter" />
          <Input label='Ref No' errors={errors} register={register} name="refNo" />
          <Input label='Email ID' errors={errors} register={register} name="emailId" />
          <Input label='CNIC No' errors={errors} register={register} name="cnicNo" />
          <Input label='MEM No' errors={errors} register={register} name="mem" />
        <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
