export type Experience = {
  title: string;
  description: string;
  technologies: string[];
};

const experiences: Experience[] = [
  {
    title: "ITServ Technology",
    description:
      "Developed a modern multi-cloud management system integrating \
      VMWare vSphere and Amazon Web Services (AWS). Designed and implemented \
      scalable web applications using Next.js. Built and maintained \
      RESTful APIs with Flask, Celery, Redis, and PostgreSQL \
      using Docker. Optimized cloud resource management processes for \
      VMs and AWS for clients, improving efficiency across business units.",
    technologies: [
      "Flask",
      "Celery",
      "Next.js",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Amazon Web Services (AWS)",
      "VMWare vSphere",
      "Zabbix",
    ],
  },
  {
    title: "Yapı Kredi Leasing",
    description:
      "Contributed to a full-stack financial leasing application using \
      Spring Boot and React.js. Implemented unit and integration tests with \
      JUnit and Jest, ensuring high code reliability and functional accuracy. \
      Applied analysis and security tools like SonarQube and Fortify to \
      enforce high code quality and security standards. Collaborated in \
      agile, cross-functional teams to deliver robust enterprise solutions \
      aligned with business goals.",
    technologies: [
      "Spring Boot",
      "React.js",
      "JUnit",
      "Jest",
      "SonarQube",
      "Fortify",
    ],
  },
  {
    title: "Linktera",
    description:
      "Contributed to the development of a Treasury Management System \
      streamlining complex financial operations. Developed backend services \
      using Java (Spring Boot) and integrated real-time features with Kafka. \
      Collaborated on frontend modules with React.js, ensuring seamless user \
      experience and efficient workflows. Enhanced system performance and \
      reliability, supporting mission-critical financial tasks.",
    technologies: [
      "Spring Boot",
      "Hibernate",
      "React.js",
      "Kafka",
      "WebSocket",
    ],
  },
];

export default experiences;
