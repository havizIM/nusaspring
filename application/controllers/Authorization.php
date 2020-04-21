<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authorization extends CI_Controller {

	public function authenticate()
	{
		header('Content-Type: application/json');

		$post = json_encode($this->input->post());
		$ch   = curl_init($this->config->item('api_url').'login');

		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); // Inject the token into the header
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, 1); // Specify the request method as POST
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post); // Set the posted fields
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // This will follow any redirects
		
		$json = curl_exec($ch); // Execute the cURL statement
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$response = json_decode($json);
		curl_close($ch); // Close the cURL connection
		
		if($response->status == false){
			header('HTTP/1.1 400 Bad Request', true, 400);
			echo $json;
		} else {

			$payload = array(
				'id' => $response->data->id,
				'name' => $response->data->name,
				'email' => $response->data->email,
				'username' => $response->data->username,
				'roles' => $response->data->roles,
				'api_token' => $response->data->api_token,
				'logged_in' => TRUE,
			);

			$this->session->set_userdata($payload);
			echo $json;
		}
	}

	public function logout()
	{
		header('Content-Type: application/json');

		$ch = curl_init($this->config->item('api_url').'logout');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json', 'Authorization: Bearer '.$this->session->userdata('api_token') ));

		$json = curl_exec($ch); // Execute the cURL statement
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$response = json_decode($json);
		curl_close($ch); // Close the cURL connection

		$this->session->sess_destroy();
		echo $json;
	}
}
