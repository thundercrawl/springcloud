package org.flog;



import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.Appender;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.Configurator;
import org.apache.logging.log4j.core.layout.PatternLayout;

public class FLogFactory 
{
	private volatile static boolean isStop = false;
	
	public static void  shutdown()
	{
		isStop = true;
		
	}
	public static boolean isStop()
	{
		return isStop;
	}
	private static org.apache.logging.log4j.core.Logger coreLogger;
    public static void initLogger(Level l)
    {
       /*
        * This path is tricky not suggest because the return logger not instaniated by corelogger, then the class init will failed.
        */
        org.apache.logging.log4j.Logger logger
            = org.apache.logging.log4j.LogManager.getLogger(FLogFactory.class);
           LogManager.getContext();
        
          coreLogger= (org.apache.logging.log4j.core.Logger)logger;
        org.apache.logging.log4j.core.LoggerContext context
            = (org.apache.logging.log4j.core.LoggerContext)coreLogger.getContext();
        Configuration configuration
            = (Configuration)context.getConfiguration();
        
        for(Appender a:configuration.getAppenders().values())
        {
        	logger.info("enabled appender:"+a.getName());
        	logger.info(a.getClass());
        }
        

    }
 
    public static void  setLoggerLevel(Level l)
    {
        Configurator.setRootLevel(l);
        
    }

    class runLogEntry implements Runnable
    {

		@Override
		public void run() {
			// TODO Auto-generated method stub
			String payload="payload:";
			Logger lg = LogManager.getLogger(FLogFactory.class);
			int count = 1;
			setLoggerLevel(Level.DEBUG);
			while(!FLogFactory.isStop())
			{
				lg .info(payload+count++);
				 lg.debug(payload+count++);
			}
		}
    	
    }
   public static void main(String[] args)
   {
    initLogger(Level.INFO);
    
	int nthreads= 16;
	if(args[0]!=null)
	{
		System.out.println(args[0]);
		nthreads = new Integer(args[0]);
	}
    ExecutorService executor = Executors.newFixedThreadPool(nthreads);
    while(nthreads-->0)
    	executor.submit( new FLogFactory().new  runLogEntry());
  
   while(! executor.isTerminated())
   {
	   try {
		Thread.sleep(3000);
	} catch (InterruptedException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
   }
   }
}
