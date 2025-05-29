# proyek-fullstack/admin-app/Dockerfile
FROM php:8.3-fpm-alpine AS base

LABEL maintainer="Taufiq <taufiq.ama@proton.me>"
LABEL app="Admin App (Laravel)"

WORKDIR /var/www/html

# Install system dependencies (termasuk untuk pgsql, zip, gd, intl)
# Alpine packages: https://pkgs.alpinelinux.org/packages
RUN apk add --no-cache \
    curl \
    zip \
    unzip \
    git \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    libxml2-dev \
    postgresql-dev \
    icu-dev \
    oniguruma-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo pdo_pgsql pgsql \
        zip \
        gd \
        exif \
        pcntl \
        bcmath \
        soap \
        xml \
        intl \
        mbstring

# Dapatkan Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Stage untuk dependensi Composer (agar bisa di-cache)
FROM base AS composer_deps
COPY composer.json composer.lock ./
# Install dependensi (termasuk dev untuk development, --no-dev untuk produksi)
# Untuk setup ini, kita buat image yang "siap deploy", jadi --no-dev
# Jika Anda butuh dev-dependencies di kontainer, hapus --no-dev
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-plugins --no-scripts

# Stage final aplikasi
FROM base AS app
COPY --from=composer_deps /var/www/html/vendor ./vendor
# Salin seluruh kode aplikasi
COPY . .

# Buat file .env dari .env.example jika .env tidak ada
# Ini penting karena .env seharusnya tidak ada di dalam image
# Variabel lingkungan sebenarnya akan di-inject oleh Docker Compose saat runtime
RUN if [ ! -f ".env" ]; then cp .env.example .env; fi

# Atur izin untuk storage dan bootstrap/cache
# Ini penting agar Laravel bisa menulis log, cache, session, dll.
RUN mkdir -p storage/framework/sessions \
             storage/framework/views \
             storage/framework/cache \
             bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Generate APP_KEY jika belum ada di .env yang baru dicopy dari .env.example
# Perintah ini akan menulis ke file .env di dalam image jika APP_KEY kosong
RUN php artisan key:generate --show
# Tambahkan --show agar tidak error jika key sudah ada

# Saat production, cache akan dibuat oleh CD script SETELAH ENV produksi di-set.
# Untuk image ini, kita biarkan tanpa cache agar fleksibel untuk dev & prod.
# Jika mau di-cache saat build:
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Set user ke www-data
USER www-data

EXPOSE 9000
CMD ["php-fpm"]
