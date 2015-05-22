# Web Dense

Try and make a simple topic based application powered by Lumen Framework and AngularJS

# Usage

Composer

    curl -sS https://getcomposer.org/installer | php

Vendors

    php composer.phar install

Env

    mv .env.example .env

Database

    touch storage/development.sqlite

Migrations

    php artisan migrate

Gulp

    npm install

Build Assets

    ./node_modules/.bin/gulp

Watch Assets

    make watch

Run

    make server
