package ems.backmanage.frame.util;

import java.io.UnsupportedEncodingException;

import nl.justobjects.pushlet.core.Dispatcher;
import nl.justobjects.pushlet.core.Event;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class FramePushletUtil {
	private final static Log log = LogFactory.getLog(FramePushletUtil.class);

	public static void pushEvent(String eventName,String jsonStringData)
	{
			Event event = Event.createDataEvent(eventName);
			try {
				jsonStringData = new String(jsonStringData.getBytes("UTF-8"), "ISO-8859-1");
			} catch (UnsupportedEncodingException e) {

				e.printStackTrace();
			}
			event.setField("data", jsonStringData);
			Dispatcher dis = Dispatcher.getInstance();
			if(event==null||dis==null)
			{
				log.warn("PUSHLET对象为空："+dis+"_"+event);
			}
			else{
				dis.multicast(event); // 向所有和eventS名称匹配的事件推送
			}

		}
}

