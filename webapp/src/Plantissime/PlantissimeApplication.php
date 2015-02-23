<?php 

namespace Plantissime;

use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\FormServiceProvider;
use Silex\Provider\TranslationServiceProvider;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;


class PlantissimeApplication extends Application
{
	use Application\TwigTrait;

	function __construct()
	{
		parent::__construct();

		// Config
		$this['debug'] = true;


		// Services 
		$this->register(new TwigServiceProvider(), array(
		    'twig.path' => __DIR__.'/../../res/views',
		));

		$this->register(new DoctrineServiceProvider(), array(
		    'db.options' => array(
		        'driver'   => 'pdo_mysql',
		    	'dbname' => 'plantissime',
		    	'user' => 'admin',
		    	'password' => 'fXUQ|MjmNbds',
		    	'host' => 'db',
		    ),
		));

		$this->register(new FormServiceProvider());

		$this->register(new TranslationServiceProvider(), array(
		    'locale_fallbacks' => array('en'),
		));

		// Middleware
		// Add json parsing
		$this->before(function (Request $request) {
		    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
		        $data = json_decode($request->getContent(), true);
		        $request->request->replace(is_array($data) ? $data : array());
		    }
		});

		// Controllers
		$this->mount('/', new Controllers\AppController());
		$this->mount('/', new Controllers\ReceiverController());
	}
}