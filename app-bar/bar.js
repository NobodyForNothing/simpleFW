export class AppBar {
  static TOP = new AppBar("top", [], true, "top");
  static LEFT = new AppBar("left", [], true, "left");
  static RIGHT = new AppBar("right", [], true, "right");
  static BOTTOM = new AppBar("bottom", [], true, "bottom");

  #id;
  #elements = [];
  #position;
  #rendered = false;
  #hidden = true;

  constructor(position, domElements, startHidden, opt_id) {
    this.#position = position;
    this.#elements.concat(domElements);
    this.#hidden = startHidden;
    if (opt_id) this.#id = opt_id;
    else this.#id = ''+Math.random();
  }

  appendElement(domElement, alignRight = false) { // TODO: alignRight property
    this.#elements.push(domElement);
    this.#rendered = false;
    this.render();
  }

  addText(text, opt_callback, alignRight=false) {
    const outer = document.createElement("div");
    const inner = document.createElement("a");
    outer.classList.add("clickable");
    inner.innerText = text;
    inner.onclick = opt_callback;
    outer.appendChild(inner);
    this.appendElement(outer, alignRight);
  }

  set visible(bool) {
    this.#hidden = !bool;
    this.#rendered = false;
    this.render();
  }
  get visible() {
    return !this.#hidden
  }

  render() {
    if (this.#rendered) return;
    this._forceRender();
  }
  _forceRender() {
    const oldBar = document.getElementById(this.#id);
    if(oldBar) oldBar.remove();
    if (this.#hidden) return;
    

    const barMain = document.createElement("header");
    barMain.id = this.#id;
    
    barMain.classList.add("bar");
    barMain.classList.add(this.#position);
    this.#elements.forEach((element) => {
      barMain.appendChild(element);
    });

    this.#rendered = true;
    document.body.appendChild(barMain);
  }
}