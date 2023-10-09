class MyElement extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.tempo = document.createElement('span');
      this.appendChild(this.tempo);

      const hora = () => {
        const hoje = new Date();
        const h = hoje.getHours().toString().padStart(2, '0');
        const m = hoje.getMinutes().toString().padStart(2, '0');
        const s = hoje.getSeconds().toString().padStart(2, '0');
    
        this.tempo.textContent = `${h}:${m}:${s}`;
      }

      this.interval = setInterval(() => {
        hora();
      }, 300);
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
  customElements.define("pw-clock", MyElement);