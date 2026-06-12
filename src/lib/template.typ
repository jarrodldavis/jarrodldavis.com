#set page(paper: "us-letter")

#let sans = "Source Sans 3"
#let serif = "Source Serif 4"
#let mono = "Source Code Pro"

// 1px = 0.75pt
#let text-3xl = 22.5pt // 1.875rem = 30px
#let text-base = 12pt // 1rem = 16px
#let text-sm = 10.5pt // 0.875rem = 14px
#let text-xs = 9pt // 0.75rem = 12px

#set page("us-letter", margin: 0.5in)
#set text(size: 9.75pt, font: serif)
#set par(leading: 0.5em)

// unset default heading sizes
#show heading: it => it.body
#show heading.where(level: 1): set text(size: 1em / 1.4)
#show heading.where(level: 2): set text(size: 1em / 1.2)

#let resume = yaml("data.yaml")

#let coalesce(item, keys) = {
  return item.at(keys.find(key => key in item))
}

#let some(value) = not value == none

#let not-omitted(item) = {
  return "omit" not in item or "pdf" not in item.omit
}

#let location(location) = {
  [#location.city, #location.state]
  if location.remote {
    text(weight: "regular", size: text-xs, [ _(remote)_])
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

#let url-link(url) = {
  link(url, url.replace("https://", ""))
}

#let primary-heading(title) = {
  block(width: 100%, sticky: true, below: 6pt, stroke: (bottom: 0.5pt), inset: (bottom: 4pt), {
    heading(upper(text(size: text-base, title)), level: 1)
  })
}

#let secondary-heading(item) = {
  let name = coalesce(item, ("name", "company", "institution"))
  let url = if "url" in item { item.url } else { none }
  let location = if "location" in item { location(item.location) } else { none }

  block(width: 100%, sticky: true, below: 6pt, {
    heading(text(size: text-sm, weight: "semibold", name), level: 2)
    if some(url) {
      text(size: text-xs, [ (#url-link(url))])
    }
    h(1fr)
    if some(location) {
      text(size: text-sm, weight: "semibold", location)
    }
  })
}

#let tertiary-heading(item) = {
  let title = coalesce(item, ("title", "affiliation"))

  block(width: 100%, sticky: true, below: 6pt, {
    heading(emph(text(size: text-sm, weight: "regular", title)), level: 3)
    h(1fr)
    text(size: text-sm, font: mono, tracking: -0.05em, dates(item.start_date, item.end_date))
  })
}

#let list-item(item) = {
  if item.content.len() == 0 {
    return none
  }

  list.item({
    if "title" in item {
      [*#item.title*: ]
    }

    if type(item.content) == str {
      item.content
    } else {
      item.content.join(", ")
    }
  })
}


#let header = text(size: text-sm, font: sans, align(center, stack(
  spacing: 8pt,
  title(text(size: text-3xl, font: mono, resume.profile.name)),
  text(weight: "semibold", resume.profile.titles.join([ #sym.slash ])),
  text(weight: "semibold", location(resume.profile.location)),
  (
    link("mailto:" + resume.profile.email),
    url-link(resume.profile.url),
    ..resume.profile.networks.map(network => url-link(network.url)),
  ).join([ #sym.bullet ]),
)))

#let work = {
  primary-heading("Work Experience")
  for experience in resume.work.filter(not-omitted) {
    secondary-heading(experience)
    for position in experience.positions.filter(not-omitted) {
      tertiary-heading(position)
      list(..position.highlights.filter(not-omitted).map(list-item))
    }
  }
}

#let education = {
  primary-heading("Education")
  for education in resume.education.filter(not-omitted) {
    secondary-heading(education)
    tertiary-heading((title: [#education.degree in #education.major], ..education))
    if education.honors.len() > 0 { list-item((title: "Honors", content: education.honors)) }
    if education.courses.len() > 0 { list-item((title: "Courses", content: education.courses)) }
    for highlight in education.highlights.filter(not-omitted) { list-item(highlight) }
  }
}

#let projects = {
  primary-heading("Projects")
  for project in resume.projects.filter(not-omitted) {
    secondary-heading(project)
    tertiary-heading(project)
    list(..project.highlights.map(list-item))
  }
}

#let skills = {
  primary-heading("Skills")
  for skill in resume.skills.filter(not-omitted) {
    list-item((title: skill.category, content: skill.skills))
  }
}

#header
#work
#pagebreak()
#education
#projects
#skills
