package http

type timeResponse struct {
	time     string `json:"time"`
	timeZone string `json:"time-zone"`
}

type ipResponse struct {
	result string `json:"result"`
}
