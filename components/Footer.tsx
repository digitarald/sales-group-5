import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 mb-8 text-center text-gray-500">
      <p>
        Built with Next.js, Tailwind CSS, and OpenRouter
      </p>
      <p className="mt-1">
        © {new Date().getFullYear()} Breakout Room Background Generator
      </p>
    </footer>
  );
};

export default Footer; 