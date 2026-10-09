
import './Butterflies.css';
import useMagicBurst from '../../hooks/MagicBurst';

const butterflies = [
  { id: 1, className: 'butterfly-one', size: '30px' },
  { id: 2, className: 'butterfly-two', size: '34px' },
  { id: 3, className: 'butterfly-three', size: '26px' },
  { id: 4, className: 'butterfly-four', size: '32px' },
  { id: 5, className: 'butterfly-five', size: '28px' },
];

export default function Butterflies() {
  const burst = useMagicBurst();

  return (
    <div className="butterflies-layer">
      {butterflies.map((butterfly) => (
        <button
          key={butterfly.id}
          type="button"
          className={`floating-butterfly ${butterfly.className}`}
          style={{ '--butterfly-size': butterfly.size }}
          onClick={(event) => burst(event, 'butterfly')}
          aria-label="Tap for butterfly sparkles"
          title="Tap for magic ✨"
        >
          🦋
        </button>
      ))}
    </div>
  );
}
