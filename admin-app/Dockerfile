# admin-app/Dockerfile
FROM php:8.3-fpm-alpine AS builder

WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache \
    curl \
    zip \
    unzip \
    git \
    supervisor \
    nginx \
    libzip \
    libzip-dev \
    libpng-dev \
    libxml2-dev \
    postgresql-dev \
    icu-dev \
    oniguruma-dev # Untuk mbstring

# Install PHP extensions
RUN docker-php-ext-install \
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

# Copy application code
COPY . .

# Install composer dependencies
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-plugins --no-scripts

# Generate app key if not set
RUN if [ ! -f ".env" ]; then cp .env.example .env; fi

# Set permissions for storage and bootstrap/cache directories
RUN mkdir -p storage/framework/sessions \
             storage/framework/views \
             storage/framework/cache \
             bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Generate application key
RUN php artisan key:generate

# Optimize Laravel
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# --- Tahap 2: Final Stage ---
FROM php:8.3-fpm-alpine
WORKDIR /var/www/html

# Install only production runtime libraries
RUN apk add --no-cache postgresql-libs libxml2 libpng oniguruma icu-libs

# Salin kode aplikasi yang sudah di-build
COPY --from=builder /var/www/html .

# 💡 PERUBAHAN UTAMA DI SINI: Salin seluruh folder konfigurasi PHP
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

# 💡 PERBAIKAN: Salin file ekstensi (.so) yang sudah di-compile
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/

# Atur kepemilikan lagi di tahap final
RUN chown -R www-data:www-data /var/www/html

USER www-data
EXPOSE 9000
CMD ["php-fpm"]
