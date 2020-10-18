const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');

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
  date: {
    type: Date,
    default: Date.now,
  },
});
const boxSchema = new mongoose.Schema({
  mainBox: {
    title: String,
    objective: String,
    themeId: String,
    smallPlans: [{ objective: String, plans: Array }],
  },
});

module.exports = new mongoose.model('User', userSchema);
