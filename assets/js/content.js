"use strict";

window.courseData = Object.freeze({
  id: "sempre",
  title: "S.E.M.P.R.E.",
  subtitle: "Percorso di Formazione Umana e Professionale",
  payoff: "La formazione che attraversa competenze, relazione e consapevolezza.",
  acronym: [
    "Sensibilità",
    "Etica",
    "Metodo",
    "Paziente",
    "Relazione",
    "Empatia"
  ],
  demoLabel: "Demo",
  editorialNote: "Contenuti rielaborati dalla base editoriale S.E.M.P.R.E. e da “L’Iter Rivelato”.",
  chapters: [
    {
      id: "capitolo-1",
      number: 1,
      title: "Capitolo 1",
      status: "available",
      statusLabel: "Disponibile in demo",
      description: "Presentazioni, discussioni, visite sul campo e testimonianze compongono il primo tratto del percorso.",
      modules: [
        {
          id: "modulo-1",
          number: 1,
          title: "Modulo 1",
          subtitle: "Presentazione e discussione",
          description: "La presentazione del capitolo prende forma attraverso una discussione a tre, articolata in tre parti, e un supporto interattivo da consultare.",
          status: "available",
          resources: [
            {
              id: "parte-1",
              order: 1,
              type: "youtube",
              category: "Videolezione",
              title: "Videolezione — Parte 1",
              description: "Prima parte della discussione sulle slide del Modulo 1.",
              iframeTitle: "C1 M1 P1",
              embedUrl: "https://www.youtube-nocookie.com/embed/ZEub9_zjJPo?rel=0&playsinline=1"
            },
            {
              id: "parte-2",
              order: 2,
              type: "youtube",
              category: "Videolezione",
              title: "Videolezione — Parte 2",
              description: "Seconda parte della discussione sulle slide del Modulo 1.",
              iframeTitle: "C1 M1 P2",
              embedUrl: "https://www.youtube-nocookie.com/embed/LnlcbwSP8Rc?rel=0&playsinline=1"
            },
            {
              id: "parte-3",
              order: 3,
              type: "youtube",
              category: "Videolezione",
              title: "Videolezione — Parte 3",
              description: "Terza parte della discussione sulle slide del Modulo 1.",
              iframeTitle: "C1 M1 P3",
              embedUrl: "https://www.youtube-nocookie.com/embed/DeuGVscxP_Q?rel=0&playsinline=1"
            },
            {
              id: "flipbook",
              order: 4,
              type: "heyzine",
              category: "Materiale di approfondimento",
              title: "Flipbook interattivo",
              description: "La presentazione del Modulo 1 in un formato sfogliabile e consultabile.",
              iframeTitle: "Flipbook Capitolo 1 Modulo 1",
              embedUrl: "https://heyzine.com/flip-book/a28fa091cf.html"
            }
          ]
        },
        {
          id: "modulo-2",
          number: 2,
          title: "Modulo 2",
          subtitle: "Salute orale e prevenzione evidence-based",
          description: "Le problematiche orali prevalenti e le strategie di prevenzione evidence-based nei pazienti con Disturbo dello Spettro Autistico, con attenzione al ruolo dell’igienista dentale, della famiglia e del team multidisciplinare.",
          status: "available",
          statusLabel: "Disponibile in demo",
          sourceItems: [
            "Presentazione guida: condizioni cliniche e prevenzione evidence-based",
            "Flipbook di approfondimento"
          ],
          resources: [
            {
              id: "presentazione-guida",
              order: 1,
              type: "pdf-guide",
              category: "Presentazione guida",
              title: "Problematiche orali e prevenzione evidence-based",
              description: "Guida visiva in 24 pagine sulle condizioni cliniche orali nei pazienti con ASD: carie, bruxismo, erosione dentale, alterazioni salivari, malattie parodontali e strategie preventive personalizzate.",
              pageCount: 24,
              pagePath: "assets/module-2-guide/page-{page}.jpg"
            },
            {
              id: "flipbook",
              order: 2,
              type: "heyzine",
              category: "Materiale di approfondimento",
              title: "Flipbook — Salute orale e prevenzione",
              description: "Materiale sfogliabile di approfondimento collegato al Modulo 2, consultabile direttamente nel percorso formativo.",
              iframeTitle: "Flipbook Capitolo 1 Modulo 2",
              embedUrl: "https://heyzine.com/flip-book/4cf4337c85.html"
            }
          ]
        },
        {
          id: "modulo-3",
          number: 3,
          title: "Modulo 3",
          subtitle: "Pillole e testimonianze",
          description: "Presentazione, contenuti brevi e testimonianze raccolte attraverso interviste.",
          status: "coming-soon",
          statusLabel: "Contenuti in preparazione",
          sourceItems: [
            "Presentazione del modulo",
            "Video pillole",
            "Interviste e testimonianze"
          ],
          resources: []
        }
      ]
    },
    {
      id: "capitolo-2",
      number: 2,
      title: "Capitolo 2",
      status: "coming-soon",
      statusLabel: "Contenuti in preparazione",
      description: "Il secondo capitolo sviluppa strumenti visivi, storie sociali e strategie educative in tre moduli.",
      modules: [
        {
          id: "modulo-1",
          number: 1,
          title: "Modulo 1",
          subtitle: "Storie sociali e storia a fumetti",
          description: "Una presentazione introduce le storie sociali e una storia a fumetti in formato sfogliabile.",
          status: "coming-soon",
          statusLabel: "Contenuti in preparazione",
          sourceItems: [
            "Presentazione del modulo",
            "Video sulle storie sociali",
            "Storia a fumetti"
          ],
          resources: []
        },
        {
          id: "modulo-2",
          number: 2,
          title: "Modulo 2",
          subtitle: "CAA e strumenti educativi",
          description: "Comunicazione Aumentativa Alternativa, agende visive, token economy, contratto e social stories.",
          status: "coming-soon",
          statusLabel: "Contenuti in preparazione",
          sourceItems: [
            "Comunicazione Aumentativa Alternativa",
            "Agende visive e strumenti educativi",
            "Social stories"
          ],
          resources: []
        },
        {
          id: "modulo-3",
          number: 3,
          title: "Modulo 3",
          subtitle: "Pillole e approfondimenti",
          description: "Presentazione e contributi video di approfondimento; ulteriori materiali restano da validare.",
          status: "coming-soon",
          statusLabel: "Contenuti in preparazione",
          sourceItems: [
            "Presentazione del modulo",
            "Contributo video di Marco Pisoni",
            "Materiali ulteriori da validare"
          ],
          resources: []
        }
      ]
    },
    {
      id: "capitolo-3",
      number: 3,
      title: "Capitolo 3",
      status: "coming-soon",
      statusLabel: "Contenuti in preparazione",
      description: "L’Iter Rivelato è un percorso di autovalutazione narrativa che accompagna il team lungo le cinque tappe dell’esperienza del paziente.",
      modules: [
        {
          id: "modulo-1",
          number: 1,
          title: "Modulo 1",
          subtitle: "Lo Specchio del Team",
          description: "Vignette narrative e strumenti di autovalutazione aiutano il team a osservare il proprio modo di accogliere, comunicare e accompagnare.",
          status: "coming-soon",
          statusLabel: "Contenuti in preparazione",
          sourceItems: [
            "Serie 1 — Come mi racconto",
            "Serie 2 — Cosa farei davvero",
            "Riscontro personalizzato previsto"
          ],
          stages: [
            {
              number: 1,
              title: "Prima Voce",
              description: "Il contatto: telefono, prenotazione, primo scambio"
            },
            {
              number: 2,
              title: "Soglia",
              description: "L’ingresso fisico, la sala d’attesa, il primo impatto sensoriale"
            },
            {
              number: 3,
              title: "Dialogo Possibile",
              description: "La relazione durante la visita e il trattamento"
            },
            {
              number: 4,
              title: "Tenuta",
              description: "La gestione delle criticità e delle crisi"
            },
            {
              number: 5,
              title: "Congedo",
              description: "La dimissione, la restituzione, il recall"
            }
          ],
          resources: []
        }
      ]
    }
  ]
});
