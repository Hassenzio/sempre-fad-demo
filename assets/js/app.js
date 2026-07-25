"use strict";

(() => {
  const data = window.courseData;
  const main = document.querySelector("#main-content");
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const chapterOne = data.chapters[0];
  const moduleOne = chapterOne.modules[0];
  const resources = moduleOne.resources;
  const allowedHosts = new Set(["player.vimeo.com", "www.youtube-nocookie.com", "heyzine.com"]);
  let hasRendered = false;
  let revealObserver = null;

  const element = (tag, attributes = {}, children = []) => {
    const node = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key === "htmlFor") node.htmlFor = value;
      else if (key.startsWith("on") && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (value === true) node.setAttribute(key, "");
      else node.setAttribute(key, value);
    });

    const childList = Array.isArray(children) ? children : [children];
    childList.forEach((child) => {
      if (child === undefined || child === null) return;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    });

    return node;
  };

  const icon = (name, className = "art-icon") => {
    const namespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(namespace, "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const paths = {
      dialogue: [
        ["path", { d: "M23 28c0-8 7-15 15-15h42c9 0 16 7 16 15v27c0 8-7 15-16 15H55L35 87l5-17h-2c-8 0-15-7-15-15V28Z" }],
        ["path", { d: "M42 38h36M42 50h25" }]
      ],
      bridge: [
        ["path", { d: "M17 82c12-34 74-34 86 0M17 82h86M29 82V64M91 82V64" }],
        ["path", { d: "M19 40c13 2 20 10 22 22M101 40C88 42 81 50 79 62M48 29l12-13 12 13" }]
      ],
      heart: [
        ["path", { d: "M60 99 22 64C3 45 12 18 35 18c12 0 21 7 25 16 4-9 13-16 25-16 23 0 32 27 13 46L60 99Z" }],
        ["path", { d: "M27 73c15-15 27-17 38-8 9 7 19 7 28 0" }]
      ],
      pages: [
        ["path", { d: "M21 28c17-7 31-4 39 5v64c-8-9-22-12-39-5V28ZM99 28c-17-7-31-4-39 5v64c8-9 22-12 39-5V28Z" }],
        ["path", { d: "M31 42c8-2 15-1 21 3M31 54c8-2 15-1 21 3M89 42c-8-2-15-1-21 3M89 54c-8-2-15-1-21 3" }]
      ],
      hands: [
        ["path", { d: "M21 70c9-5 18-2 27 5l12 10 12-10c9-7 18-10 27-5M26 73 14 62M94 73l12-11" }],
        ["path", { d: "M60 69 42 51c-9-9-5-25 7-25 6 0 10 4 11 9 2-5 6-9 12-9 12 0 16 16 7 25L60 69Z" }]
      ],
      growth: [
        ["path", { d: "M60 102V48M60 70C44 67 34 57 31 42c17-1 28 7 29 28ZM60 58c16-3 26-13 29-28-17-1-28 7-29 28Z" }],
        ["path", { d: "M34 102c5-14 14-22 26-22s21 8 26 22" }]
      ]
    };

    (paths[name] || paths.dialogue).forEach(([tag, attributes]) => {
      const shape = document.createElementNS(namespace, tag);
      Object.entries(attributes).forEach(([key, value]) => shape.setAttribute(key, value));
      shape.setAttribute("stroke", "currentColor");
      shape.setAttribute("stroke-width", "3");
      shape.setAttribute("stroke-linecap", "round");
      shape.setAttribute("stroke-linejoin", "round");
      svg.append(shape);
    });

    return svg;
  };

  const section = (className, children = []) =>
    element("section", { className }, children);

  const buttonLink = (label, href, variant = "primary") =>
    element("a", { className: `button button-${variant}`, href, text: label });

  const eyebrow = (text) => element("p", { className: "eyebrow", text });

  const breadcrumb = (items) => {
    const list = element("ol", { className: "breadcrumbs" });
    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      const content = isLast
        ? element("span", { text: item.label, "aria-current": "page" })
        : element("a", { href: item.href, text: item.label });
      list.append(element("li", {}, content));
    });
    return element("nav", { "aria-label": "Breadcrumb" }, list);
  };

  const view = (...children) => element("div", { className: "view" }, children);

  const resourceHref = (resource) =>
    `#/capitolo/1/modulo/1/${resource.id}`;

  const isVideoResource = (resource) =>
    resource.type === "vimeo" || resource.type === "youtube";

  const resourceIconName = (resource) => {
    if (resource.type === "heyzine") return "pages";
    return ["dialogue", "heart", "bridge"][resource.order - 1] || "dialogue";
  };

  const homeView = () => {
    const homepageModules = resources.map((resource, index) => ({
      number: index + 1,
      label: `Modulo ${index + 1}`,
      resource
    }));
    const homepageIcons = ["dialogue", "dialogue", "bridge", "pages"];

    const hero = section("home-hero", [
      element("div", { className: "home-hero-inner" }, [
        element("div", { className: "home-hero-copy" }, [
          element("p", { className: "home-eyebrow", text: data.subtitle }),
          element("h1", { text: data.title }),
          element("p", { className: "home-hero-payoff", text: data.payoff }),
          element("p", {
            className: "home-hero-intro",
            text: "Presentazioni, discussioni, strumenti visivi e testimonianze diventano un’esperienza chiara nei contenuti e umana nel linguaggio."
          }),
          element("a", {
            className: "home-primary-link",
            href: "#capitolo-1-moduli",
            "aria-label": "Scopri i moduli disponibili nel Capitolo 1",
            onClick: (event) => {
              event.preventDefault();
              document.querySelector("#capitolo-1-moduli")?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth"
              });
            }
          }, [
            element("span", { text: "Scopri i moduli" }),
            element("span", { className: "home-link-arrow", text: "→", "aria-hidden": "true" })
          ])
        ]),
        element("div", { className: "home-hero-art", "aria-hidden": "true" }, [
          element("span", { className: "home-hero-arc home-hero-arc-blue" }),
          element("span", { className: "home-hero-arc home-hero-arc-ochre" }),
          element("span", { className: "home-chalk-mark home-chalk-mark-one" }),
          element("span", { className: "home-chalk-mark home-chalk-mark-two" }),
          element("img", {
            className: "home-hero-character",
            src: "assets/brand/sempre-character.png",
            alt: "",
            width: "543",
            height: "697"
          }),
          element("span", { className: "home-hero-word home-hero-word-listen", text: "Ascolto" }),
          element("span", { className: "home-hero-word home-hero-word-method", text: "Metodo" }),
          element("span", { className: "home-hero-word home-hero-word-relation", text: "Relazione" })
        ])
      ])
    ]);

    const moduleCards = homepageModules.map(({ number, label, resource }, index) =>
      element("a", {
        className: `home-module-card home-module-card-${number}`,
        href: resourceHref(resource),
        "aria-label": `${label}: ${resource.title}. Apri il modulo`
      }, [
        element("div", { className: "home-module-card-top" }, [
          element("span", {
            className: "home-module-number",
            text: `MODULO ${String(number).padStart(2, "0")}`
          }),
          icon(homepageIcons[index], "home-module-icon")
        ]),
        element("p", { className: "home-module-category", text: resource.category }),
        element("h3", { text: resource.title }),
        element("span", { className: "home-module-chalk", "aria-hidden": "true" }),
        element("div", { className: "home-module-card-bottom" }, [
          element("span", { className: "home-module-status", text: "Disponibile" }),
          element("span", { className: "home-module-cta" }, [
            element("span", { text: "Apri il modulo" }),
            element("span", { className: "home-link-arrow", text: "→", "aria-hidden": "true" })
          ])
        ])
      ]));

    const modules = section("home-modules", [
      element("div", { id: "capitolo-1-moduli", className: "home-section-shell" }, [
        element("div", { className: "home-modules-heading" }, [
          element("div", {}, [
            element("p", { className: "home-eyebrow", text: "CAPITOLO 1" }),
            element("h2", { text: "Moduli disponibili" })
          ]),
          element("p", {
            text: "Accedi direttamente ai quattro contenuti disponibili nella versione dimostrativa."
          })
        ]),
        element("div", {
          className: "home-module-rail",
          role: "list",
          "aria-label": "Contenuti disponibili del Capitolo 1",
          tabindex: "0"
        }, moduleCards.map((card) => element("div", { className: "home-module-item", role: "listitem" }, card)))
      ])
    ]);

    const chapterStages = data.chapters.map((chapter) => {
      const active = chapter.number === 1;
      return element("a", {
        className: `home-chapter-stage${active ? " is-active" : ""}`,
        href: `#/capitolo/${chapter.number}`,
        "aria-label": `${chapter.title}: ${chapter.statusLabel}`
      }, [
        element("span", {
          className: "home-chapter-number",
          text: String(chapter.number).padStart(2, "0"),
          "aria-hidden": "true"
        }),
        element("span", { className: "home-chapter-copy" }, [
          element("span", { className: "home-chapter-title", text: chapter.title }),
          element("span", { className: "home-chapter-status", text: chapter.statusLabel }),
          active
            ? element("span", { className: "home-chapter-cta", text: "Esplora il capitolo →" })
            : null
        ])
      ]);
    });

    const chapters = section("home-chapters", [
      element("div", { className: "home-section-shell" }, [
        element("div", { className: "home-chapters-heading" }, [
          element("p", { className: "home-eyebrow", text: "IL PERCORSO" }),
          element("h2", { text: "Tre capitoli, una direzione condivisa." })
        ]),
        element("nav", { className: "home-chapter-map", "aria-label": "Mappa dei capitoli" }, [
          element("span", { className: "home-chapter-line", "aria-hidden": "true" }),
          ...chapterStages
        ])
      ])
    ]);

    return view(hero, modules, chapters);
  };

  const chapterOneView = () => {
    const intro = section("page-hero", [
      element("div", { className: "section-shell compact" }, [
        breadcrumb([
          { label: "Home", href: "#/" },
          { label: "Capitolo 1" }
        ]),
        element("div", { className: "chapter-intro-grid" }, [
          element("div", {}, [
            element("span", { className: "display-number", text: "01", "aria-hidden": "true" }),
            element("span", { className: "status-pill available", text: chapterOne.statusLabel }),
            element("h1", { className: "page-title", text: chapterOne.title }),
            element("p", {
              className: "page-intro",
              text: chapterOne.description
            }),
            element("div", { className: "stats-row" }, [
              element("div", { className: "stat" }, [
                element("strong", { text: "3" }),
                element("span", { text: "moduli previsti" })
              ]),
              element("div", { className: "stat" }, [
                element("strong", { text: "4" }),
                element("span", { text: "risorse disponibili" })
              ])
            ]),
            element("div", { className: "button-row" }, [
              buttonLink("Inizia la prima videolezione", resourceHref(resources[0]))
            ])
          ]),
          element("aside", {
            className: "chapter-quick-access",
            "aria-label": "Accesso diretto ai contenuti disponibili"
          }, [
            element("p", { className: "micro-label", text: "ACCESSO DIRETTO" }),
            element("h2", { text: "Scegli un contenuto" }),
            element("nav", { "aria-label": "Contenuti del Modulo 1" },
              resources.map((resource) =>
                element("a", {
                  className: "quick-resource",
                  href: resourceHref(resource)
                }, [
                  element("span", {
                    className: "quick-resource-number",
                    text: String(resource.order).padStart(2, "0"),
                    "aria-hidden": "true"
                  }),
                  element("span", {}, [
                    element("small", { text: resource.category }),
                    element("strong", { text: resource.title })
                  ])
                ])))
          ])
        ])
      ])
    ]);

    const moduleRoadmap = section("chapter-roadmap", [
      element("div", { className: "section-shell" }, [
        element("div", { className: "roadmap-heading" }, [
          element("div", {}, [
            eyebrow("ARCHITETTURA DEL CAPITOLO"),
            element("h2", { text: "Tre moduli, tre prospettive." })
          ]),
          element("p", {
            text: "La demo rende navigabile il primo modulo e anticipa i contenuti già definiti per i moduli successivi."
          })
        ]),
        element("div", { className: "module-roadmap-list" },
          chapterOne.modules.map((module) => {
            const available = module.status === "available";
            return element("article", { className: `roadmap-module${available ? " is-available" : ""}` }, [
              element("div", { className: "roadmap-number", text: String(module.number).padStart(2, "0") }),
              element("div", { className: "roadmap-copy" }, [
                element("span", {
                  className: `status-pill${available ? " available" : ""}`,
                  text: available ? "Disponibile in demo" : module.statusLabel
                }),
                element("p", { className: "micro-label", text: module.title }),
                element("h3", { text: module.subtitle }),
                element("p", { text: module.description }),
                module.sourceItems
                  ? element("ul", { className: "source-items" },
                      module.sourceItems.map((item) => element("li", { text: item })))
                  : null
              ]),
              available
                ? buttonLink("Inizia dal primo contenuto", resourceHref(resources[0]), "light")
                : element("span", { className: "roadmap-mark", "aria-hidden": "true", text: "↗" })
            ]);
          }))
      ])
    ]);

    return view(intro, moduleRoadmap);
  };

  const moduleView = () => {
    const heading = section("page-hero", [
      element("div", { className: "section-shell compact" }, [
        breadcrumb([
          { label: "Home", href: "#/" },
          { label: "Capitolo 1", href: "#/capitolo/1" },
          { label: "Modulo 1" }
        ]),
        eyebrow("CONTENUTI DISPONIBILI NELLA VERSIONE DIMOSTRATIVA"),
        element("h1", { className: "page-title", text: moduleOne.title }),
        element("p", { className: "module-page-subtitle", text: moduleOne.subtitle }),
        element("p", {
          className: "page-intro",
          text: moduleOne.description
        })
      ])
    ]);

    const cards = resources.map((resource) =>
      element("article", { className: "resource-card" }, [
        element("div", { className: "resource-card-visual" }, icon(resourceIconName(resource))),
        element("div", { className: "resource-card-body" }, [
          element("div", { className: "resource-card-topline" }, [
            element("span", { className: "resource-kind", text: resource.category }),
            element("span", { className: "resource-count", text: `Risorsa ${resource.order} di 4` })
          ]),
          element("h2", { text: resource.title }),
          element("p", { className: "resource-description", text: resource.description }),
          element("span", { className: "status-pill available", text: "Disponibile" }),
          element("div", { className: "button-row" }, [
            buttonLink(
              isVideoResource(resource) ? "Guarda la videolezione" : "Sfoglia il flipbook",
              resourceHref(resource)
            )
          ])
        ])
      ]));

    const list = section("", [
      element("div", { className: "section-shell" }, [
        element("div", { className: "module-resource-grid" }, cards)
      ])
    ]);

    return view(heading, list);
  };

  const safeExternalUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" && allowedHosts.has(parsed.hostname) ? parsed.href : null;
    } catch {
      return null;
    }
  };

  const iframeFor = (resource) => {
    const source = safeExternalUrl(resource.embedUrl);
    if (!source) {
      return element("div", { className: "embed-unavailable" }, [
        element("p", {
          text: "Il contenuto incorporato non è disponibile in questa visualizzazione. È possibile aprirlo in una nuova finestra."
        })
      ]);
    }

    const iframe = element("iframe", {
      src: source,
      title: resource.iframeTitle,
      loading: "eager",
      allow: isVideoResource(resource)
        ? "autoplay; fullscreen; encrypted-media"
        : "autoplay; fullscreen",
      referrerpolicy: resource.type === "youtube" ? "strict-origin-when-cross-origin" : "no-referrer",
      allowfullscreen: true
    });

    if (resource.type === "heyzine") iframe.setAttribute("scrolling", "no");
    return iframe;
  };

  const resourceView = (resource) => {
    const currentIndex = resources.findIndex((item) => item.id === resource.id);
    const previous = resources[currentIndex - 1];
    const next = resources[currentIndex + 1];
    const shortLabel = resource.id === "flipbook"
      ? "Flipbook"
      : `Parte ${resource.order}`;

    const mediaViewport = element("div", {
        className: isVideoResource(resource) ? "video-frame" : "flipbook-frame"
      }, iframeFor(resource));
    const frame = element("div", { className: "media-frame-shell" }, [
      mediaViewport,
      element("div", { className: "media-toolbar" }, [
        element("p", {
          text: "Se il contenuto non parte, prova a ricaricare questa risorsa."
        }),
        element("button", {
          className: "button button-secondary",
          type: "button",
          text: "Ricarica contenuto",
          onClick: () => {
            const currentFrame = mediaViewport.querySelector("iframe");
            if (!currentFrame) return;
            currentFrame.src = currentFrame.src;
          }
        })
      ])
    ]);

    const resourceNav = element("nav", {
      className: "resource-navigation",
      "aria-label": "Navigazione tra le risorse"
    }, [
      previous
        ? element("a", { className: "nav-resource", href: resourceHref(previous) }, [
            element("small", { text: "Precedente" }),
            element("strong", { text: previous.title })
          ])
        : element("span", { className: "nav-resource placeholder", "aria-hidden": "true" }),
      next
        ? element("a", { className: "nav-resource", href: resourceHref(next) }, [
            element("small", { text: "Successivo" }),
            element("strong", { text: next.title })
          ])
        : element("span", { className: "nav-resource placeholder", "aria-hidden": "true" })
    ]);

    return view(section("", [
      element("div", { className: "section-shell compact media-page" }, [
        breadcrumb([
          { label: "Home", href: "#/" },
          { label: "Capitolo 1", href: "#/capitolo/1" },
          { label: "Modulo 1", href: "#/capitolo/1/modulo/1" },
          { label: shortLabel }
        ]),
        element("div", { className: "media-heading" }, [
          element("span", {
            className: "media-number",
            text: String(resource.order).padStart(2, "0"),
            "aria-hidden": "true"
          }),
          element("div", {}, [
            eyebrow(resource.category),
            element("h1", { text: resource.title }),
            element("p", { className: "media-description", text: resource.description })
          ])
        ]),
        frame,
        resourceNav,
        element("div", { className: "button-row" }, [
          buttonLink("Torna al Modulo 1", "#/capitolo/1/modulo/1", "secondary")
        ])
      ])
    ]));
  };

  const comingSoonView = (chapter) => {
    const number = String(chapter.number).padStart(2, "0");
    const intro = section("page-hero", [
      element("div", { className: "section-shell compact" }, [
        breadcrumb([
          { label: "Home", href: "#/" },
          { label: chapter.title }
        ]),
        element("div", { className: "coming-single" }, [
          element("div", {}, [
            element("span", { className: "display-number", text: number, "aria-hidden": "true" }),
            element("span", { className: "status-pill", text: chapter.statusLabel }),
            element("h1", { className: "page-title", text: chapter.title }),
            element("p", {
              className: "page-intro",
              text: chapter.description
            }),
            element("p", {
              className: "availability-note",
              text: "I contenuti di questo capitolo non sono inclusi nella versione dimostrativa."
            }),
            element("div", { className: "button-row" }, [
              buttonLink("Torna al percorso", "#/", "secondary")
            ])
          ])
        ])
      ])
    ]);

    if (!chapter.modules.length) return view(intro);

    const stagedModule = chapter.modules.find((module) => module.stages?.length);
    const outline = section("chapter-outline", [
      element("div", { className: "section-shell" }, [
        element("div", { className: "roadmap-heading" }, [
          element("div", {}, [
            eyebrow("CONTENUTI DALLA BASE EDITORIALE"),
            element("h2", { text: "La struttura prevista." })
          ]),
          element("p", {
            text: "I moduli sono mostrati per descrivere l’architettura futura. Non contengono ancora risorse navigabili."
          })
        ]),
        element("div", {
          className: `outline-grid${chapter.modules.length === 1 ? " is-single" : ""}`
        },
          chapter.modules.map((module) =>
            element("article", { className: "outline-card" }, [
              element("div", { className: "outline-card-top" }, [
                element("span", {
                  className: "outline-number",
                  text: String(module.number).padStart(2, "0"),
                  "aria-hidden": "true"
                }),
                element("span", { className: "status-pill", text: module.statusLabel })
              ]),
              element("p", { className: "micro-label", text: module.title }),
              element("h2", { text: module.subtitle }),
              element("p", { text: module.description }),
              element("ul", { className: "source-items" },
                module.sourceItems.map((item) => element("li", { text: item })))
            ]))),
        stagedModule
          ? element("div", { className: "narrative-journey" }, [
              element("div", { className: "narrative-heading" }, [
                eyebrow("L’ITER RIVELATO · CINQUE TAPPE"),
                element("h2", { text: "Dal primo contatto alla continuità." }),
                element("p", {
                  text: "Ogni tappa parte da una storia e apre uno spazio di autovalutazione. La demo ne anticipa la sequenza, senza raccogliere risposte o calcolare risultati."
                })
              ]),
              element("ol", { className: "stage-path" },
                stagedModule.stages.map((stage) =>
                  element("li", {}, [
                    element("span", {
                      className: "stage-number",
                      text: String(stage.number).padStart(2, "0"),
                      "aria-hidden": "true"
                    }),
                    element("div", {}, [
                      element("h3", { text: stage.title }),
                      element("p", { text: stage.description })
                    ])
                  ])))
            ])
          : null
      ])
    ]);

    return view(intro, outline);
  };

  const informationView = () => {
    const list = element("ul", { className: "acronym-list" },
      data.acronym.map((word) =>
        element("li", {}, [
          element("strong", { text: word.charAt(0) }),
          word
        ])));

    return view(section("page-hero", [
      element("div", { className: "section-shell compact" }, [
        breadcrumb([
          { label: "Home", href: "#/" },
          { label: "Informazioni" }
        ]),
        element("div", { className: "info-grid" }, [
          element("div", {}, [
            eyebrow("VERSIONE DIMOSTRATIVA"),
            element("h1", { className: "page-title", text: data.title }),
            element("p", { className: "page-intro", text: data.subtitle }),
            list
          ]),
          element("aside", { className: "info-panel", "aria-label": "Informazioni sulla demo" }, [
            element("h2", { text: "Funzione della demo" }),
            element("p", {
              text: "Questa versione dimostrativa presenta la struttura e l’esperienza di navigazione del percorso S.E.M.P.R.E. Non registra accessi, avanzamenti, visualizzazioni o completamenti."
            }),
            element("p", {
              text: "I contenuti multimediali sono incorporati nel percorso e si aprono senza abbandonare la piattaforma."
            }),
            element("p", {
              className: "source-disclosure",
              text: data.editorialNote
            }),
            element("div", { className: "button-row" }, [
              buttonLink("Torna al percorso", "#/", "primary")
            ])
          ])
        ])
      ])
    ]));
  };

  const notFoundView = () => view(section("not-found", [
    element("div", { className: "section-shell" }, [
      element("div", {}, [
        eyebrow("PAGINA NON TROVATA"),
        element("h1", { text: "Questa tappa non esiste." }),
        element("p", { text: "Torna al percorso formativo per continuare la navigazione." }),
        element("div", { className: "button-row" }, [
          buttonLink("Torna al percorso", "#/")
        ])
      ])
    ])
  ]));

  const getPath = () => {
    const rawHash = window.location.hash || "#/";
    if (rawHash === "#percorso-formativo") return "/";
    const path = rawHash.slice(1).split("?")[0];
    return path === "" ? "/" : path.replace(/\/+$/, "") || "/";
  };

  const setupScrollReveals = () => {
    revealObserver?.disconnect();
    revealObserver = null;
    const targets = main.querySelectorAll([
      ".section-heading",
      ".chapter-station",
      ".mode-card",
      ".editorial-intro",
      ".preview-resource",
      ".roadmap-module",
      ".outline-card",
      ".narrative-journey",
      ".resource-card",
      ".information-card"
    ].join(","));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("reveal", "is-visible"));
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver?.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });

    targets.forEach((target, index) => {
      target.classList.add("reveal");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      revealObserver.observe(target);
    });
  };

  const render = () => {
    const path = getPath();
    let page;

    if (path === "/" || path === "/index") page = homeView();
    else if (path === "/capitolo/1") page = chapterOneView();
    else if (path === "/capitolo/1/modulo/1") page = moduleView();
    else if (path === "/capitolo/2") page = comingSoonView(data.chapters[1]);
    else if (path === "/capitolo/3") page = comingSoonView(data.chapters[2]);
    else if (path === "/informazioni") page = informationView();
    else {
      const resourceMatch = path.match(/^\/capitolo\/1\/modulo\/1\/(parte-[123]|flipbook)$/);
      const resource = resourceMatch
        ? resources.find((item) => item.id === resourceMatch[1])
        : null;
      page = resource ? resourceView(resource) : notFoundView();
    }

    main.replaceChildren(page);
    setupScrollReveals();
    updateNavigation(path);
    closeMenu();
    window.scrollTo({ top: 0, behavior: "auto" });
    const heading = main.querySelector("h1");
    if (heading && hasRendered) {
      heading.setAttribute("tabindex", "-1");
      requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
    hasRendered = true;
  };

  const updateNavigation = (path) => {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const isInfo = link.dataset.nav === "informazioni";
      const active = isInfo ? path === "/informazioni" : path !== "/informazioni";
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("is-open", !open);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const skipAnchor = event.target.closest('a[href="#main-content"]');
    if (skipAnchor) {
      event.preventDefault();
      main.focus({ preventScroll: true });
      main.scrollIntoView({ behavior: "auto" });
      return;
    }

    const localAnchor = event.target.closest('a[href="#percorso-formativo"]');
    if (!localAnchor) return;
    event.preventDefault();
    document.querySelector("#percorso-formativo")?.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  window.addEventListener("hashchange", render);
  render();
})();
