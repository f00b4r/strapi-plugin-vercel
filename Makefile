.PHONY: install build

install:
	npm install

publish-dry:
	npm publish --tag latest --dry

publish:
	npm publish --tag latest
