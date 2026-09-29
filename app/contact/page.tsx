'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, MapPin, Mail, Phone, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { sendContactMessage } from '@/lib/api/contact';
import { FEST_CONFIG } from '@/lib/constants';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    if (!data.name || !data.email || !data.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await sendContactMessage(data);
      toast.success(response.message);
      form.reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Users, label: 'Organizing Committee', value: 'COLORIDO 2K26 Team', },
    { icon: Mail, label: 'Email', value: FEST_CONFIG.email },
    { icon: Phone, label: 'Phone', value: FEST_CONFIG.phone },
    { icon: MapPin, label: 'Venue', value: FEST_CONFIG.venue },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--colorido-pink))] via-[hsl(var(--colorido-orange))] to-[hsl(var(--colorido-yellow))] p-8 text-center text-white sm:p-12">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-3 text-lg text-white/80">Get in touch with the COLORIDO 2K26 team</p>
        </div>
      </section>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-2">Address</h2>
            <p className="text-sm text-muted-foreground">{FEST_CONFIG.address}</p>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex h-64 items-center justify-center bg-muted">
              <div className="text-center">
                <MapPin className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Map placeholder — {FEST_CONFIG.college}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6">
          <h2 className="font-display text-xl font-bold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-1.5 block">Name</Label>
              <Input name="name" placeholder="Your name" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Email</Label>
              <Input type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Phone</Label>
              <Input name="phone" placeholder="98765 43210" />
            </div>
            <div>
              <Label className="mb-1.5 block">Message</Label>
              <Textarea name="message" placeholder="Your message" rows={5} required />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
