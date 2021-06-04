
const {createProxyMiddleware}=require('http-proxy-middleware')
module.exports=function(app){
    app.use(
        createProxyMiddleware(
            '/user',{
                target:'http://localhost:3000/',
                changeOrigin:true
            }
        )
    )
}