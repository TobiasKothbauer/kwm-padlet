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
        $user->save();

        $user = new User();
        $user->first_name = "Sebi";
        $user->last_name = "Fritzer";
        $user->username = "fritzi";
        $user->email = "fritzi@gmail.com";
        $user->password = bcrypt('fritzi');
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
