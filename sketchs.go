package main

type SketchData struct {
	Description string
	Files       []string
	Link        string
	Title       string
}

type Sketches map[string]SketchData

var Sks = Sketches{
	"milo-1": SketchData{
		Description: "Shaded circles.",
		Files:       []string{"milo-1/bundle.min.js"},
		Link:        "https://kengru.do/milo-1",
		Title:       "Milo I",
	},
	"milo-2": SketchData{
		Description: "Polygons placed offset of center.",
		Files:       []string{"milo-2/bundle.min.js"},
		Link:        "https://kengru.do/milo-2",
		Title:       "Milo II",
	},
}
