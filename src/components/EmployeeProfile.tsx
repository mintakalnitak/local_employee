import { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, Briefcase, Loader2 } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Employee {
  id: string;
  name: string;
  profession: string;
  location: string;
  phone: string;
  email: string | null;
  rating: number;
  skills: string[];
  availability: string;
  photo_url: string | null;
  description: string;
  experience_years: number;
}

interface Review {
  id: string;
  employee_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface EmployeeProfileProps {
  employeeId: string;
  onClose: () => void;
}

export function EmployeeProfile({ employeeId, onClose }: EmployeeProfileProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false); useEffect(() => {
    fetchEmployeeData();
    fetchReviews();
  }, [employeeId]);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'employees', employeeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEmployee({ id: docSnap.id, ...docSnap.data() } as Employee);
      } else {
        setEmployee(null);
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = () => {
    // For now, we'll simulate reviews. In a real app, these would come from a local JSON or API.
    const localReviews: Review[] = [
      {
        id: "rev1",
        employee_id: employeeId,
        customer_name: "Rahul S.",
        rating: 5,
        comment: "Excellent service! Manoj fixed our leaky faucet quickly and efficiently. Highly recommended.",
        created_at: "2024-01-15T10:00:00Z"
      },
      {
        id: "rev2",
        employee_id: employeeId,
        customer_name: "Deepa K.",
        rating: 4,
        comment: "Priya did a great job with the electrical wiring. Very professional and tidy work.",
        created_at: "2024-01-10T14:30:00Z"
      }
    ];
    setReviews(localReviews.filter(review => review.employee_id === employeeId));
  };


  const handleBookingSuccess = () => {
    setShowBookingForm(false);
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    fetchReviews(); // Re-fetch reviews to show the new one
    fetchEmployeeData(); // Re-fetch employee data to update rating if implemented
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Employee not found</p>
        <button onClick={onClose} className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-500">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to search
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-48 sm:h-64">
            {employee.photo_url ? (
              <img
                src={employee.photo_url}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Briefcase className="w-24 h-24 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

          <div className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{employee.name}</h1>
                <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">{employee.profession}</p>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(employee.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300 dark:text-gray-600'
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-md sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {employee.rating.toFixed(1)}
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">({reviews.length} reviews)</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors font-medium"
                >
                  Book Now
                </button>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <a href={`tel:${employee.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {employee.phone}
                  </a>
                </div>
                {employee.email && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                    <a href={`mailto:${employee.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {employee.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span>{employee.availability}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Briefcase className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span>{employee.experience_years} years of experience</span>
                </div>
              </div>
            </div>

            {employee.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{employee.description}</p>
              </div>
            )}

            {employee.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Reviews ({reviews.length})
          </h2>
          <ReviewList reviews={reviews} />
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          employee={employee}
          onClose={() => setShowBookingForm(false)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {showReviewForm && (
        <ReviewForm
          employeeId={employee.id}
          employeeName={employee.name}
          onClose={() => setShowReviewForm(false)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}
