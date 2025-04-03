import mongoose, { Schema, Document } from 'mongoose';

interface IDelivery extends Document {
    orderId: string;
    carrierId: string;
    status: string;
}

const DeliverySchema: Schema = new Schema({
    orderId: { type: String, required: true },
    carrierId: { type: String, required: true },
    status: { type: Number, required: true },
});
const Delivery = mongoose.model<IDelivery>('Delivery', DeliverySchema);
export default Delivery;