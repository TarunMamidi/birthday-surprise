
import { useCallback } from 'react';

export default function useMagicBurst() {
  return useCallback((event, type = 'flower') => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const symbols =
      type === 'butterfly'
        ? ['✨', '💛', '✦', '♡', '🦋']
        : ['✨', '🌼', '💛', '✦', '♡', '🌻'];

    for (let i = 0; i < 9; i++) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 9;
      const distance = 35 + Math.random() * 40;

      particle.className = 'magic-particle';
      particle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty(
        '--burst-x',
        `${Math.cos(angle) * distance}px`
      );
      particle.style.setProperty(
        '--burst-y',
        `${Math.sin(angle) * distance}px`
      );

      document.body.appendChild(particle);
      particle.addEventListener('animationend', () => {
        particle.remove();
      }, { once: true });
    }
  }, []);
}
