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
  title: { type: String, required: true },
  objective: String,
  themeId: String,
  smallPlans: [{ objective: String, plans: Array }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'user' },
  createdOn: { type: Date, default: Date.now },
});
module.exports = {
  user: new mongoose.model('User', userSchema),
  box: new mongoose.model('Box', boxSchema),
};
