package utils

import(
	"github.com/bwmarrin/snowflake"
	"fmt"
)

func GenarateUserID() int64{
	node, err := snowflake.NewNode(1)
	if err != nil {
		fmt.Println(err)
	}

	// Generate a snowflake ID.
	id := node.Generate()

	return id.Int64()
}