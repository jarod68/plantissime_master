<?php

namespace Plantissime;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Silex\Application\TwigTrait;

class AppControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

    	// 
        $controllers->get('/', function (Application $app) {
            return $app['twig']->render('hello.twig', array(
                    'name' => 'Fabien'
                ));
        });

        $controllers->get('/{name}', function (Application $app, $name) {
            return $app->render('hello.twig', ['name' => $name]);
        });



        return $controllers;
    }
}
