package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	Mongo MongoConfig
}

type MongoConfig struct {
	URI      string
	Database string
}

func LoadConfig() (*Config, error) {
	viper.SetConfigName("config")                 // Tên file là "config"
	viper.SetConfigType("yaml")                   // Định dạng YAML
	viper.AddConfigPath("./internal/configs/dev") // Đường dẫn đến folder chứa file config

	err := viper.ReadInConfig()
	if err != nil {
		return nil, err
	}

	var config Config
	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("unable to decode into struct, %v", err)
	}

	return &config, nil
}
