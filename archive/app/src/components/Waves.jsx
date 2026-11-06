export default function Waves() {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const y = 120 + i * 60;
    const a = 60 + (i % 3) * 20;
    return `M-50 ${y} C 300 ${y - a}, 520 ${y + a}, 800 ${y} S 1300 ${y - a}, 1650 ${y + a / 2}`;
  });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
      <div className="absolute left-1/2 top-[-260px] h-[520px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,85,0,0.22),rgba(255,85,0,0))]" />
      <div className="absolute -left-40 top-[420px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(255,85,0,0.12),rgba(255,85,0,0))]" />
      <div className="absolute -right-40 top-[260px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(255,120,40,0.1),rgba(255,85,0,0))]" />
      <svg className="absolute left-1/2 top-0 h-full w-[1600px] max-w-none -translate-x-1/2" viewBox="0 0 1600 900" fill="none" preserveAspectRatio="xMidYMin slice">
        {paths.map((d, i) => (
          <path key={i} d={d} stroke="#FFFFFF" strokeOpacity={i % 2 ? 0.03 : 0.045} strokeWidth="0.75" />
        ))}
        <path className="neon-line" d={paths[2]} stroke="#FF5500" strokeOpacity="0.45" strokeWidth="1.2" />
        <path className="neon-line" d={paths[6]} stroke="#FF5500" strokeOpacity="0.28" strokeWidth="1" />
      </svg>
    </div>
  );
}
