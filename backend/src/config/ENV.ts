import dotenv from 'dotenv'
dotenv.config({quiet:true})


export default {
    PORT: process.env.PORT,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
}
