/* ── INTERACTIVE SCRIPTS & SIMULATIONS ───────────────────────── */

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// Mobile Nav Drawer Toggle
window.toggleMobileMenu = function() {
  const drawer = document.getElementById('mobileNav');
  if (drawer) {
    drawer.classList.toggle('open');
  }
};

/* ── 1. LORENZ ATTRACTOR CANVAS SIMULATION (MATH & COMPUTING) ── */
(function() {
  const canvas = document.getElementById('lorenzCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  // Lorenz System Parameters
  let sigma = 10;
  let beta = 8/3;
  let rho = 28;
  const dt = 0.007;

  // Solver states
  let lx = 0.1, ly = 0, lz = 0;
  const points = [];
  const maxPoints = 850;

  // Rotation angles
  let rotX = 0.6;
  let rotY = 0.8;

  // Mouse coords
  const mouse = { x: null, y: null, active: false };
  const heroSection = document.getElementById('hero');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
    });
  }

  // Pre-fill attractor path
  for (let i = 0; i < maxPoints; i++) {
    const dx = sigma * (ly - lx) * dt;
    const dy = (lx * (rho - lz) - ly) * dt;
    const dz = (lx * ly - beta * lz) * dt;
    lx += dx;
    ly += dy;
    lz += dz;
    points.push({ x: lx, y: ly, z: lz });
  }

  function animateAttractor() {
    if (canvas.offsetWidth !== width || canvas.offsetHeight !== height) {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Smooth parameters perturbation based on mouse coords
    if (mouse.active && mouse.x !== null && mouse.y !== null) {
      const targetRho = 28 + (mouse.y - height / 2) * 0.06;
      const targetSigma = 10 + (mouse.x - width / 2) * 0.03;
      rho += (targetRho - rho) * 0.1;
      sigma += (targetSigma - sigma) * 0.1;
      
      // Speed up rotation based on hover
      rotY += 0.005;
      rotX += 0.002;
    } else {
      // Return parameters to standard attractor bounds
      rho += (28 - rho) * 0.1;
      sigma += (10 - sigma) * 0.1;
      
      // Standard slow rotation
      rotY += 0.003;
      rotX += 0.001;
    }

    // Step the Lorenz Equations and append new point
    const dx = sigma * (ly - lx) * dt;
    const dy = (lx * (rho - lz) - ly) * dt;
    const dz = (lx * ly - beta * lz) * dt;
    lx += dx;
    ly += dy;
    lz += dz;
    
    points.shift();
    points.push({ x: lx, y: ly, z: lz });

    // Render & Project Points
    const cx = width / 2;
    const cy = height / 2;
    // Scale factor based on screen size
    const scale = Math.min(width, height) / 100 * 5.2;

    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];

      // 3D rotation projection for P1
      let x1 = p1.x * Math.cos(rotY) - p1.z * Math.sin(rotY);
      let z1 = p1.x * Math.sin(rotY) + p1.z * Math.cos(rotY);
      let y1 = p1.y * Math.cos(rotX) - z1 * Math.sin(rotX);
      let sX1 = cx + x1 * scale;
      let sY1 = cy - y1 * scale;

      // 3D rotation projection for P2
      let x2 = p2.x * Math.cos(rotY) - p2.z * Math.sin(rotY);
      let z2 = p2.x * Math.sin(rotY) + p2.z * Math.cos(rotY);
      let y2 = p2.y * Math.cos(rotX) - z2 * Math.sin(rotX);
      let sX2 = cx + x2 * scale;
      let sY2 = cy - y2 * scale;

      // Create gradient representing flow
      const alpha = i / points.length;
      const grad = ctx.createLinearGradient(sX1, sY1, sX2, sY2);
      
      // Terracotta Rust Orange to Slate Blue (or Sky Blue in dark theme) gradient mapping
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const c1 = isDark ? '234, 88, 12' : '194, 65, 12';
      const c2 = isDark ? '56, 189, 248' : '51, 65, 85';
      
      grad.addColorStop(0, `rgba(${c1}, ${alpha * 0.18})`);
      grad.addColorStop(1, `rgba(${c2}, ${alpha * 0.7})`);

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.moveTo(sX1, sY1);
      ctx.lineTo(sX2, sY2);
      ctx.stroke();
    }

    requestAnimationFrame(animateAttractor);
  }

  animateAttractor();
})();

