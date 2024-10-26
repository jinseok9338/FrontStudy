package actions

import (
	"database/sql"
	"front_study_api/models"
	"net/http"
	"strconv"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop/v6"
)

type TodoResources struct{}

// List all todos with pagination
func (v TodoResources) List(c buffalo.Context) error {
	// Parse pagination parameters from query params
	pageParam := c.Param("page")
	sizeParam := c.Param("size")

	// Set default values
	page := 1
	size := 10

	// Convert page param to integer, if available
	if p, err := strconv.Atoi(pageParam); err == nil && p > 0 {
		page = p
	}

	// Convert size param to integer, if available
	if s, err := strconv.Atoi(sizeParam); err == nil && s > 0 {
		size = s
	}

	// Fetch paginated results
	todos := &models.Todoes{}
	tx := c.Value("tx").(*pop.Connection)
	q := tx.Paginate(page, size)

	if err := q.All(todos); err != nil {
		return c.Error(http.StatusInternalServerError, err)
	}

	// Prepare response with pagination metadata
	response := map[string]interface{}{
		"todos": todos,
		"pagination": map[string]interface{}{
			"page":        q.Paginator.Page,
			"page_size":   q.Paginator.PerPage,
			"total":       q.Paginator.TotalEntriesSize,
			"total_pages": q.Paginator.TotalPages,
		},
	}

	return c.Render(http.StatusOK, r.JSON(response))
}

func (v TodoResources) Show(c buffalo.Context) error {
	todoID := c.Param("todo_resource_id")
	todo := models.Todo{}
	err := models.DB.Where("id = ?", todoID).First(&todo)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.Error(http.StatusNotFound, err)
		}
		return c.Error(http.StatusInternalServerError, err)
	}
	return c.Render(http.StatusOK, r.JSON(todo))
}

func (v TodoResources) Create(c buffalo.Context) error {
	todo := &models.Todo{}
	if err := c.Bind(todo); err != nil {
		return c.Error(http.StatusBadRequest, err)
	}

	models.DB.ValidateAndCreate(todo)

	return c.Render(http.StatusCreated, r.JSON(todo))
}

func (v TodoResources) Update(c buffalo.Context) error {
	todoID := c.Param("todo_resource_id") // Use the correct parameter name
	id, err := strconv.ParseInt(todoID, 10, 64)
	if err != nil {
		return c.Error(http.StatusBadRequest, err) // Return a 400 error for invalid ID
	}

	todo := &models.Todo{} // Use a pointer for the todo

	// Find the existing todo by ID
	if err := models.DB.Where("id = ?", id).First(todo); err != nil {
		if err == sql.ErrNoRows {
			return c.Error(http.StatusNotFound, err) // More specific error message
		}
		return c.Error(http.StatusInternalServerError, err) // Return 500 on other errors
	}

	// Bind the incoming JSON to the existing todo
	if err := c.Bind(todo); err != nil {
		return c.Error(http.StatusBadRequest, err) // Return a 400 error for binding errors
	}
	_, err = models.DB.ValidateAndUpdate(todo)
	// Validate and save the updated todo
	if err != nil {
		return c.Error(http.StatusInternalServerError, err) // Handle any errors during update
	}

	return c.Render(http.StatusOK, r.JSON(todo))
}

func (v TodoResources) Destroy(c buffalo.Context) error {
	todoID := c.Param("todo_resource_id")
	id, err := strconv.ParseInt(todoID, 10, 64)
	if err != nil {
		return c.Error(http.StatusBadRequest, err)
	}

	if err := models.DB.Where("id = ?", id).First(&models.Todo{}); err != nil {
		if err == sql.ErrNoRows {
			return c.Error(http.StatusNotFound, err)
		}
		return c.Error(http.StatusInternalServerError, err)
	}

	// Allocate an empty Todo
	todo := &models.Todo{ID: id}

	if err := models.DB.Destroy(todo); err != nil {
		return c.Error(http.StatusInternalServerError, err)
	}

	return c.Render(http.StatusOK, r.JSON(todo))

}
