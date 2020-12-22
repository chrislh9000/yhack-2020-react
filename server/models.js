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
  },
  pins: {
    type: Schema.Types.ObjectId,
    ref: 'Pin',
    default: []
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

const PinSchema = new Schema({
  test : {
    type: String,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  podcast: {
    type: Schema.Types.ObjectId,
    ref: 'Podcast',
    required: true
  }
})

const PodcastSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  transcript: {
    type: Schema.Types.ObjectId,
    ref: 'GcloudResponse',
    required: true
  }
})

const PinShareSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pin: {
    type: Schema.Types.ObjectId,
    ref: 'Pin',
    required: true
  }
})

const User = mongoose.model('User', UserSchema);
const GcloudResponse = mongoose.model('GcloudResponse', GcloudResponseSchema);
const Pin = mongoose.model('Pin', PinSchema);
const Podcast = mongoose.model('Podcast', PodcastSchema);
const Pinshare = mongoose.model('Pinshare', PinShareSchema);



export default {
  User: User,
  GcloudResponse: GcloudResponse,
  Pin: Pin,
  Podcast: Podcast,
  Pinshare: Pinshare
};
