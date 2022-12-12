import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, required: true },
    events: [
      {
        name: { type: String, required: true },
        operation: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
