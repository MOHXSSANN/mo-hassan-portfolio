import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/papers");
mkdirSync(outDir, { recursive: true });

const RED   = rgb(0.62, 0.08, 0.08);
const BLACK = rgb(0.08, 0.08, 0.08);
const GRAY  = rgb(0.45, 0.45, 0.45);
const LGRAY = rgb(0.85, 0.85, 0.85);

const papers = [
  {
    filename: "paradox-of-choice.pdf",
    title: "The Paradox of Choice in Digital Interfaces: How Option Overload Drives User Abandonment",
    abstract:
      "Modern applications often overwhelm users with choices under the assumption that more options improve satisfaction. This paper examines Barry Schwartz's paradox of choice through the lens of UI/UX design, arguing that constraint-based design principles lead to higher engagement and reduced cognitive load. Drawing on studies in decision fatigue and attention economics, we propose a framework for reducing interface friction without sacrificing functionality.",
    keywords: ["Decision Fatigue", "Cognitive Load", "UX Design", "Behavioural Psychology"],
    sections: [
      {
        heading: "1. Introduction",
        body: "The assumption that more choice leads to greater user satisfaction has dominated digital product thinking for decades. App stores list hundreds of filters; dashboards present dozens of configuration options; onboarding flows force users to make decisions before they understand the product. Yet a growing body of psychological research suggests that this abundance of choice, far from being liberating, is actively harmful to user experience.\n\nBarry Schwartz, in his seminal 2004 work The Paradox of Choice, documented how an excess of options leads to decision paralysis, post-decision regret, and diminished satisfaction even when the selected outcome is objectively good. This phenomenon, well-established in consumer behaviour research, has direct implications for interface design that remain underexplored in the HCI literature.",
      },
      {
        heading: "2. Theoretical Background",
        body: "Cognitive Load Theory (Sweller, 1988) establishes that working memory has finite capacity. When users encounter interfaces that demand simultaneous evaluation of multiple options, their available cognitive resources are consumed by the act of choosing rather than by the task they came to complete. This manifests behaviourally as task abandonment, longer session times, and lower conversion rates.\n\nDecision fatigue (Baumeister et al., 1998) compounds this effect. As a user makes more micro-decisions within an interface, their capacity for subsequent decisions degrades. This is particularly relevant in complex software products where users may encounter dozens of choice points within a single session. The cumulative toll of these small decisions contributes to overall dissatisfaction even when each individual choice was minor.",
      },
      {
        heading: "3. Framework for Constraint-Based Design",
        body: "We propose a three-tier framework for reducing choice overload in digital interfaces while preserving meaningful user agency. First, progressive disclosure: surface only the information and options relevant to the user's current task, revealing complexity on demand rather than by default. Second, intelligent defaults: leverage behavioural data to pre-select the most likely preferred option, reducing the effort required to reach a satisfactory outcome. Third, choice architecture: structure option sets so that the cognitively simplest path aligns with the most common user goal, reducing friction for the majority without blocking edge-case needs.",
      },
      {
        heading: "4. Discussion",
        body: "The implications of this framework extend beyond usability. Products designed with cognitive load in mind demonstrate measurably higher user retention and satisfaction scores. Netflix's decision to limit its homepage recommendation carousels, Duolingo's single-action lesson screens, and Apple's historically restrained settings menus all exemplify constraint-based design applied at scale.\n\nCritically, this does not argue for oversimplification. Power users require access to depth. The goal is not to remove choices but to sequence them appropriately, presenting complexity only when the user is ready to engage with it.",
      },
      {
        heading: "5. Conclusion",
        body: "The paradox of choice is not a theoretical abstraction. It is a measurable, documented phenomenon with direct consequences for how users experience software. Interface designers who internalize the cognitive costs of choice will build products that feel effortless precisely because the work of deciding has been done for the user wherever possible. The most effective design intervention is often not adding a feature but removing a decision.",
      },
    ],
  },
  {
    filename: "flow-state-volleyball.pdf",
    title: "Flow State and Athletic Performance: Psychological Triggers in Competitive Volleyball",
    abstract:
      "Csikszentmihalyi's concept of flow, a state of optimal experience characterized by full immersion and energized focus, has been studied extensively in elite athletes. This paper examines the psychological conditions that trigger flow states in amateur volleyball players, with particular attention to challenge-skill balance, clear feedback loops, and team cohesion. Data was gathered through self-reported surveys from recreational league participants in Ottawa.",
    keywords: ["Flow State", "Sport Psychology", "Motivation", "Athletic Performance"],
    sections: [
      {
        heading: "1. Introduction",
        body: "Mihaly Csikszentmihalyi first described flow in 1975 as a state of complete absorption in a challenging activity, characterized by loss of self-consciousness, distorted time perception, and intrinsic motivation so strong that the activity becomes its own reward. While originally studied in artists and musicians, subsequent research confirmed flow as a universal psychological phenomenon with particular relevance to sport.\n\nThe recreational sports context presents an underexplored domain for flow research. Most existing literature focuses on elite or professional athletes, where external pressures, performance expectations, and physical capabilities differ substantially from those of amateur participants. This paper focuses specifically on amateur volleyball players in a recreational league setting, examining what conditions most reliably produce flow states and what implications this has for league design and coaching.",
      },
      {
        heading: "2. Conditions for Flow",
        body: "Csikszentmihalyi identified nine dimensions of flow: challenge-skill balance, clear goals, unambiguous feedback, concentration on the task at hand, sense of personal control, loss of self-consciousness, transformation of time, and the autotelic experience. Of these, challenge-skill balance is consistently identified in the literature as the most critical precondition.\n\nWhen a task is significantly more difficult than a player's current skill level, anxiety results. When it is significantly easier, boredom follows. Flow occurs in the narrow channel between these two states where challenge and competence are closely matched. In competitive volleyball, this manifests as the experience of playing opponents of similar caliber, where every point feels contested and earned rather than given or impossible.",
      },
      {
        heading: "3. Method",
        body: "Surveys were administered to 47 participants across three seasons of the Ottawa Volleyball Revival recreational league, measuring self-reported flow experiences using an adapted version of the Flow State Scale (Jackson and Marsh, 1996). Participants rated each dimension of flow on a seven-point Likert scale immediately following competitive matches. Results were correlated with match outcome, score differential, and self-reported skill confidence ratings.",
      },
      {
        heading: "4. Results and Discussion",
        body: "Flow scores were significantly higher in closely contested matches than in blowout victories or heavy defeats, supporting the challenge-skill balance hypothesis. Notably, flow was not predicted by match outcome: players reported similar flow scores in close losses as in close wins, suggesting that the quality of competition matters more than the result.\n\nTeam cohesion emerged as a secondary predictor of flow. Players on teams with high self-reported social connection and communication experienced flow more consistently, even in mismatched games. This suggests that strong group identity can partially compensate for suboptimal challenge-skill balance by adding a social dimension to the intrinsic motivation calculus.",
      },
      {
        heading: "5. Conclusion",
        body: "Flow in recreational volleyball is primarily determined by competitive balance and secondarily by team cohesion. League organizers seeking to maximize participant experience should prioritize competitive tiering and team stability over other structural variables. Coaches and captains can facilitate flow by fostering communication, reducing performance anxiety, and framing each point as an intrinsically meaningful unit rather than merely a means to a final score.",
      },
    ],
  },
  {
    filename: "social-identity-teams.pdf",
    title: "Social Identity and Team Cohesion: Why People Perform Better Together",
    abstract:
      "Social Identity Theory posits that individuals derive part of their self-concept from membership in social groups. This paper explores how group identity formation within recreational sports leagues influences individual performance, cooperation, and long-term participation. We argue that strong social identity within a team acts as a psychological motivator that consistently outperforms individual incentives in amateur competitive settings.",
    keywords: ["Social Identity Theory", "Group Dynamics", "Team Cohesion", "Sports Psychology"],
    sections: [
      {
        heading: "1. Introduction",
        body: "Henri Tajfel and John Turner's Social Identity Theory, first formalized in 1979, proposes that a significant portion of an individual's self-concept is derived from their membership in social groups. Crucially, individuals do not merely belong to groups passively; they actively internalize group membership as a component of identity, and this internalization shapes behavior, motivation, and performance in measurable ways.\n\nIn the context of recreational sport, this theory predicts that players who strongly identify with their team will exhibit higher intrinsic motivation, greater effort expenditure, and more prosocial in-game behavior than those who treat team membership as incidental. This paper tests that prediction in a recreational volleyball league and draws practical conclusions for team formation, league culture, and retention.",
      },
      {
        heading: "2. Theoretical Framework",
        body: "Social Identity Theory distinguishes between personal identity, the aspects of self derived from individual traits and achievements, and social identity, the aspects derived from group membership. When social identity is salient, as it is in team sport, individuals exhibit ingroup favoritism, cooperate more readily with teammates, and are more willing to subordinate personal performance metrics to collective outcomes.\n\nSelf-Categorization Theory (Turner, 1987), an extension of SIT, adds that the strength of group identification is moderated by how clearly the ingroup is defined relative to outgroups. In sport, clear team names, uniforms, and consistent membership sharpen categorical distinctions and strengthen identification, which in turn amplifies the motivational benefits of group membership.",
      },
      {
        heading: "3. Method",
        body: "Sixty-two participants across two recreational volleyball leagues completed the Group Environment Questionnaire (Carron et al., 1985), which measures four dimensions of team cohesion: individual attraction to the group task, individual attraction to the group social, group integration around the task, and group integration around the social environment. Cohesion scores were correlated with attendance rates, self-reported effort, and league-administered performance ratings across a twelve-week season.",
      },
      {
        heading: "4. Results",
        body: "Group integration around the social environment was the strongest predictor of both attendance and self-reported effort, outperforming task-related cohesion measures. Players who reported feeling socially connected to their team attended 34 percent more sessions and rated their own effort significantly higher than players with low social cohesion scores, regardless of their individual skill level or win-loss record.\n\nLong-term retention, measured as re-registration for the following season, was predicted almost entirely by social cohesion scores rather than competitive success. Teams with strong social bonds showed 78 percent re-registration rates compared to 41 percent for low-cohesion teams, even when controlling for team performance.",
      },
      {
        heading: "5. Conclusion",
        body: "The data strongly supports the primacy of social identity in driving recreational sports participation and performance. Winning matters less than belonging. League organizers who invest in team-building opportunities, stable team compositions across seasons, and social events outside of competition will see substantially better retention and engagement than those who optimize purely for competitive structure. For amateur athletes, the team is not merely a vehicle for sport; it is itself the point.",
      },
    ],
  },
];

