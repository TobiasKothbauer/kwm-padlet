<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment',
        'entry_id'
    ];

    /**
     * entry can have many comment - 1 enry belongs to 1 padlet
     */
    public function entry(): BelongsTo {
        return $this->belongsTo(Entry::class);
    }
}
