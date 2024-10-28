package errors

// ErrorResponse defines the structure for error responses
//
//	@Description Error response model
//	@Property code int `json:"code"`
//	@Property message string `json:"message"`
type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
