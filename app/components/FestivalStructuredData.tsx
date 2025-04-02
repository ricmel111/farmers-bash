import React from 'react';

export default function FestivalStructuredData() {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'MusicFestival',
    name: "Farmer's Bash",
    description: "Farmer's Bash - Northern Ireland's biggest music event, uniting top live talent with thousands of passionate fans.",
    image: 'https://farmersbash.com/og-festival-image.jpg',
    startDate: '2025-08-09', // Update with actual date
    endDate: '2025-08-10', // Update with actual date
    location: {
      '@type': 'Place',
      name: 'Boucher Playing Fields'
    },
    performer: [
      {
        '@type': 'MusicGroup',
        name: 'Kaiser Chiefs'
      },
      {
        '@type': 'MusicGroup',
        name: 'The Coronas'
      },
      {
        '@type': 'MusicGroup',
        name: 'The 2 Johnnies'
      },
      {
        '@type': 'MusicGroup',
        name: 'Derek Ryan'
      },
      {
        '@type': 'MusicGroup',
        name: 'Nathan Carter'
      },
      {
        '@type': 'MusicGroup',
        name: 'Boyzlife'
      },
      {
        '@type': 'MusicGroup',
        name: 'Mark McCabe'
      },
      {
        '@type': 'MusicGroup',
        name: 'The Tumbling Paddies'
      },
      {
        '@type': 'MusicGroup',
        name: 'B*Witched'
      },
      {
        '@type': 'MusicGroup',
        name: 'Garron Noone'
      },
      {
        '@type': 'MusicGroup',
        name: "All Folk'd Up"
      },
      {
        '@type': 'MusicGroup',
        name: "Luke Combs UK"
      },
      {
        '@type': 'MusicGroup',
        name: 'Allie Sherlock'
      },
      {
        '@type': 'MusicGroup',
        name: 'Clodagh Lawlor'
      },
      {
        '@type': 'MusicGroup',
        name: 'David James'
      },
      {
        '@type': 'MusicGroup',
        name: 'Lisa McHugh'
      },
      {
        '@type': 'MusicGroup',
        name: 'Mike Denver'
      },
      {
        '@type': 'MusicGroup',
        name: 'Olivia Douglas'
      },
      {
        '@type': 'MusicGroup',
        name: 'Robert Mizzell'
      },
      {
        '@type': 'MusicGroup',
        name: 'Claudia Buckley'
      },
      {
        '@type': 'MusicGroup',
        name: 'Jimmy Buckley'
      },
      {
        '@type': 'MusicGroup',
        name: 'Johnny Brady'
      },
      {
        '@type': 'MusicGroup',
        name: 'Folk That Rock'
      },
      {
        '@type': 'MusicGroup',
        name: 'Shrek Rave'
      },
      {
        '@type': 'MusicGroup',
        name: 'The 30+ Club'
      },
      {
        '@type': 'MusicGroup',
        name: 'Sheep Shearing Disco'
      },
      {
        '@type': 'MusicGroup',
        name: 'Bingo Loco'
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventData)
      }}
    />
  )
} 