import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spacing?: 'normal' | 'large';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  spacing = 'normal'
}) => {
  // 8-point system: py-24 is 96px (12 * 8), py-32 is 128px (16 * 8)
  const verticalPadding = spacing === 'large' ? 'py-32' : 'py-24';

  return (
    <section id={id} className={`relative ${verticalPadding} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;