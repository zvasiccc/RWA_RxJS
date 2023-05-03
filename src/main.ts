import { debounceTime, fromEvent, interval, map, share, takeWhile } from "rxjs";
import { Hleb } from "./hleb";
import { Korpa } from "./korpa";

const poljeHlebova = document.createElement("div");
poljeHlebova.classList.add("polje-hlebova");
document.body.appendChild(poljeHlebova);

const tok2 = interval(200).pipe(share()); //share znaci da se vise hleba moze pretplatiti na tok

const tok1 = interval(2000).subscribe((p) => {
    const hleb = new Hleb();
    hleb.crtajHleb(poljeHlebova);
    hleb.pretplatiSeNaTok(tok2);
});

const trakaKorpe = document.createElement("div");
trakaKorpe.classList.add("traka-korpe");
document.body.appendChild(trakaKorpe);

const korpa = new Korpa();
const divKorpa = korpa.crtajKorpu(trakaKorpe);

const boxRect = trakaKorpe.getBoundingClientRect(); //da dobijemo apsolutne pozicije kursora
const absolutePosition = {
    x: boxRect.left + window.scrollX,
    y: boxRect.top + window.scrollY,
};

fromEvent(trakaKorpe, "mousemove")
    .pipe(
        debounceTime(1),
        map((event: MouseEvent) => ({
            x: event.clientX,
            y: event.clientY,
        }))
    )
    .subscribe((position) => {
        let x = position.x;
        x -= absolutePosition.x;
        x -= Math.floor(divKorpa.offsetWidth / 2);

        x = Math.max(0, x);
        x = Math.min(
            x,
            trakaKorpe.offsetWidth - Math.floor(divKorpa.offsetWidth)
        );

        divKorpa.style.left = x + "px";
        console.log(x);
    });
