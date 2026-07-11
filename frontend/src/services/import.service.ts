import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
})

export async function importCsv(file: File) {
    try{

        const formData = new FormData();
      
        formData.append("file", file);
      
        const { data } = await api.post(
          "/import",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      
        return data;
    }catch(err){
        console.log(err)
    }
}