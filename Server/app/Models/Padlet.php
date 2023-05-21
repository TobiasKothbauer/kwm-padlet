<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Padlet extends Model
{
    use HasFactory;

    // fillable -> what am i allowed to set. guarded -> what i am not allowed to set.
    protected $fillable = [
        'name',
        'isPublic',
        'user_id'
    ];

    /**
     * @return HasMany
     * 1 padlet can have many entries
     */
    public function entries():HasMany {
        return $this->hasMany(Entry::class);
    }

    /**
     * @return BelongsTo
     * 1 padlet can only be created by 1 user
    */
    public function user():BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class)->withPivot(['right']);
    }
}
