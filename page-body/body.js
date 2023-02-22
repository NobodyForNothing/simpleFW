class _AppBody {
  #id;
  #rendered=false;
  #elements=[];
  visible;

  constructor(opt_id, visible=false) {
    if (opt_id) this.#id=opt_id;
    else this.#id = ''+Math.random();
    this.visible = visible;
    
    console.log(this);
  }

  addElementFromJson(element, append) {
    // check for required attributes
    console.log(element);
    console.log(this);
    if (!element || isNaN(element.type)) return console.error('Elements added to AppBody must declare type and content');
    // check if element.content is dom object
    if (!(element.content instanceof HTMLElement)) return console.error('element.content must be instance of HTMLElement');
    element.content.classList.add('textbody-element');
    if(append || !element.position || isNaN(element.position)) {
      if (!append) console.warn('Elements added to AppBody should declare position explicitly!\nAssuming append!');
      // adding elements with unknown position to end
      var pos = 0;
      for (const e of this.#elements) {
        if (e.position>=pos) pos = (e.position+1);
      }
      element.position = pos;
      // this can be done here directly to increase performance
      // ATTENTION when adding axtra functionality
      this.#elements[this.#elements.length] = element;
    } else {
      // sort into elements array
      var i = 0;
      while(this.#elements[i].position<element.position) {
        i++;
      }
      this.#elements.splice(i, 0, element);
    }
    
    this.#rendered = false;
    this.render();
  }
  addTitle(text, append=true, opt_position) {
    const domTitle = document.createElement('h1');
    domTitle.textContent = text;
    this.addElementFromJson({
      type: AppBody.TYPE_TITLE,
      content: domTitle,
      position: opt_position
    }, append)
  }
  addParagraph(text, append=true, opt_position) {
    const domParagraph = document.createElement('p');
    domParagraph.textContent = text;
    this.addElementFromJson({
      type: AppBody.TYPE_PARAGRAPH,
      content: domParagraph,
      position: opt_position
    }, append)
  }

  render() {
    if (this.#rendered) console.log('Ds');
    this._forceRender();
  }
  _forceRender() {
    const oldBody = document.getElementById(this.#id);
    if(oldBody) oldBody.remove();
    if(!this.visible) return;

    const textBody = document.createElement('article');
    textBody.classList.add('textbody');
    textBody.id = this.#id;
    
    // container type can support automated content detection
    var lastSection = document.createElement('section');
    this.#elements.forEach(element => {
      switch (element.type) {
        case AppBody.TYPE_TITLE:
          // might create empty section, if beginns with title
          textBody.appendChild(lastSection);
          lastSection = document.createElement('section');
          lastSection.id = `#${element.content.firstChild.textContent.toLowerCase().replace(' ', '-')}`;
          lastSection.appendChild(element.content); // todo add section href system
          break;
        case AppBody.TYPE_PARAGRAPH:
          lastSection.appendChild(element.content);
          break;
        default:
          // treating other types as paragraph
          lastSection.appendChild(element.content);
          break;
      }
    });
    textBody.appendChild(lastSection);

    document.body.appendChild(textBody);

    // add list of headings in new element, to make navigation simpler
    // TODO: make navigation work; overflow when scaled big
    const oldNavMenu = document.getElementsByClassName('toc-menu')[0];
    if(oldNavMenu) oldNavMenu.remove();

    const navMenu = document.createElement('nav');
    const navList = document.createElement('ul');
    navMenu.classList.add('toc-menu'); // toc - table of contents
    navList.classList.add('toc-list');

    const navMenuHeading = document.createElement('h2');
    navMenuHeading.classList.add('toc-title');
    navMenuHeading.innerText = 'Contents';
    navMenu.appendChild(navMenuHeading);
    // add elements
    this.#elements.forEach(element => {
      if (element.type !== AppBody.TYPE_TITLE) return;
      const titleText = element.content.firstChild.textContent;
      const elementListItem = document.createElement('li');
      const elementNavItem = document.createElement('a');

      elementListItem.id = `toc-${titleText.toLowerCase().replace(' ', '-')}`;
      elementNavItem.textContent = titleText;
      elementNavItem.href = `#${titleText.toLowerCase().replace(' ', '-')}`

      elementListItem.appendChild(elementNavItem);
      navList.appendChild(elementListItem);
    });
    navMenu.appendChild(navList);
    document.body.appendChild(navMenu);

    this.#rendered = true;
  }

  set visible(bool) {
    this.visible = bool;
    this.#rendered = false;
    this.render();
  }
}

export class AppBody { // don't expose constructor
  static MAIN = new _AppBody('main'); // only one can exist

  static TYPE_TITLE = 0;
  static TYPE_PARAGRAPH = 1;
  static TYPE_OTHER = -1;
}