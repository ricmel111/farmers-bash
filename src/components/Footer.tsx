import React from 'react';

const Footer = () => {
  const sponsors = [
    { name: 'Downtown Country', image: '/images/sponsors/Media-Partner-DowntownCountry.png' },
    { name: 'Cool FM', image: '/images/sponsors/Media-Partner-CoolFM.png' },
    { name: 'Irish News', image: '/images/sponsors/Media-Partner-IrishNews.png' },
    { name: 'Farm FLIX', image: '/images/sponsors/Media-Partner-FarmFLIX.png' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Official Media Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="bg-transparent rounded-lg p-4 flex items-center justify-center"
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="max-h-16"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <a 
              href="/signup" 
              className="text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              Subscribe to Newsletter
            </a>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Farmers Bash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;