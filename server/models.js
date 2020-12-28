import mongoose, { SchemaType } from "mongoose";

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
    type: [PinSchema],
    default: [],
    ref: "Pin",
  },
});

const GcloudResponseSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  response: {
    type: Object,
  },
});

const PinSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  startTime: {
    type: mongoose.Decimal128,
    required: true,
  },
  endTime: {
    type: mongoose.Decimal128,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  podcast: {
    type: Schema.Types.ObjectId,
    ref: "Podcast",
    required: false,
  },
});

const PodcastSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // transcript: {
  //   type: Schema.Types.ObjectId,
  //   ref: "GcloudResponse",
  //   required: true,
  // },
  author: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  episodes: {
    type: [EpisodeSchema],
    default: [],
    required: true,
  },
});

const EpisodeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  podcast: {
    type: PodcastSchema,
    required: true,
  },
  transcript: {
    type: GcloudResponseSchema,
    ref: GcloudResponse,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const PinShareSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pin: {
    type: Schema.Types.ObjectId,
    ref: "Pin",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const GcloudResponse = mongoose.model("GcloudResponse", GcloudResponseSchema);
const Pin = mongoose.model("Pin", PinSchema);
const Podcast = mongoose.model("Podcast", PodcastSchema);
const Pinshare = mongoose.model("Pinshare", PinShareSchema);

export default {
  User: User,
  GcloudResponse: GcloudResponse,
  Pin: Pin,
  Podcast: Podcast,
  Pinshare: Pinshare,
};
