import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addlistener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Project State Management
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new ProjectState());
  }

  addProject(title: string, description: string, people: number): void {
    const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
    this.projects.push(newProject);
    this.invokeListeners();
  }
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const proj = this.projects.find((proj) => proj.id === projectId);
    if (proj && proj.status !== newStatus) {
      proj.status = newStatus;
      this.invokeListeners();
    }
  }
  private invokeListeners() {
    for (const listenFn of this.listeners) {
      listenFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
