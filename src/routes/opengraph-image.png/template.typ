#import "@preview/shadowed:0.4.0": shadow

#let mono = "Source Code Pro"

#let zinc-900 = rgb("#18181b")
#let zinc-700 = rgb("#3f3f46")
#let stone-300 = rgb("#d6d3d1")
#let shadow-fill = rgb("#09090b")

#let p-6 = 24pt
#let px-24 = 96pt
#let size-72 = 288pt
#let border-4 = 4pt

#let text-7xl = 72pt
#let text-7xl-lh = 1em

#let text-4xl = 36pt
#let text-4xl-lh = (2.5 / 2.25) * 1em

#let bold = 700
#let semibold = 600

#let resume = yaml("/src/lib/data.yaml")

#set page(width: 1200pt, height: 630pt, margin: 0pt)

#block(inset: (x: px-24), fill: zinc-900, width: 100%, height: 100%)[

  #align(horizon, stack(
    dir: ltr,
    h(1fr),

    block(width: size-72, height: size-72)[
      #shadow(inset: true, dx: 0pt, dy: 4pt, blur: 16pt, spread: 0pt, fill: shadow-fill, radius: 50%)[
        #set box(clip: true, radius: 50%)
        #box(stroke: border-4 + shadow-fill, inset: p-6, fill: zinc-700)[
          #box(image("/src/lib/memoji.png"))
        ]
      ],
    ],

    h(2fr),

    block[
      #set text(fill: stone-300, font: mono)

      #set text(size: text-7xl, weight: bold)
      #block(height: text-7xl-lh, spacing: 16pt, par(resume.profile.name))

      #set text(size: text-4xl, weight: semibold)
      #for title in resume.profile.titles {
        block(height: text-4xl-lh, spacing: 0pt, par(title))
      }
    ],

    h(1fr),
  ))
]
