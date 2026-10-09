
import './Butterflies.css';

const butterflies = [
  { id: 1, className: 'butterfly-one' },
  { id: 2, className: 'butterfly-two' },
  { id: 3, className: 'butterfly-three' },
  { id: 4, className: 'butterfly-four' },
  { id: 5, className: 'butterfly-five' },
];

function Butterflies() {
  return (
    <div className="butterflies-layer" aria-hidden="true">
      {butterflies.map((butterfly) => (
        <span
          key={butterfly.id}
          className={`floating-butterfly ${butterfly.className}`}
        >
          🦋
        </span>
      ))}
    </div>
  );
}

export default Butterflies;
