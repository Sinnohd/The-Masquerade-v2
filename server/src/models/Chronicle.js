import mongoose from 'mongoose';
import Story from './Story';
import Coterie from './Coterie';
import Player from './Player';

const Statuses = Object.freeze({
  Draft: 'draft',
  Live: 'live',
  Archived: 'archived',
  Deleted: 'deleted'
});

const ChronicleSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  privateStory: String,
  publicStory: String,
  storyTeller: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  status: { type: String, enum: Object.values(Statuses), default: 'draft' },
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  coteries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coterie' }],
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  backgroundImage: String
});

ChronicleSchema.post("remove", async chronicle => {
  if (chronicle.stories) {
    chronicle.stories.forEach(async element => {
      await Story.deleteOne({ _id: element });
    });
  }
  if (chronicle.coteries) {
    chronicle.coteries.forEach(async element => {
      await Coterie.deleteOne({ _id: element });
    });
  }
  if (chronicle.players) {
    chronicle.players.forEach(async element => {
      await Player.deleteOne({ _id: element });
    });
  }
});

Object.assign(ChronicleSchema.static, { Statuses });

let Chronicle = mongoose.model('Chronicle', ChronicleSchema); 

export default Chronicle;