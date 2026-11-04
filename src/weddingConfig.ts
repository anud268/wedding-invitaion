export interface WeddingEvent {
  title: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  location: string;
  mapsUrl: string;
  image: string;
}

export const weddingConfig = {
  couple: {
    groom: {
      title: 'Mr.',
      name: 'Anudas',
      shortName: 'Anu',
      photo: '/images/groom.png',
      note: 'Son of the family, with a quiet heart and a lifelong promise.',
    },
    bride: {
      title: 'Mrs.',
      name: 'Sikhila',
      shortName: 'Sikilu',
      photo: '/images/bride.jpeg',
      note: 'Daughter of the family, bringing grace, warmth, and light.',
    },
  },

  ceremony: {
    title: 'Wedding Ceremony',
    date: '10 February 2027',
    day: 'Wednesday',
    time: '09:00 AM',
    venue: 'Guruvayoor Temple',
    location: 'Guruvayoor, Kerala',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Guruvayoor+Temple+Guruvayoor+Kerala+India',
    image: '/images/ceremony.jpg',
  } satisfies WeddingEvent,

  reception: {
    title: 'Wedding Reception',
    date: '14 February 2027',
    day: 'Sunday',
    time: '11:00 AM',
    venue: 'Krishnasree Auditorium',
    location: 'Para, Elappully, Palakkad',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Krishnasree+Auditorium+Para+Elappully+Palakkad+Kerala+India',
    image: '/images/reception.jpg',
  } satisfies WeddingEvent,

  countdownTarget: {
    date: '2027-02-10',
    time: '09:00',
    timezone: 'Asia/Kolkata',
  },

  invitationMessage:
    'What began as a part-time job in Kochi brought two strangers together — and slowly turned them into best friends, and then into something more. Through evening chai on the streets of Kochi, late-night conversations, the pain of distance, and two years of patience and hope — we found our forever in each other. Now, with grateful hearts and the blessings of Guruvayurappan, we invite you to be part of our most beautiful chapter.',

  closingMessage: 'Your presence is the greatest blessing we could ask for.',

  storyPhotos: ['/images/story-1.jpeg', '/images/story-2.jpeg', '/images/story-3.jpeg'],

  journey: [
    {
      year: 'Kochi',
      title: 'Strangers Who Met',
      photo: '/images/journey-1.jpg',
    },
    {
      year: 'Distance',
      title: 'Love in Disguise',
      photo: '/images/journey-2.jpg',
    },
    {
      year: '2027',
      title: 'Forever Begins',
      photo: '/images/journey-3.jpg',
    },
  ],
};
