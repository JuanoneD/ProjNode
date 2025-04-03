import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    customerId: string;
    productsIds: string[];
    status: string;
}
const OrderSchema: Schema = new Schema({
    customerId: { type: String, required: true },
    productsIds: { type: [String], required: true },
    status: { type: Number, required: true },
});
const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;