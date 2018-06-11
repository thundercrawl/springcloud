package org.gnss_rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Service
public class SearchEntry {

	@Autowired
    RestTemplate restTemplate;
	
	public String remoteSearchByKeywords(String name)
	{
		return restTemplate.getForObject("http://SERVICES-SEARCH/hi?name="+name,String.class);
	}
}
