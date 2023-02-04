import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {

const[users, setUsers] = useState([])
const[render, setRender] = useState(false)
const[input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });

useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:8000/users");
      setUsers(res.data);
      // console.log(res.data);
    };
    getAllData();
  }, [render]);

  

const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/users", input);
    setRender(true);
    setInput({
      name: "",
      email: "",
      age: "",
    });
  };

  const handleDelete = async(id) =>{
    await axios.delete(`http://localhost:8000/users/${id}`)
    const newUsers = users.filter((item)=>{
      return item._id !== id
    })
    setUsers(newUsers)
  }

  return (
    <>
    <div className=" p-4">
    <div>
      <h1 className="text-center font-bold text-2xl text-cyan-700">Fill the followings to add:</h1>
    </div>
    <div className='max-w-[700px] mx-auto flex justify-center items-center p-4'>
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <label >Name:</label>
        <input name="name" value={input.name} onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})} type="text" className="border border-stone-300 hover:border-red-700 rounded-md p-2" />
        <label >Email:</label>
        <input name="email" value={input.email} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} type="email" className="border border-stone-300  hover:border-red-700 rounded-md p-2" />
        <label >Age:</label>
        <input name="age" value={input.age} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} type="number" className="border border-stone-300  hover:border-red-700 rounded-md p-2" />
        <button type="submit" className="bg-slate-700 hover:bg-slate-500 text-cyan-50 mt-4 p-2 pl-2 px-4 rounded w-[70px]">Submit</button>
      </form>
      
      </div>
      </div>
      <div className="shadow-md">
        <table className="w-full text-sm rounded-lg text-left text-gray-500">
          <thead>
            <tr className="">
              <th className="px-6 py-3 ">Name</th>
              <th className="px-6 py-3 ">E-mail</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
          {users && users.map((user)=>{
            return(
              <tr key={user._id} className="px-6 py-3">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.age}</td>
                <td className="px-6 py-3"><Link to={`/edit/${user._id}`}>
                            <button className="bg-green-600 hover:bg-green-500 text-cyan-50 mt-4 p-2 px-4 rounded w-[70px]">Edit</button>
                          </Link></td>
                <td onClick={()=>handleDelete(user._id)}><button className="bg-red-600 hover:bg-red-500 text-cyan-50 mt-4 p-2 px-4 rounded w-[70px]">Delete</button></td>
              </tr>
            )
          })}
            
          </tbody>

        </table>
      </div>

    </>
  );
};

export default Home;
