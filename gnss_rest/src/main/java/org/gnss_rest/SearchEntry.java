package org.gnss_rest;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

@Service
public class SearchEntry {

	@Autowired
    RestTemplate restTemplate;
	
	public String remoteSearchByKeywords(String key)
	{
		String rslt =  restTemplate.getForObject("http://SERVICES-SEARCH/hi?name="+key,String.class);
		return rslt;
	}

	
}
