const app = require('./server/server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running @port ${PORT}`)
});