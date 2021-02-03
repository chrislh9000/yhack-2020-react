import mongoose, { SchemaType } from "mongoose";

mongoose.set("useFindAndModify", false);

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
  pins: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pin",
      default: [],
    },
  ],
  sharedPins: [ // these are pins sent to you by friends 
    {
      type: Schema.Types.ObjectId,
      ref: "Pin",
      default: [],
    },
  ],
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserEpisode",
      default: [],
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
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
  episode: {
    type: Schema.Types.ObjectId,
    ref: "Episode",
    required: false,
  },
  favorited: {
    type: Boolean,
    required: true,
    default: false,
  },
  pinDate: {
    type: Date,
    required: true,
  },
  // ccId: {
  //   type: Number,
  //   required: true,
  // },
  note: {
    type: String,
    required: false,
    default: "",
  },
  ccId: [
    {
      type: Number,
      required: true,
    },
  ],
});

const PodcastSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Episode",
      default: [],
    },
  ],
  imageUrl: {
    type: String,
  },
});

const EpisodeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  podcast: {
    type: Schema.Types.ObjectId,
    ref: "Podcast",
    required: true,
  },
  transcript: {
    type: Schema.Types.ObjectId,
    ref: "GcloudResponse",
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  episode_number: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    requierd: true,
  },
});

const UserEpisodeSchema = new Schema({
  episode: {
    type: Schema.Types.ObjectId,
    ref: "Episode",
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },

  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  playlists: {
    type: Array,
    required: false,
    default: [],
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
const Episode = mongoose.model("Episode", EpisodeSchema);
const UserEpisode = mongoose.model("UserEpisode", UserEpisodeSchema);

export default {
  User: User,
  GcloudResponse: GcloudResponse,
  Pin: Pin,
  Podcast: Podcast,
  Pinshare: Pinshare,
  Episode: Episode,
  UserEpisode: UserEpisode,
};
