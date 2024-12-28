package fpt.aptech.wsserver.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @MessageMapping("/message") // stompClient.send()
    @SendTo("/chatroom/public") // front end subscribe to this url
    public User addUser(
            @Payload User user
    ) {
        System.out.println("user tu front-end" + user);
//        userService.saveUser(user);
        return user;
    }
}
