package grifts

import (
	"front_study_api/actions"

	"github.com/gobuffalo/buffalo"
)

func init() {
	buffalo.Grifts(actions.App())
}
