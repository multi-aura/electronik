package algorithm

import (
	"bufio"
	"electronik/pkg/algorithm/algorithms"
	"electronik/pkg/algorithm/models"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func RunEMHUN(inputFileName string, minUtility float64, resultFileName string) error {
	transactions, err := readTransactionsFromFile(inputFileName)
	if err != nil {
		return fmt.Errorf("error reading transactions: %v", err)
	}

	emhun := algorithms.NewEMHUN(transactions, minUtility)
	emhun.Run()

	return writeResultsToFile(emhun, resultFileName)
}

func readTransactionsFromFile(fileName string) ([]*models.Transaction, error) {
	file, err := os.Open(fileName)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var transactions []*models.Transaction

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ":")
		if len(parts) != 3 {
			fmt.Println("Invalid line format:", line)
			continue
		}

		itemsStr := strings.Fields(parts[0])
		var items []int
		for _, item := range itemsStr {
			itemInt, err := strconv.Atoi(item)
			if err != nil {
				return nil, err
			}
			items = append(items, itemInt)
		}

		transUtility, err := strconv.ParseFloat(strings.TrimSpace(parts[1]), 64)
		if err != nil {
			return nil, err
		}

		utilitiesStr := strings.Fields(parts[2])
		var utilities []float64
		for _, utility := range utilitiesStr {
			utilityFloat, err := strconv.ParseFloat(utility, 64)
			if err != nil {
				return nil, err
			}
			utilities = append(utilities, utilityFloat)
		}

		// Tạo transaction với các số thực
		transaction := models.NewTransaction(items, utilities, transUtility)
		transactions = append(transactions, transaction)
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return transactions, nil
}
func writeResultsToFile(emhun *algorithms.EMHUN, fileName string) error {
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := bufio.NewWriter(file)

	// Ghi kết quả thuật toán (Itemset và Utility)
	for _, hui := range emhun.SearchAlgorithms.HighUtilityItemsets {
		line := fmt.Sprintf("Itemset: %v, Utility: %.2f\n", hui.Itemset, hui.Utility)
		if _, err := writer.WriteString(line); err != nil {
			return err
		}
	}

	return writer.Flush()
}
