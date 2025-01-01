package fpt.aptech.wsserver.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin(origins = "http:localhost:5173")
//@RestController

@CrossOrigin("*")
@RestController
@RequestMapping("api/user/")
//@AllArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @MessageMapping("/user.addUser") // stompClient.send()
    // front end subscribe to this url
    // When user connect/dis-connect, broadcast to public
    @SendTo("/user/public")
    public User addUser(
            @Payload User user
    ) {
//        System.out.println("UserController:34: user tu front-end: " + user);
        // save user == flip the status
        userService.saveUser(user);
        return user;
    }

    @MessageMapping("/user.disconnectUser")
    @SendTo("/user/public")
    public User disconnectUser(
            @Payload User user
    ) {
        userService.disconnect(user);
        return user;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findConnectedUsers() {
//        System.out.println("UserController:51: list of online user: "+userService.findConnectedUsers());
        return ResponseEntity.ok(userService.findConnectedUsers());
    }
}
