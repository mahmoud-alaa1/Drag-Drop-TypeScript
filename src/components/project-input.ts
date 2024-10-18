import { autoBind } from "../decrators/autobind.js";
import { projectState } from "../state/project-state.js";
import { Component } from "./base-component.js";
import { Validatable, validate } from "../util/validation.js";
//ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input", true);

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
  }

  private gatherInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;

    const enteredDescription = this.descriptionInputElement.value;

    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      requerid: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      requerid: true,
      minlenght: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      requerid: true,
      min: 1,
      max: 5,
    };
    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert("Invalid input, please try again!");
      return;
    } else return [enteredTitle, enteredDescription, +enteredPeople];
  }

  renderContent(): void {}

  @autoBind
  private submitHnadler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherInput();
    if (userInput) {
      const [title, desc, people] = userInput;
      // this.clearInputs();
      projectState.addProject(title, desc, people);
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHnadler);
  }
}
