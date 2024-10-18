import { autoBind } from "../decrators/autobind";

import { Draggable } from "../models/drag-drop";

import { Project } from "../models/project";

import { Component } from "./base-component";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  private get persons() {
    const returnString = this.project.people === 1 ? " Person" : " Persons";
    return this.project.people.toString() + returnString;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id, true);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @autoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autoBind
  dragEndHandler(event: DragEvent): void {}

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
