import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import ReviewCard from './ReviewCard';
import CreateReviewForm from './CreateReviewForm';

const ReviewSection = ({ tutorId, studentId, canReview }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/resenas/tutor/${tutorId}`);
      // Sort by date descending
      const sorted = response.sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn));
      setReviews(sorted);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tutorId]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  return (
    <div className="space-y-10 pt-10 border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-primary font-headline">Reseñas de Estudiantes</h3>
          <p className="text-sm text-gray-500 font-display">Conoce la experiencia de otros estudiantes con este tutor.</p>
        </div>
        
        {canReview && !showCreateForm && (
          <button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-academic-gold/10 text-academic-gold font-bold rounded-xl hover:bg-academic-gold/20 transition-all font-display border border-academic-gold/20"
          >
            <span className="material-symbols-outlined text-base">rate_review</span>
            Dejar una reseña
          </button>
        )}
      </div>

      {showCreateForm && (
        <CreateReviewForm 
          tutorId={tutorId} 
          estudianteId={studentId} 
          onCancel={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            fetchReviews();
          }}
        />
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-surface-container-low animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.slice(0, visibleCount).map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          
          {visibleCount < reviews.length && (
            <div className="flex justify-center pt-6">
              <button 
                onClick={loadMore}
                className="px-8 py-3 bg-surface-container-low text-primary font-bold rounded-xl hover:bg-surface-container-high transition-all font-display border border-outline-variant/10"
              >
                Cargar más reseñas
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">forum</span>
          <p className="text-elegant-gray font-medium font-display">Aún no hay reseñas para este tutor.</p>
          <p className="text-xs text-gray-400 font-display">¡Sé el primero en calificarlo!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
