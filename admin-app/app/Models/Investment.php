<?php
// admin-app/app/Models/Investment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'risk_level',
        'min_investment',
        'potential_return',
        'icon_svg',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'min_investment' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];
}
