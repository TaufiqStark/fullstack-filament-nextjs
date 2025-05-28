# proyek-fullstack/admin-app/Dockerfile

# --- Tahap 1: Builder ---
FROM php:8.3-fpm-alpine AS builder

LABEL maintainer="Nama Anda <emailanda@example.com>"
LABEL app="Admin App (Laravel)"

WORKDIR /var/www/html

# Install system dependencies (termasuk untuk pgsql, zip, gd, intl)
RUN apk add --no-cache \
    curl \
    zip \
    unzip \
    git \
    supervisor \
    # Nginx tidak perlu di sini jika kita menggunakan service Nginx terpisah di Docker Compose
    # nginx \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    libxml2-dev \
    postgresql-dev \
    icu-dev \
    oniguruma-dev

# Install PHP extensions
# Configure gd dengan jpeg dan freetype
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
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

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Salin file composer terlebih dahulu untuk caching layer
COPY composer.json composer.lock ./

# Install dependensi PHP (tanpa dev, optimasi autoloader)
# --no-scripts untuk mencegah error jika .env belum ada atau APP_KEY belum diset
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-plugins --no-scripts

# Salin sisa kode aplikasi
COPY . .

# Buat file .env dari .env.example jika .env tidak ada (untuk build time)
# Di produksi, ENV vars akan di-inject oleh Docker Compose dari .env server
RUN if [ ! -f ".env" ]; then cp .env.example .env; fi

# Generate APP_KEY (akan ditulis ke .env di build context ini)
RUN php artisan key:generate

# Siapkan direktori storage dan bootstrap/cache, lalu atur izin
# Ini penting agar artisan command berikutnya tidak error
RUN mkdir -p storage/framework/sessions \
             storage/framework/views \
             storage/framework/cache \
             bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Jalankan perintah optimasi Laravel
# Ini akan menggunakan .env dari build context (yang berbasis .env.example)
# Cache ini akan di-clear dan di-rebuild di server dengan ENV produksi oleh skrip CD
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# --- Tahap 2: Final Production Image ---
FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

# Install hanya runtime libraries yang dibutuhkan
RUN apk add --no-cache \
    postgresql-libs \
    libxml2 \
    libpng \
    jpeg \
    freetype \ 
    oniguruma \
    icu-libs \
    libzip

# Salin artefak dari builder stage
COPY --from=builder /var/www/html .
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/

# Pastikan izin sudah benar di image final
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Set user ke www-data
USER www-data

# Ekspos port PHP-FPM
EXPOSE 9000

# Perintah default untuk menjalankan PHP-FPM
CMD ["php-fpm"]
