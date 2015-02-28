<?php

namespace Plantissime\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\Request;


class ReceiverController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];


    	// 
        $controllers->get('/test', 'Plantissime\Controllers\ReceiverController::test');
        $controllers->post('/receive', 'Plantissime\Controllers\ReceiverController::receive');

        return $controllers;
    }

    public function test(Application $app)
    {
    	$json = '{"nodeID":"plant2","serial":"13A20040A75DCE","lum":14.0,"hum":37,"temp":21,"s0":453.0,"s1":503.0,"s2":-1.0,"s3":682.0,"power":3242}';
    	$object = json_decode($json);

        // Fetch sensor
        $sensor = $app['db']->fetchAssoc('SELECT * FROM Sensors WHERE serial_number = ? AND node_identifier = ?', array($object->serial, $object->nodeID));

        if($sensor != null)
        {
            // Create new record
            $record = array(
                'sensor_id' => $sensor['id'], 
                'humidity' => $object->hum, 
                'temperature' => $object->temp, 
                'luminosity' => $object->lum, 
                's0' => $object->s0, 
                's1' => $object->s1, 
                's2' => $object->s2, 
                's3' => $object->s3, 
                'power' => $object->power, 
                's0_link' => $sensor['s0_link'], 
                's1_link' => $sensor['s1_link'], 
                's2_link' => $sensor['s2_link'], 
                's3_link' => $sensor['s3_link']
            );

            $app['db']->insert('Records', $record);

            return true;
        }

        return 'sensor unknown';
    }

    public function receive(Application $app, Request $request)
    {
        // Fetch sensor
        $sensor = $app['db']->fetchAssoc('SELECT * FROM Sensors WHERE serial_number = ? AND node_identifier = ?',
            array($request->request->get('serial'), $request->request->get('nodeID')));

        if($sensor != null)
        {
            // Create new record
            $record = array(
                'sensor_id' => $sensor['id'], 
                'humidity' => $request->request->get('hum'), 
                'temperature' => $request->request->get('temp'), 
                'luminosity' => $request->request->get('lum'), 
                's0' => $request->request->get('s0'), 
                's1' => $request->request->get('s1'), 
                's2' => $request->request->get('s2'), 
                's3' => $request->request->get('s3'), 
                'power' => $request->request->get('power'), 
                's0_link' => $sensor['s0_link'], 
                's1_link' => $sensor['s1_link'], 
                's2_link' => $sensor['s2_link'], 
                's3_link' => $sensor['s3_link']
            );

            $app['db']->insert('Records', $record);

            return $app->json(true);
        }

        return $app->json('sensor unknown');
    }


}