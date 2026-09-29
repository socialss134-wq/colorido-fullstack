
'use client';

import { useState, useEffect } from 'react';
import { EventDetails } from '@/components/events/EventDetails';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getEventById } from '@/lib/api/events';
import type { FestEvent } from '@/lib/types';

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [event, setEvent] = useState<FestEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load event:', error);
        setEvent(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading event details..." />;
  }

  if (!event) {
    return (
      <EmptyState
        title="Event not found"
        message="The event you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <EventDetails event={event} />
    </div>
  );
}
