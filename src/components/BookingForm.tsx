import { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';

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

interface BookingFormProps {
  employee: Employee;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingForm({ employee, onClose, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    service_required: '',
    preferred_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(''); const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For local data, we just simulate success
    setSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);

    // In a real application, you would handle the form submission to a backend here.
    console.log('Booking form submitted:', { employeeId: employee.id, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book {employee.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Booking Submitted!</h4>
            <p className="text-gray-600 dark:text-gray-300">
              {employee.name} will contact you shortly to confirm the booking.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Required *
              </label>
              <textarea
                required
                rows={3}
                value={formData.service_required}
                onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe the service you need..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Booking'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
