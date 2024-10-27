package utils

import (
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func StructToMap(input interface{}) (map[string]interface{}, error) {
	jsonData, err := json.Marshal(input)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	if err := json.Unmarshal(jsonData, &result); err != nil {
		return nil, err
	}

	return result, nil
}

func GetString(data map[string]interface{}, key string) string {
	if val, ok := data[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

func GetInt(data map[string]interface{}, key string) int {
	if val, ok := data[key]; ok {
		switch v := val.(type) {
		case int:
			return v
		case int32:
			return int(v)
		case int64:
			return int(v)
		case float64:
			return int(v) // Chuyển đổi từ float64 (MongoDB đôi khi lưu số dưới dạng float64)
		case float32:
			return int(v)
		case string:
			// Thử chuyển chuỗi thành số nguyên nếu cần
			if intVal, err := strconv.Atoi(v); err == nil {
				return intVal
			}
		}
	}
	return 0 // Giá trị mặc định nếu không có hoặc không phải kiểu int
}

func GetFloat64(data map[string]interface{}, key string) float64 {
	if val, ok := data[key]; ok {
		switch v := val.(type) {
		case float64:
			return v
		case float32:
			return float64(v)
		case int:
			return float64(v)
		case int32:
			return float64(v)
		case int64:
			return float64(v)
		case string:
			// Thử chuyển chuỗi thành float64 nếu cần
			if floatVal, err := strconv.ParseFloat(v, 64); err == nil {
				return floatVal
			}
		}
	}
	return 0.0 // Giá trị mặc định nếu không có hoặc không phải kiểu float64
}

func GetBool(data map[string]interface{}, key string) bool {
	if val, ok := data[key]; ok {
		if b, ok := val.(bool); ok {
			return b
		}
	}
	return false
}

func GetArray(data map[string]interface{}, key string) []interface{} {
	if val, ok := data[key]; ok {
		if array, ok := val.([]interface{}); ok {
			return array
		}
	}
	return []interface{}{}
}

func GetArrayMap(data map[string]interface{}, key string) []map[string]interface{} {
	if val, ok := data[key]; ok {
		if array, ok := val.(primitive.A); ok {
			result := make([]map[string]interface{}, len(array))
			for i, v := range array {
				if m, ok := v.(map[string]interface{}); ok {
					result[i] = m
				}
			}
			return result
		}
	}
	return []map[string]interface{}{}
}

func GetTime(data map[string]interface{}, key string) time.Time {
	if val, ok := data[key]; ok {
		switch v := val.(type) {
		case time.Time:
			return v
		case string:
			parsedTime, err := time.Parse(time.RFC3339, v)
			if err == nil {
				return parsedTime
			}
		}
	}
	return time.Time{}
}

func GetStringArray(data map[string]interface{}, key string) []string {
	if val, ok := data[key]; ok {
		if array, ok := val.([]interface{}); ok {
			strArray := make([]string, len(array))
			for i, v := range array {
				if str, ok := v.(string); ok {
					strArray[i] = str
				}
			}
			return strArray
		}
	}
	return []string{}
}

func GetStringArrayFromPrimitiveAMap(data map[string]interface{}, key string) []string {
	if val, ok := data[key]; ok {
		if array, ok := val.(primitive.A); ok {
			strArray := make([]string, len(array))
			for i, v := range array {
				if str, ok := v.(string); ok {
					strArray[i] = str
				}
			}
			return strArray
		}
	}
	return []string{}
}

func GetMap(data map[string]interface{}, key string) map[string]interface{} {
	if val, ok := data[key]; ok {
		if mapVal, ok := val.(map[string]interface{}); ok {
			return mapVal
		}
	}
	return map[string]interface{}{}
}

func GetObjectID(data map[string]interface{}, key string) primitive.ObjectID {
	if id, ok := data[key]; ok {
		switch v := id.(type) {
		case primitive.ObjectID:
			return v
		case string:
			objectID, err := primitive.ObjectIDFromHex(v)
			if err != nil {
				return primitive.NilObjectID
			}
			return objectID
		}
	}
	return primitive.NilObjectID
}

func ExtractFileName(fileURL string) (string, error) {
	// Parse URL để tách phần path
	parsedURL, err := url.Parse(fileURL)
	if err != nil {
		return "", fmt.Errorf("invalid URL: %v", err)
	}

	// Lấy path từ URL và giải mã
	filePath := parsedURL.Path
	decodedFilePath, err := url.PathUnescape(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to decode file path: %v", err)
	}

	// Tách file name từ đường dẫn
	parts := strings.Split(decodedFilePath, "/")
	if len(parts) < 2 {
		return "", fmt.Errorf("invalid file path format")
	}

	// Trả về tên file (phần cuối cùng)
	fileName := parts[len(parts)-1]
	return fileName, nil
}
