import { Link } from 'react-router-dom';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor & { department: { name: string } };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={doctor.image_url}
        alt={doctor.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
        <p className="text-gray-600 mb-1">{doctor.specialization}</p>
        <p className="text-gray-500 text-sm mb-4">{doctor.department.name}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{doctor.bio}</p>
        <Link
          to={`/book-appointment?doctor=${doctor.id}`}
          className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}