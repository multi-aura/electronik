package configs

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var FirebaseStorageBucketName = "multi-aura.appspot.com"

func InitializeFirebaseApp() *firebase.App {
	opt := option.WithCredentialsFile("./internal/configs/firebase/multi-aura-firebase-adminsdk-uo278-0e6b4550b4.json")

	app, err := firebase.NewApp(context.Background(), &firebase.Config{
		StorageBucket: FirebaseStorageBucketName,
	}, opt)
	if err != nil {
		log.Fatalf("Failed to initialize Firebase app: %v", err)
	}

	return app
}
