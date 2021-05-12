const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser : true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('connected');
})
.catch(error => console.log(`Error ${error}`));
