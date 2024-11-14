package models

import (
	"electronik/pkg/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	Category struct {
		ID     primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		NameVi string             `bson:"nameVi" json:"nameVi" form:"nameVi"`
		NameEn string             `bson:"nameEn" json:"nameEn" form:"nameEn"`
		Image  string             `bson:"image" json:"image" form:"image"`
	}

	CategoryRequest struct {
		Category      Category `json:"category" bson:"category"`
		Manufacturers []string `json:"manufacturers" bson:"manufacturers"`
	}

	Variant struct {
		ID            primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		Serial        int64              `bson:"serial" json:"-" form:"serial"`
		SerialString  string             `json:"serial"`
		Color         string             `bson:"color" json:"color" validate:"required" form:"color"`
		Stock         int                `bson:"stock" json:"stock" validate:"required,gte=0" form:"stock"`
		Price         float64            `bson:"price" json:"price" validate:"required,gt=0" form:"price"`
		PurchasePrice float64            `json:"purchasePrice"`
		Weight        string             `bson:"weight" json:"weight" validate:"required" form:"weight"`
		SKU           string             `bson:"sku" json:"sku" validate:"required" form:"sku"`
		Images        []Image            `bson:"images" json:"images" form:"images"`
		DescriptionVi string             `bson:"descriptionVi" json:"descriptionVi" validate:"-" form:"descriptionVi"`
		DescriptionEn string             `bson:"descriptionEn" json:"descriptionEn" validate:"-" form:"descriptionEn"`
	}

	Image struct {
		ID        primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		URL       string             `bson:"url" json:"url" validate:"required,url" form:"url"`
		IsDefault bool               `bson:"isDefault" json:"isDefault" form:"isDefault"`
	}

	Feedback struct {
		ID           primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		UserID       primitive.ObjectID `bson:"user_id" json:"user_id" validate:"required" form:"user_id"`
		Username     string             `bson:"username" json:"username" validate:"required" form:"username"`
		ContentRated string             `bson:"content_rated" json:"content_rated" validate:"required" form:"content_rated"`
		FeedbackDate time.Time          `bson:"feedback_date" json:"feedback_date" validate:"required" form:"feedback_date"`
		NumberStar   int                `bson:"number_star" json:"number_star" validate:"required,min=1,max=5" form:"number_star"`
	}

	Specification struct {
		ID    primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
		Name  string             `bson:"name" json:"name" validate:"required" form:"name"`
		Value string             `bson:"value" json:"value" validate:"required" form:"value"`
	}

	// VariantSummary struct {
	// 	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
	// 	NameVi        string             `bson:"nameVi" json:"nameVi" validate:"required" form:"nameVi"`
	// 	NameEn        string             `bson:"nameEn" json:"nameEn" validate:"required" form:"nameEn"`
	// 	DescriptionVi string             `bson:"descriptionVi" json:"descriptionVi" validate:"required" form:"descriptionVi"`
	// 	DescriptionEn string             `bson:"descriptionEn" json:"descriptionEn" validate:"required" form:"descriptionEn"`
	// 	Color         string             `bson:"color" json:"color" validate:"required" form:"color"`
	// 	Price         float64            `bson:"price" json:"price" validate:"required,gt=0" form:"price"`
	// 	Stock         int                `bson:"stock" json:"stock" validate:"required,gte=0" form:"stock"`
	// 	Images        []Image            `bson:"images" json:"images" form:"images"`
	// }

	Product struct {
		ID             primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
		NameVi         string             `bson:"nameVi" json:"nameVi" validate:"-" form:"nameVi"`
		NameEn         string             `bson:"nameEn" json:"nameEn" validate:"-" form:"nameEn"`
		DescriptionVi  string             `bson:"descriptionVi" json:"descriptionVi" validate:"-" form:"descriptionVi"`
		DescriptionEn  string             `bson:"descriptionEn" json:"descriptionEn" validate:"-" form:"descriptionEn"`
		CreatedAt      time.Time          `bson:"created_at" json:"created_at" form:"created_at"`
		DefaultImage   string             `bson:"default_image" json:"default_image" validate:"required,url" form:"default_image"`
		Price          float64            `bson:"price" json:"price" validate:"required,gt=0" form:"price"`
		Category       Category           `bson:"category" json:"category" validate:"required" form:"category"`
		Variants       []Variant          `bson:"variants" json:"variants" validate:"dive" form:"variants"`
		Feedbacks      []Feedback         `bson:"feedbacks" json:"feedbacks" validate:"dive" form:"feedbacks"`
		Dimensions     string             `bson:"dimensions" json:"dimensions" validate:"required" form:"dimensions"`
		Manufacturer   string             `bson:"manufacturer" json:"manufacturer" validate:"required" form:"manufacturer"`
		Specifications []Specification    `bson:"specifications" json:"specifications" validate:"required" form:"specifications"`
		Warranty       string             `bson:"warranty" json:"warranty" validate:"required" form:"warranty"`
		Weight         string             `bson:"weight" json:"weight" validate:"required" form:"weight"`
		Status         int                `bson:"status" json:"status" validate:"required" form:"status"`
		Sale           *Sale              `bson:"sale,omitempty" json:"sale,omitempty" form:"sale"`
	}
)

