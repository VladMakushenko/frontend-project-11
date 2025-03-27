develop:
	npx webpack serve

develop_no_overlay:
	npx webpack serve --no-client-overlay

install:
	npm ci

build:
	NODE_ENV=production npx webpack

lint:
	npx eslint .
