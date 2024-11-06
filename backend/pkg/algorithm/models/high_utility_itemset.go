package models

import (
	"fmt"
	"strings"
)

type HighUtilityItemset struct {
	Itemset []int      
	Utility float64    
}

func NewHighUtilityItemset(itemset []int, utility float64) *HighUtilityItemset {
	return &HighUtilityItemset{
		Itemset: itemset,
		Utility: utility,
	}
}

func (hui *HighUtilityItemset) GetItemset() []int {
	return hui.Itemset
}

func (hui *HighUtilityItemset) GetUtility() float64 {
	return hui.Utility
}

func (hui *HighUtilityItemset) String() string {
	return fmt.Sprintf("Itemset: [%s], Utility: %.2f", strings.Trim(fmt.Sprint(hui.Itemset), "[]"), hui.Utility)
}
