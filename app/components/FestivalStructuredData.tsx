export default function FestivalStructuredData() {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'MusicFestival',
    name: "Farmer's Bash",
    description: "Northern Ireland's biggest country music festival featuring live performances, line dancing, and rural entertainment",
    image: 'https://farmersbash.com/og-festival-image.jpg',
    startDate: '2024-10-15T18:00', // Update with actual date
    endDate: '2024-10-17T23:00', // Update with actual date
    location: {
      '@type': 'Place',
      name: 'Festival Venue Name', // Update with actual venue
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Venue Address', // Update with actual address
        addressLocality: 'Belfast', // Update with actual city
        addressRegion: 'Northern Ireland',
        postalCode: 'POST CODE', // Update with actual postcode
        addressCountry: 'GB'
      }
    },
    offers: {
      '@type': 'Offer',
      url: 'https://farmersbash.com/tickets',
      price: '45.00',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock'
    },
    performer: [
      {
        '@type': 'MusicGroup',
        name: 'Performer Name' // Update with actual performers
      }
      // Add more performers
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