package algorithms

import (
	"electronik/pkg/algorithm/models"
	"electronik/pkg/algorithm/utility"
	"fmt"
	"sort"
)

type EMHUN struct {
	Transactions     []*models.Transaction
	MinUtility       float64
	Rho, Delta, Eta  map[int]bool
	SortedSecondary  []int
	SortedEta        []int
	PrimaryItems     []int
	UtilityArray     *models.UtilityArray
	SearchAlgorithms *SearchAlgorithms
}

func NewEMHUN(transactions []*models.Transaction, minUtility float64) *EMHUN {
	utilityArray := models.NewUtilityArray()
	return &EMHUN{
		Transactions:     transactions,
		MinUtility:       minUtility,
		Rho:              make(map[int]bool),
		Delta:            make(map[int]bool),
		Eta:              make(map[int]bool),
		UtilityArray:     utilityArray,
		SearchAlgorithms: NewSearchAlgorithms(utilityArray),
	}
}

func (e *EMHUN) Run() {

	fmt.Println("Running EMHUN...")

	e.ClassifyItems()

	fmt.Println("\nAfter classify, we have:")
	e.printClassification()

	fmt.Println("\nCalculating RTWU for all items in (ρ ∪ δ):")
	utility.CalculateRTWUForAllItems(e.Transactions, e.Rho, e.Delta, e.Eta, e.UtilityArray)

	combinedSet := e.unionKeys(e.Rho, e.Delta)
	secondaryItems := e.getSecondaryItems(combinedSet, e.UtilityArray, e.MinUtility)

	e.SortedSecondary = e.sortItems(secondaryItems)
	e.SortedEta = e.sortItems(e.keys(e.Eta))

	secondaryItemsMap := convertSliceToMap(e.SortedSecondary)
	e.FilterTransactions(secondaryItemsMap, e.Eta)

	e.SortItemsInTransactions()
	// e.PrintTransactions()

	// fmt.Println("\nSorting transactions by total RTWU:")
	e.SortTransactionsByTWU()
	// fmt.Println("\nTransactions after sorting by RTWU:")
	// e.PrintTransactions()
	// fmt.Println("\nCalculating RSU for each item in Secondary(X)...")
	utility.CalculateRSUForAllItems(e.Transactions, e.SortedSecondary, e.UtilityArray)
	e.identifyPrimaryItems()
	fmt.Println("Primary:", e.PrimaryItems)
	fmt.Println("\nStarting HUI Search...")
	e.SearchAlgorithms.Search(e.SortedEta, make(map[int]bool), e.Transactions, e.PrimaryItems, e.SortedSecondary, e.MinUtility)

	// In kết quả sau khi tìm High Utility Itemsets
	fmt.Println("\nHUIs Found:")
	for _, hui := range e.SearchAlgorithms.HighUtilityItemsets {
		fmt.Printf("Itemset: %v, Utility: %.2f\n", hui.Itemset, hui.Utility)
	}
}

func (e *EMHUN) PrintTransactions() {
	fmt.Println("---------------------<Transaction>-------------------------")
	for i, transaction := range e.Transactions {
		fmt.Printf("Transaction %d: %s\n", i+1, transaction)
	}
	fmt.Println("-----------------------------------------------------------")
}

func (e *EMHUN) ClassifyItems() {
	hasPositive := make(map[int]bool)
	hasNegative := make(map[int]bool)

	for _, transaction := range e.Transactions {
		for i, item := range transaction.Items {
			utility := transaction.Utilities[i]

			if utility > 0 {
				hasPositive[item] = true
			} else if utility < 0 {
				hasNegative[item] = true
			}
		}
	}

	allItems := e.unionKeys(hasPositive, hasNegative)

	for item := range allItems {
		positive := hasPositive[item]
		negative := hasNegative[item]

		if positive && !negative {
			e.Rho[item] = true
		} else if positive && negative {
			e.Delta[item] = true
		} else if negative && !positive {
			e.Eta[item] = true
		}
	}
}

func (e *EMHUN) printClassification() {
	rhoItems := e.keys(e.Rho)
	deltaItems := e.keys(e.Delta)
	etaItems := e.keys(e.Eta)

	sort.Ints(rhoItems)
	sort.Ints(deltaItems)
	sort.Ints(etaItems)

	// fmt.Println("Items with positive utility only (ρ):", rhoItems)
	// fmt.Println("Items with both positive and negative utility (δ):", deltaItems)
	// fmt.Println("Items with negative utility only (η):", etaItems)
}

func (e *EMHUN) getSecondaryItems(combinedSet map[int]bool, utilityArray *models.UtilityArray, minU float64) []int {
	var secondary []int
	for item := range combinedSet {
		rlu := utilityArray.GetRTWU(item)
		if rlu >= minU {
			secondary = append(secondary, item)
		}
	}
	sort.Ints(secondary)
	fmt.Printf("Secondary(X) items: %v\n", secondary)
	return secondary
}

