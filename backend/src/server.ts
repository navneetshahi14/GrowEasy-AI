import app from './app.js'
import ENV from './config/ENV.js'
const Port = ENV.PORT

app.listen(Port, () => console.log(`Server is running at port ${Port}`))