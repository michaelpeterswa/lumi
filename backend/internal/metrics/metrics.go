package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	LumiCounter = promauto.NewCounter(prometheus.CounterOpts{
		Name: "lumi_counter_total",
		Help: "",
	})
)
