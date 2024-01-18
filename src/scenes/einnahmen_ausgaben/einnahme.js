class Einnahme {
    constructor (beschreibung, betrag, kategorie ) {
        this.beschreibung = beschreibung;
        this.betrag = betrag;
        this.kategorie = country;
    }
    toString() {
        return this.beschreibung + ', ' + this.betrag + ', ' + this.kategorie;
    }
}

// Firestore data converter
const einnahmeConverter = {
    toFirestore: (einnahme) => {
        return {
            beschreibung: einnahme.beschreibung,
            betrag: einnahme.betrag,
            kategorie: einnahme.kategorie
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Einnahme(data.beschreibung, data.betrag, data.kategorie);
    }
};