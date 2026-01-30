"use client";

import { ScrollTimeline, TimelineEvent } from "../ScrollStack";

const Experience = () => {
  const myExperience: TimelineEvent[] = [
    {
      year: "2023",
      title: "Web Design",
      subtitle: "Arodesk Learning",
      description:
        "Worked on responsive web design projects, creating modern UIs and improving user experience with HTML, CSS, and JavaScript.",
    },

    {
      year: "2024",
      title: "Web Developer",
      subtitle: "Mangrove Software & IT",
      description: "Collaborated in a team to develop projects, fix bugs, and add new features. Built responsive UIs with React and Next.js using Redux for state management, and worked with Node.js, MongoDB, and Mongoose for backend and database operations.",
    },
    {
      year: "2025",
      title: "Team Lead",
      subtitle: "Team Project",
      description: "Led a team of developers in creating innovative web applications, fostering collaboration and ensuring project success.",
    },
  ];
  return (
    <div>
      <ScrollTimeline events={myExperience} />
    </div>
  );
};

export default Experience;
