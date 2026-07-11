import app from './app'
import ENV from './config/ENV'
const Port = ENV.PORT

app.listen(Port, () => console.log(`Server is running at port ${Port}`))