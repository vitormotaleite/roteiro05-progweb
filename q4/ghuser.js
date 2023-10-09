class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <img id="avatar">
        <h1 id="username"></h1>
        <p>Seguidores: <span id="seguidores"></span></p>
        <p>Seguindo: <span id="seguindo"></span></p>
        <p>Repositórios públicos: <span id="publico"></span></p>
      </div>
    `;

    this.username = this.querySelector('#username');
    this.avatar = this.querySelector('#avatar');
    this.seguidores = this.querySelector('#seguidores');
    this.seguindo = this.querySelector('#seguindo');
    this.repositorios_publicos = this.querySelector('#publico');
    
    localStorage.setItem('ghtoken','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')
    this.token = localStorage.getItem('ghtoken');

    const buscarDadosUsuario = async (username) => {

      var url = username
        ? `https://api.github.com/users/${username}`
        : 'https://api.github.com/user';
      
        const headers = {
        Authorization: `token ${this.token}`,
      };

      try {
        const res = await fetch(url, {headers});
        const user = await res.json();

        this.username.textContent = user['login'] || username;
        this.avatar.src = user['avatar_url'];
        this.seguidores.textContent = user['followers'];
        this.seguindo.textContent = user['following'];
        this.repositorios_publicos.textContent = user['public_repos'];
      }
       catch (error) {
        console.error('usuario nao encontrado:', error);
      }
    }

    const username = this.getAttribute('username');
    if (username) {
      buscarDadosUsuario(username);
    } else {
      buscarDadosUsuario('');
    }

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

customElements.define("pw-ghuser", MyElement);
