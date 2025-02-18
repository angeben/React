import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"
import cors, {CorsOptions} from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerSpec, {swaggerUiOptions} from "./config/swagger"
import morgan from "morgan"

// Connect with DB
export async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.blue("Connected to DB"))
    } catch (error) {
        console.log(colors.red.bold("Error connecting to DB"))
    }
}
connectDB()

// Express Instance
const server = express()

// Allow Connections
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('CORS error'), false)
        }
    }
}
server.use(cors(corsOptions))

// Read data
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server