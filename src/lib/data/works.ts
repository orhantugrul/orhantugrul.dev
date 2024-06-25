export type Work = {
  title: string;
  description: string;
  technologies: string[];
};

const works: Work[] = [
  {
    title: "Cloud4Next",
    description:
      "Modern multi-cloud management system, allowing \
      organizations to manage leading cloud platforms such as AWS, \
      Google Cloud, Microsoft Azure under one integrated roof. \
      This innovative web application enables users to effectively manage, \
      share and optimize cloud resources, making business processes \
      more efficient. ",
    technologies: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "RESTful APIs",
      "Celery",
      "Docker",
      "Redis",
      "Google Cloud",
      "AWS",
      "Microsoft Azure",
    ],
  },
  {
    title: "Spinex",
    description:
      "Treasury Management Product that provides efficiency increase \
      by gathering all operations on a single platform with the aim of \
      both speeding up and simplifying business processes in \
      treasury departments.",
    technologies: [
      "Java",
      "Kotlin",
      "JavaScript",
      "Spring Framework",
      "React.js",
      "RESTful APIs",
      "Kafka",
    ],
  },
];

export default works;
