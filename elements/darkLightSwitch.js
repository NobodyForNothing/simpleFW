/**
 * class to manage darkmode and lightmode
 */
export class DarkLightSwitch {
  static #isDark;
  static #lastToggle=0;

  /**
   * get a new switch to change darmode and lightmode
   * @returns {HTMLElement} switch for site
   */
  static getSwitch() {
    // setup html-css elements
    const switchContainer = document.createElement('label');
    switchContainer.classList.add('switch');
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    const slider = document.createElement('span');

    switchContainer.appendChild(cb);
    switchContainer.appendChild(slider);

    // logic
    switchContainer.onclick = ()=>DarkLightSwitch.toggle();
    
  
    return switchContainer;
  }

  /**
   * apply the last state saved in the cookies
   */
  static loadCookies() {

  }

  /**
   * save current state as cookie
   */
  static setCookies() {

  }

  /**
   * toggles dark-light mode if last toggle is less than half a second ago
   * @returns {boolean} success
   */
  static toggle() {
    if((Date.now()-this.#lastToggle)<5000) return false;
    this.#lastToggle = Date.now();

    this.#isDark != this.#isDark;
    this.#updateLayouts();
    this.setCookies();
    return true;
  }

  static #updateLayouts() {
    if (this.#isDark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      
      const oldCodeStylesheet = document.getElementById('--code-style-stylesheet');
      oldCodeStylesheet.href='./highlight/styles/dark.min.css';
      /*
      if(oldCodeStylesheet) oldCodeStylesheet.remove();
      const newCodeStyleSheet = document.createElement('link');
      newCodeStyleSheet.id = '--code-style-stylesheet';
      newCodeStyleSheet.rel= 'stylesheet';
      newCodeStyleSheet.type='text/css';
      */
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      
      const oldCodeStylesheet = document.getElementById('--code-style-stylesheet');
      oldCodeStylesheet.href='./highlight/styles/default.min.css';
    }
    
  }

  static get isDark() {
    return this.#isDark;
  }
  static get isLight() {
    return !this.#isDark;
  }
}