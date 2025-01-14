import { ServiceDetails } from '../types/service';

export const mockServices: ServiceDetails[] = [
  {
    id: '1',
    name: 'Yoga Class',
    description: 'Relaxing yoga session with experienced instructor',
    slug: 'yoga-class',
    pricing: {
      type: 'paid',
      price: 25,
      bookingFee: 2,
    },
    duration: '1 hour',
    category: 'wellness',
    categoryId: '2',
    providerId: 'p1',
    maxCapacity: 15,
    status: 'active',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6',
      },
    ],
    rewardPoints: 50,
    schedule: [
      {
        dayOfWeek: 1,
        startTime: '09:00',
        endTime: '17:00',
        slots: 15,
      },
      {
        dayOfWeek: 3,
        startTime: '09:00',
        endTime: '17:00',
        slots: 15,
      },
      {
        dayOfWeek: 5,
        startTime: '09:00',
        endTime: '17:00',
        slots: 15,
      },
    ],
    location: {
      address: '123 Wellness Ave, New York',
      latitude: 40.7128,
      longitude: -74.006,
    },
    bookingsCount: 150,
    rating: 4.8,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    minBookingNotice: 24,
    maxBookingAdvance: 30,
  },
  {
    id: '2',
    name: 'Gym Session',
    description: 'Full access to modern gym equipment and facilities',
    slug: 'gym-session',
    pricing: {
      type: 'paid',
      price: 15,
      bookingFee: 0,
    },
    duration: '2 hours',
    category: 'fitness',
    categoryId: '1',
    providerId: 'p1',
    maxCapacity: 30,
    status: 'active',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
      },
    ],
    rewardPoints: 30,
    schedule: [
      {
        dayOfWeek: 1,
        startTime: '06:00',
        endTime: '22:00',
        slots: 30,
      },
      {
        dayOfWeek: 2,
        startTime: '06:00',
        endTime: '22:00',
        slots: 30,
      },
      {
        dayOfWeek: 3,
        startTime: '06:00',
        endTime: '22:00',
        slots: 30,
      },
      {
        dayOfWeek: 4,
        startTime: '06:00',
        endTime: '22:00',
        slots: 30,
      },
      {
        dayOfWeek: 5,
        startTime: '06:00',
        endTime: '22:00',
        slots: 30,
      },
    ],
    location: {
      address: '456 Fitness Blvd, New York',
      latitude: 40.7589,
      longitude: -73.9851,
    },
    bookingsCount: 300,
    rating: 4.6,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    minBookingNotice: 1,
    maxBookingAdvance: 14,
  },
  {
    id: '3',
    name: 'Kayak Adventure',
    description: 'Exciting kayaking experience for all skill levels',
    slug: 'kayak-adventure',
    pricing: {
      type: 'paid',
      price: 45,
      bookingFee: 5,
    },
    duration: '3 hours',
    category: 'adventure',
    categoryId: '3',
    providerId: 'p2',
    maxCapacity: 8,
    status: 'active',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1572457089352-8ab4cd9f745e',
      },
    ],
    rewardPoints: 100,
    schedule: [
      {
        dayOfWeek: 6,
        startTime: '09:00',
        endTime: '16:00',
        slots: 8,
      },
      {
        dayOfWeek: 0,
        startTime: '09:00',
        endTime: '16:00',
        slots: 8,
      },
    ],
    location: {
      address: '789 River Rd, New York',
      latitude: 40.7829,
      longitude: -73.9654,
    },
    bookingsCount: 80,
    rating: 4.9,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    minBookingNotice: 48,
    maxBookingAdvance: 60,
  },
  {
    id: '4',
    name: 'Mountain Trekking',
    description: 'Guided mountain trek with stunning views',
    slug: 'mountain-trekking',
    pricing: {
      type: 'paid',
      price: 55,
      bookingFee: 5,
    },
    duration: '6 hours',
    category: 'adventure',
    categoryId: '3',
    providerId: 'p2',
    maxCapacity: 10,
    status: 'active',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
      },
    ],
    rewardPoints: 150,
    schedule: [
      {
        dayOfWeek: 6,
        startTime: '07:00',
        endTime: '14:00',
        slots: 10,
      },
    ],
    location: {
      address: '321 Mountain Path, New York',
      latitude: 40.7549,
      longitude: -73.9840,
    },
    bookingsCount: 60,
    rating: 4.7,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    minBookingNotice: 72,
    maxBookingAdvance: 90,
  },
];