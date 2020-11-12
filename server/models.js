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
});

const User = mongoose.model('User', UserSchema);

// Documents
const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  content: {
    type: String,
  },
  history: [{
    type: String,
  }],
});

const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
  }
});

const TimestampSchema = new Schema({
  time_fw: {
    type: Date,
    required: true,
  },
  ep_title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  sentence: {
    type: String,
    required: true,
  }
});

// const PodtranscriptSchema = new Schema ({
//   title: {
//     type:
//   }
// });

const Document = mongoose.model('Document', DocumentSchema);
const Test = mongoose.model('Test', TestSchema);

export default {
  Document: Document,
  User: User,
  Test: Test
};
