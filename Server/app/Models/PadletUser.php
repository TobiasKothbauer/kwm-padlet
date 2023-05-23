<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PadletUser extends Model
{
    protected $fillable = [
        'padlet_id',
        'user_id',
        'right'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function padlet(): BelongsTo
    {
        return $this->belongsTo(Padlet::class);
    }

}
