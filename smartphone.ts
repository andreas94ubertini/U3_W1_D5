{
     // versione con html interattivo
    interface ISmartphone {
        carica: number
        numeroChiamate: number
    }

    class InfoChiamata {
        constructor(public id: number, public durata: number, public data: Date) {

        }

    }

    class App {
        target: HTMLDivElement = document.getElementById('row-screen') as HTMLDivElement
        clocks: HTMLElement = document.getElementById('clock') as HTMLElement

        static clock(clocks: HTMLElement) {
            const date: Date = new Date()
            let hour: number = date.getHours()
            let minutes: number = date.getMinutes()
            clocks.textContent = `${hour.toString()}:${minutes.toString()}`
        }

        static writeHome(target: HTMLDivElement) {
            target.innerHTML = `
        <div class="col-12 tile mt-2 text-center">
        <p class="m-0 p-5 sim">Sim 1</p>
        </div>
        <div class="col-12 tile mt-2 text-center">
        <p class="m-0 p-5 sim">Sim 2</p>
        </div>
        <div class="col-12 tile mt-2 text-center">
        <p class="m-0 p-5 sim">Sim 3</p>
        </div>
        `
            const allSim: NodeListOf<Element> = document.querySelectorAll('.sim')
            const allAction: NodeListOf<Element> = document.querySelectorAll('.action')
            allAction.forEach((action: Element): void => {
                action.classList.add('d-none')
            })
            allSim[0].addEventListener('click', function () {
                allAction.forEach((action: Element): void => {
                    User1.writeUser(document.getElementById('row-screen') as HTMLDivElement)
                    allAction.forEach((action: Element): void => {
                        action.classList.remove('d-none')
                    })
                    action.classList.remove('d-none')
                })

            })
            allSim[1].addEventListener('click', function () {
                User2.writeUser(document.getElementById('row-screen') as HTMLDivElement)
                allAction.forEach((action: Element): void => {
                    action.classList.remove('d-none')
                })
            })
            allSim[2].addEventListener('click', function () {
                User3.writeUser(document.getElementById('row-screen') as HTMLDivElement)
                allAction.forEach((action: Element): void => {
                    action.classList.remove('d-none')
                })
            })
        }


    }


    let id: number = 0

    class Utente implements ISmartphone {
        carica: number = 0
        numeroChiamate: number = 0
        registroChiamate: InfoChiamata[] = []

        public unaRicarica(n: number): void {
            this.carica = this.carica + n
        }

        public chiamata(n: number): void {
            const target: HTMLDivElement = document.getElementById('row-screen') as HTMLDivElement
            if (n > this.carica) {
                alert('credito insufficente per effetuare la chiamata, effettua prima una ricarica')
            } else {
                this.numeroChiamate += 1
                this.carica = this.carica - (n * 0.20)
                id++
                let date: Date = new Date()
                const newCall: InfoChiamata = new InfoChiamata(id, n, date)
                this.registroChiamate.push(newCall)
                console.log('chiamata effettuata')


            }
        }

        public numero404(): number {
            return this.carica
        }

        public getNumeroChiamte(): number {
            return this.numeroChiamate
        }

        public azzeraChiamate(): void {
            this.numeroChiamate = 0
        }

        public writeInfo(registro: InfoChiamata[]): void {
            const target: HTMLDivElement = document.getElementById('row-screen') as HTMLDivElement
            registro.forEach((call: InfoChiamata): void => {
                const newCol: HTMLDivElement = document.createElement('div')
                newCol.classList.add('col-8')
                newCol.innerHTML = `
                <p>
                    chiamata n ${call.id}
                </p>
                <p>
                    effettuata ${call.data}
                </p>
                 <p>
                    durata ${call.durata} sec
                </p>
            `
                target.appendChild(newCol)
            })
        }
        public writeUser(target: HTMLDivElement) {
            target.innerHTML = ""
            target.innerHTML = `
            <div class="col-12 tile p-5">
           Credito Residuo : ${this.carica}
            </div>
            <div class="col-12 tile p-5" id="calls">
           Chiamate Effettuate : ${this.numeroChiamate}
            </div>
        `
            const showCall:Element = document.querySelector('#calls') as HTMLElement
            showCall.addEventListener('click', ():void=>{
                target.innerHTML = ''
                this.registroChiamate.forEach((call:InfoChiamata):void=>{
                    const newCol:HTMLDivElement = document.createElement('div')
                    newCol.classList.add('col-12', 'mt-3', 'tile')
                    console.log(call)
                    newCol.innerText = `Effettuata il: ${call.data}, duarata : ${call.durata}, chiamata numero: ${call.id}`
                    target.appendChild(newCol)
                })
            })
            const rowForm:HTMLDivElement = document.getElementById('row-form') as HTMLDivElement
            const callForm:HTMLElement = document.createElement('form')
            const chargeForm:HTMLElement = document.createElement('form')
            rowForm.innerHTML = ''
            chargeForm.innerHTML =`
                    <input type="number" class="rounded text-black text-center" name="" id="nmrch" placeholder="Ricarica">
                    <button class="btn btn-secondary">Conferma</button>
            `
            chargeForm.classList.add('d-none')
            rowForm.appendChild(chargeForm)
            chargeForm.addEventListener('submit', (e:SubmitEvent):void=>{
                const inputValue:HTMLInputElement = document.getElementById('nmrch') as HTMLInputElement
                let toAdd = parseInt(inputValue.value)
                e.preventDefault()
                this.unaRicarica(toAdd)
                this.writeUser(document.getElementById('row-screen') as HTMLDivElement)
            })
            callForm.innerHTML =`
                    <input type="number" class="rounded text-black text-center" name="" id="nmr" placeholder="Chiama">
                    <button class="btn btn-secondary">Conferma</button>
            `
            callForm.classList.add('d-none')
            rowForm.appendChild(callForm)
            callForm.addEventListener('submit', (e:SubmitEvent):void=>{
                const inputValue:HTMLInputElement = document.getElementById('nmr') as HTMLInputElement
                let toAdd = parseInt(inputValue.value)
                e.preventDefault()
                this.chiamata(toAdd)
                this.writeUser(document.getElementById('row-screen') as HTMLDivElement)
            })
            const allActions: NodeListOf<Element> = document.querySelectorAll('.action')
            let inputNumber: HTMLInputElement = document.getElementById('nmr') as HTMLInputElement
            allActions[0].addEventListener('click', function () {
                callForm.classList.remove('d-none')
            })
            allActions[1].addEventListener('click', function () {
                chargeForm.classList.remove('d-none')
            })
        }


    }

    let User1: Utente = new Utente()
    let User2: Utente = new Utente()
    let User3: Utente = new Utente()

    const target: HTMLDivElement = document.getElementById('row-screen') as HTMLDivElement
    const btn: HTMLElement = document.getElementById('home') as HTMLElement
    btn.addEventListener('click', function () {
        App.writeHome(target)
    })
    window.addEventListener('load', function () {
        const clock: HTMLElement = document.getElementById('clock') as HTMLElement
        setInterval(function () {
            App.clock(clock)
        }, 1000)
    })


}