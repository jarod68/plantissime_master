<?php

require_once __DIR__.'/../vendor/autoload.php';

$app = new Plantissime\PlantissimeApplication();


// Config
$app['debug'] = true;


// Services 
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../res/views',
));

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
    	'dbname' => 'plantissime',
    	'user' => 'admin',
    	'password' => 'fXUQ|MjmNbds',
    	'host' => 'db',
    ),
));

$app->register(new Silex\Provider\FormServiceProvider());

$app->register(new Silex\Provider\TranslationServiceProvider(), array(
    'locale_fallbacks' => array('en'),
));

// Controllers
$app->mount('/', new Plantissime\AppControllerProvider());
$app->mount('/api', new Plantissime\ApiControllerProvider());



$app->run();
