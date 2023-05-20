<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entry extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'text',
        'padlet_id'
    ];

    /**
     * padlet has many entries - 1 enry belongs to 1 padlet
     */
    public function padlet(): BelongsTo {
        return $this->belongsTo(Padlet::class);
    }

    /**
     * @return HasMany
     * 1 entry can have many comments
     */
    public function comments():HasMany {
        return $this->hasMany(Comment::class);
    }

    /**
     * @return HasMany
     * 1 entry can have many ratings
     */
    public function ratings():HasMany {
        return $this->hasMany(Rating::class);
    }


}
