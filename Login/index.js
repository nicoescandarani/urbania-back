//Login
const processReq  = require('./utilities/processReq.js')
const randomstring  = require('randomstring')

module.exports = async function (context, req) {

    const user = req.body.user.toLowerCase()
    const pass = req.body.pass

    if (user && pass){
        let proceso = await processReq.process(user, pass)      
       if (proceso){
           let tokenCode = randomstring.generate({ length: 1024,charset: 'hex' })
           await processReq.saveToken(user, tokenCode)
            respuesta = {status: 200, body: {result: "Success", token: tokenCode}}
        } else {
            respuesta = {status: 403, body: {result: "Usuario o contraseña incorrectos."}}
        }
    } else {
        respuesta = {status: 423, body: {result: "No se ingresaron los datos requeridos."}}
    }
    context.res = respuesta    
    context.done();
}