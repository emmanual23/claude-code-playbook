#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// === Configuration ===

const COMMAND_CATEGORIES = {
  research: 'discovery', prd: 'discovery', architecture: 'discovery',
  roadmap: 'discovery', sprint: 'discovery', infra: 'discovery', setup: 'discovery',
  'fix-issue': 'build', build: 'build', review: 'build', checkpoint: 'build',
  'resume-work': 'build', backlog: 'build', autopilot: 'build', adr: 'build',
  'security-check': 'ship', deps: 'ship', audit: 'ship', 'design-check': 'ship',
  'pre-release': 'ship', deploy: 'ship', monitor: 'ship', milestone: 'ship',
  hotfix: 'emergency',
  challenge: 'utility', enhance: 'utility', status: 'utility',
  onboard: 'utility', plan: 'utility'
};

const TOOLBOX_GUIDED = ['challenge', 'enhance', 'status', 'onboard', 'plan', 'build'];
const TOOLBOX_AUTOPILOT = ['enhance', 'status', 'onboard', 'adr', 'plan'];

const CATEGORY_ORDER = ['discovery', 'build', 'ship', 'emergency', 'utility'];
const CATEGORY_LABELS = {
  discovery: 'Discovery', build: 'Build', ship: 'Ship',
  emergency: 'Emergency', utility: 'Utility'
};

// === Helpers ===

function readCommands(dir) {
  const commands = [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const match = content.match(/description:\s*(.+)/);
    const description = match ? match[1].trim() : slug;
    const category = COMMAND_CATEGORIES[slug] || 'utility';
    commands.push({ slug, name: '/' + slug, description, category });
  }
  return commands;
}

function sortCommands(commands) {
  return commands.sort((a, b) => {
    const catA = CATEGORY_ORDER.indexOf(a.category);
    const catB = CATEGORY_ORDER.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.slug.localeCompare(b.slug);
  });
}

function generateToolboxHTML(commands, slugs) {
  return slugs
    .map(slug => commands.find(c => c.slug === slug))
    .filter(Boolean)
    .map(c => `        <div class="util-card">\n          <div class="util-cmd">${c.name}</div>\n          <div class="util-desc">${c.description}</div>\n        </div>`)
    .join('\n');
}

function generateReferenceHTML(commands) {
  return sortCommands(commands)
    .map(c => {
      const label = CATEGORY_LABELS[c.category] || c.category;
      return `        <div class="ref-item" data-cmd="${c.name}" data-cat="${c.category}"><span class="ref-cmd">${c.name}</span><span class="ref-desc">${c.description}</span><span class="ref-tag ${c.category}">${label}</span></div>`;
    })
    .join('\n');
}

function countTools(commands) {
  // "Build Tools" = non-utility, non-emergency commands (discovery + build + ship phase commands)
  // Actually looking at the existing counts: guided=12, autopilot=8
  // 12 = build(6) + ship(7) - 1? Let me count: build phase has fix-issue, build, review, checkpoint, resume-work, backlog = 6
  // ship has security-check, deps, audit, design-check, pre-release, deploy, monitor, milestone = 8  => 6+8=14? No.
  // Looking at the stats bar label: "Build Tools" — this likely means build-phase commands only
  // Guided build: fix-issue, build, review, checkpoint, resume-work, backlog = 6, plus ship: 8 => hmm
  // Actually the existing page says 12 for guided. Let me just count build+ship commands.
  // Guided: build(6) + ship(8) = 14? That doesn't match 12 either.
  // Let me just count non-discovery, non-emergency, non-utility = build + ship
  // Guided build: fix-issue, build, review, checkpoint, resume-work, backlog = 6
  // Guided ship: security-check, deps, audit, design-check, pre-release, deploy, monitor, milestone = 8
  // 6+8=14, not 12. So "build tools" might mean just build-phase commands + some ship ones.
  // Given the existing values are 12 and 8, let me count what's actually in each edition:
  // I'll just use build-category count + ship-category count as the "tools" number
  // and accept the generated count may differ from the hardcoded original.
  // Actually, re-examining: guided has 28 commands. discovery=7, build=6, ship=8, emergency=1, utility=5 = 27.
  // The ref grid shows 27 items (no /adr in guided). Plus /adr would make 28? No, guided doesn't have /adr.
  // Wait: guided commands dir has 28 files. Let me recount from the listing.
  // 28 files in guided. The ref grid shows 27 items. Missing: /adr is in guided dir but not in ref grid.
  // Actually looking at the current ref grid, it has exactly 27 items (lines 1343-1370, minus the grid wrapper).
  // But the badge says 28. So /adr might be the 28th that's missing from the old hardcoded grid.
  // Anyway, the script will auto-generate correct counts from the files.

  // "Build Tools" = commands in build + ship categories
  return commands.filter(c => c.category === 'build' || c.category === 'ship').length;
}

// === Main ===

const rootDir = __dirname;
const guidedDir = path.join(rootDir, 'playbook', '.claude', 'commands');
const autopilotDir = path.join(rootDir, 'playbook-auto', '.claude', 'commands');
const templatePath = path.join(rootDir, 'guide-template.html');
const outputPath = path.join(rootDir, 'WORKFLOW-GUIDE.html');

const guidedCommands = readCommands(guidedDir);
const autopilotCommands = readCommands(autopilotDir);

const guidedCount = guidedCommands.length;
const autopilotCount = autopilotCommands.length;
const guidedTools = countTools(guidedCommands);
const autopilotTools = countTools(autopilotCommands);

let template = fs.readFileSync(templatePath, 'utf8');

const replacements = {
  '{{GUIDED_COUNT}}': guidedCount,
  '{{AUTOPILOT_COUNT}}': autopilotCount,
  '{{GUIDED_TOOLS}}': guidedTools,
  '{{AUTOPILOT_TOOLS}}': autopilotTools,
  '{{TOOLBOX_GUIDED}}': generateToolboxHTML(guidedCommands, TOOLBOX_GUIDED),
  '{{TOOLBOX_AUTOPILOT}}': generateToolboxHTML(autopilotCommands, TOOLBOX_AUTOPILOT),
  '{{REFERENCE_GUIDED}}': generateReferenceHTML(guidedCommands),
  '{{REFERENCE_AUTOPILOT}}': generateReferenceHTML(autopilotCommands),
};

for (const [placeholder, value] of Object.entries(replacements)) {
  template = template.split(placeholder).join(String(value));
}

fs.writeFileSync(outputPath, template, 'utf8');

console.log(`Generated WORKFLOW-GUIDE.html (${guidedCount} guided, ${autopilotCount} autopilot)`);
console.log(`  Guided: ${guidedCount} commands, ${guidedTools} build tools`);
console.log(`  Autopilot: ${autopilotCount} commands, ${autopilotTools} build tools`);
