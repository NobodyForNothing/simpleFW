/**
 * class to manage darkmode and lightmode
 */
export class DarkLightSwitch {
  static #isDark=true;

  /**
   * get a new switch to change darkmode and lightmode
   * @returns {HTMLElement} switch for site
   */
  static getSwitch() {
    this.#loadCookies();
    this.#updateLayouts();

    // setup html-css elements
    const switchContainer = document.createElement('label');
    switchContainer.classList.add('switch');
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !this.#isDark;
    const slider = document.createElement('span');

    switchContainer.appendChild(cb);
    switchContainer.appendChild(slider);

    // logic
    switchContainer.addEventListener('mousedown',(e)=>{
      DarkLightSwitch.toggle();
    });
    

    return switchContainer;
  }

  /**
   * apply the last state saved in the cookies
   */
  static #loadCookies() {
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
  static #setCookies() {
    if(this.#isDark) document.cookie = "darkmode=1; SameSite=lax; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    else document.cookie = "darkmode=0; SameSite=lax; expires=Fri, 31 Dec 9999 23:59:59 GMT"; ; 
  }

  /**
   * toggles dark-light mode if last toggle is less than half a second ago
   * @returns {boolean} success
   */
  static toggle() {
    this.#isDark = !this.#isDark;
    this.#updateLayouts();
    this.#setCookies();
    return true;
  }

  static #updateLayouts() {
    if (this.#isDark) {
      // page theme
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      
      const oldCodeStylesheet = document.getElementById('--code-style-stylesheet');
      oldCodeStylesheet.href='./highlight/styles/dark.min.css';
    } else {
      // page theme
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