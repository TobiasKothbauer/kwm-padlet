<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->first_name = "Tobias";
        $user->last_name = "Kothbauer";
        $user->username = "tobinator";
        $user->email = "tobi@gmail.com";
        $user->password = bcrypt('tobi');
        $user->profile_picture = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80";
        $user->save();

        $user = new User();
        $user->first_name = "Sebi";
        $user->last_name = "Fritzer";
        $user->username = "fritzi";
        $user->email = "fritzi@gmail.com";
        $user->password = bcrypt('fritzi');
        $user->profile_picture = "https://images.unsplash.com/photo-1515515957482-9bfec374dbc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1182&q=80";
        $user->save();

        $user = new User();
        $user->first_name = "temp";
        $user->last_name = "temp";
        $user->username = "temp";
        $user->email = "temp@temp.com";
        $user->password = bcrypt('temp');
        $user->save();
    }
}
