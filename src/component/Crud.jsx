import { useEffect, useState } from "react";
// import Form from "./component/Form";
import "../index.css";
import "preline";
import { deleteApi, getApi } from "../Api/PostApi";
import Form from "./Form";
// import { deleteApi, getApi } from "./Api/PostApi";

function App() {
  const [data, setData] = useState([])

  // const [posts, setPosts] = useState(() =>
  //   Array.from({ length: 30 }, () => createRandomPost())
  // );


  const [addData, setAddData]=useState({
    title: '',
    body: ''
  })
  const [editData, setEditData]=useState(null)

  // Get Method Function
  const handleGet = async () => {
    const res = await getApi();
    setData(res.data);
    console.log(data)
  };


  // Delete Method Function
  const handleDelete=async(curId)=>{
    // console.log(curId)
    try {
      const res=await deleteApi(curId)
      if (res.status===200) {
        const newData=data.filter((item)=>item.id!==curId)
        setData(newData)
      }
    } catch (error) {
      console.log("Failed to delete Post", res.status)
    }
  }


  // Edit Function
  const handleEdit=(curElem)=>{
    setAddData({title:curElem.title, body:curElem.body})
    // console.log(setAddData)
    setEditData(curElem)
    // console.log(addData)
  }
  

  // Get Method Calling
  useEffect(() => {
    handleGet();
  }, []);




  return (
    <>
      <div className="sm:container mx-auto bg-neutral-800 py-8 min-h-screen text-neutral-200">
        {/* Input section */}
        <Form data={data} setData={setData} addData={addData} setAddData={setAddData} editData={editData} setEditData={setEditData}/>

        {/* Card section */}
        <div className="max-w-[90%] h-auto mx-auto mt-10">
          <div className="flex flex-wrap justify-center gap-5">
          {data.map((item, id) => {
            return (
                <div key={id} className="w-80 min-h-[200px] p-4 bg-slate-900 border-l-[1px] border-white rounded-sm">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                   {id+1}. {item.title}
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-neutral-400">
                    {item.body}
                  </p>
                  <div className="mt-3">
                    <button
                      className="py-3 px-4 mr-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={()=>handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={()=>handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

