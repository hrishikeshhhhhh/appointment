export type Department = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

export type Doctor = {
  id: string;
  name: string;
  department_id: string;
  specialization: string;
  image_url: string;
  bio: string;
};

export type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
};

export type Patient = {
  id: string;
  email: string;
  name: string;
  phone: string;
  date_of_birth: string;
  created_at: string;
};