<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'main';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['login'] = 'auth/login';
$route['authenticate'] = 'authorization/authenticate';
$route['logout'] = 'authorization/logout';

$route['dashboard'] = 'page/dashboard';
$route['task'] = 'page/task';
$route['reminder'] = 'page/reminder';
$route['category'] = 'page/category';
$route['unit'] = 'page/unit';
$route['setting'] = 'page/setting';

$route['product'] = 'page/product';
$route['product/add'] = 'page/product/add';
$route['product/(:num)'] = 'page/product/detail/$1';
$route['product/edit/(:num)'] = 'page/product/edit/$1';

$route['supplier'] = 'page/supplier';
$route['supplier/add'] = 'page/supplier/add';
$route['supplier/(:num)'] = 'page/supplier/detail/$1';
$route['supplier/edit/(:num)'] = 'page/supplier/edit/$1';

$route['customer'] = 'page/customer';
$route['customer/add'] = 'page/customer/add';
$route['customer/(:num)'] = 'page/customer/detail/$1';
$route['customer/edit/(:num)'] = 'page/customer/edit/$1';

$route['adjustment'] = 'page/adjustment';
$route['adjustment/add'] = 'page/adjustment/add';
$route['adjustment/(:num)'] = 'page/adjustment/detail/$1';
$route['adjustment/edit/(:num)'] = 'page/adjustment/edit/$1';

$route['purchase'] = 'page/purchase';
$route['purchase/add'] = 'page/purchase/add';
$route['purchase/(:num)'] = 'page/purchase/detail/$1';
$route['purchase/edit/(:num)'] = 'page/purchase/edit/$1';

$route['selling'] = 'page/selling';
$route['selling/add'] = 'page/selling/add';
$route['selling/(:num)'] = 'page/selling/detail/$1';
$route['selling/edit/(:num)'] = 'page/selling/edit/$1';

$route['purchase_return'] = 'page/purchase_return';
$route['purchase_return/add/(:num)'] = 'page/purchase_return/add/$1';
$route['purchase_return/(:num)'] = 'page/purchase_return/detail/$1';
$route['purchase_return/edit/(:num)'] = 'page/purchase_return/edit/$1';

$route['selling_return'] = 'page/selling_return';
$route['selling_return/add/(:num)'] = 'page/selling_return/add/$1';
$route['selling_return/(:num)'] = 'page/selling_return/detail/$1';
$route['selling_return/edit/(:num)'] = 'page/selling_return/edit/$1';

$route['purchase_payment'] = 'page/purchase_payment';
$route['purchase_payment/add/(:num)'] = 'page/purchase_payment/add/$1';
$route['purchase_payment/(:num)'] = 'page/purchase_payment/detail/$1';
$route['purchase_payment/edit/(:num)'] = 'page/purchase_payment/edit/$1';

$route['selling_payment'] = 'page/selling_payment';
$route['selling_payment/add/(:num)'] = 'page/selling_payment/add/$1';
$route['selling_payment/(:num)'] = 'page/selling_payment/detail/$1';
$route['selling_payment/edit/(:num)'] = 'page/selling_payment/edit/$1';

