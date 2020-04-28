<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HandlePage extends CI_Controller {
	
	public function page_not_found()
	{
		$this->load->view('errors/page_not_found');
	}
	
	public function data_not_found()
	{
		$this->load->view('errors/data_not_found');
	}
	
	public function maintenance()
	{
		$this->load->view('errors/maintenance');
    }

	public function session_expired()
	{
		$this->load->view('errors/session_expired');
    }
    
}
