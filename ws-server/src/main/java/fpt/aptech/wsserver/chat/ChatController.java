package fpt.aptech.wsserver.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    // client need to send to /app/message
//    @MessageMapping("/message")
//    @SendTo("/chatroom/public")
//    public fpt.aptech.wsserver.chat.Message receiveMessage(@Payload Message message){
//        return message;
//    }

//    @MessageMapping("/private-message")
//    public Message recMessage(@Payload Message message){
//        // Create a dynamic topic with simpMessagingTemplate
//        // It takes the url from .setUserDestinationPrefix() and
//        // client need to subscribe to /user/Anhao/private. "Anhao" is dynamic
//        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
//        System.out.println(message.toString());
//        return message;
//    }
}

