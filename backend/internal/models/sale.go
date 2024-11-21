package models

import (
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*
status_sale, Status: 0 = expired, 1 = active, -1 = deleted,
SaleType: 1 = product_discounts, 2 = voucher_code
*/
type Sale struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
	SaleNameVi         string             `bson:"saleNameVi" json:"saleNameVi" validate:"required" form:"saleNameVi"`
	SaleNameEn         string             `bson:"saleNameEn" json:"saleNameEn" form:"saleNameEn"`
	StartDate          time.Time          `bson:"start_date" json:"startDate" validate:"required" form:"startDate"`
	EndDate            time.Time          `bson:"end_date" json:"endDate" validate:"required" form:"endDate"`
	DiscountPercentage int                `bson:"discountPercentage" json:"discountPercentage" validate:"required" `
	StatusSale         int                `bson:"status_sale" json:"status_sale" validate:"required" form:"status_sale"`
	SaleType           int                `bson:"saletype" json:"saletype" validate:"required" form:"saletype"`
	Products           []SaleProduct      `bson:"products" json:"products" form:"products"`
}

type SaleProduct struct {
	ProductID    primitive.ObjectID `bson:"product_id" json:"productId" validate:"required" form:"productId"`
	Status       int                `bson:"status" json:"status" validate:"required,gte=0,lte=1" form:"status"`
	QuantitySale int                `bson:"quantity_sale" json:"quantitySale" validate:"required,gte=0" form:"quantitySale"`
}

func (sp *SaleProduct) FromMap(data map[string]interface{}) error {
	if data == nil {
		return fmt.Errorf("input data is nil")
	}

	id, ok := data["productId"].(string)
	if !ok || id == "" {
		return fmt.Errorf("missing or invalid 'productId'")
	}
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid productId: %v", err)
	}
	sp.ProductID = objectID

	status, ok := data["status"].(int)
	if !ok {
		return fmt.Errorf("invalid 'status', expected int")
	}
	sp.Status = status

	quantity, ok := data["quantitySale"].(int)
	if !ok || quantity < 0 {
		return fmt.Errorf("invalid 'quantitySale', expected non-negative int")
	}
	sp.QuantitySale = quantity

	return nil
}

// SaleProduct: ToMap
func (sp *SaleProduct) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"productId":    sp.ProductID.Hex(),
		"status":       sp.Status,
		"quantitySale": sp.QuantitySale,
	}
}

// Sale: FromMap
func (s *Sale) FromMap(data map[string]interface{}) error {
	if data == nil {
		return fmt.Errorf("input data is nil")
	}

	// Lấy ID
	id, ok := data["_id"].(string)
	if !ok || id == "" {
		return fmt.Errorf("missing or invalid '_id'")
	}
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid _id: %v", err)
	}
	s.ID = objectID

	// Lấy SaleNameVi
	nameVi, ok := data["saleNameVi"].(string)
	if !ok {
		return fmt.Errorf("missing or invalid 'saleNameVi'")
	}
	s.SaleNameVi = nameVi

	// Lấy SaleNameEn (không bắt buộc)
	if nameEn, ok := data["saleNameEn"].(string); ok {
		s.SaleNameEn = nameEn
	}

	// Lấy StartDate
	startDate, ok := data["startDate"].(string)
	if !ok {
		return fmt.Errorf("missing or invalid 'startDate'")
	}
	parsedStartDate, err := time.Parse(time.RFC3339, startDate)
	if err != nil {
		return fmt.Errorf("invalid startDate: %v", err)
	}
	s.StartDate = parsedStartDate

	// Lấy EndDate
	endDate, ok := data["endDate"].(string)
	if !ok {
		return fmt.Errorf("missing or invalid 'endDate'")
	}
	parsedEndDate, err := time.Parse(time.RFC3339, endDate)
	if err != nil {
		return fmt.Errorf("invalid endDate: %v", err)
	}
	s.EndDate = parsedEndDate

	// Lấy DiscountPercentage
	discount, err := getIntFromInterface(data["discountPercentage"])
	if err != nil {
		return fmt.Errorf("invalid discountPercentage: %v", err)
	}
	s.DiscountPercentage = discount

	// Lấy StatusSale
	statusSale, err := getIntFromInterface(data["status_sale"])
	if err != nil {
		return fmt.Errorf("invalid status_sale: %v", err)
	}
	s.StatusSale = statusSale

	// Lấy SaleType
	saleType, err := getIntFromInterface(data["saletype"])
	if err != nil {
		return fmt.Errorf("invalid saletype: %v", err)
	}
	s.SaleType = saleType

	// Lấy Products
	if products, ok := data["products"].([]interface{}); ok {
		for _, p := range products {
			productMap, ok := p.(map[string]interface{})
			if !ok {
				return fmt.Errorf("invalid product format in 'products'")
			}

			product := SaleProduct{}
			if err := product.FromMap(productMap); err != nil {
				return err
			}
			s.Products = append(s.Products, product)
		}
	} else if data["products"] == nil {
		// Nếu products là null, gán mảng rỗng
		s.Products = []SaleProduct{}
	} else {
		// Nếu không phải mảng hoặc null, trả lỗi
		return fmt.Errorf("missing or invalid 'products'")
	}

	return nil
}

// Sale: ToMap
func (s *Sale) ToMap() map[string]interface{} {
	products := []map[string]interface{}{}
	for _, product := range s.Products {
		products = append(products, product.ToMap())
	}

	return map[string]interface{}{
		"_id":                s.ID.Hex(),
		"saleNameVi":         s.SaleNameVi,
		"saleNameEn":         s.SaleNameEn,
		"startDate":          s.StartDate.Format(time.RFC3339),
		"endDate":            s.EndDate.Format(time.RFC3339),
		"discountPercentage": s.DiscountPercentage,
		"status_sale":        s.StatusSale,
		"saletype":           s.SaleType,
		"products":           products,
	}
}

// Hàm phụ trợ để chuyển đổi kiểu dữ liệu
func getIntFromInterface(value interface{}) (int, error) {
	switch v := value.(type) {
	case float64:
		return int(v), nil
	case int:
		return v, nil
	default:
		return 0, fmt.Errorf("invalid type for integer field")
	}
}