/* ── 2. THE LAB SANDBOX: TABS SWITCHER ────────────────────────── */
window.switchLabTab = function(tabName) {
  document.querySelectorAll('.lab-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.lab-panel').forEach(panel => panel.classList.remove('active'));
  
  const activeBtn = Array.from(document.querySelectorAll('.lab-tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabName));
  if (activeBtn) activeBtn.classList.add('active');
  
  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activePanel) activePanel.classList.add('active');

  if (tabName === 'samudra') {
    setTimeout(drawSamudraConnections, 50);
  }
};

/* ── 3. INTERACTIVE ARCHITECTURE NODE INSPECTOR DATA ─────────── */
const nodeData = {
  // SwiftPredict
  'sp-ui': { title: 'React/Next.js UI', file: 'SwiftPredictUI', badge: 'Frontend', desc: 'The client-facing dashboard built with Next.js to display ML experiment lists, metric histories, and model artifact download options.' },
  'sp-dash': { title: 'Streamlit Dashboard', file: 'Testing Interface', badge: 'Dashboard', desc: 'A developer-centric prototyping interface used to drag-and-drop CSV datasets and visually inspect correlation matrices and pre-trained pipelines.' },
  'sp-sdk': { title: 'Python SDK Client', file: 'swift_predict.py', badge: 'SDK Library', desc: 'A Python library designed for inline imports. Instantiates model calls and logs training steps to the remote FastAPI backend.' },
  'sp-cli': { title: 'CLI Interface', file: 'swiftpredict command', badge: 'CLI Utility', desc: 'Command line terminal runner. Parses flags to trigger end-to-end dataset preprocessing, model profiling, and local pipeline validation.' },
  'sp-api': { title: 'FastAPI Server', file: 'logger_apis.py', badge: 'API Service', desc: 'A high-performance backend server handling client metrics collection, model logging payloads, and metadata routing to MongoDB.' },
  'sp-core': { title: 'SwiftPredict Core', file: 'swift_predict.py', badge: 'Core Library', desc: 'Houses the main algorithmic steps for auto-imputation, categorical encoding, feature scaling, and automated hyperparameter search loops.' },
  'sp-trainer': { title: 'AutoML Engine', file: 'automl_trainer.py', badge: 'Model Search', desc: 'Orchestrates the k-fold cross-validation pipelines, training XGBoost, Random Forests, and Linear Regressors, selecting the optimal candidate.' },
  'sp-prep': { title: 'Preprocessing Pipeline', file: 'preprocessing.py', badge: 'Data pipeline', desc: 'Detects missing inputs, handles multi-collinearity, implements SMOTE resampling for imbalanced targets, and returns scaled training arrays.' },
  'sp-db': { title: 'MongoDB', file: 'SwiftPredict Database', badge: 'Data Storage', desc: 'Stores model JSON configurations, cross-validation metrics, user authentication tokens, and execution histories.' },
  'sp-csv': { title: 'CSV Data Files', file: 'train.csv, test.csv', badge: 'Local Datasets', desc: 'Raw input data streams loaded by the AutoML loader or saved in local temp arrays during preprocessing iterations.' },
  
  // Keiro
  'kr-query': { title: 'User Query', file: 'Prompt Entry', badge: 'Natural Language Input', desc: 'Natural language text input sent by the client. For example: "Summarize Q1 financial files" or "Explain DQN updates".' },
  'kr-router': { title: 'Go chi Router', file: 'chi.Router (v1/query)', badge: 'Proxy Gateway', desc: 'An ultra-fast gateway written in Go that routes incoming queries and splits data streams. Directs caching lookups and controls background ingestion queues.' },
  'kr-queue': { title: 'Ingestion Queue', file: 'IngestionQueue (Go Channel)', badge: 'Message Queue', desc: 'An asynchronous in-memory Go channel queue that queues document uploads and chunking routines to avoid thread blocking.' },
  'kr-cache': { title: 'Semantic Cache', file: 'Semantic Cache (LRU)', badge: 'Local Cache', desc: 'An LRU semantic cache matching query embeddings with vector indices. Returns cached answers in 0.8ms on cache hits, avoiding LLM roundtrips.' },
  'kr-classify': { title: 'gRPC Classifier', file: 'ClassifyQueryType (gRPC)', badge: 'Python Service', desc: 'A Python service utilizing a transformer model to classify query complexity (Low, Medium, High) and decide retrieval strategies.' },
  'kr-retrieve': { title: 'gRPC Retrieval', file: 'ExecuteRetrieval (gRPC)', badge: 'Python Service', desc: 'Retrieves relevant document context chunks from ChromaDB collections using semantic distance metrics and hybrid text search.' },
  'kr-response': { title: 'gRPC Generator', file: 'GenerateResponse (gRPC)', badge: 'Python Service', desc: 'Assembles retrieved text chunks into prompts, queries the LLM (Gemini/OpenAI), and returns streaming markdown results to the Go gateway.' },
  'kr-chroma': { title: 'ChromaDB', file: 'Collections Storage', badge: 'Vector Database', desc: 'Stores vector embeddings of ingested files, enabling fast similarity search operations during retrieval phases.' },
  'kr-answer': { title: 'Generated Answer', file: 'Natural Language Response', badge: 'Result Output', desc: 'The final context-aware answer generated by the LLM, returned streaming back to the client interface.' },
  
  // Samudra Sachet
  'ss-landing': { title: 'LandingPageProtoMultiLingual/', file: 'LandingPageProtoMultiLingual/', badge: 'Frontend Layer', desc: 'The official multi-language public interface for Samudra Sachet, handling anonymous geo-tagged report submissions.' },
  'ss-auth': { title: 'login-authorized/', file: 'login-authorized/', badge: 'Frontend Layer', desc: 'A citizen authentication portal integrated with Firebase Auth services.' },
  'ss-dash': { title: 'PROTOWITHDASHBOARD/', file: 'PROTOWITHDASHBOARD/', badge: 'Frontend Layer', desc: 'The official command and admin control dashboard mapping live geospatial clusters and alert reports.' },
  'ss-twitter': { title: 'Twitter API v2', file: 'point_radius geo-filters', badge: 'External Services', desc: 'Streams social media activity in real-time, filtered by geo-coordinates to capture live hazard postings.' },
  'ss-main': { title: 'main/', file: 'main/', badge: 'Backend Layer', desc: 'The FastAPI application core housing route handlers, database orchestration, and task distribution.' },
  'ss-firebase': { title: 'Firebase Services', file: 'Authentication, Cloud Firestore, Storage', badge: 'Backend Layer', desc: 'Manages user credentials, alert document states, and media files.' },
  'ss-cloudinary': { title: 'Cloudinary Integration', file: 'Media upload/retrieval', badge: 'Backend Layer', desc: 'Integrates cloud-hosted image and video asset uploads and retrieval hooks.' },
  'ss-mldata': { title: 'data/', file: 'data/', badge: 'ML Pipeline', desc: 'Stores augmented training arrays and seed data used for model tuning (e.g., Augmented_data.csv, Embedded_dataset.csv).' },
  'ss-panic': { title: 'PanicMeterModel', file: 'PyTorch CNN', badge: 'ML Pipeline', desc: 'PyTorch convolutional neural network calculating hazard urgency scores on uploaded media files.' },
  'ss-nlp': { title: 'NLP Pipeline', file: 'GloVe embeddings', badge: 'ML Pipeline', desc: 'Processes text reports with GloVe semantic embeddings and ensemble regressors to classify text urgency.' },
  'ss-hotspot': { title: 'Hotspot Detection', file: 'DBSCAN/HDBSCAN', badge: 'ML Pipeline', desc: 'Clusters geo-coordinates using DBSCAN and HDBSCAN algorithms inside the cluster_data() utility function.' },
  'ss-mongo': { title: 'MongoDB', file: 'Motor async driver', badge: 'Data Layer', desc: 'Asynchronous operational schema document database.' },
  'ss-firestore': { title: 'Cloud Firestore', file: 'Real-time updates', badge: 'Data Layer', desc: 'Stores live clustered hazard updates with JSON validation to feed real-time dashboard telemetry.' }
};

// Dynamic SVG connections drawing for Samudra Sachet Flowchart
function drawSamudraConnections() {
  const svg = document.querySelector('.samudra-svg-connections');
  if (!svg || svg.offsetParent === null) return;
  
  // Clear any existing path lines (except defs/markers)
  const paths = svg.querySelectorAll('path:not([d=""])');
  paths.forEach(p => p.remove());
  
  const connections = [
    { from: 'ss-landing', to: 'ss-main' },
    { from: 'ss-auth', to: 'ss-main' },
    { from: 'ss-twitter', to: 'ss-main' },
    { from: 'ss-twitter', to: 'ss-nlp' },
    { from: 'ss-main', to: 'ss-firebase' },
    { from: 'ss-main', to: 'ss-cloudinary' },
    { from: 'ss-main', to: 'ss-mongo' },
    { from: 'ss-main', to: 'ss-firestore' },
    { from: 'ss-main', to: 'ss-panic' },
    { from: 'ss-main', to: 'ss-nlp' },
    { from: 'ss-mldata', to: 'ss-panic', label: 'Training' },
    { from: 'ss-mldata', to: 'ss-nlp', label: 'Training' },
    { from: 'ss-panic', to: 'ss-hotspot' },
    { from: 'ss-nlp', to: 'ss-hotspot' },
    { from: 'ss-hotspot', to: 'ss-firestore' },
    { from: 'ss-firestore', to: 'ss-dash' },
    { from: 'ss-dash', to: 'ss-main' }
  ];
  
  const containerRect = svg.getBoundingClientRect();
  if (containerRect.width === 0 || containerRect.height === 0) return;
  
  connections.forEach(conn => {
    const fromEl = document.querySelector(`[data-node="${conn.from}"]`);
    const toEl = document.querySelector(`[data-node="${conn.to}"]`);
    if (!fromEl || !toEl) return;
    
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    
    const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
    const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
    const x2 = toRect.left + toRect.width / 2 - containerRect.left;
    const y2 = toRect.top + toRect.height / 2 - containerRect.top;
    
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    const fromOffsetW = (fromRect.width / 2) * Math.cos(angle);
    const fromOffsetH = (fromRect.height / 2) * Math.sin(angle);
    const toOffsetW = (toRect.width / 2) * Math.cos(angle);
    const toOffsetH = (toRect.height / 2) * Math.sin(angle);
    
    const startX = x1 + fromOffsetW;
    const startY = y1 + fromOffsetH;
    const endX = x2 - toOffsetW;
    const endY = y2 - toOffsetH;
    
    if (Math.hypot(endX - startX, endY - startY) < 15) return;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = `M ${startX} ${startY} L ${endX} ${endY}`;
    
    if (conn.from === 'ss-mldata' && conn.to === 'ss-panic') {
      const ctrlX = (startX + endX) / 2 - 25;
      const ctrlY = (startY + endY) / 2;
      d = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
    } else if (conn.from === 'ss-mldata' && conn.to === 'ss-nlp') {
      const ctrlX = (startX + endX) / 2 + 25;
      const ctrlY = (startY + endY) / 2;
      d = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
    } else if (conn.from === 'ss-firestore' && conn.to === 'ss-dash') {
      const ctrlX = (startX + endX) / 2;
      const ctrlY = Math.max(startY, endY) + 70;
      d = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
    } else if (conn.from === 'ss-dash' && conn.to === 'ss-main') {
      const ctrlX = (startX + endX) / 2 - 40;
      const ctrlY = (startY + endY) / 2 + 20;
      d = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
    }
    
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'var(--border2)');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#samudra-arrow)');
    
    if (conn.label === 'Training') {
      path.setAttribute('stroke-dasharray', '5,5');
    }
    
    svg.appendChild(path);
  });
}

