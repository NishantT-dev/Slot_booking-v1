import {createLogger,format,transports} from "winston";
import morgan from "morgan"

const logger=createLogger({
    level:"info",
    format: format.combine(
        format.colorize(),
        format.timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
        format.printf(({timestamp,level,message})=>{
            return ` [${timestamp} ${level} ${message} ]`;
        })
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:"logs/combined.log"})
    ]
});
const morganMiddleware=morgan("combined",{
    stream:{
        write:(message)=> logger.info(message.trim())
    }
});

export {logger,morganMiddleware}