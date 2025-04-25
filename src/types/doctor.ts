
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  consultationMode: ('video' | 'clinic')[];
  imageUrl?: string;
  qualification?: string;
  location?: string;
  clinic?: string;
}
