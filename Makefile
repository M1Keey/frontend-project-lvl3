#Makefile
install: #installing dependencies
	npm ci
publish: #project publication
	npm publish --dry-run
make lint: #running linter
	npx eslint .