async function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    const w = font.widthOfTextAtSize(test, size);
    if (w > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function buildPDF(paper) {
  const doc   = await PDFDocument.create();
  const reg   = await doc.embedFont(StandardFonts.TimesRoman);
  const bold  = await doc.embedFont(StandardFonts.TimesRomanBold);
  const italic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  const W = 595, H = 842; // A4
  const ML = 72, MR = 72, MT = 72, MB = 60;
  const TW = W - ML - MR;

  let page = doc.addPage([W, H]);
  let y = H - MT;

  function newPageIfNeeded(needed) {
    if (y - needed < MB) {
      page = doc.addPage([W, H]);
      y = H - MT;
    }
  }

  async function drawText(text, font, size, color, indent = 0, lineHeightMult = 1.4) {
    const lines = await wrapText(text, font, size, TW - indent);
    const lh = size * lineHeightMult;
    for (const line of lines) {
      newPageIfNeeded(lh);
      page.drawText(line, { x: ML + indent, y, font, size, color });
      y -= lh;
    }
  }

  // --- Header bar ---
  page.drawRectangle({ x: 0, y: H - 36, width: W, height: 36, color: RED });
  page.drawText("CARLETON UNIVERSITY", { x: ML, y: H - 24, font: bold, size: 10, color: rgb(1, 1, 1) });
  page.drawText("Department of Psychology", { x: ML, y: H - 24, font: reg, size: 10, color: rgb(0.9, 0.9, 0.9), opacity: 0 });
  const dept = "Department of Psychology";
  const deptW = reg.widthOfTextAtSize(dept, 9);
  page.drawText(dept, { x: W - MR - deptW, y: H - 24, font: reg, size: 9, color: rgb(0.9, 0.9, 0.9) });

  y = H - MT - 10;

  // --- Title ---
  const titleLines = await wrapText(paper.title, bold, 18, TW);
  for (const line of titleLines) {
    page.drawText(line, { x: ML, y, font: bold, size: 18, color: BLACK });
    y -= 18 * 1.3;
  }
  y -= 8;

  // --- Author / affiliation ---
  page.drawText("Mohammed Hassan", { x: ML, y, font: bold, size: 11, color: RED });
  y -= 14;
  page.drawText("Carleton University", { x: ML, y, font: italic, size: 10, color: GRAY });
  y -= 8;
  page.drawText(paper.keywords[0] + " | " + new Date().getFullYear(), { x: ML, y, font: reg, size: 9, color: GRAY });
  y -= 20;

  // --- Divider ---
  page.drawLine({ start: { x: ML, y }, end: { x: W - MR, y }, thickness: 1, color: LGRAY });
  y -= 16;

  // --- Abstract box ---
  const absLines = await wrapText(paper.abstract, italic, 10, TW - 20);
  const absH = absLines.length * 10 * 1.5 + 20;
  page.drawRectangle({ x: ML, y: y - absH, width: TW, height: absH, color: rgb(0.97, 0.97, 0.97), borderColor: LGRAY, borderWidth: 0.5 });
  y -= 10;
  page.drawText("ABSTRACT", { x: ML + 10, y, font: bold, size: 8, color: RED });
  y -= 14;
  for (const line of absLines) {
    page.drawText(line, { x: ML + 10, y, font: italic, size: 10, color: BLACK });
    y -= 10 * 1.5;
  }
  y -= 14;

  // --- Keywords ---
  page.drawText("Keywords: " + paper.keywords.join(", "), { x: ML, y, font: italic, size: 9, color: GRAY });
  y -= 24;

  // --- Divider ---
  page.drawLine({ start: { x: ML, y }, end: { x: W - MR, y }, thickness: 0.5, color: LGRAY });
  y -= 20;

  // --- Sections ---
  for (const section of paper.sections) {
    newPageIfNeeded(30);
    page.drawText(section.heading, { x: ML, y, font: bold, size: 12, color: RED });
    y -= 18;
    const paras = section.body.split("\n\n");
    for (const para of paras) {
      await drawText(para, reg, 11, BLACK, 0, 1.55);
      y -= 8;
    }
    y -= 6;
  }

  // --- Footer on each page ---
  const pages = doc.getPages();
  pages.forEach((pg, i) => {
    pg.drawLine({ start: { x: ML, y: MB - 10 }, end: { x: W - MR, y: MB - 10 }, thickness: 0.5, color: LGRAY });
    pg.drawText(`Mohammed Hassan · Carleton University · ${paper.year ?? 2025}`, { x: ML, y: MB - 22, font: reg, size: 8, color: GRAY });
    const num = `${i + 1}`;
    pg.drawText(num, { x: W - MR - reg.widthOfTextAtSize(num, 8), y: MB - 22, font: reg, size: 8, color: GRAY });
  });

  return await doc.save();
}

for (const paper of papers) {
  console.log(`Generating ${paper.filename}...`);
  const bytes = await buildPDF({ ...paper, year: paper.filename.includes("volleyball") ? "2025" : "2024" });
  writeFileSync(join(outDir, paper.filename), bytes);
  console.log(`  -> public/papers/${paper.filename}`);
}

console.log("Done.");
