import axios from "axios";

const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
})

// get Method
export const getApi=()=>{
    return api.get('/posts')
}

// delete Method
export const deleteApi=(id)=>{
    return api.delete(`/posts/${id}`)
}

// post Method
export const postApi=(post)=>{
    return api.post('/posts', post)
}

// put/update Method
export const putApi=(id, updatedPost)=>{
    return api.put(`/posts/${id}`, updatedPost)
}