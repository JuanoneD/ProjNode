import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document{
    title:string,
    description:string,
    completed : boolean,
    createdAt : Date,
    updateAt : Date
}

const TaskSchema: Schema = new Schema({
    title: String,
    description: String,
    completed: { type:Boolean,default:false},
    createdAt: { type:Date,default: Date.now},
    updateAt: { type:Date,default:Date.now},
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;