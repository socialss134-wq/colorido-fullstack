import { SectionHeading } from '@/components/shared/SectionHeading';
import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { Card } from '@/components/ui/card';
import { FEST_CONFIG } from '@/lib/constants';
import { Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';

export default function RegistrationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Register Now</h1>
          <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
            Fill in your details to participate in COLORIDO 2K26
          </p>
        </div>
      </section>

      <Card className="mt-8 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fest Date</p>
              <p className="text-sm font-medium">March 15-18, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium">March 10, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Venue</p>
              <p className="text-sm font-medium">{FEST_CONFIG.venue}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <p>Please ensure all information is accurate. You will receive a registration ID upon successful submission. Keep it for future reference.</p>
      </div>

      <div className="mt-8">
        <RegistrationForm />
      </div>
    </div>
  );
}
