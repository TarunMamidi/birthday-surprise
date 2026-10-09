
import './Sunflowers.css';

const flowers = [
  { id: 1, className: 'sunflower-one', size: '24px' },
  { id: 2, className: 'sunflower-two', size: '32px' },
  { id: 3, className: 'sunflower-three', size: '20px' },
  { id: 4, className: 'sunflower-four', size: '28px' },
  { id: 5, className: 'sunflower-five', size: '22px' },
  { id: 6, className: 'sunflower-six', size: '30px' },
  { id: 7, className: 'sunflower-seven', size: '18px' },
];

export default function Sunflowers() {
  return (
    <div className="sunflowers-layer" aria-hidden="true">
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className={`floating-sunflower ${flower.className}`}
          style={{ '--flower-size': flower.size }}
        >
          🌻
        </span>
      ))}
    </div>
  );
}
