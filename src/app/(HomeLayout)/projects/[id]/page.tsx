"use client";

import ProjectDetails from "@/components/AllProjects/ProjectDetails/ProjectDetails";

const ProjectDetail = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <ProjectDetails id={id} />
    </div>
  );
};

export default ProjectDetail;
