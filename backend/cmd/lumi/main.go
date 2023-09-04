package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/michaelpeterswa/lumi/backend/internal/cockroach"
	"github.com/michaelpeterswa/lumi/backend/internal/config"
	"github.com/michaelpeterswa/lumi/backend/internal/dragonfly"
	"github.com/michaelpeterswa/lumi/backend/internal/handlers"
	"github.com/michaelpeterswa/lumi/backend/internal/logging"
	"github.com/michaelpeterswa/lumi/backend/internal/metrics"
	"github.com/michaelpeterswa/lumi/backend/internal/movies"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go.uber.org/zap"
)

func main() {
	k, err := config.Get("lumi")
	if err != nil {
		log.Fatalf("error getting config: %v", err)
	}

	logger, err := logging.InitLogging(k.String(config.LogLevel))
	if err != nil {
		log.Fatalf("error initializing logging: %v", err)
	}

	logger.Info("welcome to lumi backend!")

	dragonflyClient, err := dragonfly.NewDragonflyClient(k.String(config.DragonflyHost), k.Int(config.DragonflyPort), k.String(config.DragonflyAuth))
	if err != nil {
		logger.Fatal("error initializing dragonfly client", zap.Error(err))
	}

	cockroachClient, err := cockroach.NewCockroachClient(k.String(config.CockroachURL))
	if err != nil {
		logger.Fatal("error initializing cockroach client", zap.Error(err))
	}
	defer cockroachClient.Client.Close(context.Background())

	moviesClient := movies.NewMoviesClient(dragonflyClient, cockroachClient)

	moviesHandler := handlers.NewMovieHandler(moviesClient)

	router := mux.NewRouter()
	apiRouter := router.PathPrefix("/api").Subrouter()
	v1Router := apiRouter.PathPrefix("/v1").Subrouter()
	v1Router.HandleFunc("/movies", moviesHandler.GetMovies)

	internalRouter := mux.NewRouter()
	internalRouter.HandleFunc("/healthcheck", handlers.HealthcheckHandler)
	internalRouter.Handle("/metrics", promhttp.Handler())

	go func() {
		err = http.ListenAndServe(":8081", internalRouter)
		if err != nil {
			panic(err)
		}
	}()

	metrics.LumiCounter.Inc()
	metrics.LumiCounter.Inc()
	metrics.LumiCounter.Inc()

	err = http.ListenAndServe(":8080", router)
	if err != nil {
		panic(err)
	}
}
