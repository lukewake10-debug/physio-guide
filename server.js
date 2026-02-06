const http = require("http");

const PORT = process.env.PORT || 3000;

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Physio Guide</title>
  <style>
    body{font-family:Arial,sans-serif;max-width:900px;margin:24px auto;padding:0 16px;line-height:1.5}
    .card{border:1px solid #ddd;border-radius:12px;padding:14px;margin-bottom:12px}
    .muted{color:#666}
    input{width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;margin:10px 0 16px}
  </style>
</head>
<body>
  <h1>Physio Guide</h1>
  <p class="muted">Educational support only. Follow local protocols and escalate red flags.</p>
  <input id="q" placeholder="Search condition..." />
  <div id="list"></div>

<script>
const data = [
  {
    name:"Low Back Pain",
    region:"Lumbar",
    summary:"Encourage graded activity and avoid prolonged bed rest.",
    redFlags:["Cauda equina symptoms","Unexplained weight loss","Night pain"],
    doList:["Stay active","Use graded exercise","Provide reassurance/education"],
    dontList:["Prolonged bed rest","Fear-based messaging","Aggressive loading early"]
  },
  {
    name:"Stroke (Acute/Subacute Rehab)",
    region:"Neuro",
    summary:"Task-specific rehab, MDT planning, monitor fatigue and safety.",
    redFlags:["Acute neuro deterioration","Reduced consciousness","Aspiration risk"],
    doList:["Task-specific practice","Early MDT goal setting","Frequent reassessment"],
    dontList:["Unsafe unsupervised mobility","Ignoring swallow/respiratory concerns","Overfatiguing sessions"]
  }
];

const q = document.getElementById("q");
const list = document.getElementById("list");

function render(items){
  list.innerHTML = "";
  items.forEach(c=>{
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = \`
      <h3>\${c.name}</h3>
      <div class="muted">\${c.region}</div>
      <p>\${c.summary}</p>
      <strong>Do</strong><ul>\${c.doList.map(i=>"<li>"+i+"</li>").join("")}</ul>
      <strong>Do not</strong><ul>\${c.dontList.map(i=>"<li>"+i+"</li>").join("")}</ul>
      <strong>Red flags</strong><ul>\${c.redFlags.map(i=>"<li>"+i+"</li>").join("")}</ul>
    \`;
    list.appendChild(el);
  });
}
render(data);

q.addEventListener("input", e=>{
  const v = e.target.value.toLowerCase();
  render(data.filter(c =>
    (c.name + " " + c.region + " " + c.summary).toLowerCase().includes(v)
  ));
});
</script>
</body>
</html>`;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}).listen(PORT, () => console.log("Server running on " + PORT));
