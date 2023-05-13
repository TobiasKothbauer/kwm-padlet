<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment'
    ];

    /**
     * entry can have many ratings - 1 rating belongs to 1 padlet
     */
    public function entry(): BelongsTo {
        return $this->belongsTo(Entry::class);
    }
}
