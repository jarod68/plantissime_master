<?php

namespace Plantissime\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Silex\Application\TwigTrait;
use Symfony\Component\HttpFoundation\Request;


class AppController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];


    	// 
        $controllers->get('/', 'Plantissime\Controllers\AppController::home');

        $controllers->get('/plant', 'Plantissime\Controllers\AppController::plantList');

        $controllers->match('/plant/create', 'Plantissime\Controllers\AppController::plantCreate');

        $controllers->get('/plant/{id}', 'Plantissime\Controllers\AppController::plantDetail');


        $controllers->get('/sensor', 'Plantissime\Controllers\AppController::sensorList');

        $controllers->match('/sensor/create', 'Plantissime\Controllers\AppController::sensorCreate');

        $controllers->get('/sensor/{id}', 'Plantissime\Controllers\AppController::sensorDetail');

        return $controllers;
    }

    public function home(Application $app)
    {
        return $app->render('home.twig');
    }

    /*  PLANTS */
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
        // 
        $plant = $app['db']->fetchAssoc('SELECT * FROM Plants WHERE id = ?', array($id));


        // Luminosity data
        $dataLum = $app['db']->fetchAll('SELECT timestamp, luminosity FROM Records WHERE (s0_link = ? OR s1_link = ? OR s2_link = ? OR s3_link = ?)',
            array($plant['id'], $plant['id'], $plant['id'], $plant['id']));

        // Humidity data
        $dataHum = $app['db']->fetchAll('SELECT timestamp, humidity FROM Records WHERE (s0_link = ? OR s1_link = ? OR s2_link = ? OR s3_link = ?)',
            array($plant['id'], $plant['id'], $plant['id'], $plant['id']));

        // Temperature data
        $dataTemp = $app['db']->fetchAll('SELECT timestamp, temperature FROM Records WHERE (s0_link = ? OR s1_link = ? OR s2_link = ? OR s3_link = ?)',
            array($plant['id'], $plant['id'], $plant['id'], $plant['id']));



        return $app['twig']->render('plantDetail.twig', array('plant' => $plant, 'lums' => $dataLum, 'hums' => $dataHum, 'temps' => $dataTemp));
    }

    /* SENSORS */
    public function sensorList(Application $app)
    {
        $sensors = $app['db']->fetchAll('SELECT * FROM Sensors');
        return $app['twig']->render('sensorList.twig', array('sensors' => $sensors));
    }

    public function sensorCreate(Application $app, Request $request)
    {
        // some default data for when the form is displayed the first time
        $data = array(
            'serial_number' => '13A20040A75DCE',
            'node_identifier' => 'plant1',
        );

        $plantChoices = array();
        $plants = $app['db']->fetchAll('SELECT * FROM Plants');
        foreach ($plants as $plant)
        {
            $plantChoices[$plant['id']] = $plant['name'];
        }

        $form = $app['form.factory']->createBuilder('form', $data)
            ->add('serial_number')
            ->add('node_identifier')
            ->add('s0_link', 'choice', array('choices' => $plantChoices))
            ->add('s1_link', 'choice', array('choices' => $plantChoices))
            ->add('s2_link', 'choice', array('choices' => $plantChoices))
            ->add('s3_link', 'choice', array('choices' => $plantChoices))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $data = $form->getData();
            $app['db']->insert('Sensors', $data);
            
            //$app['db']


            return $app->redirect('/sensor');
        }

        // display the form
        return $app['twig']->render('sensorCreate.twig', array('form' => $form->createView()));
    }

    public function sensorDetail(Application $app, $id)
    {
        $sensor = $app['db']->fetchAssoc('SELECT * FROM Sensors WHERE id = ?', array($id));
        return $app['twig']->render('sensorDetail.twig', array('sensor' => $sensor));
    }
}

