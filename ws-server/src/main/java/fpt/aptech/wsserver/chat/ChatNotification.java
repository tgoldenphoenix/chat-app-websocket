package fpt.aptech.wsserver.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

//@Entity
//@Table(name = "chatroom")
//@Getter
//@Setter
//@Builder
////@AllArgsConstructor
//@NoArgsConstructor
//@ToString

@Data
//@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatNotification {

    private String id;
    private String senderId;
    private String recipientId;
    private String content;

    public ChatNotification(String id, String senderId, String recipientId, String content) {
        this.id = id;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
    }
}
