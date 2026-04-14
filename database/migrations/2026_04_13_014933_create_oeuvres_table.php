 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('oeuvres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artiste_id')->constrained('artistes')->onDelete('cascade');
            $table->string('titre');
            $table->string('categorie');
            $table->text('description')->nullable();
            $table->decimal('prix', 8, 2);
            $table->integer('annee');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oeuvres');
    }
};