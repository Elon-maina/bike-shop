/* Placeholder product drawings (inline SVG). Replace with real photos later:
   give a product an "img" field and app.js will use that instead. */
(function () {
  const INK = "#1f2a37";
  const COLORS = {
    Black: "#2b3440", Red: "#d7263d", Teal: "#1b998b", Blue: "#2e86ab", Orange: "#f46036",
    Grey: "#6c757d", Yellow: "#f2c014", Pink: "#ff6f91", Mint: "#3bceac", White: "#dfe3e8",
    Green: "#2a9d8f", Silver: "#a9b1ba"
  };

  function bike(c, v) {
    const small = v === "kids" || v === "bmx" || v === "folding";
    const r = small ? 31 : 38, y = 132;
    const rx = small ? 60 : 52, fx = small ? 140 : 148;
    const bb = [100, 132];
    const seat = small ? [88, 94] : [86, 78];
    const head = small ? [128, 92] : [136, 80];
    const tw = v === "mtb" || v === "bmx" ? 7 : 5;
    const wheel = (x) => {
      let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${INK}" stroke-width="${tw}"/>`;
      s += `<circle cx="${x}" cy="${y}" r="${r - 6}" fill="none" stroke="#c9cfd6" stroke-width="1.5"/>`;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 6;
        const dx = Math.cos(a) * (r - 6), dy = Math.sin(a) * (r - 6);
        s += `<line x1="${x - dx}" y1="${y - dy}" x2="${x + dx}" y2="${y + dy}" stroke="#c9cfd6" stroke-width="1"/>`;
      }
      return s + `<circle cx="${x}" cy="${y}" r="4" fill="${INK}"/>`;
    };
    let s = wheel(rx) + wheel(fx);
    s += `<g stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">`;
    s += `<polyline points="${rx},${y} ${bb[0]},${bb[1]} ${seat[0]},${seat[1]} ${rx},${y}"/>`;
    s += `<line x1="${bb[0]}" y1="${bb[1]}" x2="${head[0]}" y2="${head[1]}"/>`;
    s += `<line x1="${seat[0]}" y1="${seat[1]}" x2="${head[0]}" y2="${head[1] + (v === "mtb" ? 6 : 0)}"/>`;
    s += `<line x1="${head[0]}" y1="${head[1]}" x2="${fx}" y2="${y}" stroke="${v === "mtb" ? INK : c}"/>`;
    s += `</g>`;
    if (v === "ebike") {
      const mx = (bb[0] + head[0]) / 2, my = (bb[1] + head[1]) / 2;
      s += `<line x1="${mx - 12}" y1="${my + 16}" x2="${mx + 8}" y2="${my - 12}" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>`;
      s += `<circle cx="${fx}" cy="${y}" r="10" fill="${INK}"/>`;
    }
    // chainring, seatpost, saddle, bars
    s += `<circle cx="${bb[0]}" cy="${bb[1]}" r="9" fill="none" stroke="${INK}" stroke-width="3"/>`;
    s += `<line x1="${seat[0]}" y1="${seat[1]}" x2="${seat[0] - 3}" y2="${seat[1] - 12}" stroke="${INK}" stroke-width="4"/>`;
    s += `<path d="M${seat[0] - 16} ${seat[1] - 14} h24 q4 0 0 5 h-20 z" fill="${INK}"/>`;
    s += `<line x1="${head[0]}" y1="${head[1]}" x2="${head[0] - 2}" y2="${head[1] - 12}" stroke="${INK}" stroke-width="4"/>`;
    if (v === "road") s += `<path d="M${head[0] - 4} ${head[1] - 12} h10 q8 0 6 10 q-2 6 -8 4" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    else s += `<line x1="${head[0] - 12}" y1="${head[1] - 13}" x2="${head[0] + 10}" y2="${head[1] - 11}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    return s;
  }

  const draw = {
    mtb: (c) => bike(c, "mtb"), road: (c) => bike(c, "road"), hybrid: (c) => bike(c, "hybrid"),
    ebike: (c) => bike(c, "ebike"), kids: (c) => bike(c, "kids"), folding: (c) => bike(c, "folding"), bmx: (c) => bike(c, "bmx"),
    tyre: (c) => `<circle cx="100" cy="100" r="60" fill="none" stroke="${INK}" stroke-width="24"/><circle cx="100" cy="100" r="72" fill="none" stroke="#3a4654" stroke-width="4" stroke-dasharray="7 6"/><circle cx="100" cy="100" r="46" fill="none" stroke="${c === COLORS.Black ? "#8c96a1" : c}" stroke-width="4"/>`,
    tube: () => `<circle cx="100" cy="96" r="58" fill="none" stroke="#2b2b2b" stroke-width="12"/><rect x="95" y="152" width="10" height="24" rx="2" fill="#a9b1ba"/>`,
    chain: (c) => `<rect x="28" y="66" width="144" height="68" rx="34" fill="none" stroke="${c}" stroke-width="16" stroke-dasharray="12 5"/><rect x="28" y="66" width="144" height="68" rx="34" fill="none" stroke="${INK}" stroke-width="3"/>`,
    brake: (c) => `<circle cx="95" cy="105" r="58" fill="#ced4da"/><circle cx="95" cy="105" r="42" fill="#fff"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${95 + Math.cos(i * 1.047) * 50}" cy="${105 + Math.sin(i * 1.047) * 50}" r="3.5" fill="#fff"/>`).join("")}<circle cx="95" cy="105" r="18" fill="#a9b1ba"/><path d="M128 40 h28 a10 10 0 0 1 10 10 v44 h-38 z" fill="${c}"/>`,
    saddle: (c) => `<rect x="94" y="110" width="12" height="62" rx="3" fill="#a9b1ba"/><path d="M28 92 Q60 68 120 78 L170 88 Q180 94 170 102 L120 110 Q88 128 40 118 Q20 106 28 92Z" fill="${c}"/><path d="M50 96 Q100 86 160 94" stroke="#ffffff55" stroke-width="3" fill="none"/>`,
    pedal: (c) => `<rect x="28" y="94" width="30" height="12" rx="4" fill="#a9b1ba"/><rect x="54" y="66" width="104" height="68" rx="14" fill="${c}"/><rect x="70" y="80" width="72" height="40" rx="8" fill="#fff"/>${[62, 150].flatMap((x) => [74, 100, 126].map((y) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff"/>`)).join("")}`,
    light: (c) => `<path d="M140 84 L192 58 L192 146 L140 120Z" fill="#fff1a8" opacity=".8"/><rect x="46" y="84" width="88" height="36" rx="14" fill="${c}"/><rect x="128" y="80" width="14" height="44" rx="5" fill="#fff8d0" stroke="${INK}" stroke-width="2"/><rect x="70" y="120" width="16" height="22" rx="3" fill="${INK}"/><circle cx="72" cy="102" r="5" fill="#4ade80"/>`,
    rearlight: () => `<rect x="68" y="44" width="64" height="112" rx="18" fill="${INK}"/><rect x="77" y="53" width="46" height="94" rx="12" fill="#e63946"/>${[70, 90, 110, 130].map((y) => `<circle cx="100" cy="${y}" r="6" fill="#ffb3b8"/>`).join("")}`,
    lock: (c) => `<path d="M64 108 V70 a36 36 0 0 1 72 0 V108" fill="none" stroke="#a9b1ba" stroke-width="15"/><rect x="46" y="98" width="108" height="62" rx="12" fill="${c}"/><circle cx="100" cy="124" r="7" fill="${INK}"/><rect x="97" y="126" width="6" height="16" fill="${INK}"/>`,
    pump: (c) => `<rect x="60" y="34" width="80" height="12" rx="6" fill="${INK}"/><rect x="96" y="44" width="8" height="18" fill="#a9b1ba"/><rect x="86" y="60" width="28" height="100" rx="8" fill="${c}"/><rect x="58" y="158" width="84" height="12" rx="6" fill="${INK}"/><path d="M114 140 q40 0 40 -40 q0 -20 -10 -28" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="100" cy="90" r="10" fill="#fff" stroke="${INK}" stroke-width="2"/>`,
    bottle: (c) => `<rect x="94" y="26" width="12" height="14" rx="3" fill="${INK}"/><rect x="80" y="38" width="40" height="24" rx="6" fill="${INK}"/><rect x="70" y="58" width="60" height="114" rx="18" fill="${c}"/><rect x="70" y="96" width="60" height="22" fill="#ffffff44"/>`,
    bag: (c) => `<path d="M80 54 q20 -24 40 0" fill="none" stroke="${INK}" stroke-width="6"/><rect x="44" y="56" width="112" height="106" rx="14" fill="${c}"/><rect x="44" y="56" width="112" height="40" rx="14" fill="#00000022"/><rect x="76" y="86" width="12" height="26" rx="3" fill="${INK}"/><rect x="112" y="86" width="12" height="26" rx="3" fill="${INK}"/><rect x="44" y="140" width="112" height="6" fill="#ffffff66"/>`,
    helmet: (c) => `<path d="M34 126 Q34 56 104 52 Q170 56 170 120 L150 128 Z" fill="${c}"/><ellipse cx="78" cy="84" rx="14" ry="6" fill="#fff" transform="rotate(-25 78 84)"/><ellipse cx="108" cy="72" rx="16" ry="6" fill="#fff"/><ellipse cx="140" cy="84" rx="14" ry="6" fill="#fff" transform="rotate(25 140 84)"/><path d="M34 126 L16 120 Q20 104 40 106Z" fill="${INK}"/><path d="M60 126 q40 30 80 0" fill="none" stroke="${INK}" stroke-width="3"/>`,
    gloves: (c) => `<rect x="64" y="92" width="74" height="74" rx="18" fill="${c}"/>${[66, 84, 102, 120].map((x, i) => `<rect x="${x}" y="${44 + [8, 0, 4, 14][i]}" width="16" height="64" rx="8" fill="${c}"/>`).join("")}<rect x="42" y="104" width="16" height="50" rx="8" fill="${c}" transform="rotate(-35 50 130)"/><rect x="64" y="150" width="74" height="16" rx="6" fill="${INK}"/>`,
    vest: (c) => `<path d="M60 36 L84 36 L100 70 L116 36 L140 36 L162 70 L150 172 L50 172 L38 70Z" fill="${c}"/><rect x="44" y="110" width="112" height="10" fill="#e5e9ee"/><rect x="47" y="136" width="106" height="10" fill="#e5e9ee"/>`,
    tool: (c) => `${[-40, -20, 0, 20].map((a) => `<rect x="96" y="40" width="8" height="64" rx="3" fill="#a9b1ba" transform="rotate(${a} 100 104)"/>`).join("")}<rect x="40" y="96" width="120" height="36" rx="18" fill="${c}"/><circle cx="60" cy="114" r="5" fill="${INK}"/><circle cx="140" cy="114" r="5" fill="${INK}"/>`,
    lube: (c) => `<path d="M90 82 L96 34 h8 L110 82z" fill="${INK}"/><path d="M72 80 h56 v84 a12 12 0 0 1 -12 12 h-32 a12 12 0 0 1 -12 -12z" fill="${c}"/><rect x="80" y="108" width="40" height="36" rx="4" fill="#fff"/><rect x="88" y="118" width="24" height="5" fill="${INK}"/><rect x="88" y="128" width="16" height="4" fill="#a9b1ba"/>`,
    stand: (c) => `<path d="M100 66 V160 M100 160 L58 188 M100 160 L142 188 M100 160 V188" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M100 66 L140 46" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><rect x="130" y="30" width="44" height="28" rx="7" fill="${c}"/>`
  };

  function art(type, colorName, label) {
    const c = COLORS[colorName] || colorName || COLORS.Black;
    const f = draw[type] || draw.mtb;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(label || "").replace(/"/g, "")}">${f(c)}</svg>`;
  }

  window.ART = { art, COLORS };
})();
