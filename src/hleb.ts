import { Observable, Subscription, takeUntil, takeWhile } from "rxjs";

export class Hleb {
    private gornjaMargina: number;
    private levaMargina: number;
    private container: HTMLDivElement;
    private koeficijentBrzine: number;
    private roditelj: HTMLDivElement;
    constructor() {
        this.gornjaMargina = 0;
        this.koeficijentBrzine = 10;
    }
    crtajHleb(roditelj: HTMLDivElement) {
        this.roditelj = roditelj;
        const hlebDiv = document.createElement("div");
        this.container = hlebDiv;
        hlebDiv.innerHTML = "hlebic";
        hlebDiv.classList.add("hleb");
        //roditelj.appendChild(hlebDiv);
        roditelj.insertBefore(this.container, roditelj.firstChild);

        let levaMargina =
            Math.random() * roditelj.offsetWidth - hlebDiv.offsetWidth;
        this.container.style.marginLeft = levaMargina + "px";
        console.log(levaMargina);
    }
    private povecajMarginu() {
        this.gornjaMargina += this.koeficijentBrzine;
        this.container.style.marginTop = this.gornjaMargina + "px";
        console.log(
            `gornja margina je ${this.gornjaMargina} a visina roditelja ${this.roditelj.offsetHeight}`
        );
    }
    pretplatiSeNaTok(tok: Observable<number>) {
        tok.pipe(takeWhile(() => this.gornjaMargina < 300)).subscribe((p) => {
            this.povecajMarginu();
        });
    }
}
