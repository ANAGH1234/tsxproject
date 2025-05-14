import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import type { avatar } from '../models/avatar';

const Avatar: React.FC<avatar> = ({ src, alt = 'Profile', size = 50 }) => {
  return (
    <div
      className="rounded-full border shadow flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          className="rounded-full"
          src={src}
          alt={alt}
          width={size}
          height={size}
        />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-gray-500" />
      )}
    </div>
  );
};

export default Avatar;