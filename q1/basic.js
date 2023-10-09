class MyElement extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const p = document.createElement('p');
    
      const link = document.createElement('a');
      link.href = 'https://github.com/vitormotaleite';
      link.textContent = 'vitormotaleite';
  
     p.appendChild(link);
  
      this.appendChild(p);
    }
  
    disconnectedCallback() {
    }
  
    static get observedAttributes() {
      return [];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
    }
  
    adoptedCallback() {
    }
  }
  
  customElements.define("pw-basic", MyElement);
  