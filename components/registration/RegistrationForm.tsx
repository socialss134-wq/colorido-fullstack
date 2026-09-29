
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Plus, Trash2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { registerParticipant } from '@/lib/api/registrations';
import { getEvents } from '@/lib/api/events';

import type { FestEvent, EventType } from '@/lib/types';

const schema = z.object({
  participantName: z
    .string()
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .email('Invalid email address'),

  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits'),

  college: z
    .string()
    .min(2, 'College name is required'),

  year: z
    .string()
    .min(1, 'Please select a year'),

  department: z
    .string()
    .min(2, 'Department is required'),

  gender: z
    .string()
    .min(1, 'Please select gender'),

  eventCategory: z.enum(['Cultural', 'Sports']),

  eventId: z
    .string()
    .min(1, 'Please select an event'),

  eventType: z
    .string()
    .optional(),

  teamName: z
    .string()
    .optional(),

  teamMembers: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        phone: z.string().min(10, 'Phone must be at least 10 digits'),
      })
    )
    .optional(),

  address: z
    .string()
    .min(5, 'Address is required'),

  emergencyContact: z
    .string()
    .min(10, 'Emergency contact is required'),

  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: 'You must accept the terms and conditions',
    }),
  }),
});

type FormData = z.infer<typeof schema>;

