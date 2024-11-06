package models

import "fmt"

type Transaction struct {
	Items              []int    
	Utilities          []float64  
	TransactionUtility float64   
}

func NewTransaction(items []int, utilities []float64, transUtility float64) *Transaction {
	return &Transaction{
		Items:              items,
		Utilities:          utilities,
		TransactionUtility: transUtility,
	}
}

func (t *Transaction) GetItems() []int {
	return t.Items
}

func (t *Transaction) GetUtilities() []float64 {
	return t.Utilities
}

func (t *Transaction) GetTransactionUtility() float64 {
	return t.TransactionUtility
}

func (t *Transaction) String() string {
	return fmt.Sprintf("Các item: %v | Utilities: %v | Transaction Utility: %.2f", t.Items, t.Utilities, t.TransactionUtility)
}
