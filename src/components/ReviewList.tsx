import { Star, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  employee_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{review.customer_name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(review.created_at)}</p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
