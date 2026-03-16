export interface PsychologyPaper {
  title: string;
  abstract: string;
  keywords: string[];
  year: string;
  pdfUrl: string;
}

export const psychologyPapers: PsychologyPaper[] = [
  {
    title: "The Paradox of Choice in Digital Interfaces: How Option Overload Drives User Abandonment",
    abstract:
      "Modern applications often overwhelm users with choices under the assumption that more options improve satisfaction. This paper examines Barry Schwartz's paradox of choice through the lens of UI/UX design, arguing that constraint-based design principles lead to higher engagement and reduced cognitive load. Drawing on studies in decision fatigue and attention economics, we propose a framework for reducing interface friction without sacrificing functionality.",
    keywords: ["Decision Fatigue", "Cognitive Load", "UX Design", "Behavioural Psychology"],
    year: "2024",
    pdfUrl: "/papers/paradox-of-choice.pdf",
  },
  {
    title: "Flow State and Athletic Performance: Psychological Triggers in Competitive Volleyball",
    abstract:
      "Csikszentmihalyi's concept of flow, a state of optimal experience characterized by full immersion and energized focus, has been studied extensively in elite athletes. This paper examines the psychological conditions that trigger flow states in amateur volleyball players, with particular attention to challenge-skill balance, clear feedback loops, and team cohesion. Data was gathered through self-reported surveys from recreational league participants in Ottawa.",
    keywords: ["Flow State", "Sport Psychology", "Motivation", "Athletic Performance"],
    year: "2025",
    pdfUrl: "/papers/flow-state-volleyball.pdf",
  },
  {
    title: "Social Identity and Team Cohesion: Why People Perform Better Together",
    abstract:
      "Social Identity Theory posits that individuals derive part of their self-concept from membership in social groups. This paper explores how group identity formation within recreational sports leagues influences individual performance, cooperation, and long-term participation. We argue that strong social identity within a team acts as a psychological motivator that consistently outperforms individual incentives in amateur competitive settings.",
    keywords: ["Social Identity Theory", "Group Dynamics", "Team Cohesion", "Sports Psychology"],
    year: "2025",
    pdfUrl: "/papers/social-identity-teams.pdf",
  },
];

export const paperAuthor = "Mohammed Hassan — Carleton University";
