all:
	@echo "make composer"
	@echo "make deps"
	@echo "make server"

composer:
	php -r "readfile('https://getcomposer.org/installer');" | php

deps:
	php composer.phar update

server:
	php artisan serve

watch:
	./node_modules/.bin/gulp watch
