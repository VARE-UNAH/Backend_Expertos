import { CorsOptions } from 'cors'

export const corsConfig : CorsOptions = {
    origin : function(origin, callback){
        const whiteList = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2, process.env.SWAGGEER_URL]
        if(whiteList.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new Error(`CORS Error: Origin ${origin} not allowed by CORS policy. Allowed origins: ${process.env.FRONTEND_URL}, ${process.env.FRONTEND_URL2}`));
        }
    }
}