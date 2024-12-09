export const modules = [
  {
    name: "Crimeline",
    slug: "crimeline",
    description:
      "Participants will be given a case file with details of a crime that has taken place. Scanning for clues and interrogating suspects will ultimately help them solve the case.",
  },
  {
    name: "Escape Room",
    slug: "escape-room",
    description:
      "Participants will be required to solve riddles and find clues, along with other perplexing tasks to escape a locked room.",
  },
  {
    name: "Medical Mayhem",
    slug: "medical-mayhem",
    description:
      "Participants will have to provide diagnosis on patients and solve complex biological questions.",
  },
  {
    name: "Scirun",
    slug: "scirun",
    description:
      "Participants will be provided with clues and perform tasks in a scavenger hunt type scenario.",
  },
  {
    name: "Crack it out",
    slug: "crack-it-out",
    description:
      "Participants will be required to build models by taking into consideration real life problems and challenges into consideration.",
  },
  {
    name: "The Psych Realm",
    slug: "psych-realm",
    description:
      "Participants would dive into the multiverse of psychology with this module, featuring experiments, psychological treatments, mental health insights, theory of mind, and psychometric tests.",
  },
  {
    name: "Mathelatics",
    slug: "mathelatics",
    description:
      "Participants will have to solve various mathematical questions and take part in games and complete tasks.",
  },
  {
    name: "Speed Programming",
    slug: "speed-programming",
    description:
      "Participants will solve a series of tasks by writing a code against the clock, including programming etc.",
  },
  {
    name: "RoboWars",
    slug: "robowars",
    description:
      "Participants will be required to make the Robots for a showdown.",
  },
  {
    name: "Chemathon",
    slug: "chemathon",
    description:
      "A Chemathon is a chemistry competition where participants solve theoretical problems, conduct experiments. It tests knowledge, creativity, and teamwork in various chemistry-related challenges.",
  },
  {
    name: "HeatOps",
    slug: "heatops",
    description:
      "This module tasks participants with calculating cooling loads, selecting suitable air conditioners, and designing sustainable solutions for real-world climate challenges.",
  },
] as const;

export type Module = (typeof modules)[number];