func (c *Category) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":    c.ID,
		"nameVi": c.NameVi,
		"nameEn": c.NameEn,
		"image":  c.Image,
	}
}

func (c *Category) FromMap(data map[string]interface{}) {
	c.ID = data["_id"].(primitive.ObjectID)
	c.NameVi = data["nameVi"].(string)
	c.NameEn = data["nameEn"].(string)
	c.Image = data["image"].(string)
}

func (cr *CategoryRequest) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"category":      cr.Category.ToMap(),
		"manufacturers": cr.Manufacturers,
	}
}

func (cr *CategoryRequest) FromMap(data map[string]interface{}) {
	var cat Category
	cat.FromMap(data["category"].(map[string]interface{}))
	cr.Category = cat
	cr.Manufacturers = data["manufacturers"].([]string)
}

func (v *Variant) ToMap() map[string]interface{} {
	images := []map[string]interface{}{}
	for _, img := range v.Images {
		images = append(images, img.ToMap())
	}

	return map[string]interface{}{
		"_id":           v.ID,
		"color":         v.Color,
		"stock":         v.Stock,
		"price":         v.Price,
		"weight":        v.Weight,
		"sku":           v.SKU,
		"images":        images,
		"descriptionVi": v.DescriptionVi,
		"descriptionEn": v.DescriptionEn,
	}
}

func (v *Variant) FromMap(data map[string]interface{}) {
	v.ID = data["_id"].(primitive.ObjectID)
	v.Color = data["color"].(string)
	v.Stock = int(data["stock"].(float64))
	v.Price = data["price"].(float64)
	v.Weight = data["weight"].(string)
	v.SKU = data["sku"].(string)
	v.DescriptionVi = data["descriptionVi"].(string)
	v.DescriptionEn = data["descriptionEn"].(string)

	images := data["images"].([]interface{})
	for _, img := range images {
		var image Image
		image.FromMap(img.(map[string]interface{}))
		v.Images = append(v.Images, image)
	}
}

func (img *Image) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":       img.ID,
		"url":       img.URL,
		"isDefault": img.IsDefault,
	}
}

func (img *Image) FromMap(data map[string]interface{}) {
	img.ID = data["_id"].(primitive.ObjectID)
	img.URL = data["url"].(string)
	img.IsDefault = data["isDefault"].(bool)
}

func (f *Feedback) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":           f.ID,
		"user_id":       f.UserID,
		"username":      f.Username,
		"content_rated": f.ContentRated,
		"feedback_date": f.FeedbackDate,
		"number_star":   f.NumberStar,
	}
}

func (f *Feedback) FromMap(data map[string]interface{}) {
	f.ID = data["_id"].(primitive.ObjectID)
	f.UserID = data["user_id"].(primitive.ObjectID)
	f.Username = data["username"].(string)
	f.ContentRated = data["content_rated"].(string)
	f.FeedbackDate = data["feedback_date"].(time.Time)
	f.NumberStar = int(data["number_star"].(float64))
}

