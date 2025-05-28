<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use App\Models\Post;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Tambahkan tombol untuk melihat postingan di situs publik
            Actions\Action::make('view_public')
                ->label('Lihat Postingan')
                ->icon('heroicon-o-arrow-top-right-on-square')
                ->color('gray')
                ->url(fn (Post $record): string => url("/blog/{$record->slug}")) // Asumsi URL publik Anda adalah /blog/{slug}
                ->openUrlInNewTab(), // Buka di tab baru
            Actions\DeleteAction::make(),
        ];
    }
}
