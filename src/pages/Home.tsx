import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Phone } from 'lucide-react';
import { DEPARTMENTS } from '../constants/departments';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl">
        <h1 className="text-5xl font-bold mb-6">Welcome to Aarogya Setu</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your trusted healthcare partner. Book appointments with expert doctors and
          receive quality medical care.
        </p>
        <Link
          to="/book-appointment"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Book Appointment
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-sm text-center">
          <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
          <p className="text-gray-600">Book appointments at your convenience</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm text-center">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
          <p className="text-gray-600">Access to qualified specialists</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm text-center">
          <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Round-the-clock medical assistance</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm text-center">
          <Phone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Online Consultations</h3>
          <p className="text-gray-600">Virtual appointments available</p>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Departments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={dept.image}
                alt={dept.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-white text-xl font-semibold mb-2">{dept.name}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{dept.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}