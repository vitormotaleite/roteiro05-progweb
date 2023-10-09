class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.padrao = 10000;
    this.atual = this.getAttribute('tempo') || this.padrao;

    this.innerHTML = `
        <div>
          <p id="piada"></p>
          <div id="contador"></div>
        </div>
      `;

    this.piada = this.querySelector('#piada');
    this.contador = this.querySelector('#contador');

    const chuck = async () => {
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const retorno = await res.json();
        this.piada.textContent = retorno['value'];
      } catch (error) {
        console.error('piada nao encontrada:', error);
      }
    }

    const updateCont = () => {
      this.contador.textContent = (this.atual / 1000);
    }

    chuck();
    updateCont();

    setInterval(() => {
      this.atual -= 1000;
      updateCont();

      if (this.atual <= 0) {
        chuck();
        this.atual = this.getAttribute('tempo') || 10000
      }
    }, 1000);
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

customElements.define("pw-chuck", MyElement);
