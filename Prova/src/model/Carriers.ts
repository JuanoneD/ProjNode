import mongoose, { Schema, Document } from 'mongoose';

interface ICarrier extends Document {
    name: string;
    CNPJ: string;
    carriageType: string;
    deliveresIds: string[];
}

const CarrierSchema: Schema = new Schema({
    name: { type: String, required: true },
    CNPJ: { type: String, required: true },
    carriageType: { type: Number, required: true },
});

const Carrier = mongoose.model<ICarrier>('Carrier', CarrierSchema);

export default Carrier;