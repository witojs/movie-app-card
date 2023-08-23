class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <h1><i class="fa-sharp fa-solid fa-film"></i> CinemaWito99</h1>
        `;
  }
}

customElements.define("app-bar", AppBar);

//isi <app-bar></app-bar> dibawah header