window.addEventListener('load', () => {
  setTimeout(drawSamudraConnections, 100);
});
window.addEventListener('resize', drawSamudraConnections);


// Flowchart Node Inspector Interactivity
document.querySelectorAll('.fc-node').forEach(node => {
  const showDetails = () => {
    const nodeId = node.getAttribute('data-node');
    const project = node.getAttribute('data-project');
    const data = nodeData[nodeId];
    if (!data) return;
    
    const inspector = document.getElementById(`inspector-${project}`);
    if (!inspector) return;
    
    const defaultBody = inspector.querySelector('.inspector-body');
    const detailsPane = inspector.querySelector('.inspector-details');
    
    if (defaultBody && detailsPane) {
      defaultBody.style.display = 'none';
      detailsPane.style.display = 'flex';
      
      detailsPane.querySelector('.node-badge').innerText = data.badge;
      detailsPane.querySelector('.ins-title').innerText = data.title;
      detailsPane.querySelector('.ins-file code').innerText = data.file;
      detailsPane.querySelector('.ins-desc').innerText = data.desc;
    }
    
    document.querySelectorAll(`.fc-node[data-project="${project}"]`).forEach(n => {
      n.classList.remove('active-node');
      n.classList.add('dimmed');
    });
    node.classList.add('active-node');
    node.classList.remove('dimmed');
  };
  
  node.addEventListener('mouseenter', showDetails);
  node.addEventListener('click', showDetails);
});

