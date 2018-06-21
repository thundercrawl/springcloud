package org.gnss_rest.controller;

import org.gnss_rest.SearchEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class SearchController {


	@Autowired
	SearchEntry searchSrv;
	@RequestMapping(value = "/search")
	public String SearchByKeyWorkds(@RequestParam String key)
	{
		return searchSrv.remoteSearchByKeywords(key);
	}
}
