dev-up:
	docker-compose -f docker-compose.dev.yml up -d

prod-up:
	docker-compose -f docker-compose.dev.yml -f docker-compose.prod.yml \
		up --build -d

prod-build:
	docker-compose -f docker-compose.dev.yml -f docker-compose.prod.yml build