func (e *EMHUN) sortItems(items []int) []int {
	sort.Slice(items, func(i, j int) bool {
		typeOrderI := e.getTypeOrder(items[i])
		typeOrderJ := e.getTypeOrder(items[j])

		if typeOrderI != typeOrderJ {
			return typeOrderI < typeOrderJ
		}

		rtwuI := e.UtilityArray.GetRTWU(items[i])
		rtwuJ := e.UtilityArray.GetRTWU(items[j])

		return rtwuI < rtwuJ
	})

	return items
}

func (e *EMHUN) FilterTransactions(secondaryItems map[int]bool, etaItems map[int]bool) {
	// fmt.Println("\nBắt đầu lọc các giao dịch: Chỉ giữ lại các item trong Secondary(X) ∪ η.")
	// for idx, transaction := range e.Transactions {
	for _, transaction := range e.Transactions {
		// fmt.Printf("Giao dịch ban đầu %d: Items: %v, Utilities: %v\n", idx+1, transaction.Items, transaction.Utilities)

		var filteredItems []int
		var filteredUtilities []float64 // Sửa từ int thành float64

		for i, item := range transaction.Items {
			if secondaryItems[item] || etaItems[item] {
				filteredItems = append(filteredItems, item)
				filteredUtilities = append(filteredUtilities, transaction.Utilities[i])
			}
		}

		transaction.Items = filteredItems
		transaction.Utilities = filteredUtilities
		// fmt.Printf("Giao dịch sau khi lọc %d: Items: %v, Utilities: %v\n", idx+1, transaction.Items, transaction.Utilities)

	}
}

func (e *EMHUN) SortItemsInTransactions() {
	for _, transaction := range e.Transactions {
		itemUtilityMap := make(map[int]float64) // Sửa giá trị map từ int thành float64
		for i, item := range transaction.Items {
			itemUtilityMap[item] = transaction.Utilities[i]
		}

		var positiveItems []int
		var hybridItems []int
		var negativeItems []int

		for _, item := range transaction.Items {
			if e.Rho[item] {
				positiveItems = append(positiveItems, item)
			} else if e.Delta[item] {
				hybridItems = append(hybridItems, item)
			} else if e.Eta[item] {
				negativeItems = append(negativeItems, item)
			}
		}

		positiveItems = e.sortItemsByRTWU(positiveItems)
		hybridItems = e.sortItemsByRTWU(hybridItems)
		negativeItems = e.sortItemsByRTWU(negativeItems)

		sortedItems := append(append(positiveItems, hybridItems...), negativeItems...)

		var sortedUtilities []float64 // Sửa từ int thành float64
		for _, item := range sortedItems {
			sortedUtilities = append(sortedUtilities, itemUtilityMap[item])
		}

		transaction.Items = sortedItems
		transaction.Utilities = sortedUtilities
	}
}

func (e *EMHUN) SortTransactionsByTWU() {
	fmt.Println("\nSorting transactions by total RLU of items...")

	sort.Slice(e.Transactions, func(i, j int) bool {
		tuI := utility.CalculateTransactionUtility(e.Transactions[i])
		tuJ := utility.CalculateTransactionUtility(e.Transactions[j])

		// Sắp xếp tăng dần theo tổng RLU
		return tuI < tuJ
	})
}

func (e *EMHUN) sortItemsByRTWU(items []int) []int {
	sort.Slice(items, func(i, j int) bool {
		return e.UtilityArray.GetRTWU(items[i]) < e.UtilityArray.GetRTWU(items[j])
	})
	return items
}

func (e *EMHUN) identifyPrimaryItems() {
	for _, item := range e.SortedSecondary {
		if e.UtilityArray.GetRSU(item) >= e.MinUtility {
			e.PrimaryItems = append(e.PrimaryItems, item)
		}
	}
}

func (e *EMHUN) getTypeOrder(item int) int {
	if e.Rho[item] {
		return 1
	}
	if e.Delta[item] {
		return 2
	}
	if e.Eta[item] {
		return 3
	}
	return int(^uint(0) >> 1)
}

func (e *EMHUN) unionKeys(map1, map2 map[int]bool) map[int]bool {
	unionMap := make(map[int]bool)

	for k := range map1 {
		unionMap[k] = true
	}

	for k := range map2 {
		unionMap[k] = true
	}

	return unionMap
}

func (e *EMHUN) keys(m map[int]bool) []int {
	keys := make([]int, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}

func convertSliceToMap(slice []int) map[int]bool {
	result := make(map[int]bool)
	for _, item := range slice {
		result[item] = true
	}
	return result
}
