import React from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';

export function Features() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MapPin className="w-8 h-8 text-blue-600" />}
            title="Multiple Locations"
            description="Find services near you with our location-based search"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Easy Booking"
            description="Book your preferred time slot with just a few clicks"
          />
          <FeatureCard
            icon={<Award className="w-8 h-8 text-blue-600" />}
            title="Reward Points"
            description="Earn points with every booking and get exclusive rewards"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}