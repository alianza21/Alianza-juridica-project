import mongoose, { Schema, Document } from 'mongoose';

export interface IConsulta extends Document {
  expIdentifier: string;
  fullName: string;
  documentId: string;
  email?: string;
  phone: string;
  problemDescription: string;
  town: string;
  contactMethod?: string;
  privacyPolicy: boolean;
  createdAt: Date;
}

const ConsultaSchema: Schema = new Schema<IConsulta>({
  expIdentifier: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  documentId: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  problemDescription: { type: String, required: true },
  town: { type: String, required: true },
  contactMethod: { type: String },
  privacyPolicy: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Consulta = mongoose.models.Consulta || mongoose.model<IConsulta>('Consulta', ConsultaSchema);
export default Consulta;
