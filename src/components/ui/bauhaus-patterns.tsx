import React from 'react';

interface BauhausPatternProps {
  variant?: 'header' | 'background' | 'accent';
  className?: string;
}

export const BauhausPattern: React.FC<BauhausPatternProps> = ({ 
  variant = 'background',
  className = '' 
}) => {
  if (variant === 'header') {
    return (
      <div className={`absolute pointer-events-none z-0 bg-white ${className}`}>
        <div className="absolute top-0 right-0 w-60 h-60 overflow-hidden">
          <div className="absolute -top-12 -right-12 bg-bauhaus-red w-36 h-36 rounded-full"></div>
          <div className="absolute top-12 -right-12 bg-bauhaus-blue w-36 h-36 rounded-tl-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-60 h-60 overflow-hidden">
          <div className="absolute -bottom-12 -left-12 bg-bauhaus-yellow w-36 h-36 rounded-full"></div>
          <div className="absolute -bottom-12 left-12 bg-bauhaus-black w-36 h-36 rounded-tr-full"></div>
        </div>
        <div className="absolute right-1/4 bottom-1/4">
          <div className="h-12 w-48 border-t-4 border-bauhaus-black"></div>
          <div className="h-12 w-48 border-t-4 border-bauhaus-black"></div>
          <div className="h-12 w-48 border-t-4 border-bauhaus-black"></div>
        </div>
      </div>
    );
  }
  
  if (variant === 'accent') {
    return (
      <div className={`absolute pointer-events-none z-0 bg-white ${className}`}>
        <div className="absolute top-0 right-0 w-24 h-24">
          <div className="absolute top-0 right-0 bg-bauhaus-blue w-12 h-12 rounded-bl-full"></div>
          <div className="absolute top-0 right-12 bg-bauhaus-red w-12 h-12 rounded-br-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24">
          <div className="absolute bottom-0 left-0 bg-bauhaus-yellow w-12 h-12 rounded-tr-full"></div>
          <div className="absolute bottom-0 left-12 bg-bauhaus-black w-12 h-12 rounded-tl-full"></div>
        </div>
      </div>
    );
  }
  
  // Default background pattern with fully opaque colors
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 bg-white ${className}`}>
      {/* Top right corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <div className="absolute top-0 right-0 bg-bauhaus-red w-1/2 h-1/2 rounded-bl-full"></div>
        <div className="absolute top-0 right-1/2 bg-bauhaus-blue w-1/2 h-1/2 rounded-br-full"></div>
      </div>
      
      {/* Bottom left corner */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3">
        <div className="absolute bottom-0 left-0 bg-bauhaus-red w-1/2 h-1/2 rounded-tr-full"></div>
        <div className="absolute bottom-0 left-1/2 bg-bauhaus-yellow w-1/2 h-1/2 rounded-tl-full"></div>
      </div>
      
      {/* Bottom right lines */}
      <div className="absolute right-1/4 bottom-0 w-1/5">
        <div className="absolute bottom-0 right-0 w-full">
          <div className="h-16 border-t-4 border-bauhaus-black"></div>
          <div className="h-16 border-t-4 border-bauhaus-black"></div>
          <div className="h-16 border-t-4 border-bauhaus-black"></div>
        </div>
      </div>
      
      {/* Top left square */}
      <div className="absolute top-12 left-12 size-24">
        <div className="absolute inset-0">
          <div className="h-full w-full border-4 border-bauhaus-black rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default BauhausPattern; 