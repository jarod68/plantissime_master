<?php

require_once __DIR__.'/../vendor/autoload.php';

$app = new Plantissime\PlantissimeApplication();


// Config
$app['debug'] = true;


// Services 
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));


// Controllers
$app->mount('/', new Plantissime\AppControllerProvider());
$app->mount('/api', new Plantissime\ApiControllerProvider());



$app->run();
