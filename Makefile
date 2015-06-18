all:
	@echo "make composer"
	@echo "make deps"
	@echo "make env"
	@echo "make key"
	@echo "make server"

composer:
	php -r "readfile('https://getcomposer.org/installer');" | php

deps:
	php composer.phar update

env:
	cp .env.example .env

key:
	@php -r "require_once 'vendor/autoload.php'; file_put_contents('.env', str_replace('SomeRandomKey!!!', Illuminate\Support\Str::random(32), file_get_contents('.env')));"

server:
	php artisan serve

watch:
	./node_modules/.bin/gulp watch