export function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const presetEventId = searchParams.get('eventId');

  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      eventCategory: 'Cultural',
      termsAccepted: false as unknown as true,
      teamMembers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const selectedCategory = watch('eventCategory');
  const selectedEventId = watch('eventId');

  const selectedEvent = events.find(
    (event) => event.id === selectedEventId
  );

  const isTeamEvent =
    selectedEvent &&
    (selectedEvent.type === 'Group' ||
      selectedEvent.type === 'Team');

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);

        if (presetEventId) {
          const event = data.find(
            (event) => event.id === presetEventId
          );

          if (event) {
            setValue('eventId', event.id);
            setValue('eventCategory', event.category);
            setValue('eventType', event.type);
          }
        }
      })
      .catch((error) => {
        console.error('Failed to load events:', error);
        setLoading(false);
        toast.error('Failed to load events.');
      });
  }, [presetEventId, setValue]);

  useEffect(() => {
    if (selectedEvent) {
      setValue('eventType', selectedEvent.type);
    }
  }, [selectedEvent, setValue]);

  const filteredEvents = events.filter(
    (event) => event.category === selectedCategory
  );

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);

    try {
      const event = events.find(
        (event) => event.id === data.eventId
      );

      if (!event) {
        toast.error('Please select a valid event.');
        return;
      }

      /*
       * Event type comes from the database event.
       * The backend treats eventId as authoritative.
       */
      const eventType: EventType =
        (data.eventType || event.type || 'Solo') as EventType;

      const response = await registerParticipant({
        participantName: data.participantName,
        email: data.email,
        phone: data.phone,
        college: data.college,
        year: data.year,
        department: data.department,
        gender: data.gender,

        eventCategory: data.eventCategory,
        eventId: data.eventId,
        eventName: event.name,

        eventType,

        teamName: data.teamName,
        teamMembers: data.teamMembers,

        address: data.address,
        emergencyContact: data.emergencyContact,

        termsAccepted: true,
      });

      toast.success('Registration successful!');

      const query = new URLSearchParams({
        id: response.registrationId,
        name: response.participantName,
        event: response.eventName,
      }).toString();

      router.push(
        `/registration-success?${query}`
      );
    } catch (error) {
      console.error(
        'Registration error:',
        error
      );

      /*
       * Show the actual backend error.
       * This is especially useful for 422 validation errors.
       */
      const message =
        error instanceof Error
          ? error.message
          : 'Registration failed. Please try again.';

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Personal Information */}

      <Card className="p-6">
        <h2 className="font-display text-xl font-bold mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Participant Name"
            error={errors.participantName?.message}
          >
            <Input
              {...register('participantName')}
              placeholder="Enter your full name"
            />
          </Field>

          <Field
            label="Email"
            error={errors.email?.message}
          >
            <Input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
            />
          </Field>

          <Field
            label="Phone Number"
            error={errors.phone?.message}
          >
            <Input
              {...register('phone')}
              placeholder="98765 43210"
            />
          </Field>

          <Field
            label="College / Institution"
            error={errors.college?.message}
          >
            <Input
              {...register('college')}
              placeholder="Your college name"
            />
          </Field>

          <Field
            label="Year"
            error={errors.year?.message}
          >
            <Select
              onValueChange={(value) =>
                setValue('year', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">
                  1st Year
                </SelectItem>

                <SelectItem value="2">
                  2nd Year
                </SelectItem>

                <SelectItem value="3">
                  3rd Year
                </SelectItem>

                <SelectItem value="4">
                  4th Year
                </SelectItem>

                <SelectItem value="5">
                  5th Year
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field
            label="Department"
            error={errors.department?.message}
          >
            <Input
              {...register('department')}
              placeholder="Your department"
            />
          </Field>

          <Field
            label="Gender"
            error={errors.gender?.message}
          >
            <Select
              onValueChange={(value) =>
                setValue('gender', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Male">
                  Male
                </SelectItem>

                <SelectItem value="Female">
                  Female
                </SelectItem>

                <SelectItem value="Other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Card>

      {/* Event Selection */}

      <Card className="p-6">
        <h2 className="font-display text-xl font-bold mb-6">
          Event Selection
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Event Category"
            error={errors.eventCategory?.message}
          >
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setValue(
                  'eventCategory',
                  value as 'Cultural' | 'Sports'
                );

                setValue('eventId', '');
                setValue('eventType', '');
                setValue('teamName', '');
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Cultural">
                  Cultural
                </SelectItem>

                <SelectItem value="Sports">
                  Sports
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field
            label="Event"
            error={errors.eventId?.message}
          >
            <Select
              value={selectedEventId || ''}
              onValueChange={(value) =>
                setValue('eventId', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>

              <SelectContent>
                {filteredEvents.map((event) => (
                  <SelectItem
                    key={event.id}
                    value={event.id}
                  >
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Team Event Fields */}

        {isTeamEvent && (
          <div className="mt-6 space-y-4">
            <Field
              label="Team Name"
              error={errors.teamName?.message}
            >
              <Input
                {...register('teamName')}
                placeholder="Enter team name"
              />
            </Field>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>
                  Team Members
                </Label>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      name: '',
                      email: '',
                      phone: '',
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Member
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-2 rounded-lg border p-3 sm:grid-cols-4"
                  >
                    <Input
                      {...register(
                        `teamMembers.${index}.name`
                      )}
                      placeholder="Name"
                    />

                    <Input
                      {...register(
                        `teamMembers.${index}.email`
                      )}
                      placeholder="Email"
                    />

                    <Input
                      {...register(
                        `teamMembers.${index}.phone`
                      )}
                      placeholder="Phone"
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No team members added yet.
                    Click "Add Member" to add.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Additional Information */}

      <Card className="p-6">
        <h2 className="font-display text-xl font-bold mb-6">
          Additional Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Address"
            error={errors.address?.message}
            className="sm:col-span-2"
          >
            <Input
              {...register('address')}
              placeholder="Your full address"
            />
          </Field>

          <Field
            label="Emergency Contact"
            error={errors.emergencyContact?.message}
          >
            <Input
              {...register('emergencyContact')}
              placeholder="98765 43210"
            />
          </Field>
        </div>
      </Card>

      {/* Terms */}

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={
              watch('termsAccepted') as boolean
            }
            onCheckedChange={(checked) =>
              setValue(
                'termsAccepted',
                checked as true
              )
            }
          />

          <div>
            <Label
              htmlFor="terms"
              className="cursor-pointer"
            >
              I accept the Terms and Conditions
            </Label>

            <p className="text-xs text-muted-foreground mt-1">
              I confirm that all information provided
              is accurate. I agree to follow all event
              rules and guidelines.
            </p>

            {errors.termsAccepted && (
              <p className="text-xs text-destructive mt-1">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Submit */}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white"
        size="lg"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Registration...
          </>
        ) : (
          'Submit Registration'
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block">
        {label}
      </Label>

      {children}

      {error && (
        <p className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
