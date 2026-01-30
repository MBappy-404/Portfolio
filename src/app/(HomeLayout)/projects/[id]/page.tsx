import ProjectDetails from "@/components/AllProjects/ProjectDetails/ProjectDetails";



// 1. Define the type for params as a Promise
type Props = {
  params: Promise<{ id: string }>;
};

// 2. Make the component async
const ProjectDetail = async ({ params }: Props) => {
  // 3. Await the params to extract the id
  const { id } = await params;

  return (
    <div>
      <ProjectDetails id={id} />
    </div>
  );
};

export default ProjectDetail;