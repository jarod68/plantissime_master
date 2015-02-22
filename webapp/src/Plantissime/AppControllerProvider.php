<?php

namespace Plantissime;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Silex\Application\TwigTrait;
use Symfony\Component\HttpFoundation\Request;


class AppControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];


    	// 
        $controllers->get('/', 'Plantissime\AppControllerProvider::home');
        $controllers->get('/plant', 'Plantissime\AppControllerProvider::plantList');
        $controllers->match('/plant/create', 'Plantissime\AppControllerProvider::plantCreate');
        $controllers->get('/plant/{id}', 'Plantissime\AppControllerProvider::plantDetail');

        return $controllers;
    }

    public function home(Application $app)
    {
        return $app->render('home.twig');
    }

    public function plantList(Application $app)
    {
        $plants = $app['db']->fetchAll('SELECT * FROM Plants');
        return $app['twig']->render('plantList.twig', array('plants' => $plants));
    }

    public function plantCreate(Application $app, Request $request)
    {
        // some default data for when the form is displayed the first time
        $data = array(
            'name' => 'My first cactus',
            'specie' => 'Cactus',
        );

        $form = $app['form.factory']->createBuilder('form', $data)
            ->add('name')
            ->add('specie')
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $data = $form->getData();
            $app['db']->insert('Plants', $data);
            
            //$app['db']


            return $app->redirect('/plant');
        }

        // display the form
        return $app['twig']->render('plantCreate.twig', array('form' => $form->createView()));
        //return $app['twig']->render('plantCreate.twig', array('data' => print_r($app)));
    }

    public function plantDetail(Application $app, $id)
    {
        $plant = $app['db']->fetchAssoc('SELECT * FROM Plants WHERE id = ?', array($id));
        return $app['twig']->render('plantDetail.twig', array('plant' => $plant));
    }
}

