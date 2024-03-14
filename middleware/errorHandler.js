const { constants } = require("../constants");

const errorhandler= (err,req,res,next)=>{
const statusCode=res.statusCode ? res.statusCode:500;
switch (statusCode) {
    case constants.VALIDATION_ERROR :
        res.json({title:"validation error",
        message:err.message ,
         stackTrace:err.stack
        })
        break;

    case constants.UNAUTHRISED:
        res.json({title:"Unauthrised user",
        message:err.message , 
        stackTrace:err.stack
    })
    break;

    case constants.FORBIDDEN:
        res.json({title:"Forbidden user",
        message:err.message , 
        stackTrace:err.stack
    })
    break;

    case constants.NOT_FOUND:
        res.json({title:"not found",
        message:err.message , 
        stackTrace:err.stack
    })
    break;
    
    case constants.SERVER_ERROR:
        res.json({title:"Server is not working",
        message:err.message , 
        stackTrace:err.stack
    })

        break;

    default:
        break;
}
next();
}

module.exports={errorhandler}