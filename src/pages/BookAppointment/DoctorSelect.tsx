import { Doctor } from '../../types';

interface DoctorSelectProps {
  doctors: Doctor[];
  selectedDoctor: string;
  onSelectDoctor: (doctorId: string) => void;
}

export default function DoctorSelect({
  doctors,
  selectedDoctor,
  onSelectDoctor,
}: DoctorSelectProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <button
          key={doctor.id}
          onClick={() => onSelectDoctor(doctor.id)}
          className={`p-4 rounded-lg border transition-colors ${
            selectedDoctor === doctor.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <img
            src={doctor.image_url}
            alt={doctor.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-semibold text-lg">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialization}</p>
        </button>
      ))}
    </div>
  );
}