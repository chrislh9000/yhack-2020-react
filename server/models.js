import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Users
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const GcloudResponseSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  response: {
    type: Object
  }
});

const User = mongoose.model('User', UserSchema);
const GcloudResponse = mongoose.model('GcloudResponse', GcloudResponseSchema);


export default {
  User: User,
  GcloudResponse: GcloudResponse
};
