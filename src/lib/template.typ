#set page(paper: "us-letter")

// TODO: Typst v0.15 required for proper variable font support
#let sans = "SourceSans3VF"
#let serif = "Source Serif 4 Variable"
#let mono = "SourceCodeVF"

// 1px = 0.75pt
#let text-3xl = 22.5pt // 1.875rem = 30px
#let text-base = 12pt // 1rem = 16px
#let text-sm = 10.5pt // 0.875rem = 14px
#let text-xs = 9pt // 0.75rem = 12px

#set page("us-letter", margin: 0.5in)
#set text(size: text-xs, font: serif)
#set par(leading: 0.5em)


// unset default heading styles
#show heading: it => it.body
#show heading.where(level: 1): set text(size: 1em / 1.4)
#show heading.where(level: 2): set text(size: 1em / 1.2)

#let resume = yaml("data.yaml")

#let coalesce(item, keys) = {
  for key in keys {
    if key in item {
      return item.at(key)
    }
  }
  return none
}

#let some(value) = not value == none

#let not_omitted(item) = {
  return "omit" not in item or "pdf" not in item.omit
}

#let location(location) = {
  [#location.city, #location.state]
  if location.remote {
    [ ]
    emph[(remote)]
  }
}

#let date(raw) = {
  let parsed = toml(bytes("date = " + raw)).date
  parsed.display("[month repr:short] [year]")
}

#let dates(start, end) = {
  date(start)
  [ -- ]
  if (end == none) [Present] else [#date(end)]
}

#let url_link(url) = {
  link(url, url.replace("https://", ""))
}

#let primary_heading(title) = {
  text(size: text-base, {
    block(width: 100%, sticky: true, below: 6pt, stroke: (bottom: 0.5pt), inset: (bottom: 4pt), {
      heading(upper(title), level: 1)
    })
  })
}

#let secondary_heading(item) = {
  let name = coalesce(item, ("name", "company", "institution"))
  let url = if "url" in item { item.url } else { none }
  let location = if "location" in item { location(item.location) } else { none }

  text(size: text-sm, {
    block(width: 100%, sticky: true, below: 6pt, {
      heading(text(name), level: 2)
      if some(url) {
        text(size: text-xs, {
          [ ]
          [(#url_link(url))]
        })
      }
      h(1fr)
      if some(location) {
        text([*#location*])
      }
    })
  })
}

#let tertiary_heading(item) = {
  let title = coalesce(item, ("title", "degree", "affiliation"))

  text(size: text-sm, {
    block(width: 100%, sticky: true, below: 6pt, {
      heading(emph(title), level: 3)
      h(1fr)
      text(font: mono, dates(item.start_date, item.end_date))
    })
  })
}

#let list_item(item) = {
  if item.content.len() == 0 {
    return none
  }

  list.item({
    if "title" in item {
      [*#item.title*: ]
    }

    if type(item.content) == str {
      [#item.content]
    } else {
      [#item.content.join(", ")]
    }
  })
}

#let content = block({
  text(size: text-sm, font: sans, align(center, stack(
    spacing: 8pt,
    title[#text(size: text-3xl, font: mono, resume.profile.name)],
    strong[#resume.profile.titles.join(" / ")],
    strong[#location(resume.profile.location)],
    (
      link("mailto:" + resume.profile.email),
      url_link(resume.profile.url),
      ..resume.profile.networks.map(network => url_link(network.url)),
    ).join(" \u{2022} "),
  )))

  block({
    primary_heading("Work Experience")
    for experience in resume.work.filter(not_omitted) {
      secondary_heading(experience)
      for position in experience.positions.filter(not_omitted) {
        tertiary_heading(position)
        list(..position.highlights.filter(not_omitted).map(list_item))
      }
    }
  })

  colbreak()

  block({
    primary_heading("Education")
    for education in resume.education.filter(not_omitted) {
      secondary_heading(education)
      // #tertiary_heading([#education.degree in #education.major], education.start_date, education.end_date)
      tertiary_heading(education)
      if education.honors.len() > 0 {
        list_item((title: "Honors", content: education.honors))
      }
      if education.courses.len() > 0 {
        list_item((title: "Courses", content: education.courses))
      }
      for highlight in education.highlights.filter(not_omitted) {
        list_item(highlight)
      }
    }
  })

  block({
    primary_heading("Projects")
    for project in resume.projects.filter(not_omitted) {
      secondary_heading(project)
      tertiary_heading(project)
      list(..project.highlights.map(list_item))
    }
  })

  block({
    primary_heading("Skills")
    for skill in resume.skills.filter(not_omitted) {
      list_item((title: skill.category, content: skill.skills))
    }
  })
})

#content
