<?php

namespace Plantissime;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;

class ApiControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

    	// 
        $controllers->get('/', function (Application $app) {
            return false;
        });

        $controllers->get('/plant', function (Application $app) {
            return $app->json('ee');
        });

        $controllers->get('/plant/{id}', function (Application $app, $id) {
            return $app->json('Plant Id:'.$id);
        });

        $controllers->post('/plant/{id}', function (Application $app) {
            return $app->json('Hello Aip ');
        });

        $controllers->put('/plant/{id}', function (Application $app) {
            return $app->json('Hello Aip ');
        });

        $controllers->delete('/plant/{id}', function (Application $app) {
            return $app->json('Hello Aip ');
        });



        return $controllers;
    }
}
