package validators

import (
	"regexp"
)

const emailRegexPattern = `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

func IsValidateEmail(input string) bool {
	re := regexp.MustCompile(emailRegexPattern)

	if !re.MatchString(input) {
		return false
	}

	return true
}