/* ── 4. THEME TOGGLE & PERSISTENCE ───────────────────────────── */
(function() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = themeToggleBtn.querySelector('i');
  if (icon) {
    if (currentTheme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }
  
  themeToggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    if (icon) {
      icon.className = nextTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  });
})();

/* ── 5. DEVELOPER CLI TERMINAL CONSOLE ───────────────────────── */
(function() {
  let terminalOpen = false;
  const terminalElement = document.getElementById('dev-terminal');
  const terminalInputField = document.getElementById('terminal-input-field');
  const terminalOutputPanel = document.getElementById('terminal-output-panel');
  if (!terminalElement || !terminalInputField || !terminalOutputPanel) return;
  const terminalHistory = [];
  let terminalHistoryIndex = -1;

  window.toggleTerminal = function() {
    terminalOpen = !terminalOpen;
    if (terminalOpen) {
      terminalElement.classList.add('open');
      terminalInputField.focus();
    } else {
      terminalElement.classList.remove('open');
      terminalInputField.blur();
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === '`') {
      e.preventDefault();
      toggleTerminal();
    } else if (e.key === 'Escape' && terminalOpen) {
      toggleTerminal();
    }
  });

  terminalElement.addEventListener('click', (e) => {
    if (e.target !== terminalInputField) {
      terminalInputField.focus();
    }
  });

  const availableCommands = {
    help: 'List all available terminal commands.',
    about: 'Learn more about my background, studies, and interests.',
    projects: 'View a list of my primary repositories.',
    contact: 'Print my contact and social details.',
    clear: 'Clear the terminal output panel.',
    theme: 'Cycle the primary accent color theme.',
    run: 'Run/inspect a project. Usage: run [swiftpredict | keiro | samudra]'
  };

  function printLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.innerHTML = text;
    terminalOutputPanel.appendChild(line);
    terminalOutputPanel.scrollTop = terminalOutputPanel.scrollHeight;
  }

  function handleCommand(cmdStr) {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    
    terminalHistory.push(trimmed);
    terminalHistoryIndex = terminalHistory.length;
    
    printLine(`<span class="terminal-prompt">visitor@portfolio:~$</span> ${trimmed}`);
    
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();
    
    switch(cmd) {
      case 'help':
        printLine('Available commands:');
        for (const [name, desc] of Object.entries(availableCommands)) {
          printLine(`  <span class="highlight">${name.padEnd(14)}</span> - ${desc}`);
        }
        break;
      case 'about':
        printLine('I am a B.Tech Mathematics & Computing student at Punjab Engineering College, Chandigarh (Graduating 2028).');
        printLine('My engineering philosophy targets bridging research and production ML. I work primarily in Python and Go, focusing on:');
        printLine('  - <span class="accent">Applied RL:</span> Gymnasium training loops for intraday optimization.');
        printLine('  - <span class="accent">GenAI & RAG:</span> Adaptive query-classification and routing gateways (Keiro).');
        printLine('  - <span class="accent">AutoML:</span> Boilerplate-free AutoML libraries (SwiftPredict).');
        break;
      case 'projects':
        printLine('Primary projects:');
        printLine('  - <span class="highlight">Keiro</span> - Self-hostable adaptive RAG gateway with Go caching and Python routing.');
        printLine('  - <span class="highlight">SwiftPredict</span> - AutoML Python library to automate preprocessing & training. (pip install swiftpredict-v2)');
        printLine('  - <span class="highlight">Samudra Sachet</span> - Disaster response classification and hot-spot detection pipelines.');
        printLine('  - <span class="highlight">Multi-Agent Refiner</span> - Five-agent code optimization LangChain backend.');
        printLine('  - <span class="highlight">DQN Trader</span> - DQN intraday trading bot minimizing reward sparsity.');
        break;
      case 'contact':
        printLine('Contact details:');
        printLine('  - <span class="highlight">Email:</span>    mranjanjena253@gmail.com');
        printLine('  - <span class="highlight">GitHub:</span>   github.com/ManasRanjanJena253');
        printLine('  - <span class="highlight">LinkedIn:</span> linkedin.com/in/manasranjanjena253');
        printLine('  - <span class="highlight">Phone:</span>    +91 78887 22346');
        break;
      case 'clear':
        terminalOutputPanel.innerHTML = '';
        break;
      case 'theme':
        const themes = [
          { accent: '#c2410c', accent2: '#334155' }, // Terracotta & Slate Blue (Default)
          { accent: '#0f766e', accent2: '#334155' }, // Teal-green & Slate
          { accent: '#b45309', accent2: '#334155' }  // Amber & Slate
        ];
        const root = document.documentElement;
        let sel = themes[Math.floor(Math.random() * themes.length)];
        root.style.setProperty('--accent', sel.accent);
        root.style.setProperty('--accent2', sel.accent2);
        printLine(`Applied theme: <span style="color:${sel.accent}; font-weight:600;">Accent Color</span>.`, 'green');
        break;
      case 'run':
        if (!arg) {
          printLine('Error: Please specify a project. Usage: run [swiftpredict | keiro | samudra]', 'red');
        } else if (arg === 'swiftpredict' || arg === 'automl') {
          printLine('Scrolling to Lab and focusing SwiftPredict architecture diagram...', 'green');
          setTimeout(() => {
            toggleTerminal();
            const el = document.getElementById('lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            switchLabTab('swiftpredict');
          }, 600);
        } else if (arg === 'keiro' || arg === 'rag') {
          printLine('Scrolling to Lab and focusing Keiro RAG Gateway architecture diagram...', 'green');
          setTimeout(() => {
            toggleTerminal();
            const el = document.getElementById('lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            switchLabTab('keiro');
          }, 600);
        } else if (arg === 'samudra' || arg === 'sachet') {
          printLine('Scrolling to Lab and focusing Samudra Sachet architecture diagram...', 'green');
          setTimeout(() => {
            toggleTerminal();
            const el = document.getElementById('lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            switchLabTab('samudra');
          }, 600);
        } else {
          printLine(`Error: Unknown project "${arg}". Choose from: swiftpredict, keiro, samudra`, 'red');
        }
        break;
      default:
        printLine(`Error: command not found: ${cmd}. Type "help" for a list of commands.`, 'red');
    }
    
    printLine('&nbsp;');
  }

  terminalInputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInputField.value;
      terminalInputField.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistoryIndex > 0) {
        terminalHistoryIndex--;
        terminalInputField.value = terminalHistory[terminalHistoryIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (terminalHistoryIndex < terminalHistory.length - 1) {
        terminalHistoryIndex++;
        terminalInputField.value = terminalHistory[terminalHistoryIndex];
      } else {
        terminalHistoryIndex = terminalHistory.length;
        terminalInputField.value = '';
      }
    }
  });
})();

/* ── 6. CONTACT FORM SUBMISSION ──────────────────────────────── */
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('form-success');
  const btn = document.getElementById('btn-submit-contact');
  if (!form || !successMsg || !btn) return;
  
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
  
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
    successMsg.style.display = 'block';
    
    const name = form.name.value;
    const email = form.email.value;
    const msg = form.message.value;
    window.location.href = `mailto:mranjanjena253@gmail.com?subject=Portfolio Contact&body=From: ${name} (${email})%0A%0A${msg}`;
    
    form.reset();
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }, 1000);
};
