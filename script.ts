interface ISmartphone {
    carica: number
    idCall:number
    costoMinuto: number
    numeroChiamate:number
    registroChiamate: InfoChiamata[]

    ricarica(euro: number): void

    getCreditoResiduo(): string

    getNumeroChiamate(): number

    chiamata(min: number): void

    azzeraChiamate(): void

}

class InfoChiamata {
    constructor(public id: number, public durata: number, public data: Date) {

    }

}

class Utente implements ISmartphone {
    carica: number = 0
    idCall:number = 0
    costoMinuto: number = 0.2
    numeroChiamate!:number
    registroChiamate: InfoChiamata[] = []

    constructor(
        public euro: number,


    ) {
        this.ricarica(this.euro)
        this.getCreditoResiduo()

    }

    ricarica(euro: number): void {
        this.carica += euro
    }

    chiamata(min: number): void {
        if(this.carica > (min * this.costoMinuto)){
        this.carica -= min * this.costoMinuto
        let chiamata:InfoChiamata = new InfoChiamata(this.idCall+=1, min, new Date())
        this.registroChiamate.push(chiamata)
        console.log(this.registroChiamate)
        this.numeroChiamate += 1
        }else{
            alert('credito insufficente')
        }


    }

    getCreditoResiduo(): string {
        if (this.carica <= 0) {
            return "Credito residuo insufficente"
        } else {
            return "Credito residuo:" + this.carica + "€"
        }
    }

    getNumeroChiamate(): number {
        return this.numeroChiamate
    }

    azzeraChiamate(): void {
        this.numeroChiamate = 0
    }



}

let user1 = new Utente(10)
let user2: Utente = new Utente(100)
let user3: Utente = new Utente(200)
console.log(user1)
user1.chiamata(5)
console.log(user1.getCreditoResiduo())
console.log(user1.registroChiamate)