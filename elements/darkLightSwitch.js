/**
 * class to manage darkmode and lightmode
 * BUGS: slider wont move; slider needs to be added again, when changing body
 */
export class DarkLightSwitch {
  static #isDark=true;
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
    const saved = document.cookie
      .split('; ')
      .find((row) => row.startsWith('darkmode='))
      ?.split('=')[1];
      if (saved === '0') this.#isDark = false;
      else this.#isDark = true;
  }

  /**
   * save current state as cookie
   */
  static setCookies() {
    if(this.#isDark) document.cookie = "darkmode=1; SameSite=lax; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    else document.cookie = "darkmode=0; SameSite=lax; expires=Fri, 31 Dec 9999 23:59:59 GMT"; ; 
  }

  /**
   * toggles dark-light mode if last toggle is less than half a second ago
   * @returns {boolean} success
   */
  static toggle() {
    if((Date.now()-this.#lastToggle)<50) return false; // todo: remove timer
    this.#lastToggle = Date.now();

    this.#isDark = !this.#isDark;
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