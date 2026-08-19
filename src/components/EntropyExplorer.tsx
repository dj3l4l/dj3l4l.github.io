import { useId, useMemo, useState } from 'react';

const labels = ['p₁', 'p₂', 'p₃'];

function entropy(probabilities: number[]) {
  return -probabilities.reduce((sum, p) => sum + (p > 0 ? p * Math.log(p) : 0), 0);
}

export default function EntropyExplorer() {
  const id = useId();
  const [weights, setWeights] = useState([1, 1, 1]);
  const probabilities = useMemo(() => {
    const total = weights.reduce((sum, value) => sum + value, 0);
    return weights.map((value) => value / total);
  }, [weights]);

  const [p1, p2, p3] = probabilities;
  const x = p1 * 150 + p2 * 35 + p3 * 265;
  const y = p1 * 28 + p2 * 220 + p3 * 220;
  const h = entropy(probabilities);
  const maximum = Math.log(3);

  function update(index: number, value: number) {
    setWeights((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
  }

  return (
    <section className="entropy-instrument" aria-labelledby={`${id}-title`}>
      <div className="instrument-heading">
        <div>
          <span className="instrument-kicker">Probability instrument · 01</span>
          <h2 id={`${id}-title`}>Entropy simplex</h2>
        </div>
        <output aria-live="polite">
          <span>Entropy</span>
          <strong>{h.toFixed(3)}</strong>
          <small>of {maximum.toFixed(3)} nats</small>
        </output>
      </div>

      <div className="instrument-grid">
        <svg viewBox="0 0 300 250" role="img" aria-label={`Probability simplex: ${labels.map((label, i) => `${label} ${probabilities[i].toFixed(2)}`).join(', ')}`}>
          <defs>
            <linearGradient id={`${id}-field`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#d4b170" stopOpacity=".35" />
              <stop offset="1" stopColor="#456858" stopOpacity=".08" />
            </linearGradient>
          </defs>
          <path d="M150 28 L35 220 L265 220 Z" fill={`url(#${id}-field)`} stroke="currentColor" strokeWidth="1" />
          <path d="M150 28 L150 220 M35 220 L207.5 124 M265 220 L92.5 124" fill="none" stroke="currentColor" strokeOpacity=".17" strokeDasharray="3 5" />
          <circle cx="150" cy="156" r="3" fill="currentColor" opacity=".28" />
          <circle cx={x} cy={y} r="8" fill="#a45c21" stroke="#fffefb" strokeWidth="3" />
          <text x="150" y="15" textAnchor="middle">p₁ = 1</text>
          <text x="22" y="240" textAnchor="start">p₂ = 1</text>
          <text x="278" y="240" textAnchor="end">p₃ = 1</text>
        </svg>

        <div className="controls">
          {weights.map((weight, index) => (
            <label key={labels[index]} htmlFor={`${id}-${index}`}>
              <span>{labels[index]}</span>
              <input
                id={`${id}-${index}`}
                type="range"
                min="0.05"
                max="3"
                step="0.01"
                value={weight}
                onChange={(event) => update(index, Number(event.currentTarget.value))}
              />
              <output>{probabilities[index].toFixed(2)}</output>
            </label>
          ))}
          <button type="button" onClick={() => setWeights([1, 1, 1])}>Return to maximum entropy</button>
        </div>
      </div>

      <style>{`
        .entropy-instrument { margin: 2.2rem 0; padding: clamp(1rem, 4vw, 1.6rem); border: 1px solid #cfc8b8; border-radius: .2rem; background: #f3f0e7; box-shadow: inset 0 0 40px rgb(112 91 49 / 5%); color: #30302d; }
        .instrument-heading { display: flex; align-items: start; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #cfc8b8; }
        .instrument-kicker { color: #706e67; font-size: .67rem; letter-spacing: .14em; text-transform: uppercase; }
        .instrument-heading h2 { margin: .2rem 0 0; font-size: 1.15rem; font-weight: 400; }
        .instrument-heading output { min-width: 8.5rem; text-align: right; }
        .instrument-heading output span, .instrument-heading output small { display: block; color: #706e67; font-size: .65rem; letter-spacing: .08em; text-transform: uppercase; }
        .instrument-heading output strong { display: block; color: #426657; font-size: 1.55rem; font-variant-numeric: tabular-nums; font-weight: 500; line-height: 1.2; }
        .instrument-grid { display: grid; grid-template-columns: minmax(14rem, 1.15fr) minmax(13rem, .85fr); align-items: center; gap: 1.5rem; margin-top: 1rem; }
        svg { width: 100%; max-height: 20rem; overflow: visible; }
        svg text { fill: currentColor; font: 10px 'Fira Sans', sans-serif; }
        .controls { display: grid; gap: .9rem; }
        .controls label { display: grid; grid-template-columns: 1.5rem 1fr 2.6rem; align-items: center; gap: .65rem; font-size: .78rem; }
        .controls output { text-align: right; font-variant-numeric: tabular-nums; }
        input[type='range'] { width: 100%; accent-color: #a45c21; }
        button { margin-top: .4rem; padding: .6rem .75rem; border: 1px solid #aaa18e; border-radius: .15rem; color: #30302d; background: transparent; font: inherit; font-size: .75rem; letter-spacing: .04em; cursor: pointer; }
        button:hover { background: #e8e3d7; }
        @media (max-width: 38rem) { .instrument-grid { grid-template-columns: 1fr; } .instrument-heading { align-items: end; } }
      `}</style>
    </section>
  );
}
