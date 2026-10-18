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
              description: "Guida visiva in 26 pagine sulle condizioni cliniche orali nei pazienti con ASD: carie, bruxismo, erosione dentale, alterazioni salivari, malattie parodontali e strategie preventive personalizzate.",
              pageCount: 26,
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
          status: "available",
          statusLabel: "Disponibile in demo",
          sourceItems: [
            "Flipbook: L'adattamento del Setting Odontoiatrico e la Gestione della Visita",
            "Sessione 2: nove video pillole e interviste in tre sezioni"
          ],
          resources: [
            {
              id: "flipbook",
              order: 1,
              type: "heyzine",
              category: "Materiale di approfondimento",
              title: "Flipbook: L'adattamento del Setting Odontoiatrico e la Gestione della Visita",
              description: "Materiale sfogliabile del Modulo 3, consultabile direttamente nel percorso formativo.",
              iframeTitle: "Flipbook Capitolo 1 Modulo 3",
              embedUrl: "https://heyzine.com/flip-book/43d79e0d7c.html"
            },
            {
              id: "sessione-2",
              order: 2,
              type: "video-session",
              category: "Sessione 2 · Video pillole e interviste",
              title: "Video pillole e interviste",
              description: "Nove video in tre sezioni: Adattamento del Setting Odontoiatrico a cura di Silvia Masiero, La Gestione della Visita a cura di Guerino Paolantoni e le interviste a paziente e caregiver.",
              sourceUrl: "https://docs.google.com/document/d/1zvTINGKxB9JAjwg8XIfFKV84aCPNjkoc9qJxx_ytr00/edit",
              sections: [
                {
                  id: "setting",
                  title: "Adattamento del Setting Odontoiatrico",
                  author: "Silvia Masiero",
                  category: "Video pillole",
                  videos: [
                    { id: "video-01", order: 1, title: "Video Pillola 01", duration: 527, type: "vimeo", iframeTitle: "Silvia Masiero — Video Pillola 01", embedUrl: "https://player.vimeo.com/video/1236854616?h=ffd40798c5" },
                    { id: "video-02", order: 2, title: "Video Pillola 02", duration: 481, type: "vimeo", iframeTitle: "Silvia Masiero — Video Pillola 02", embedUrl: "https://player.vimeo.com/video/1236854651?h=3430ce8172" },
                    { id: "video-03", order: 3, title: "Video Pillola 03", duration: 263, type: "vimeo", iframeTitle: "Silvia Masiero — Video Pillola 03", embedUrl: "https://player.vimeo.com/video/1236854804?h=fc2d77228c" },
                    { id: "video-04", order: 4, title: "Video Pillola 04", duration: 310, type: "vimeo", iframeTitle: "Silvia Masiero — Video Pillola 04", embedUrl: "https://player.vimeo.com/video/1236854847?h=4f1775ecb1" }
                  ]
                },
                {
                  id: "visita",
                  title: "La Gestione della Visita",
                  author: "Guerino Paolantoni",
                  category: "Video pillole",
                  videos: [
                    { id: "video-05", order: 5, title: "Video Pillola 05", duration: 585, type: "vimeo", iframeTitle: "Guerino Paolantoni — Video Pillola 05", embedUrl: "https://player.vimeo.com/video/1236853792?h=bbff045a48" },
                    { id: "video-06", order: 6, title: "Video Pillola 06", duration: 405, type: "vimeo", iframeTitle: "Guerino Paolantoni — Video Pillola 06", embedUrl: "https://player.vimeo.com/video/1236853821?h=592d91bb47" },
                    { id: "video-07", order: 7, title: "Video Pillola 07", duration: 167, type: "vimeo", iframeTitle: "Guerino Paolantoni — Video Pillola 07", embedUrl: "https://player.vimeo.com/video/1236853846?h=bb5a9e8d0c" }
                  ]
                },
                {
                  id: "interviste",
                  title: "Video interviste",
                  category: "Paziente e caregiver",
                  videos: [
                    { id: "video-08", order: 8, title: "Video Intervista Paziente", duration: 424, type: "vimeo", iframeTitle: "Video Intervista Paziente", embedUrl: "https://player.vimeo.com/video/1236854867?h=c9e7dcd599" },
                    { id: "video-09", order: 9, title: "Video Intervista Caregiver", duration: 473, type: "vimeo", iframeTitle: "Video Intervista Caregiver", embedUrl: "https://player.vimeo.com/video/1236854324?h=f615739ecb" }
                  ]
                }
              ]
            }
          ]
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
