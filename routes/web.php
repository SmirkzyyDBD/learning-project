<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');

require __DIR__ . '/settings.php';