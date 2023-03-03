/**
 * @typedef BodyElement
 * @type {object}
 * @property {HTMLElement} content - content to be displayed.
 * @property {number} type - how the element should be treated. Defined in AppBody.TYPE_<type>.
 * @property {number} position - where to put the element on the page.
 */

class _AppBody {
  #id;
  #rendered=false;
  #elements=[];
  visible;

  constructor(opt_id, visible=false) {
    if (opt_id) this.#id=opt_id;
    else this.#id = ''+Math.random();
    this.visible = visible;
  }

  /**
   * manually add element to page
   * @param {BodyElement} element element to display, position gets ignored when append is true
   * @param {boolean} append 
   * @returns 
   */
  addElementFromJson(element, append) {
    // check for required attributes
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
  /**
   * add title to page, automatically added to table of contents
   * @param {String} text 
   * @param {boolean} append 
   * @param {number} [opt_position] ignored when append is true 
   */
  addTitle(text, append=true, opt_position) {
    const domTitle = document.createElement('h1');
    domTitle.textContent = text;
    this.addElementFromJson({
      type: AppBody.TYPE_TITLE,
      content: domTitle,
      position: [opt_position]
    }, append)
  }
  /**
   * adds paragraph to page, automatically added to  the section of the preceeding title
   * @param {String} text 
   * @param {boolean} append 
   * @param {number} [opt_position] ignored when append is true 
   */
  addParagraph(text, append=true, opt_position) { // todo: support simple markdown
    const domParagraph = document.createElement('p');
    domParagraph.textContent = text;
    this.addElementFromJson({
      type: AppBody.TYPE_PARAGRAPH,
      content: domParagraph,
      position: opt_position
    }, append)
  }
  /**
   * adds highlighted code to the page, automatically added to the section of the preceeding title
   * @param {String} text code to add; please note, that formating is not changed
   * @param {String} language language the code is written in, all options in /highlight/languages/
   * @param {boolean} copyBtn wheather or not a button to copy the text should be added, defaults to true
   * @param {boolean} append 
   * @param {number} [opt_position] ignored when append is true 
   */
  addCode(text, language, copyBtn=true, append=true, opt_position) {
    // create code block
    const codeBlockHtml = hljs.highlight(text, {language: language, ignoreIllegals: true}).value;
    const code = document.createElement('code');
    code.innerHTML = codeBlockHtml;

    // add code to container
    const codeContainer = document.createElement('pre');
    codeContainer.appendChild(code);
    codeContainer.classList.add('code');

    if (copyBtn) {
      // add copy buttons
      const copyImg = new Image();
      copyImg.src = './res/icons/content_copy.svg';
      copyImg.href = '#';
      copyImg.classList.add('clickable');
      copyImg.classList.add('code-copy');
      copyImg.width = 35;
      copyImg.height = 29.16;
      copyImg.onclick = e => {navigator.clipboard.writeText(text)}
      codeContainer.appendChild(copyImg);
    }
    

    this.addElementFromJson({
      type: AppBody.TYPE_CODE,
      content: codeContainer,
      position: opt_position
    }, append);
  }
  /**
   * add full width image to page body. As of now, loading is not guaranteed
   * @param {string} imageLocation where to find the image file, may be url
   * @param {number} [maxRetries] maximum amount of times the image tries to reload, this is useful for images from external sources
   * @ param {number} [height] max height
   * @param {boolean} append 
   * @param {number} [opt_position] ignored when append is true 
   */
  addImage(imageLocation, maxRetries=3, append=true, opt_position) {
    const image = new Image();
    image.src = imageLocation;
    image.classList.add('body-image');
    image.setAttribute('dt-retry', maxRetries); // retries

    const imgErrorFunction = function () {
      try {
          var allowRetry = false;
          var r = 3;
          if (this.hasAttribute('dt-retry')) {
              r = parseInt(this.getAttribute('dt-retry'));
              r -= 1;
              this.setAttribute('dt-retry', r);
              if (r <= 0) {
                  allowRetry = false;
              }
          }

          if (allowRetry) {
              var temp = new Image();
              temp.setAttribute('dt-retry', r);
              temp.onerror = imgErrorFunction;
              temp.src = this.src;
          }
      } catch (e) {

      }
  }
    image.onerror = imgErrorFunction;

    this.addElementFromJson({
      type: AppBody.TYPE_GRAPHIC,
      content: image,
      position: opt_position
    }, append);
  }

  /**
   * manually render page
   * @returns true if the render was performed
   */
  render() {
    if (this.#rendered) return false;
    this._forceRender();
  }
  /**
   * force rerender of page
   * @returns 
   */
  _forceRender() {
    const oldBody = document.getElementById(this.#id);
    if(oldBody) oldBody.remove();
    if(!this.visible) return;

    const textBody = document.createElement('article');
    textBody.classList.add('textbody');
    textBody.id = this.#id;

    /* toc */
    // add list of headings in new element, to make navigation simpler
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

      elementNavItem.textContent = titleText;
      elementNavItem.href = `#${titleText.toLowerCase().replace(' ', '-')}`

      elementListItem.appendChild(elementNavItem);
      navList.appendChild(elementListItem);
    });
    navMenu.appendChild(navList);
    textBody.appendChild(navMenu); // needs to be added before body to support styling for devices with small screen width
    
    /* body */
    // container type can support automated content detection
    var lastSection = document.createElement('section');
    this.#elements.forEach(element => {
      switch (element.type) {
        case AppBody.TYPE_TITLE:
          // might create empty section, if beginns with title
          textBody.appendChild(lastSection);
          lastSection = document.createElement('section');
          
          // to fix skipping to the section, a invisible element is added, that maintains the offset of the top bar
          const tocAnchor = document.createElement('a');
          tocAnchor.classList.add('toc-document-anchor');
          tocAnchor.id = element.content.firstChild.textContent.toLowerCase().replace(' ', '-');
          lastSection.append(tocAnchor);
          lastSection.appendChild(element.content);
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

    this.#rendered = true;
  }

  set visible(bool) {
    this.visible = bool;
    this.#rendered = false;
    this.render();
  }
}

export class AppBody { // don't expose constructor
  static #allBodies = [];
  /**
   * @type {_AppBody} the current body
   */
  static MAIN = new _AppBody('main'); // TODO: don't expose body directly; make creation function
  static CURRENT_ID = 0;

  static TYPE_TITLE = 0;
  static TYPE_PARAGRAPH = 1;
  static TYPE_CODE = 2;
  static TYPE_GRAPHIC = 3;
  static TYPE_OTHER = -1;

  /**
   * Create a new empty body.
   * @returns id of created body
   */
  static createBody() {
    const bodyId = this.#allBodies.length;
    this.#allBodies[bodyId] = new _AppBody(`mainbody_${bodyId}`);
    return bodyId;
  }

  /**
   * Change the content of a page, without loading it.
   * @param {number} id index of the page to setup, which is returned by the createBody function
   * @param {Function} setupFunction function that takes a _AppBody page as an argument and returns this page with the changes applied
   */
  static setupPage(id, setupFunction) {
    if (!this.#allBodies[id]) return console.error('Invalid page id');
    const result = setupFunction(this.#allBodies[id]);
    if (!(result instanceof _AppBody)) return console.error('Return value of setupFunction is not of type _AppBody.');
    this.#allBodies[id] = result;
  }

  /**
   * hide the old body and replace it with the specified page
   * @param {number} id index of the page to set, which is returned by the createBody function. id < 0 hides the current page.
   */
  static setCurrent(id) {
    this.MAIN.visible = false;
    this.MAIN._forceRender();
    if(id < 0) return;
    this.#allBodies[id].visible = true;
    this.MAIN = this.#allBodies[id];
    this.MAIN._forceRender();
    this.CURRENT_ID = id;
  }

  /**
   * ensures all old bodies are removed and forces the current one to rerender
   */
  static forceUpdate() {
  // force remove all remaining 
  const textBodys = document.getElementsByClassName('textbody');
  for (let i = 0; i < textBodys.length; i++) {
    textBodys.item(i).remove();
  }

  // rerender current
  this.MAIN._forceRender();
  }
}