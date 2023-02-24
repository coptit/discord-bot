up-dev:
	docker-compose -f docker-compose.dev.yml up -d

up-prod:
	docker-compose -f docker-compose.dev.yml -f docker-compose.prod.yml \
		up --build -d

build:
	docker build -t kunalsin9h/coptit-bot:latest -f Dockerfile .
	docker build -t ghcr.io/coptit/coptit-bot:latest -f Dockerfile .