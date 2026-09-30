import { useId } from 'react';

// The "Aksharadeepam" lamp flame — the school's motif.
export default function Flame({ className = '', muted = false }) {
  const id = useId();
  return (
    <svg
      className={`flame ${className}`.trim()}
      viewBox="0 0 24 34"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {!muted && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe9b0" />
            <stop offset="45%" stopColor="#ffb54d" />
            <stop offset="100%" stopColor="#f2692c" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 0C12 0 3 11 3 20a9 9 0 0018 0C21 11 12 0 12 0z"
        fill={muted ? '#8a97a0' : `url(#${id})`}
      />
      {!muted && (
        <path
          d="M12 15s-4 4.4-4 8.2a4 4 0 008 0C16 19.4 12 15 12 15z"
          fill="#fff6d8"
          opacity=".9"
        />
      )}
    </svg>
  );
}
