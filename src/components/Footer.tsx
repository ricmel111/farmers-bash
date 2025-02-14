import React from 'react';

const Footer = () => {
  const sponsors = [
    'Farm Equipment Co.',
    'Country Radio 101.5',
    'Rural Bank',
    'Local News Network',
    'Agricultural Times',
    'Country Music Channel',
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Sponsors & Media Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor}
                className="bg-white rounded-lg p-4 flex items-center justify-center"
              >
                <span className="text-gray-900 font-semibold text-center">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Farmers Bash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;