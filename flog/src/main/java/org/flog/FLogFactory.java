package org.flog;



import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.Appender;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.Configurator;
import org.apache.logging.log4j.core.layout.PatternLayout;

public class FLogFactory 
{
    public static void initLogger(Level l)
    {
       /*
        * This path is tricky not suggest because the return logger not instaniated by corelogger, then the class init will failed.
        */
        org.apache.logging.log4j.Logger logger
            = org.apache.logging.log4j.LogManager.getLogger(FLogFactory.class);
           LogManager.getContext();
        org.apache.logging.log4j.core.Logger coreLogger
            = (org.apache.logging.log4j.core.Logger)logger;
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

   public static void main(String[] args)
   {
    initLogger(Level.INFO);
	
    
    LogManager.getLogger(FLogFactory.class).info("in info now");
    LogManager.getLogger(FLogFactory.class).debug("in debug now");
   }
}
