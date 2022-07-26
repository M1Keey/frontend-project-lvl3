#Makefile
install: #installing dependencies
	npm ci
build: #build app
	npm build
publish: #project publication
	npm publish --dry-run
make lint: #running linter
	npx eslint .