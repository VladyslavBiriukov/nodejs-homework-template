const mongoose = require('mongoose');
const app = require('./app')

const { DB_HOST, PORT = 3000} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Database connection successful on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);  // закрывет пакеты на фоне 
  })



// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

