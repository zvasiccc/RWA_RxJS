export class Korpa {
    private levaMargina: number;
    constructor() {
        this.levaMargina = 0;
    }
    crtajKorpu(roditelj: HTMLDivElement) {
        const korpa = document.createElement("div");
        korpa.classList.add("korpa");
        korpa.innerHTML = "korpa";
        roditelj.appendChild(korpa);
        return korpa;
    }
}
