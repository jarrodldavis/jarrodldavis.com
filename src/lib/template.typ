#set page(paper: "us-letter")

#let resume = yaml("data.yaml")

= #resume.profile.name

#for title in resume.profile.titles.intersperse("/") [
	#title
]
