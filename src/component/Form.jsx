import React, { useState } from 'react'
import { postApi, putApi } from '../Api/PostApi'
// import "./indes.css";
import "preline";

const Form = ({data, setData, addData, setAddData, editData, setEditData}) => {

  // OnChange  Function
  const handleChange=(e)=>{
    const {name, value}=e.target
    setAddData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }


  // Post Method Function
  const handleCreatePost=async(e)=>{
    e.preventDefault()
    try {
      const res=await postApi(addData)
      if(res.status===201){
        setData([...data, res.data])
        console.log(data)
        setAddData({ title: '', body: '' }); 
        // console.log("After resetting:", addData);
      }
    } catch (error) {
      console.log("Failed to Post Data", error.message)
    }
  }



  // Update Method Function
  const handleUpdatePost=async(e)=>{
    e.preventDefault()
    try {
      const res=await putApi(editData.id, addData)
      if(res.status===200){
        const updatedData = data.map((item) => item.id === editData.id ? res.data : item);
        setData(updatedData)
        setEditData(null); // Clear editData after update
      setAddData({ title: '', body: '' });
      }
    } catch (error) {
      console.log("Failed to Update Post", error.message)
    }
  }


  return (
    <>
      <form onSubmit={editData? handleUpdatePost : handleCreatePost} className="max-w-sm media375:w-[17rem] media320:w-[15rem] media320:flex-col flex sm:flex-row media375:flex-col media424px:flex-col justify-center sm:space-x-3 mx-auto">
          <input
            type="text"
            name='title'
            value={addData.title}
            onChange={handleChange}
            className="py-3 px-5 flex-1 border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
            placeholder="Title Text..."
          />
          <input
            type="text"
            name='body'
            value={addData.body}
            onChange={handleChange}
            className="py-3 px-5 sm:mt-0 media320:mt-2 media375:mt-2 media424px:mt-2 flex-1 border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
            placeholder="Body Text.."
          />
          {/* Add button */}
          <button type='submit' className="py-3 sm:mt-0 media320:mt-2  media375:mt-2 media424px:mt-3 px-5 bg-blue-700 text-white rounded-full text-sm font-medium hover:bg-blue-900 focus:outline-none focus:bg-blue-700">
            {editData? 'Update' : 'Add'}
          </button>
        </form>
    </>
  )
}

export default Form
