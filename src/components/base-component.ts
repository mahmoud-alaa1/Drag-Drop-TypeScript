export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;

  hostElement: T;

  element: U;

  constructor(templateId: string, hostElementId: string, newElementId?: string, insertAtStart: boolean = false) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(this.templateElement.content, true); //documment fragment i.e. <> </>

    this.element = importedNode.firstElementChild as U;

    this.element.id = newElementId ?? "";

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    /*
      'beforebegin': Before the targetElement itself.
      'afterbegin': Just inside the targetElement, before its first child.
      'beforeend': Just inside the targetElement, after its last child.
      'afterend': After the targetElement itself.
    */
  }

  abstract configure(): void;

  abstract renderContent(): void;
}
