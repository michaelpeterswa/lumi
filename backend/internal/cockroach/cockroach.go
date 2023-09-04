package cockroach

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
)

var (
	ErrPgxFailedToParseConfig = errors.New("pgx failed to parse config")
	ErrPgxFailedToConnect     = errors.New("pgx failed to connect")
)

type CockroachClient struct {
	Client *pgx.Conn
}

func NewCockroachClient(connectionString string) (*CockroachClient, error) {
	config, err := pgx.ParseConfig(connectionString)
	if err != nil {
		return nil, ErrPgxFailedToParseConfig
	}

	config.RuntimeParams["application_name"] = "$ lumi_backend"

	conn, err := pgx.ConnectConfig(context.Background(), config)
	if err != nil {
		return nil, err
	}

	return &CockroachClient{Client: conn}, nil
}
