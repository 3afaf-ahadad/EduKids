const rainbowColors = [
  '#FF6B6B', // red
  '#FFA94D', // orange
  '#FFD43B', // yellow
  '#69DB7C', // green
  '#4DABF7', // blue
  '#748FFC', // indigo
  '#9775FA', // violet
];

const Logo = ({ size = 'text-4xl' }) => {
  const letters = 'EduKids'.split('');
  return (
    <div className={`font-['Fredoka_One',cursive] font-bold ${size} flex items-center justify-center`}
         style={{ letterSpacing: '4px', textShadow: '3px 3px 0 rgba(0,0,0,0.1)' }}>
      {letters.map((letter, i) => (
        <span key={i} style={{ color: rainbowColors[i % rainbowColors.length] }}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Logo;