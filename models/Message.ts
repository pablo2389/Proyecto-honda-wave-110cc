import { Schema, model, models, Document } from 'mongoose';

interface Message extends Document {
  text: string;
  user: string;
  imageUrl?: string;
  createdAt: Date;
}

const MessageSchema = new Schema<Message>({
  text: { type: String, required: true },
  user: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = models.Message || model<Message>('Message', MessageSchema);

export default MessageModel;