func (s *Specification) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":   s.ID,
		"name":  s.Name,
		"value": s.Value,
	}
}

func (s *Specification) FromMap(data map[string]interface{}) {
	s.ID = data["_id"].(primitive.ObjectID)
	s.Name = data["name"].(string)
	s.Value = data["value"].(string)
}

func (s *Sale) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":                 s.ID,
		"saleNameVi":          s.SaleNameVi,
		"saleNameEn":          s.SaleNameEn,
		"discountOPercentage": s.DiscountPercentage,
		"startDate":           s.StartDate.Format(time.RFC3339),
		"endDate":             s.EndDate.Format(time.RFC3339),
	}
}

func (s *Sale) FromMap(data map[string]interface{}) {
	s.ID = utils.GetObjectID(data, "_id")
	s.SaleNameVi = utils.GetString(data, "saleNameVi")
	s.SaleNameEn = utils.GetString(data, "saleNameEn")
	s.DiscountPercentage = utils.GetInt(data, "discountPercentage")
	s.StartDate = utils.GetTime(data, "startDate")
	s.EndDate = utils.GetTime(data, "endDate")
}

func (p *Product) ToMap() map[string]interface{} {
	variants := []map[string]interface{}{}
	for _, v := range p.Variants {
		variants = append(variants, v.ToMap())
	}

	feedbacks := []map[string]interface{}{}
	for _, f := range p.Feedbacks {
		feedbacks = append(feedbacks, f.ToMap())
	}

	specifications := []map[string]interface{}{}
	for _, s := range p.Specifications {
		specifications = append(specifications, s.ToMap())
	}

	productMap := map[string]interface{}{
		"_id":            p.ID,
		"nameVi":         p.NameVi,
		"nameEn":         p.NameEn,
		"descriptionVi":  p.DescriptionVi,
		"descriptionEn":  p.DescriptionEn,
		"created_at":     p.CreatedAt,
		"default_image":  p.DefaultImage,
		"price":          p.Price,
		"category":       p.Category.ToMap(),
		"variants":       variants,
		"feedbacks":      feedbacks,
		"dimensions":     p.Dimensions,
		"manufacturer":   p.Manufacturer,
		"specifications": specifications,
		"warranty":       p.Warranty,
		"weight":         p.Weight,
		"status":         p.Status,
	}

	if p.Sale != nil {
		productMap["sale"] = p.Sale.ToMap()
	}

	return productMap
}

func (p *Product) FromMap(data map[string]interface{}) {
	p.ID = data["_id"].(primitive.ObjectID)
	p.NameVi = data["nameVi"].(string)
	p.NameEn = data["nameEn"].(string)
	p.DescriptionVi = data["descriptionVi"].(string)
	p.DescriptionEn = data["descriptionEn"].(string)
	p.CreatedAt = data["created_at"].(time.Time)
	p.DefaultImage = data["default_image"].(string)
	p.Price = data["price"].(float64)
	p.Category.FromMap(data["category"].(map[string]interface{}))
	p.Dimensions = data["dimensions"].(string)
	p.Manufacturer = data["manufacturer"].(string)
	p.Warranty = data["warranty"].(string)
	p.Weight = data["weight"].(string)
	p.Status = int(data["status"].(float64))

	// Populate Variants
	for _, v := range data["variants"].([]interface{}) {
		var variant Variant
		variant.FromMap(v.(map[string]interface{}))
		p.Variants = append(p.Variants, variant)
	}

	// Populate Feedbacks
	for _, f := range data["feedbacks"].([]interface{}) {
		var feedback Feedback
		feedback.FromMap(f.(map[string]interface{}))
		p.Feedbacks = append(p.Feedbacks, feedback)
	}

	// Populate Specifications
	for _, s := range data["specifications"].([]interface{}) {
		var spec Specification
		spec.FromMap(s.(map[string]interface{}))
		p.Specifications = append(p.Specifications, spec)
	}

	// Populate Sale if present
	if saleData, ok := data["sale"].(map[string]interface{}); ok {
		var sale Sale
		sale.FromMap(saleData)
		p.Sale = &sale
	}
}
