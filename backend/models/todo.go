package models

import (
	"encoding/json"
	"time"

	"github.com/gobuffalo/pop/v6"
	"github.com/gobuffalo/validate"
)

type Todo struct {
	ID          int64     `json:"id" db:"id"`
	Content     string    `json:"content" db:"content"`
	IsCompleted bool      `json:"is_completed" db:"is_completed"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// String is not required by pop and may be deleted
func (t Todo) String() string {
	jt, _ := json.Marshal(t)
	return string(jt)
}

// TableName overrides the table name used by Pop.
func (t Todo) TableName() string {
	return "todos"
}

// Todoes is not required by pop and may be deleted
type Todoes []Todo

// Validate gets run every time you call a "pop.Validate*" (pop.ValidateAndSave, pop.ValidateAndCreate, pop.ValidateAndUpdate) method.
// This method is not required and may be deleted.
func (t *Todo) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateCreate gets run every time you call "pop.ValidateAndCreate" method.
// This method is not required and may be deleted.
func (t *Todo) ValidateCreate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run every time you call "pop.ValidateAndUpdate" method.
// This method is not required and may be deleted.
func (t *Todo) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}
