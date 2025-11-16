import { PageProps as BasePageProps } from "./index";

export interface Project {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
}

export interface ProjectsPageProps extends BasePageProps {
    projects: Project[];
}

interface TaskPageProps {
    projects: Project[];
    tasks: Task[];
    selectedProjectId: number;
    errors: { [key: string]: string };
}
