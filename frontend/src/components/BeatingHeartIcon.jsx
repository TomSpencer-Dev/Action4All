//Component containing a beating heart animation
import React from 'react';

const BeatingHeartIcon = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '10px' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21.35l-1.46-1.33C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.54 11.52L12 21.35z"
        fill="red"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="scale"
          values="1;1.1;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default BeatingHeartIcon;
