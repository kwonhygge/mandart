const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(
  `mongodb+srv://admin-dory:${process.env.MONGO_PASS}@cluster0.b1gte.mongodb.net/objectiveDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String,
  mainBox: {
    objective: String,
    themeColor: String,
    plans: {
      smallBox: {
        type: Array,
      },
    },
  },
});

userSchema.plugin(passportLocalMongoose, { usernameFiled: 'email' });
module.exports = new mongoose.model('User', userSchema);
