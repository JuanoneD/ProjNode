import mongoose, { Schema, Document } from 'mongoose';
import { PassThrough } from 'stream';

interface ICustomer extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    ordersIds: string[];
    password: string;
}

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    ordersIds: { type: [String], required: false },
    password: { type: String, required: true },
});

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
export { CustomerSchema }