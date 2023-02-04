import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';



const Edit = () => {
 
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  })

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleData = async () => {
      const res = await axios.get(`http://localhost:8000/users/single/${id}`);
      setInput(res.data);
      // console.log(res.data);
    };
    getSingleData();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/users/update/${id}`, input);
    navigate("/")
  }

  return (
    <>
      <div className=" p-4">
      <div>
      <h1 className='text-center font-bold text-2xl text-rose-500'>Please enter what do you want to edit</h1>
      </div>
    <div className="className='w-full flex justify-center items-center p-4'">
    
      <form onSubmit={handleEdit} className="flex flex-col max-w-[600px] w-full my-4">
        <label className='font-bold text-gray-600'>name:</label>
        <input name="name" value={input.name} onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})} type="text" className="border border-stone-600 rounded-md p-2 text-gray-500" />
        <label className='mt-3 font-bold text-gray-600' >Email:</label>
        <input name="email" value={input.email} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} type="email" className="border border-stone-600 rounded-md p-2 text-gray-500" />
        <label className='mt-3 font-bold text-gray-600'>age:</label>
        <input name="age" value={input.age} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} type="number" className="border border-stone-600 rounded-md p-2 text-gray-500" />
        <div className='flex justify-evenly'>
        <button type="submit" className=" bg-green-500 text-cyan-50 mt-4 p-2 px-4 rounded w-[25%]">Edit</button>
        <button onClick={()=>{navigate("/")}} className=' bg-indigo-700 text-cyan-50 mt-4 p-2 px-4 rounded w-[25%]'>Back To Home</button>
        </div>
        
      </form>
      
      </div>
      </div>
    </>
  )
}

export default Edit
