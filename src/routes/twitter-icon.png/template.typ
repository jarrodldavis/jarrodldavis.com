#import "@preview/shadowed:0.4.0": shadow

#let zinc-900 = rgb("#18181b")
#let zinc-700 = rgb("#3f3f46")
#let shadow-fill = rgb("#09090b")

#let p-8 = 32pt
#let p-6 = 24pt
#let border-4 = 4pt

#set page(width: 320pt, height: 320pt, margin: 0pt)

#box(inset: p-8, fill: zinc-900)[
  #set box(width: 100%, height: 100%, clip: true, radius: 50%)

  #shadow(inset: true, dx: 0pt, dy: 4pt, blur: 12pt, spread: 0pt, fill: shadow-fill, radius: 50%)[
    #box(stroke: border-4 + shadow-fill, inset: p-6, fill: zinc-700)[
      #box(image("/src/lib/memoji.png", width: 100%, height: 100%))
    ]
  ]
]
