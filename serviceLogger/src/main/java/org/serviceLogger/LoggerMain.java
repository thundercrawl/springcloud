package org.serviceLogger;

import java.util.Arrays;
import java.util.Properties;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

public class LoggerMain 
{
	public static int getIndex(ConsumerRecord<String, String> record)
	{
		int rt = -1;
		try {
		String getindex = "payload:";
		
		if( record.value().indexOf(getindex )  >0 )
		{
			
			String recordtrim = record.value().trim(); 
			int start = recordtrim.indexOf(getindex ) ;
			rt = new Integer(recordtrim.substring(start+getindex.length(), recordtrim.length()));
		}
		}catch(Exception e)
		{
			System.out.println(record.value());
			e.printStackTrace();
		}
		return rt;
	}
    public static void main( String[] args )
    {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("session.timeout.ms", "30000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        System.out.printf("start consumer");
        consumer.subscribe(Arrays.asList("flog"));
        double count = 1;
        long startup = System.currentTimeMillis();
        int lastindex = -1;
        int currentindex = -1;
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(100);
           
            for (ConsumerRecord<String, String> record : records)
            {
            	if(lastindex == -1)
            	{
            		lastindex = getIndex(record);
            	}
            	else
            	{
            		currentindex = getIndex(record);
            		if(currentindex -lastindex != 1)
            		{
            			System.out.println("found ----------------------------> dis order message"+" current:"+currentindex+" last:"+lastindex);
            			System.out.println("current:"+record.value());
            		}
            		lastindex = currentindex;
            	}
            		
            	if(count++%10000 == 0)
            	{
            		 System.out.println("get records:="+records.count());
            		System.out.printf("offset = %d, key = %s, value = %s", record.offset(), record.key(), record.value() + " timepassed:="+(System.currentTimeMillis()-startup));
            		startup=System.currentTimeMillis();
            	}
            }
            }
        }
    

}
