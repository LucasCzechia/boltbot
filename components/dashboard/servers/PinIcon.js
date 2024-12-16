// components/dashboard/servers/PinIcon.js
export default function PinIcon({ isPinned }) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill={isPinned ? '#ffcc00' : 'none'}
      stroke={isPinned ? '#ffcc00' : '#666'}
      strokeWidth="1.5"
      className="pin-icon"
    >
      <path 
        d="M12 2L12 16M12 2L8 6M12 2L16 6M6 16H18M8 21H16" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}
