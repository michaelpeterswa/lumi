# -=-=-=-=-=-=- Compile Image -=-=-=-=-=-=-

FROM --platform=$BUILDPLATFORM golang:1 AS stage-compile

WORKDIR /go/src/app
COPY . .

ARG TARGETARCH
ENV GOARCH=$TARGETARCH
RUN go get -d -v ./... && CGO_ENABLED=0 GOOS=linux go build ./cmd/lumi

# -=-=-=-=- Final Distroless Image -=-=-=-=-

# hadolint ignore=DL3006
FROM gcr.io/distroless/static-debian12 as stage-final

COPY --from=stage-compile /go/src/app/lumi /
CMD ["/lumi"]