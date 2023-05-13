<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Entry;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $padlet1 = new \App\Models\Padlet();
        $padlet1->name = "My first Padlet";
        $padlet1->public = true;

        $user = User::first();
        $padlet1->user()->associate($user);
        $padlet1->save();

        // add entries to padlet
        $entry1 = new Entry();
        $entry1->text = "entry text";

        $entry2 = new Entry();
        $entry2->text = "entry text 2";

        $padlet1->entries()->saveMany([$entry1, $entry2]);

        // add all users
        $users = User::all()->pluck("id");
        $padlet1->users()->sync($users);

        // add comments to entry
        $comment1 = new Comment();
        $comment1->comment = "great entry!";

        $comment2 = new Comment();
        $comment2->comment = "great entry again!";

        $entry1->comments()->saveMany([$comment1, $comment2]);


        // add ratings to entry
        $rating1 = new Rating();
        $rating1->rating = 3;

        $rating2 = new Rating();
        $rating2->rating = 1;

        $entry1->comments()->saveMany([$comment1, $comment2]);

    }
}
