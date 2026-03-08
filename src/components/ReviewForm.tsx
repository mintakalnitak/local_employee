import { useState } from 'react';
import { X, Star, Loader2, CheckCircle } from 'lucide-react';

interface ReviewFormProps {
  employeeId: string;
  employeeName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewForm({ employeeId, employeeName, onClose, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 0,
    comment: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(''); const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

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
    console.log('Review form submitted:', { employeeId, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Review {employeeName}</h3>
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
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Review Submitted!</h4>
            <p className="text-gray-600 dark:text-gray-300">Thank you for your feedback.</p>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating *
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= (hoveredRating || formData.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300 dark:text-gray-600'
                        }`}
                    />
                  </button>
                ))}
                {formData.rating > 0 && (
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Review
              </label>
              <textarea
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Share your experience..."
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
                  'Submit Review'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
