package models

import "fmt"

type UtilityArray struct {
	RTWUs map[int]float64
	RLUs  map[int]float64
	RSUs  map[int]float64
}

func NewUtilityArray() *UtilityArray {
	return &UtilityArray{
		RTWUs: make(map[int]float64),
		RLUs:  make(map[int]float64),
		RSUs:  make(map[int]float64),
	}
}

// Setters and Getters for RTWU
func (ua *UtilityArray) SetRTWU(item int, value float64) {
	ua.RTWUs[item] = value
}

func (ua *UtilityArray) GetRTWU(item int) float64 {
	return ua.RTWUs[item]
}

// Setters and Getters for RLU
func (ua *UtilityArray) SetRLU(item int, value float64) {
	ua.RLUs[item] = value
}

func (ua *UtilityArray) GetRLU(item int) float64 {
	return ua.RLUs[item]
}

// Setters and Getters for RSU
func (ua *UtilityArray) SetRSU(item int, value float64) {
	ua.RSUs[item] = value
}

func (ua *UtilityArray) GetRSU(item int) float64 {
	return ua.RSUs[item]
}

// Print all utility arrays
func (ua *UtilityArray) PrintUtilityArray() {
	fmt.Println("RTWU Array:")
	for item, value := range ua.RTWUs {
		fmt.Printf("Item %d: %.2f\n", item, value)
	}

	fmt.Println("RLU Array:")
	for item, value := range ua.RLUs {
		fmt.Printf("Item %d: %.2f\n", item, value)
	}

	fmt.Println("RSU Array:")
	for item, value := range ua.RSUs {
		fmt.Printf("Item %d: %.2f\n", item, value)
	}
}
